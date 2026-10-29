/**
 * Loader do next/image para o site estático (28/10/2026).
 *
 * Troca `/images/pasta/foto.webp` pela variante WebP na largura que o
 * `srcset` pede, gerada por scripts/variantes-imagem.mjs em
 * /images/_v/pasta/foto-<largura>.webp. Assim o celular baixa a foto no
 * tamanho da tela, e não a de 1280 px.
 *
 * Só mexe no que mora em /images; endereço de fora e SVG passam direto.
 * O `src` já chega com o prefixo de `caminhoPublico`, e ele é mantido.
 */
export default function imagemLoader({ src, width }: { src: string; width: number }) {
  const achado = src.match(/^(.*?\/images\/)(?!_v\/)(.+)\.(webp|jpe?g|png)$/i);
  if (!achado) return src;
  const [, base, nome] = achado;
  return `${base}_v/${nome}-${width}.webp`;
}
