# Cadeia de Geração

Fluxo recomendado para gerar uma nova variação deste template com dados reais de cliente.

## P1 — Dados

Leia `src/data/client.json` e confirme:

- Nome, cidade, bairro e descrição curta
- Serviços e público
- Diferenciais reais
- Contatos, redes e horários
- Fotos e depoimentos
- Cores e par tipográfico

Não complete dados ausentes por conta própria.

## P2 — Conteúdo

Escreva textos curtos, diretos e específicos.

Evite:

- "qualidade"
- "excelência"
- "soluções personalizadas"
- "atendimento diferenciado"
- "compromisso"
- frases genéricas de marketing

Prefira frases com benefício concreto e dado real do cliente.

## P3 — Montagem

Monte `src/pages/index.astro` usando os componentes existentes.

Regras:

- Omitir seções sem dados.
- Passar props explícitas.
- Manter links principais calculados por helpers de `src/lib/`.
- Não duplicar regras de formatação dentro dos componentes.

## P4 — Visual

Aplicar o DS-02 sem poluir a tela.

Checklist:

- Conteúdo confortável em mobile.
- Conteúdo não fica estreito demais em telas grandes.
- Hover elegante e consistente.
- Fundos não saltam durante animações.
- Imagens da galeria funcionam com qualquer quantidade.

## P5 — QA

Executar:

```bash
npm run build
```

Validar também:

- Hero
- Menu mobile
- Serviços
- Galeria e lightbox
- Contato
- Rodapé
- Links externos
- Console sem debug
