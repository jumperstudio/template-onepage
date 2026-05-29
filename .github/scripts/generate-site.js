// .github/scripts/generate-site.js
// Roda a cadeia de 5 prompts via OpenAI API
// Lê o client.json do cliente e gera/atualiza os arquivos do site

import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CLIENT_PATH = process.env.CLIENT_PATH; // ex: clients/cli_NqAoveB/client.json
const CLIENT_ID = process.env.CLIENT_ID;     // ex: cli_NqAoveB

if (!OPENAI_API_KEY || !CLIENT_PATH) {
  console.error('❌ OPENAI_API_KEY ou CLIENT_PATH não definidos');
  process.exit(1);
}

// Lê o client.json do cliente
const clientJson = JSON.parse(fs.readFileSync(`../${CLIENT_PATH}`, 'utf-8'));
console.log(`✅ client.json carregado: ${clientJson.business?.name || CLIENT_ID}`);

// ─── FIX 1: copia o client.json do cliente para src/data/client.json ─────────
fs.writeFileSync('src/data/client.json', JSON.stringify(clientJson, null, 2));
console.log('✅ src/data/client.json atualizado com dados do cliente');

// ─── FIX 2: normalizar operation_mode (UUID → texto legível) ─────────────────
const OPERATION_MODE_MAP = {
  'presencial': 'presencial',
  'online':     'online',
  'hibrido':    'híbrido',
  'híbrido':    'híbrido',
};
if (Array.isArray(clientJson.business?.operation_mode)) {
  // Se vier como array de UUIDs ou strings, pega o primeiro e tenta mapear
  const raw = clientJson.business.operation_mode[0] || '';
  clientJson.business.operation_mode = OPERATION_MODE_MAP[raw.toLowerCase()] || 'presencial';
  console.log(`✅ operation_mode normalizado: "${clientJson.business.operation_mode}"`);
}

// ─── FIX 3: parsear raw_social_proof.process_text → social_proof.process ─────
if (clientJson.raw_social_proof?.process_text && clientJson.social_proof?.process?.length === 0) {
  const lines = clientJson.raw_social_proof.process_text
    .split('\n\n')
    .map(block => block.trim())
    .filter(Boolean);

  const steps = lines.map(block => {
    const [title, ...rest] = block.split('\n');
    return {
      title: title.trim(),
      description: rest.join(' ').trim(),
    };
  }).filter(s => s.title);

  if (steps.length > 0) {
    clientJson.social_proof.type = 'process';
    clientJson.social_proof.process = steps;
    console.log(`✅ social_proof.process populado: ${steps.length} etapas`);
  }
}

// ─── FIX 4: horário vazio → fallback padrão ───────────────────────────────────
if (!clientJson.contact?.hours || Object.keys(clientJson.contact.hours).length === 0) {
  clientJson.contact.hours = {
    'Seg a Sex': '09:00 – 18:00',
    'Sábado':    'Sob consulta',
    'Domingo':   'Fechado',
  };
  console.log('✅ contact.hours: fallback padrão aplicado');
}

// Grava o client.json normalizado de volta para src/data/
fs.writeFileSync('src/data/client.json', JSON.stringify(clientJson, null, 2));
console.log('✅ src/data/client.json regravado com dados normalizados');

// Lê os arquivos do template
const readFile = (p) => {
  try { return fs.readFileSync(p, 'utf-8'); }
  catch { return null; }
};

const indexAstro     = readFile('src/pages/index.astro');
const heroAstro      = readFile('src/components/Hero.astro');
const servicesAstro  = readFile('src/components/Services.astro');
const aboutAstro     = readFile('src/components/About.astro');
const socialProof    = readFile('src/components/SocialProof.astro');
const contactAstro   = readFile('src/components/ContactCTA.astro');
const footerAstro    = readFile('src/components/Footer.astro');
const baseAstro      = readFile('src/layouts/Base.astro');
const readmeIA       = readFile('README-IA.md');

