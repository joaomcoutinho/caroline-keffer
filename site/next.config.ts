import type { NextConfig } from "next";

/*
  O deploy é GitHub Pages, que serve arquivo estático e não roda servidor Node.
  Duas consequências, ambas tratadas aqui:

  1. `output: "export"` gera a pasta `out/` com HTML/CSS/JS prontos.
  2. Sem servidor, o otimizador de imagem do Next não existe — por isso
     `unoptimized`. As fotos já foram convertidas para WebP em ~2000px, então o
     peso total de imagem do site é de ~2 MB, e não os 66 MB dos PNGs originais.

  O `basePath` só entra no build de produção do Pages: o site vive em
  /caroline-keffer, e não na raiz do domínio. Deixá-lo ligado em
  desenvolvimento quebraria o `npm run dev` em localhost:3000.
*/
const noPages = process.env.DEPLOY_ALVO === "pages";
const base = "/caroline-keffer";

const nextConfig: NextConfig = {
  ...(noPages
    ? { output: "export", basePath: base, assetPrefix: base }
    : {}),
  images: { unoptimized: true },
  // Sem servidor não há redirect de /rota para /rota/: cada uma vira index.html.
  trailingSlash: true,
};

export default nextConfig;
