# README-IA — Template One Page

Este arquivo orienta alterações assistidas por IA neste template.
Leia antes de mudar estrutura, copy, design system ou comportamento.

## Objetivo

Gerar e ajustar sites one page para pequenos negócios locais, mantendo consistência visual e rapidez de produção.

Toda informação do cliente deve partir de `src/data/client.json`.
Quando um campo estiver vazio, a interface deve omitir o bloco correspondente de forma limpa.

## Regras Essenciais

1. Não inventar dados do cliente.
2. Não inserir placeholders como "Em breve", "A definir" ou "Lorem ipsum".
3. Preservar o design system DS-02 salvo pedido explícito de mudança.
4. Evitar refactors amplos durante ajustes visuais pontuais.
5. Manter os componentes existentes sempre que possível.
6. Não adicionar bibliotecas sem necessidade real.
7. Não deixar logs de debug, código morto ou comentários temporários.
8. Validar build depois de mudanças em código.

## Componentes Permitidos

- `Hero`
- `Marquee`
- `Services`
- `About`
- `Testimonials`
- `Gallery`
- `ContactCTA`
- `Footer`

Novos componentes podem ser criados quando reduzirem complexidade real ou isolarem uma responsabilidade clara.

## Dados e Omissões

| Dado ausente | Comportamento esperado |
| --- | --- |
| `services` vazio | Omitir seção de serviços |
| `assets.testimonials` vazio | Omitir depoimentos |
| `assets.photos` vazio | Omitir galeria |
| `contact.social.instagram` vazio | Omitir Instagram |
| `contact.address` vazio | Omitir endereço e Maps |
| `contact.hours` vazio | Omitir funcionamento |

## Padrões Visuais

- Interface direta, urbana e sofisticada.
- Tipografia display forte, com corpo limpo e legível.
- Botões com hover perceptível, elegante e sem perda de nitidez.
- Cards com raio de borda padronizado.
- Fundos de seção não devem se mover em transições de scroll.
- Animações de entrada devem acontecer ao descer a página e resetar de forma discreta ao subir.

## QA Obrigatório

- `npm run build`
- Conferir página local em `http://localhost:4321/`
- Testar navegação mobile
- Testar lightbox da galeria
- Testar links externos com `rel="noopener"`
- Conferir console sem logs de debug
