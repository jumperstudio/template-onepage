# README-IA — Template One Page
## Leia este arquivo inteiro antes de qualquer ação

---

## O que você está fazendo

Você está gerando um site institucional para um cliente real.
Toda informação do cliente está em `/src/data/client.json`.
Você **não inventa, não complementa, não supõe** nenhum dado além do que está nesse arquivo.

---

## Regras absolutas

1. **Fonte única de verdade:** tudo vem de `client.json`. Campo vazio = seção omitida. Jamais invente nome, serviço, telefone, depoimento, horário ou diferencial.

2. **Componentes em allowlist:** você usa APENAS estes 7 componentes:
   - `Hero` — obrigatório
   - `Services` — obrigatório se houver serviços
   - `About` — obrigatório
   - `Testimonials` — obrigatório se houver depoimentos
   - `Gallery` — opcional, só se houver ≥ 2 fotos
   - `ContactCTA` — obrigatório
   - `Footer` — obrigatório
   
   **Proibido criar componentes novos sem aprovação humana.**

3. **Tailwind:** você altera APENAS `theme.extend.colors.primary` e `theme.extend.colors.secondary` em `tailwind.config.js`. **Nada mais.**

4. **Estrutura de pastas:** não cria, não move, não renomeia arquivos. Trabalha dentro da estrutura existente.

5. **Copy:** tom direto, afirmativo, sem clichê de marketing. Proibido usar: "qualidade", "excelência", "soluções personalizadas", "atendimento diferenciado", "comprometido", "apaixonado". Use os diferenciais reais do `client.json`.

6. **Código:** sem comentários desnecessários. Sem console.log. Sem código morto. Sem bibliotecas externas além do que está no `package.json`.

7. **Responsividade:** todos os componentes devem funcionar em 375px, 768px e 1280px. Teste os breakpoints.

8. **Acessibilidade:** imagens com `alt` descritivo. Links com texto legível. Contraste mínimo WCAG AA.

---

## Ordem de execução (cadeia de 5 prompts)

Execute nessa ordem. Não pule etapas.

```
P1 — Copy    → lê client.json → gera content.json
P2 — Layout  → lê client.json + content.json → preenche pages/index.astro
P3 — Estilo  → aplica cores em tailwind.config.js
P4 — SEO     → configura meta tags em layouts/Base.astro + gera sitemap
P5 — QA      → checklist programático + visual
```

---

## Estrutura de arquivos

```
src/
├── components/     # NÃO CRIAR novos componentes
│   ├── Hero.astro
│   ├── Services.astro
│   ├── About.astro
│   ├── Testimonials.astro
│   ├── Gallery.astro
│   ├── ContactCTA.astro
│   └── Footer.astro
├── layouts/
│   └── Base.astro  # meta tags, schema.org
├── pages/
│   └── index.astro # página principal — monta tudo
├── styles/
│   └── tokens.css  # NÃO ALTERAR
└── data/
    └── client.json # FONTE ÚNICA DE VERDADE
```

---

## O que fazer se um campo estiver vazio

| Campo vazio | Comportamento |
|---|---|
| `photos` com menos de 2 | Omite Gallery |
| `testimonials` vazio | Omite Testimonials |
| `social.instagram` vazio | Omite link do Instagram |
| `address` vazio | Omite endereço e link do Maps |
| `founded` vazio | Omite badge de anos de experiência |

**Nunca colocar texto placeholder como "Em breve", "A definir", "Lorem ipsum".**

---

## Checklist antes de marcar como concluído

- [ ] Todas as informações de `client.json` aparecem no site
- [ ] Nenhum texto inventado ou genérico
- [ ] Cor primária e secundária aplicadas
- [ ] Logo configurado (`/assets/logo.svg`)
- [ ] WhatsApp/telefone clicáveis
- [ ] Endereço com link do Google Maps
- [ ] Alt text em todas as imagens
- [ ] Meta description entre 140–160 caracteres
- [ ] Title entre 50–60 caracteres
- [ ] Schema.org LocalBusiness configurado
- [ ] Responsivo em 375px, 768px, 1280px
- [ ] Zero console errors
