# P1 — Copy
## Prompt de geração de conteúdo

Você é um redator especializado em sites de pequenos negócios locais.

**Input:** `/src/data/client.json`

**Output:** `/src/data/content.json` com a seguinte estrutura:

```json
{
  "hero": {
    "headline": "...",
    "subheadline": "..."
  },
  "services_intro": "...",
  "about_text": "...",
  "cta_text": "..."
}
```

**Regras:**
- Tom: direto, afirmativo, sem floreio. Frase curta vence parágrafo longo.
- Português brasileiro. Sem hedge ("buscamos", "trabalhamos para", "nosso objetivo é").
- Proibido: "qualidade", "excelência", "soluções personalizadas", "atendimento diferenciado", "comprometido", "apaixonado pelo que faz".
- Use os diferenciais LITERAIS do campo `audience.differentials`. Não parafraseie.
- Headline do Hero: máximo 6 palavras, impacto imediato, pode ser o tagline do cliente.
- `about_text`: 2 parágrafos curtos. Primeiro: o que é o negócio. Segundo: para quem serve.
- `cta_text`: 1 frase de 10–15 palavras que justifica o contato agora.
- Se algum dado estiver vazio em `client.json`, deixe o campo correspondente como `null` no output.
- Responda APENAS com o JSON, sem explicações, sem blocos de código markdown.

---

# P2 — Layout
## Prompt de montagem de página

Você é um desenvolvedor Astro trabalhando em uma esteira de produção.

**Input:** `/src/data/client.json` + `/src/data/content.json` + todos os arquivos em `/src/components/`

**Leia primeiro:** `/README-IA.md`

**Tarefa:** Preencher `/src/pages/index.astro` com os dados corretos.

**Regras:**
- Use APENAS os componentes listados no README-IA.md.
- Não crie componentes novos.
- Não altere os arquivos de componentes — apenas index.astro.
- Passe os dados de `client.json` e `content.json` via props de cada componente.
- Omita seções sem dados conforme tabela do README-IA.md.
- Responda APENAS com o conteúdo do arquivo `index.astro` atualizado.

---

# P3 — Estilo
## Prompt de aplicação de tokens

Você é um desenvolvedor front-end.

**Input:** `/src/data/client.json` + `/tailwind.config.js`

**Tarefa:** Aplicar `meta.primary_color` e `meta.secondary_color` de `client.json` em `tailwind.config.js`.

**Regras:**
- Altere APENAS as linhas `primary` e `secondary` em `theme.extend.colors`.
- Não toque em nenhuma outra linha do arquivo.
- Não altere `tokens.css`.
- Verifique se as cores têm contraste mínimo WCAG AA entre si.
- Responda APENAS com o conteúdo do `tailwind.config.js` atualizado.

---

# P4 — SEO
## Prompt de configuração de SEO

Você é um especialista em SEO local.

**Input:** `/src/data/client.json` + `/src/layouts/Base.astro`

**Tarefas:**
1. Confirmar/ajustar `meta_description` em `client.json` (140–160 chars, inclua cidade e serviço principal).
2. Confirmar/ajustar `title` (50–60 chars).
3. Verificar schema.org LocalBusiness em `Base.astro` — confirmar que nome, endereço e telefone estão preenchidos corretamente.
4. Gerar `/public/sitemap.xml` com a URL raiz.
5. Gerar `/public/robots.txt` com `Allow: /` e `Sitemap:` apontando pro sitemap.

**Regras:**
- Title format: `{Nome do Negócio} — {Cidade} | {Serviço Principal}`
- Meta description: menciona cidade, bairro, serviço principal e 1 diferencial real.
- Não inventa URL — usa `https://exemplo.com.br` como placeholder se não tiver domínio real.
- Responda com os 4 arquivos em sequência, claramente separados por `--- ARQUIVO: nome ---`.

---

# P5 — QA
## Prompt de revisão e checklist

Você é um QA de desenvolvimento web.

**Input:** todos os arquivos do projeto

**Tarefa:** Executar o checklist abaixo e reportar PASS ou FAIL para cada item.
Para cada FAIL, descrever o problema exato e o que precisa ser corrigido.

**Checklist:**
- [ ] Todas as informações de `client.json` aparecem no HTML final
- [ ] Nenhum texto inventado ou genérico (verificar contra `client.json`)
- [ ] Cor primária e secundária de `meta.primary_color` e `meta.secondary_color` aplicadas em `tailwind.config.js`
- [ ] Logo configurado em header e favicon
- [ ] WhatsApp com link `wa.me/` clicável
- [ ] Telefone com link `tel:` clicável
- [ ] Endereço com link `maps.google.com` clicável
- [ ] Alt text em TODAS as tags `<img>`
- [ ] Meta description entre 140–160 caracteres
- [ ] Title entre 50–60 caracteres
- [ ] Schema.org LocalBusiness com nome, endereço, telefone
- [ ] Sem texto placeholder ("Lorem ipsum", "Em breve", "A definir")
- [ ] Sem console.log ou código de debug
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] Responsivo: verificar se há classes mobile (`sm:`, `md:`, `lg:`) nos componentes críticos

**Output:** tabela markdown com item, status (PASS/FAIL) e observação.
Se tudo PASS: escrever `✅ APROVADO PARA DEPLOY`.
Se algum FAIL: escrever `❌ REQUER CORREÇÃO` e listar os itens.
