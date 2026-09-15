# scripts

Ferramentas de build de **assets**. Ficam fora de `site/` de propósito: nada
daqui entra no bundle, e o site não depende de nenhuma delas para rodar.

## Uso

```bash
cd scripts
npm install   # primeira vez
npm run og    # regenera site/public/og.png
```

Depois de rodar, o build do site (`cd ../site && npm run build`) copia o novo
`og.png` para `out/` automaticamente — é `public/`, não precisa de outro passo.

## Como o `og.png` é gerado (15/09/2026)

O `og.mjs` monta o card em HTML e fotografa com o **Google Chrome** headless
(DevTools Protocol). Precisa do Chrome instalado (ou `CHROME_PATH`) e de rede
para as fontes do Google Fonts.

Antes era `sharp` + `opentype.js` com TTFs estáticos da Bricolage e da Jakarta,
que eram as fontes do site. O site passou para Nunito e Nunito Sans, e a Nunito
é variável: o `opentype.js` não resolve o eixo de peso. No Chrome a tipografia,
a quebra de linha e o kerning saem iguais aos do site.

A pasta `fontes/` ficou só como histórico do gerador anterior.

## Por que o card de compartilhamento é gerado, e não desenhado à mão

Duas razões concretas, não só preferência:

- **Precisão de layout.** O card sai do mesmo motor de texto do site (hoje o
  Chrome, com `text-wrap: balance`), então a quebra de linha é medida, não
  chutada, e nunca sobra uma palavra órfã sozinha numa linha.
- **Sem emenda de cor.** A versão anterior (feita à mão) tinha uma transição
  visível onde o fundo chapado encontrava a foto escurecida — as duas cores
  quase combinavam, mas não exatamente. Aqui existe uma única cor de fundo no
  canvas inteiro, e a foto se dissolve nela por alfa (a mesma camada que
  escurece a foto também a desvanece até transparente). Sem uma segunda cor
  de fundo, não há como as duas desalinharem.
