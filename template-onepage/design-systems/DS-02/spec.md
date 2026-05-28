# DS-02 — Modern Local

Design system para negócios locais com apelo visual forte e público amplo: salões, barbearias, restaurantes, academias, cafeterias, lojas e serviços de bairro.

## Direção

Direto, urbano, confiante e premium sem exagero. A página deve vender clareza, presença e confiança, com leitura rápida e alto contraste.

## Tipografia

- Display: `Anton`
- Corpo: `DM Sans`
- Pares alternativos são definidos por `meta.font_pair` em `client.json`.
- Evitar animações ou hovers que mudem a rasterização da fonte.

## Paleta

| Token | Uso |
| --- | --- |
| `primary` | CTAs, detalhes, seção de contato |
| `secondary` | Hero, rodapé, blocos escuros |
| `cream` | Fundos claros e texto sobre escuro |
| `line` | Divisórias |
| `smoke` | Texto secundário |

As cores do cliente entram em `tailwind.config.js`, mas precisam preservar contraste e legibilidade.

## Layout

- Usar `.site-shell` para largura principal do conteúdo.
- Em telas largas, evitar conteúdo excessivamente centralizado.
- Hero deve manter texto com margens laterais confortáveis.
- Seções devem alternar peso visual: escuro, claro, escuro, contato forte.
- Cards e imagens usam raio de borda consistente.

## Componentes

| Componente | Papel |
| --- | --- |
| Hero | Impacto inicial, navegação e CTA |
| Marquee | Reforço de serviços/localização |
| Services | Clareza da oferta |
| About | Contexto e diferenciais |
| SocialProof | Prova social flexível |
| Gallery | Imagens variáveis com lightbox |
| ContactCTA | Conversão e informações práticas |
| Footer | Fechamento institucional |

## Motion

- Fundos de seção fazem apenas fade.
- Elementos internos podem revelar em scroll.
- Revelações devem repetir ao rolar novamente de cima para baixo.
- Sem blur pesado em fundos.
- Respeitar `prefers-reduced-motion`.

## Estados de Interação

- Botões: hover visível, com texto e ícone nítidos.
- Links de menu: linha elegante, sem pill.
- Serviços: hover presente, mas sem contraste agressivo demais.
- Galeria: cursor visual textual "Ampliar" e lightbox centralizado.
