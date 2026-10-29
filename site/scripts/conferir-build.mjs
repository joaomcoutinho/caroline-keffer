/**
 * Trava do build antes de publicar (29/10/2026). Se algo aqui falhar, o
 * `npm run publicar` para ANTES do deploy.
 *
 * 1. Regra crítica de indexação (seo-mxc 1.107): no build do domínio, toda
 *    página sai indexável com canônica no domínio, a 404 sai com noindex e o
 *    robots.txt libera tudo. Um `NEXT_PUBLIC_SITE_APROVADO` esquecido tiraria o
 *    site do Google sem ninguém ver.
 * 2. Palavras proibidas do nicho (seo-mxc 1.102): publicidade veterinária não
 *    anuncia preço, desconto ou brinde, nem promete resultado ou se diz "a
 *    melhor" (CFMV). A lista é de frases fortes; "sem dor" num exame e "não
 *    tem cura" num texto de saúde continuam permitidos.
 *
 * Uso: node scripts/conferir-build.mjs [pasta do build] [domínio]
 */
import fs from "node:fs";
import path from "node:path";

const pasta = process.argv[2] ?? "out";
const dominio = process.argv[3] ?? "https://clinicacarolinekeffer.com.br";

const proibidas = [
  /resultado garantido/i,
  /garantimos/i,
  /cura garantida|garantia de cura/i,
  /\bo melhor veterin/i,
  /\ba melhor (clínica|veterin)/i,
  /melhor clínica (veterinária )?(de|do|da) /i,
  /R\$\s?\d/,
  /\bdesconto/i,
  /\bpromoção\b/i,
  /\bgrátis\b|consulta gratuita/i,
];

function paginas(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return paginas(p);
    return e.name === "index.html" ? [p] : [];
  });
}

const erros = [];
const textoVisivel = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

const todas = paginas(pasta);
for (const arquivo of todas) {
  const rota = "/" + path.relative(pasta, path.dirname(arquivo)).replace(/\\/g, "/");
  const html = fs.readFileSync(arquivo, "utf8");
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);
  const ehErro = rota === "/404" || rota === "/_not-found";

  if (ehErro) {
    if (!robots.some((r) => r.includes("noindex"))) erros.push(`${rota}: página de erro sem noindex`);
    if (robots.some((r) => /(^|,\s*)index/.test(r))) erros.push(`${rota}: página de erro com "index"`);
  } else {
    if (robots.some((r) => r.includes("noindex"))) erros.push(`${rota}: noindex numa página do site`);
    const canonica = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonica?.startsWith(dominio)) erros.push(`${rota}: canônica fora do domínio (${canonica ?? "sem canônica"})`);
  }

  const texto = textoVisivel(html);
  for (const re of proibidas) {
    const achou = texto.match(new RegExp(`.{0,40}${re.source}.{0,40}`, re.flags));
    if (achou) erros.push(`${rota}: palavra proibida (${re.source}): "…${achou[0].trim()}…"`);
  }
}

const robotsTxt = fs.readFileSync(path.join(pasta, "robots.txt"), "utf8");
if (!/Allow:\s*\/\s*$/m.test(robotsTxt) || /Disallow:\s*\/\s*$/m.test(robotsTxt)) {
  erros.push("robots.txt não libera o site inteiro");
}
if (!robotsTxt.includes(`${dominio}/sitemap.xml`)) erros.push("robots.txt sem o mapa do site no domínio");

if (erros.length) {
  console.error(`✖ conferir-build: ${erros.length} problema(s), deploy cancelado`);
  for (const e of erros) console.error("  - " + e);
  process.exit(1);
}
console.log(`✔ conferir-build: ${todas.length} páginas, indexação e palavras do nicho ok`);
