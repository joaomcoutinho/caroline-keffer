// Gera site/public/og.jpg (1200x630), o card de compartilhamento.
//
// 07/10/2026: o card é o hero em miniatura (fundo claro, Fraunces e a pata de
// fotos reais). Ver o comentário de COMPOSIÇÃO abaixo.
//
// POR QUE CHROME, E NÃO MAIS SHARP + OPENTYPE. O gerador anterior convertia o
// texto em vetor com opentype.js a partir de TTFs estáticos da Bricolage e da
// Jakarta, que eram as fontes do site. O site hoje usa Nunito e Nunito Sans, e
// a Nunito é variável: o opentype.js não resolve o eixo de peso, então o título
// sairia em Regular. (Hoje o título é a Fraunces, também variável, com o eixo
// SOFT.) Renderizar HTML no Chrome resolve fonte variável, quebra de
// linha e kerning do mesmo jeito que o site, com a MESMA tipografia.
//
// Precisa do Google Chrome instalado (caminho em CHROME, ou a variável de
// ambiente CHROME_PATH) e de rede para baixar as fontes do Google Fonts.
//
// Uso: cd scripts && npm run og

import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ_SITE = path.resolve(AQUI, "../site");
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORTA = 9444;
const W = 1200;
const H = 630;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

const base64 = (arquivo) => readFileSync(path.join(RAIZ_SITE, arquivo)).toString("base64");
const img = (arquivo) => `data:image/${arquivo.endsWith(".jpg") ? "jpeg" : "webp"};base64,${base64(`public${arquivo}`)}`;

/*
  COMPOSIÇÃO (07/10/2026, JM: "algo mais autêntico, bonito e atrativo, de
  acordo com o design do site"). O card anterior era uma foto escura com
  pílulas e um botão de WhatsApp desenhado — que no WhatsApp não clica.

  Agora ele é o HERO do site em miniatura: fundo azul-claro da marca, título
  na Fraunces (o clone livre da Recoleta, com o eixo SOFT no máximo) e, à
  direita, a PATA montada com fotos reais — a fachada na almofada e a equipe
  nos dedos, com o coração do logo no canto. Mesma geometria e mesmos
  recortes do hero no celular (`.hero-palco` em globals.css).
*/
const fachada = img("/images/fachada_ceu.webp");
const selo = img("/images/logo-caroline-keffer.jpg");
// [arquivo, object-position, zoom, origem] — os quatro dedos do hero, na ordem.
const DEDOS = [
  ["/images/servico_especialista.webp", "60% 12%", 1, "50% 50%"],
  ["/images/dra/dra-carol-lulu.webp", "45% 45%", 1, "50% 50%"],
  ["/images/galeria/atendimento-03.webp", "50% 32%", 1, "50% 50%"],
  ["/images/dra/dra-carol-persa.webp", "50% 30%", 1.35, "55% 35%"],
];
// Posição de cada dedo no palco (em %), igual a `.hero-dedo:nth-of-type(n)`.
const GEOMETRIA = [
  [-24, 0, 21.79, 24.29, 26.92],
  [-8, 21.43, 1.28, 25.71, 28.85],
  [8, 52.86, 1.28, 25.71, 28.85],
  [24, 75.71, 21.79, 24.29, 26.92],
];
// [x, y, tamanho, giro, opacidade] — patinhas de fundo, longe do texto.
const PATAS = [
  [560, 40, 34, 18, 0.1],
  [600, 520, 44, -14, 0.08],
  [40, 560, 30, 22, 0.08],
  [470, 470, 26, -30, 0.07],
  [1130, 560, 36, 10, 0.08],
];
const pata = `<ellipse cx="20" cy="27" rx="10" ry="8.5"/><ellipse cx="8" cy="17" rx="4" ry="5" transform="rotate(-20 8 17)"/><ellipse cx="15.5" cy="9.5" rx="4" ry="5.2"/><ellipse cx="24.5" cy="9.5" rx="4" ry="5.2"/><ellipse cx="32" cy="17" rx="4" ry="5" transform="rotate(20 32 17)"/>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,600..800,0..100&family=Nunito+Sans:wght@400;600;700&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    position: relative;
    font-family: "Nunito Sans", sans-serif;
    color: #081c24;
    background:
      radial-gradient(70% 90% at 80% 55%, #e3f1f8 0%, rgba(227, 241, 248, 0) 70%),
      linear-gradient(160deg, #d6ebf5 0%, #cce4f0 55%, #bcdbea 100%);
  }
  .pata { position: absolute; fill: #1f6e88; }
  .copy { position: absolute; left: 72px; top: 56px; bottom: 56px; width: 560px; display: flex; flex-direction: column; }
  .marca { display: flex; align-items: center; gap: 16px; }
  .marca img { width: 60px; height: 60px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 10px 22px -14px rgba(4, 30, 40, 0.6); }
  .marca b { display: block; font-weight: 700; font-size: 22px; line-height: 1.15; }
  .marca span { display: block; margin-top: 3px; font-size: 15px; font-weight: 600; color: #3d5a66; }
  .corpo { margin-top: auto; }
  h1 {
    font-family: "Fraunces", serif; font-variation-settings: "SOFT" 100, "opsz" 96;
    font-weight: 700; font-size: 62px; line-height: 1.04; letter-spacing: -0.015em; color: #081c24;
  }
  h1 em { font-style: normal; color: #2e7a94; }
  .sub { margin-top: 22px; font-size: 22px; line-height: 1.45; color: #2c4752; max-width: 520px; text-wrap: balance; }
  .prova { margin-top: auto; display: flex; align-items: center; gap: 14px; font-size: 18px; font-weight: 700; color: #1d5a70; }
  .prova i { width: 5px; height: 5px; border-radius: 50%; background: #1d5a70; opacity: 0.5; }
  .estrela { color: #e0a426; }

  /* A pata: palco 700x780 do hero, aqui com 545px de altura. */
  .palco { position: absolute; right: 64px; top: 46px; width: 489px; height: 545px; }
  .janela, .dedo { position: absolute; overflow: hidden; border: 5px solid rgba(255, 255, 255, 0.95); box-shadow: 0 26px 48px -26px rgba(4, 30, 40, 0.7); }
  .janela { left: 14.3%; top: 40.1%; width: 71.4%; height: 56.9%; border-radius: 50% 50% 40% 40% / 64% 64% 36% 36%; }
  .janela img { width: 100%; height: 100%; object-fit: cover; object-position: center 42%; transform: scale(1.16); transform-origin: 28% 45%; }
  .dedo { border-radius: 50%; }
  .dedo img { width: 100%; height: 100%; object-fit: cover; }
  .coracao { position: absolute; right: 19%; bottom: 7%; width: 9%; filter: drop-shadow(0 6px 10px rgba(4, 30, 40, 0.45)); }
</style></head><body>
  ${PATAS.map((p) => `<svg class="pata" viewBox="0 0 40 40" style="left:${p[0]}px;top:${p[1]}px;width:${p[2]}px;transform:rotate(${p[3]}deg);opacity:${p[4]}">${pata}</svg>`).join("")}
  <div class="copy">
    <div class="marca">
      <img src="${selo}" alt="">
      <div><b>Clínica Pet Caroline Keffer</b><span>Veterinária na Torre, Recife</span></div>
    </div>
    <div class="corpo">
      <h1>Tudo para seu pet, onde ele se sente <em>em&nbsp;casa.</em></h1>
      <p class="sub">Clínica geral, cirurgia, especialidades, exames e banho e tosa, com a Dra.&nbsp;Carol.</p>
    </div>
    <div class="prova" style="margin-top:34px"><span><span class="estrela">★</span> 4,8 no Google</span><i></i><span>Há mais de 20 anos na Torre</span></div>
  </div>
  <div class="palco">
    ${DEDOS.map((d, i) => {
      const [giro, x, y, w, h] = GEOMETRIA[i];
      return `<div class="dedo" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;transform:rotate(${giro}deg)"><img src="${img(d[0])}" style="object-position:${d[1]};transform:scale(${d[2]});transform-origin:${d[3]}"></div>`;
    }).join("")}
    <div class="janela"><img src="${fachada}"></div>
    <svg class="coracao" viewBox="0 0 32 30"><path d="M16 28 C 5 20, 1 13, 3 7.5 C 5 2.5, 11.5 1.8, 16 7 C 20.5 1.8, 27 2.5, 29 7.5 C 31 13, 27 20, 16 28 Z" fill="#e2463f" stroke="#ffffff" stroke-width="2.5"/></svg>
  </div>
