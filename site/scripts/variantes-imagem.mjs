/**
 * VARIANTES DE IMAGEM (28/10/2026).
 *
 * O site é estático (Cloudflare Pages, sem servidor), então o otimizador do
 * Next não roda. Até aqui todo aparelho baixava a foto inteira: no celular a
 * fachada do topo levava o LCP a 7,8 s no PageSpeed. Este script gera, para
 * cada foto de public/images, uma versão WebP em cada largura que o Next pede
 * no `srcset`, e o loader em lib/imagem-loader.ts aponta para elas.
 *
 * As larguras são a união de `deviceSizes` e `imageSizes` do next.config.ts:
 * se mudar lá, muda aqui. Largura maior que a original não amplia a foto,
 * só repete a original com o nome da largura pedida.
 *
 * Saída em public/images/_v/ (espelha as pastas). Só refaz o que mudou.
 * Roda sozinho no `npm run publicar`; à mão: `node scripts/variantes-imagem.mjs`.
 */
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const LARGURAS = [96, 160, 256, 384, 480, 640, 828, 1080, 1280, 1920];

const raiz = path.resolve(import.meta.dirname, "../public/images");
const saida = path.join(raiz, "_v");

async function* fotos(pasta) {
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    const cheio = path.join(pasta, item.name);
    if (item.isDirectory()) {
      if (cheio !== saida) yield* fotos(cheio);
    } else if (/\.(webp|jpe?g|png)$/i.test(item.name)) {
      yield cheio;
    }
  }
}

let geradas = 0;
for await (const foto of fotos(raiz)) {
  const relativo = path.relative(raiz, foto).replace(/\.(webp|jpe?g|png)$/i, "");
  const { width: original } = await sharp(foto).metadata();
  const mudouEm = (await stat(foto)).mtimeMs;
  for (const largura of LARGURAS) {
    const destino = path.join(saida, `${relativo}-${largura}.webp`);
    const feito = await stat(destino).catch(() => null);
    if (feito && feito.mtimeMs >= mudouEm) continue;
    await mkdir(path.dirname(destino), { recursive: true });
    await sharp(foto)
      .resize({ width: Math.min(largura, original), withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(destino);
    geradas++;
  }
}
console.log(`variantes de imagem: ${geradas} geradas`);
