/**
 * Prefixo dos arquivos servidos de /public.
 *
 * No GitHub Pages o site não vive na raiz do domínio, e sim em
 * /caroline-keffer. O `basePath` do Next resolve isso sozinho para as rotas e
 * para os bundles de JS/CSS, mas NÃO para o `src` de imagem quando o
 * otimizador está desligado (`images.unoptimized`) — ali o caminho vai para o
 * HTML exatamente como foi escrito, e daria 404.
 *
 * Por isso todo caminho de /public passa por aqui. Em desenvolvimento a
 * variável não existe, o prefixo é vazio e nada muda.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function caminhoPublico(caminho: string) {
  if (!caminho) return caminho;
  // Endereço absoluto ou data URI não leva prefixo.
  if (/^(https?:)?\/\//.test(caminho) || caminho.startsWith("data:")) {
    return caminho;
  }
  return `${BASE}${caminho}`;
}
