// Gera site/public/og.jpg (1200x630), o card de compartilhamento.
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
  COMPOSIÇÃO (17/09/2026, JM: "og estético, com a foto da fachada e transição
  natural da copy para a imagem, e alguns serviços em categorias").

  A fachada é FULL-BLEED: ocupa o card inteiro e some para a esquerda num
  degradê horizontal longo (petróleo sólido até 30%, transparente em 78%). É
  a mesma ideia do hero no celular, onde a copy nasce sobre a foto, e não um
  card partido ao meio com emenda dura.

  A prévia aparece pequena no WhatsApp: por isso a copy é curta, o contraste é
  alto (texto claro sobre petróleo) e as categorias são só QUATRO dos seis
  serviços, as que mais separam a clínica de um pet shop de bairro.
*/
// [x, y, tamanho, giro, opacidade] — posições escolhidas à mão, longe do texto.
const PATAS = [
  [34, 118, 52, -18, 0.1],
  [96, 236, 34, 24, 0.08],
  [22, 402, 44, 12, 0.07],
  [150, 74, 30, 40, 0.07],
  [612, 128, 40, -28, 0.08],
  [700, 520, 46, 16, 0.06],
  [420, 570, 32, -12, 0.07],
  [268, 118, 24, 8, 0.06],
];

const CATEGORIAS = ["Clínica geral", "Cirurgia", "Especialidades", "Banho e tosa"];

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Nunito+Sans:wght@400;600;700&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    position: relative;
    background: #0b3141;
    font-family: "Nunito Sans", sans-serif;
    color: #f3fafc;
  }
  .foto {
    position: absolute; inset: 0;
    background: url(${fachada}) center 26% / cover;
  }
  /* Transição da foto para a copy: horizontal longa + leve véu geral. */
  .veu {
    position: absolute; inset: 0;
    background:
      linear-gradient(100deg, #0b3141 0%, #0b3141 32%, rgba(11, 49, 65, 0.9) 50%, rgba(11, 49, 65, 0.5) 68%, rgba(11, 49, 65, 0) 86%),
      linear-gradient(180deg, rgba(7, 34, 44, 0.45) 0%, rgba(7, 34, 44, 0) 28%, rgba(7, 34, 44, 0.35) 100%);
  }
  /* Poucas patinhas, espalhadas à mão: capricho de fundo, não textura. */
  .pata { position: absolute; fill: #a8d6e8; opacity: 0.1; }
  .copy { position: absolute; left: 72px; top: 52px; bottom: 52px; width: 648px; display: flex; flex-direction: column; }
  .marca { display: flex; align-items: center; gap: 18px; }
  .marca img { width: 62px; height: 62px; border-radius: 50%; border: 2px solid #fff; }
  .marca b { display: block; font-weight: 700; font-size: 25px; line-height: 1.1; }
  .marca span { display: block; margin-top: 4px; font-weight: 700; font-size: 13px; letter-spacing: 0.12em; color: #a8d6e8; }
  .corpo { margin-top: auto; margin-bottom: auto; padding-top: 28px; }
  h1 { font-family: "Nunito", sans-serif; font-weight: 800; font-size: 54px; line-height: 1.02; letter-spacing: -0.025em; color: #fff; text-shadow: 0 2px 18px rgba(4, 30, 40, 0.45); }
  h1 em { font-style: normal; color: #a8d6e8; }
  .cats { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; }
  .cats span {
    display: inline-flex; align-items: center; height: 42px; padding: 0 17px;
    border-radius: 999px; border: 1.5px solid rgba(168, 214, 232, 0.55);
    background: rgba(168, 214, 232, 0.12);
    font-size: 18px; font-weight: 600; color: #e3f2f7; white-space: nowrap;
  }
  .rodape { margin-top: 30px; display: flex; }
  .cta { display: inline-flex; align-items: center; gap: 12px; height: 64px; padding: 0 34px; border-radius: 999px; background: #7ec0dc; color: #07222c; font-weight: 700; font-size: 24px; white-space: nowrap; box-shadow: 0 18px 40px -18px rgba(4, 30, 40, 0.9); }
  .cta svg { width: 26px; height: 26px; }
</style></head><body>
  <div class="foto"></div>
  <div class="veu"></div>
  ${PATAS.map(
    (p) =>
      `<svg class="pata" viewBox="0 0 40 40" style="left:${p[0]}px;top:${p[1]}px;width:${p[2]}px;transform:rotate(${p[3]}deg);opacity:${p[4]}"><ellipse cx="20" cy="27" rx="10" ry="8.5"/><ellipse cx="8" cy="17" rx="4" ry="5"/><ellipse cx="15.5" cy="9.5" rx="4" ry="5.2"/><ellipse cx="24.5" cy="9.5" rx="4" ry="5.2"/><ellipse cx="32" cy="17" rx="4" ry="5"/></svg>`,
  ).join("")}
  <div class="copy">
    <div class="marca">
      <img src="${selo}" alt="">
      <div><b>Caroline Keffer</b><span>CLÍNICA VETERINÁRIA · TORRE, RECIFE</span></div>
    </div>
    <div class="corpo">
      <h1>Tudo para seu pet,<br>onde ele se sente <em>em&nbsp;casa.</em></h1>
      <div class="cats">${CATEGORIAS.map((c) => `<span>${c}</span>`).join("")}</div>
      <div class="rodape">
        <span class="cta"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>Agendar pelo WhatsApp</span>
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