// ─── Função de chamada à API ─────────────────────────────────────────────────
async function callOpenAI(systemPrompt, userPrompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// ─── REGRAS ABSOLUTAS (entram em todos os prompts) ───────────────────────────
const MASTER_RULES = `
REGRAS ABSOLUTAS — não-negociáveis:
1. Você NÃO inventa informações. Tudo vem do client.json.
2. Campo vazio = seção omitida. Nunca coloque placeholder.
3. Tom: direto, afirmativo, sem floreio. Proibido: "qualidade", "excelência", "soluções personalizadas".
4. Você responde APENAS com o conteúdo solicitado, sem explicações adicionais.
5. Não altere nomes de componentes, imports ou estrutura de arquivos.
`;

// ─── PROMPT 1: COPY ──────────────────────────────────────────────────────────
async function runCopyPrompt() {
  console.log('\n📝 P1 — Gerando copy...');

  const system = `${MASTER_RULES}
Você é um redator especializado em sites de pequenos negócios locais.
Responda APENAS com JSON válido, sem markdown, sem blocos de código.`;

  const user = `
Com base no client.json abaixo, gere os textos para o site.

CLIENT.JSON:
${JSON.stringify(clientJson, null, 2)}

Retorne exatamente este JSON (sem nenhum texto fora dele):
{
  "hero": {
    "headline": "(máximo 6 palavras, impacto imediato, sem clichê)",
    "subheadline": "(1 frase curta complementar)"
  },
  "services_intro": "(1 frase introduzindo os serviços)",
  "about_text": "(2 parágrafos curtos separados por \\n\\n: o que é o negócio + para quem serve)",
  "cta_text": "(1 frase de 10-15 palavras que justifica o contato agora)"
}`;

  const raw = await callOpenAI(system, user);
  const clean = raw.replace(/```json|```/g, '').trim();
  const content = JSON.parse(clean);

  fs.writeFileSync('src/data/content.json', JSON.stringify(content, null, 2));
  console.log('✅ content.json gerado');
  console.log(`   Headline: "${content.hero.headline}"`);

  return content;
}

// ─── PROMPT 2: SEO ───────────────────────────────────────────────────────────
async function runSeoPrompt() {
  console.log('\n🔍 P2 — Configurando SEO...');

  const system = `${MASTER_RULES}
Você é um especialista em SEO local.
Responda APENAS com JSON válido, sem markdown.`;

  const user = `
Configure o SEO para este negócio local.

CLIENT.JSON:
${JSON.stringify(clientJson, null, 2)}

Retorne exatamente este JSON:
{
  "title": "(formato: Nome — Bairro, Cidade | Serviço Principal — entre 50 e 60 caracteres)",
  "meta_description": "(entre 140 e 160 caracteres, menciona cidade, bairro, serviço principal e 1 diferencial real)"
}`;

  const raw = await callOpenAI(system, user);
  const clean = raw.replace(/```json|```/g, '').trim();
  const seo = JSON.parse(clean);

  console.log('✅ SEO gerado');
  console.log(`   Title (${seo.title.length} chars): "${seo.title}"`);
  console.log(`   Meta (${seo.meta_description.length} chars)`);

  return seo;
}

// ─── PROMPT 3: INDEX.ASTRO ───────────────────────────────────────────────────
async function runLayoutPrompt(content, seo) {
  console.log('\n🏗️  P3 — Atualizando index.astro...');

  const system = `${MASTER_RULES}
Você é um desenvolvedor Astro.
Responda APENAS com o conteúdo do arquivo index.astro, sem explicações.`;

  const user = `
Atualize o index.astro para usar os dados corretos do cliente.

CLIENT.JSON:
${JSON.stringify(clientJson, null, 2)}

CONTENT.JSON:
${JSON.stringify(content, null, 2)}

SEO:
${JSON.stringify(seo, null, 2)}

INDEX.ASTRO ATUAL:
${indexAstro}

Regras:
- Use content.hero.headline como tagline no Hero
- Use content.about_text como profile no About
- Use content.services_intro como subtitle no Services
- Atualize o pageTitle para: "${seo.title}"
- Passe data.assets.logo como prop logo no Hero
- Não altere imports nem estrutura de componentes
- Retorne o arquivo completo atualizado`;

  const updated = await callOpenAI(system, user);
  const clean = updated.replace(/```astro|```typescript|```/g, '').trim();

  fs.writeFileSync('src/pages/index.astro', clean);
  console.log('✅ index.astro atualizado');
}

// ─── PROMPT 4: TAILWIND COLORS ───────────────────────────────────────────────
async function runStylePrompt() {
  console.log('\n🎨 P4 — Aplicando cores...');

  const tailwindConfig = readFile('tailwind.config.js');

  const primary   = clientJson.meta?.primary_color   || '#0A0A0A';
  const secondary = clientJson.meta?.secondary_color || '#C9A84C';

  // ─── FIX 5: regex mais robusto para substituir cores no tailwind.config.js ──
  // Cobre: primary: '#fff', primary: "#fff", primary:   '#fff' (espaços variáveis)
  let updated = tailwindConfig
    .replace(/(primary\s*:\s*)(['"])[^'"]+(['"])/,   `$1$2${primary}$3`)
    .replace(/(secondary\s*:\s*)(['"])[^'"]+(['"])/,  `$1$2${secondary}$3`);

  // Fallback: se o regex não encontrou nada, loga aviso
  if (updated === tailwindConfig) {
    console.warn('⚠️  Cores não substituídas — padrão primary/secondary não encontrado no tailwind.config.js');
  } else {
    console.log(`✅ Cores aplicadas: primary=${primary}, secondary=${secondary}`);
  }

  fs.writeFileSync('tailwind.config.js', updated);
}

// ─── PROMPT 5: ROBOTS + SITEMAP ──────────────────────────────────────────────
async function runSeoFiles() {
  console.log('\n📄 P5 — Gerando robots.txt e sitemap.xml...');

  const domain = clientJson.meta?.domain || 'https://exemplo.com.br';

  fs.writeFileSync('public/robots.txt',
    `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`
  );

  fs.writeFileSync('public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\n`
  );

  console.log('✅ robots.txt e sitemap.xml gerados');
}

// ─── EXECUÇÃO ────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 Iniciando geração do site para: ${clientJson.business?.name || CLIENT_ID}`);
  console.log(`   Template: ${clientJson.meta?.template}`);
  console.log(`   Font pair: ${clientJson.meta?.font_pair}`);
  console.log(`   Deadline: ${clientJson.meta?.delivery_deadline}\n`);

  try {
    const content = await runCopyPrompt();
    const seo     = await runSeoPrompt();
    await runLayoutPrompt(content, seo);
    await runStylePrompt();
    await runSeoFiles();

    console.log('\n✅ GERAÇÃO CONCLUÍDA — site pronto para revisão humana');
    console.log(`   Cliente: ${clientJson.business?.name}`);
    console.log(`   Arquivo: ${CLIENT_PATH}`);

  } catch (err) {
    console.error('\n❌ Erro durante a geração:', err.message);
    process.exit(1);
  }
}

main();
