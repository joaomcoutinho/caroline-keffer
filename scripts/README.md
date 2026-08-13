# scripts

Ferramentas de build de **assets**. Ficam fora de `site/` de propósito: nada
daqui entra no bundle, e o site não depende de nenhuma delas para rodar.

## Estado atual

⚠️ **Em construção.** As fontes já estão resolvidas; o gerador do card de
compartilhamento (`og.mjs`) ainda não foi escrito. Por isso não há `scripts` no
`package.json`: anunciar um comando que falha é pior que não anunciar.

O `og.png` que está no ar hoje foi gerado à mão, numa sans genérica. Trocar por
este caminho é justamente o que falta.

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

No WhatsApp, que é por onde este site mais circula, a prévia aparece com cerca
de 300px de largura. Um canvas de 1200px é visto a ~27%: tudo abaixo de ~40px
no original simplesmente some. Gerar por código é o que permite verificar essa
restrição em vez de confiar no olho.
