# DS-02 — Modern Local

## Quando usar

Negócios locais com apelo visual forte e público amplo:
restaurantes, salões, barbearias, oficinas, academias, petshops, cafeterias, lojas de bairro.

**Não usar para:** advogados, contadores, clínicas médicas sérias — nesses casos, DS-01 Clean Corporate.

---

## Personalidade visual

Direto. Urbano. Confiante. Sem enrolação.
Tipografia condensada de grande impacto, contrastando com corpo clean.
Fundo escuro no hero e depoimentos cria peso e seriedade.
Cor primária é agressiva e chamativa.

---

## Tipografia

- **Display:** Barlow Condensed 700/800 — headlines, títulos de seção, nome do negócio
- **Body:** DM Sans 400/500/600 — parágrafos, labels, botões

Google Fonts, preload obrigatório.

---

## Paleta base (invariável)

| Token | Valor | Uso |
|---|---|---|
| `--color-white` | `#FFFFFF` | Fundos claros, texto sobre escuro |
| `--color-gray-50` | `#F7F7F7` | Seções alternadas (Services, Gallery) |
| `--color-gray-600` | `#5A5A5A` | Corpo de texto secundário |
| `--color-gray-800` | `#2A2A2A` | Corpo de texto principal |
| `--color-black` | `#0D0D0D` | — |
| `secondary` | client.json | Fundos escuros (hero, footer, depoimentos) |
| `primary` | client.json | Acentos, CTAs, destaques, hover |

**Regra:** primary e secondary precisam ter contraste mínimo 4.5:1 entre si (WCAG AA).

---

## Componentes e tokens

| Componente | Tokens relevantes |
|---|---|
| Botões | `rounded-btn` (0.375rem), `bg-primary`, `hover:brightness-110` |
| Cards | `rounded-card` (0.75rem), `shadow-card`, `hover:shadow-card-hover` |
| Seções | `section` (6rem padding) ou `section-sm` (4rem) |
| Container | `max-w-content` (72rem), `px-gutter` |

---

## Alternância de seções

Alternar fundos para criar ritmo:

```
Hero         → bg-secondary (escuro)
Services     → bg-gray-50 (claro)
About        → bg-white (branco)
Testimonials → bg-secondary (escuro)
Gallery      → bg-gray-50 (claro)
ContactCTA   → bg-white (branco)
Footer       → bg-secondary (escuro)
```

---

## Motion

- Hover em cards: `shadow-card` → `shadow-card-hover` + `transition-shadow duration-base`
- Hover em botões: `hover:brightness-110 hover:-translate-y-0.5`
- Hover em fotos: `hover:scale-105 transition-transform duration-slow`
- Detalhe DS-02: linha `h-1 bg-primary` crescendo no hover de cards

Sem animações de scroll (não depende de JS). Performance first.
