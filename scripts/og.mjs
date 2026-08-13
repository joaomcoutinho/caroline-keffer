// Gera site/public/og.png (1200x630), o card de compartilhamento.
//
// Duas decisões de arquitetura, e o porquê de cada uma:
//
// 1. TEXTO VIRA VETOR, nunca <text> de SVG. O sharp rasteriza SVG com
//    librsvg, que só encontra fontes pelo fontconfig do SISTEMA — um
//    FONTCONFIG_FILE apontando pra um diretório local não é respeitado aqui
//    (testado: o texto saía em Helvetica). A saída é opentype.js: ele lê o
//    arquivo da fonte direto e devolve o caminho vetorial de cada glifo, sem
//    depender de fonte nenhuma instalada.
//
// 2. UMA COR DE FUNDO SÓ. A versão anterior tinha uma emenda visível onde o
//    retângulo de fundo encontrava a foto escurecida — as duas camadas de cor
//    quase combinavam, mas não exatamente. Aqui o fundo é um retângulo chapado
//    de --surface, e a foto se dissolve nele por ALFA: a mesma camada que
//    escurece a foto também desvanece pra transparente na borda esquerda. Sem
//    uma segunda cor de fundo, não existe emenda pra desalinhar.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ_SITE = path.resolve(AQUI, "../site");

const W = 1200;
const H = 630;

// Tokens do tema escuro (globals.css) — o mesmo escuro que o site usa, não
// uma paleta inventada para o card.
const COR = {
  fundo: "#0b2129",
  headline: "#eef3f3",
  subhead: "#c6d6da",
  eyebrow: "#a8d6e8",
  ctaFundo: "#7ec0dc",
  ctaTexto: "#07222c",
};

const bricolage800 = opentype.loadSync(path.join(AQUI, "fontes/bricolage-800.ttf"));
const jakarta400 = opentype.loadSync(path.join(AQUI, "fontes/jakarta-400.ttf"));
const jakarta600 = opentype.loadSync(path.join(AQUI, "fontes/jakarta-600.ttf"));

/** Caminho vetorial de uma linha inteira, com kerning nativo da fonte. */
function linha(font, texto, x, y, tamanho) {
  return font.getPath(texto, x, y, tamanho).toPathData(2);
}

/** Largura de uma linha, sem desenhar — para centralizar ou quebrar. */
function largura(font, texto, tamanho) {
  return font.getAdvanceWidth(texto, tamanho);
}

/**
 * Rastreamento manual (letter-spacing), glifo a glifo. `font.getPath` não
 * aceita tracking nativo, então aqui a posição de cada caractere é calculada
 * à mão. Só vale a pena para textos curtos em caixa alta (o eyebrow); textos
 * longos usam `linha()`, que preserva kerning de verdade.
 */
function linhaRastreada(font, texto, x, y, tamanho, trackingPx) {
  let cursor = x;
  let d = "";
  for (const ch of texto) {
    d += font.getPath(ch, cursor, y, tamanho).toPathData(2) + " ";
    cursor += font.getAdvanceWidth(ch, tamanho) + trackingPx;
  }
  return { d, largura: cursor - x - trackingPx };
}

/** Quebra gulosa por largura máxima. Sem hifenização: se uma palavra não coubesse
 * sozinha isso quebraria o layout, mas todo o vocabulário aqui é curto. */