</body></html>`;

const pasta = mkdtempSync(path.join(tmpdir(), "og-"));
const arquivoHtml = path.join(pasta, "og.html");
writeFileSync(arquivoHtml, html);

const chrome = spawn(
  CHROME,
  ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${PORTA}`, `--user-data-dir=${pasta}/perfil`, "about:blank"],
  { stdio: "ignore" },
);

try {
  let alvo;
  for (let i = 0; i < 40 && !alvo; i++) {
    await esperar(250);
    try {
      alvo = (await (await fetch(`http://127.0.0.1:${PORTA}/json`)).json()).find((t) => t.type === "page");
    } catch {}
  }
  if (!alvo) throw new Error("Chrome não respondeu no DevTools Protocol.");

  const ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pendentes = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pendentes.has(m.id)) {
      pendentes.get(m.id)(m);
      pendentes.delete(m.id);
    }
  });
  const cmd = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id;
      pendentes.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await cmd("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await cmd("Page.navigate", { url: `file://${arquivoHtml}` });
  await esperar(1500);
  // Só fotografa depois das fontes carregadas, senão o título sai no fallback.
  const fontes = await cmd("Runtime.evaluate", {
    expression: `document.fonts.ready.then(() => [...document.fonts].filter(f => f.status === "loaded").map(f => f.family + " " + f.weight).join(", "))`,
    awaitPromise: true,
    returnByValue: true,
  });
  console.log("fontes carregadas:", fontes.result?.result?.value || "(nenhuma, confira a rede)");

  /*
    JPEG, e não PNG: a foto da fachada em PNG dava mais de 500 KB, e prévia de
    link pesada demora (ou nem aparece) em app de mensagem. Em JPEG 88 o mesmo
    card fica em torno de 150 KB, sem diferença visível nesse tamanho.
  */
  const r = await cmd("Page.captureScreenshot", { format: "jpeg", quality: 88, clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  const destino = path.join(RAIZ_SITE, "public/og.jpg");
  writeFileSync(destino, Buffer.from(r.result.data, "base64"));
  console.log(`og.jpg gerado: ${destino}`);
  ws.close();
} finally {
  chrome.kill();
  await esperar(300);
  rmSync(pasta, { recursive: true, force: true });
}
