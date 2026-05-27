# template-onepage
## Esteira de Sites por IA — Jumper Studio

Template base para geração de sites One Page via IA.
Stack: Astro + Tailwind CSS. Deploy: Vercel.

---

## Estrutura

```
src/
├── components/     7 componentes fixos (não criar novos sem aprovação)
├── layouts/        Base.astro com SEO e Schema.org
├── pages/          index.astro — monta o site via client.json
├── styles/         tokens.css — DS-02 base
└── data/
    └── client.json ÚNICA FONTE DE VERDADE — preencher antes de gerar
public/
└── assets/         logo.svg + fotos do cliente
prompts/
└── cadeia-de-geracao.md  5 prompts em sequência para a IA
design-systems/
└── DS-02/          spec.md + tokens do design system
README-IA.md        instruções obrigatórias para a IA
```

---

## Fluxo de geração

1. Preencher `src/data/client.json` com dados reais do cliente
2. Copiar assets para `public/assets/`
3. Rodar os 5 prompts de `prompts/cadeia-de-geracao.md` em sequência
4. `npm run dev` para visualizar localmente
5. Checklist de QA
6. `npm run build` + deploy na Vercel

---

## Instalação

```bash
npm install
npm run dev
```

---

## Deploy na Vercel

1. Push pro GitHub
2. Importar repo na Vercel
3. Framework: Astro (auto-detectado)
4. Deploy automático a cada push na main

---

## Regras para a IA

Ver `README-IA.md` — obrigatório ler antes de qualquer alteração.
