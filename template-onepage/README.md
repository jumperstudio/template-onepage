# Template One Page

Template Astro para sites institucionais de uma página da esteira Jumper.
O projeto foi pensado para receber dados de um cliente, montar uma página completa e manter o visual consistente entre desktop e mobile.

## Stack

- Astro 4
- Tailwind CSS
- CSS global em `src/styles/tokens.css`
- Animações com GSAP, ScrollTrigger e Lenis
- Fontes auto-hospedadas via Fontsource

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

O desenvolvimento local usa, por padrão, `http://localhost:4321/`.

## Estrutura

```text
src/
  components/      Seções visuais da landing page
  data/            Dados do cliente
  layouts/         HTML base, SEO e schema
  lib/             Helpers reutilizáveis
  pages/           Composição da página
  scripts/         Interações e animações
  styles/          Tokens, base visual e estilos de componentes

public/
  icons/           Ícones e assets fixos do template
  assets/          Espaço para assets enviados pelo cliente

design-systems/    Especificações visuais do template
prompts/           Fluxo de geração assistida por IA
```

## Fonte de Dados

`src/data/client.json` é a fonte principal de conteúdo. Antes de alterar texto fixo em componentes, confira se o dado deveria vir desse arquivo.

Campos vazios devem gerar omissão elegante da informação, não placeholders. Exemplos: sem Instagram, não renderizar link; sem depoimentos, não renderizar seção de depoimentos.

## Componentes

- `Hero.astro`: primeira dobra, navegação e CTA principal
- `Marquee.astro`: esteira de serviços/localização
- `Services.astro`: serviços do cliente
- `About.astro`: posicionamento e diferenciais
- `SocialProof.astro`: depoimentos, números, processo ou FAQ
- `Testimonials.astro`: versão legada de depoimentos
- `Gallery.astro`: mosaico e lightbox
- `ContactCTA.astro`: contato, canais e funcionamento
- `Footer.astro`: rodapé institucional

## Padrões de Código

- Reutilize helpers de `src/lib/` para links, formatação e regras compartilhadas.
- Mantenha componentes focados em renderização.
- Não deixe `console.log`, código morto ou trechos temporários.
- Preserve acessibilidade em links, imagens, botões e lightbox.
- Valide responsividade em mobile, tablet e desktop largo.

## Checklist Antes de Entregar

- `npm run build` passa sem erro.
- Página abre em `localhost:4321`.
- Textos continuam legíveis em 375px, 768px, 1280px e telas largas.
- Galeria funciona com quantidades variáveis de imagens.
- Links de telefone, WhatsApp, e-mail, Maps e Instagram estão corretos.
- Animações não deslocam fundos de seção nem criam faixas visuais.