function quebrar(font, texto, tamanho, maxLargura) {
  const palavras = texto.split(" ");
  const linhas = [];
  let atual = "";
  for (const palavra of palavras) {
    const candidata = atual ? `${atual} ${palavra}` : palavra;
    if (largura(font, candidata, tamanho) > maxLargura && atual) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = candidata;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

// ---------------------------------------------------------------------------
// 1. Fundo + foto, 100% raster (sharp).
// ---------------------------------------------------------------------------

const LARGURA_FOTO = 620;
const X_FOTO = W - LARGURA_FOTO;
const LARGURA_PENUMBRA = 320; // trecho da foto que desvanece até transparente

const mascaraAlfa = Buffer.from(`
  <svg width="${LARGURA_FOTO}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity="0" />
        <stop offset="${(LARGURA_PENUMBRA / LARGURA_FOTO).toFixed(4)}" stop-color="#000" stop-opacity="1" />
        <stop offset="1" stop-color="#000" stop-opacity="1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#fade)" />
  </svg>
`);

const fotoRecortada = await sharp(path.join(RAIZ_SITE, "public/images/foto_background_hero.webp"))
  .resize({ width: LARGURA_FOTO, height: H, fit: "cover", position: "top" })
  .toBuffer();

// O escurecimento é aplicado ANTES da máscara de alfa, então tinta e foto
// desvanecem juntas — não há uma segunda camada com borda própria.
const fotoEscurecida = await sharp(fotoRecortada)
  .composite([
    {
      input: Buffer.from(
        `<svg width="${LARGURA_FOTO}" height="${H}"><rect width="100%" height="100%" fill="${COR.fundo}" fill-opacity="0.55"/></svg>`,
      ),
      blend: "atop",
    },
  ])
  .toBuffer();

const fotoComAlfa = await sharp(fotoEscurecida)
  .composite([{ input: mascaraAlfa, blend: "dest-in" }])
  .png()
  .toBuffer();

const base = await sharp({
  create: { width: W, height: H, channels: 4, background: COR.fundo },
})
  .composite([{ input: fotoComAlfa, left: X_FOTO, top: 0 }])
  .png()
  .toBuffer();

// ---------------------------------------------------------------------------
// 2. Selo da clínica, circular, raster.
// ---------------------------------------------------------------------------

const DIAMETRO_SELO = 64;
const X_SELO = 72;
const Y_SELO = 56;

const mascaraCirculo = Buffer.from(
  `<svg width="${DIAMETRO_SELO}" height="${DIAMETRO_SELO}"><circle cx="${DIAMETRO_SELO / 2}" cy="${DIAMETRO_SELO / 2}" r="${DIAMETRO_SELO / 2}" fill="#fff"/></svg>`,
);

const seloRedondo = await sharp(path.join(RAIZ_SITE, "public/images/logo-caroline-keffer.jpg"))
  .resize(DIAMETRO_SELO, DIAMETRO_SELO)
  .composite([{ input: mascaraCirculo, blend: "dest-in" }])
  .png()
  .toBuffer();

const comSelo = await sharp(base)
  .composite([{ input: seloRedondo, left: X_SELO, top: Y_SELO }])
  .png()
  .toBuffer();

// ---------------------------------------------------------------------------
// 3. Texto e CTA, 100% vetor (opentype.js → SVG → sharp).
// ---------------------------------------------------------------------------

const X_TEXTO = 72;
// A foto só fica opaca a partir de X_FOTO + LARGURA_PENUMBRA (=900px); até lá
// ela está em transição. O texto pode ir bem além dos 500px conservadores do
// primeiro rascunho sem colidir com nada visível.
const MAX_LARGURA_TEXTO = 680;

const wordmark = linha(jakarta600, "Caroline Keffer", X_SELO + DIAMETRO_SELO + 20, Y_SELO + 28, 26);
const eyebrow = linhaRastreada(
  jakarta600,
  "CLÍNICA VETERINÁRIA · TORRE, RECIFE",
  X_SELO + DIAMETRO_SELO + 20,
  Y_SELO + 52,
  14,
  1.4,
);

const headlineLinha1 = linha(bricolage800, "A mesma veterinária,", X_TEXTO, 300, 64);
const headlineLinha2 = linha(bricolage800, "há mais de 20 anos.", X_TEXTO, 374, 64);

const SUBHEAD_Y_INICIO = 428;
const SUBHEAD_ALTURA_LINHA = 38;

const subheadTexto =
  "Consulta, cirurgia e exames para cão e gato, sempre com a Dra. Carol.";
const subheadLinhas = quebrar(jakarta400, subheadTexto, 30, MAX_LARGURA_TEXTO);
const subheadPaths = subheadLinhas
  .map((texto, i) => linha(jakarta400, texto, X_TEXTO, SUBHEAD_Y_INICIO + i * SUBHEAD_ALTURA_LINHA, 30))
  .join(" ");

// CTA: pílula chapada, mesma cor de ação do botão real do site no tema
// escuro. Texto centralizado por medição real da largura do glifo.
// A posição Y segue o número de linhas do subhead: se a copy mudar de tamanho
// amanhã, o botão não fica colado nem flutuando longe do texto.
const CTA_TEXTO = "Agendar pelo WhatsApp";
const CTA_TAMANHO_FONTE = 28;
const ctaLarguraTexto = largura(jakarta600, CTA_TEXTO, CTA_TAMANHO_FONTE);
const CTA_PAD_X = 44;
const ctaLarguraPilula = ctaLarguraTexto + CTA_PAD_X * 2;
const CTA_ALTURA = 68;
const CTA_X = X_TEXTO;
const CTA_Y =
  SUBHEAD_Y_INICIO + subheadLinhas.length * SUBHEAD_ALTURA_LINHA - 12;
const ctaTextoPath = linha(
  jakarta600,
  CTA_TEXTO,
  CTA_X + CTA_PAD_X,
  CTA_Y + CTA_ALTURA / 2 + CTA_TAMANHO_FONTE * 0.36,
  CTA_TAMANHO_FONTE,
);

const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <path d="${wordmark}" fill="${COR.headline}" />
  <path d="${eyebrow.d}" fill="${COR.eyebrow}" />
  <path d="${headlineLinha1}" fill="${COR.headline}" />
  <path d="${headlineLinha2}" fill="${COR.headline}" />
  <path d="${subheadPaths}" fill="${COR.subhead}" />
  <rect x="${CTA_X}" y="${CTA_Y}" width="${ctaLarguraPilula}" height="${CTA_ALTURA}" rx="${CTA_ALTURA / 2}" fill="${COR.ctaFundo}" />
  <path d="${ctaTextoPath}" fill="${COR.ctaTexto}" />
</svg>
`;

const final = await sharp(comSelo)
  .composite([{ input: Buffer.from(overlaySvg) }])
  .png()
  .toBuffer();

const destino = path.join(RAIZ_SITE, "public/og.png");
writeFileSync(destino, final);
console.log(`og.png gerado: ${destino}`);
