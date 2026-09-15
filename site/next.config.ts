import { networkInterfaces } from "node:os";
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

/*
  Só vale no `npm run dev`. O Next bloqueia (403) os scripts de desenvolvimento
  quando a página é aberta por um endereço diferente de `localhost`, e aí o site
  abre no celular sem hidratar: nada de faixa em loop, FAQ ou galeria. Liberar
  os IPs da PRÓPRIA máquina deixa testar pelo celular na mesma rede Wi-Fi com
  `http://<ip-do-mac>:3000`, sem fixar um IP que muda de rede para rede.
*/
const ipsDaMaquina = Object.values(networkInterfaces())
  .flat()
  .filter((i) => i && i.family === "IPv4")
  .map((i) => i!.address);
const base = "/caroline-keffer";

const nextConfig: NextConfig = {
  ...(noPages
    ? { output: "export", basePath: base, assetPrefix: base }
    : {}),
  allowedDevOrigins: ipsDaMaquina,
  images: { unoptimized: true },
  // Sem servidor não há redirect de /rota para /rota/: cada uma vira index.html.
  trailingSlash: true,
};

export default nextConfig;
