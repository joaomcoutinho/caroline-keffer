// Gera site/public/og.png (1200x630), o card de compartilhamento.
//
// 15/09/2026: o card acompanha o hero atual. A foto passou a ser a FACHADA (a
// mesma do hero) e a copy é a headline do site, não mais o retrato da Dra.
// Carol com a chamada antiga.
//
// POR QUE CHROME, E NÃO MAIS SHARP + OPENTYPE. O gerador anterior convertia o
// texto em vetor com opentype.js a partir de TTFs estáticos da Bricolage e da
// Jakarta, que eram as fontes do site. O site hoje usa Nunito e Nunito Sans, e
// a Nunito é variável: o opentype.js não resolve o eixo de peso, então o título
// sairia em Regular. Renderizar HTML no Chrome resolve fonte variável, quebra de
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
const fachada = `data:image/webp;base64,${base64("public/images/fachada_ceu.webp")}`;
const selo = `data:image/jpeg;base64,${base64("public/images/logo-caroline-keffer.jpg")}`;

/*
  COMPOSIÇÃO. É o hero do desktop em formato de card: copy à esquerda, fachada
  à direita. O fundo é o azul-petróleo do véu do hero no celular (#07222c →
  #0f3644), e não a superfície clara do site: prévia de link aparece pequena,
  no meio de conversa de WhatsApp, e o escuro com texto claro é o que continua
  legível nesse tamanho.

  A fachada ocupa 640px e dissolve na borda esquerda (18% da coluna). A copy
  tem 500px e termina antes de a foto começar: título por cima do letreiro
  apagava justamente o nome da clínica. O recorte
  vertical (`center 36%`) mantém o letreiro e o selo redondo inteiros.
*/
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&family=Nunito+Sans:wght@400;600&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    position: relative;
    background: linear-gradient(135deg, #07222c 0%, #0f3644 100%);
    font-family: "Nunito Sans", sans-serif;
    color: #f3fafc;
  }
  .foto {
    position: absolute; top: 0; right: 0; bottom: 0; width: 640px;
    background: url(${fachada}) center 36% / cover;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%);
    mask-image: linear-gradient(to right, transparent 0%, #000 18%);
  }
  .copy { position: absolute; left: 72px; top: 56px; bottom: 56px; width: 500px; display: flex; flex-direction: column; }
  .marca { display: flex; align-items: center; gap: 18px; }
  .marca img { width: 64px; height: 64px; border-radius: 50%; border: 2px solid #fff; }
  .marca b { display: block; font-weight: 600; font-size: 26px; line-height: 1.1; }
  .marca span { display: block; margin-top: 4px; font-weight: 600; font-size: 14px; letter-spacing: 0.1em; color: #a8d6e8; }
  .corpo { margin-top: auto; }
  h1 { font-family: "Nunito", sans-serif; font-weight: 800; font-size: 58px; line-height: 1.04; text-wrap: balance; letter-spacing: -0.02em; color: #fff; }
  p { margin-top: 16px; font-size: 25px; line-height: 1.35; color: #cfe3ea; text-wrap: balance; }
  .rodape { margin-top: 30px; display: flex; align-items: center; gap: 22px; }
  .cta { display: inline-flex; align-items: center; height: 64px; padding: 0 36px; border-radius: 999px; background: #7ec0dc; color: #07222c; font-weight: 600; font-size: 25px; white-space: nowrap; }
  .selo { font-size: 19px; color: #b3cfdb; white-space: nowrap; }
  .selo b { color: #fff; }
  .estrela { color: #f2b53a; }
</style></head><body>
  <div class="foto"></div>
  <div class="copy">
    <div class="marca">
      <img src="${selo}" alt="">
      <div><b>Caroline Keffer</b><span>CLÍNICA VETERINÁRIA · TORRE, RECIFE</span></div>
    </div>
    <div class="corpo">
      <h1>Tudo para seu pet, onde ele se sente em casa.</h1>
      <p>Clínica, cirurgia, exames e banho e tosa, com a Dra. Carol.</p>
      <div class="rodape">
        <span class="cta">Agendar pelo WhatsApp</span>
        <span class="selo"><span class="estrela">★</span> <b>4,8</b> no Google</span>
      </div>
    </div>
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

  const r = await cmd("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  const destino = path.join(RAIZ_SITE, "public/og.png");
  writeFileSync(destino, Buffer.from(r.result.data, "base64"));
  console.log(`og.png gerado: ${destino}`);
  ws.close();
} finally {
  chrome.kill();
  await esperar(300);
  rmSync(pasta, { recursive: true, force: true });
}
