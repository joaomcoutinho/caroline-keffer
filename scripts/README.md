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

## `fontes/`

Instâncias **estáticas** da Bricolage Grotesque e da Plus Jakarta Sans, que são
as duas famílias do site.

Estáticas, e não as variáveis originais, por um motivo concreto: o `sharp`
rasteriza SVG com librsvg, que só encontra fontes pelo fontconfig do sistema, e
o `FONTCONFIG_FILE` apontando para um diretório local **não** é respeitado aqui.
Testado: o texto saía em Helvetica. As variáveis também não resolvem o eixo de
peso nesse caminho, então o cabeçalho vinha sempre em Regular.

A saída é não depender do fontconfig: converter o texto em vetor com
`opentype.js`, que lê o arquivo direto e ainda devolve a métrica exata de cada
glifo — o que dá controle real sobre a quebra de linha do card.

Origem: Google Fonts (OFL). Regeneráveis com o `curl` que está no histórico do
projeto, mas ficam versionadas para o gerador não depender de rede.

## Por que o card de compartilhamento é gerado, e não desenhado à mão

Duas razões concretas, não só preferência:

- **Precisão de layout.** `opentype.js` devolve a largura real de cada glifo,
  então a quebra de linha do subhead e a largura da pílula do CTA são
  medidas, não chutadas — nunca sobra uma palavra órfã sozinha numa linha.
- **Sem emenda de cor.** A versão anterior (feita à mão) tinha uma transição
  visível onde o fundo chapado encontrava a foto escurecida — as duas cores
  quase combinavam, mas não exatamente. Aqui existe uma única cor de fundo no
  canvas inteiro, e a foto se dissolve nela por alfa (a mesma camada que
  escurece a foto também a desvanece até transparente). Sem uma segunda cor
  de fundo, não há como as duas desalinharem.
