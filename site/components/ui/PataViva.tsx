"use client";

import { useEffect } from "react";

/**
 * Vida no cursor para a PATA do hero (18/09/2026, JM: "o hover das pontas está
 * bruto; tem que ser progressivo, contínuo e fluido").
 *
 * O problema do hover só em CSS é que ele é BINÁRIO: entrou, saltou para o
 * estado final; saiu, voltou. Aqui a pata responde ao movimento do ponteiro de
 * forma contínua, como os cards magnéticos dos sites de produto (a mesma ideia
 * do "magnetic hover" que Apple e Linear usam em ícones e botões):
 *
 * - cada dedo é ATRAÍDO na direção do cursor, com força que cai com a
 *   distância — perto ele acompanha, longe ele nem se mexe;
 * - a foto dentro do dedo anda MENOS que a moldura, o que dá profundidade;
 * - o valor não pula: a cada quadro ele caminha uma fração do caminho até o
 *   alvo (interpolação), então acelerar e frear são suaves por construção;
 * - o laço de animação só roda enquanto há movimento sobrando, e para sozinho.
 *
 * O crescimento continua no CSS (`:hover`), porque escala tem estado certo; o
 * que era brusco era a ausência de movimento entre um estado e outro.
 *
 * Nada disto roda em toque, em tela pequena ou com `prefers-reduced-motion`.
 */
export function PataViva() {
  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)");
    const largo = window.matchMedia("(min-width: 1024px)");
    if (!fino.matches || calmo.matches || !largo.matches) return;

    const palco = document.querySelector<HTMLElement>(".hero-palco");
    if (!palco) return;
    const dedos = Array.from(palco.querySelectorAll<HTMLElement>(".hero-dedo"));
    if (!dedos.length) return;

    /** Estado por dedo: onde está (x, y) e para onde quer ir (ax, ay). */
    const estado = dedos.map(() => ({ x: 0, y: 0, ax: 0, ay: 0 }));
    let quadro = 0;

    const passo = () => {
      let sobrou = false;

      dedos.forEach((dedo, i) => {
        const e = estado[i];
        // Caminha 12% do que falta: quanto mais perto do alvo, mais devagar.
        e.x += (e.ax - e.x) * 0.12;
        e.y += (e.ay - e.y) * 0.12;
        if (Math.abs(e.ax - e.x) > 0.05 || Math.abs(e.ay - e.y) > 0.05) sobrou = true;

        dedo.style.setProperty("--puxao-x", `${e.x.toFixed(2)}px`);
        dedo.style.setProperty("--puxao-y", `${e.y.toFixed(2)}px`);
      });

      quadro = sobrou ? requestAnimationFrame(passo) : 0;
    };

    const acordar = () => {
      if (!quadro) quadro = requestAnimationFrame(passo);
    };

    const aoMover = (ev: PointerEvent) => {
      /*
        Com um dedo aberto (hover), o ímã descansa: os vizinhos já estão se
        afastando pelo CSS, e dois movimentos ao mesmo tempo liam como tremor.
      */
      if (dedos.some((d) => d.matches(":hover"))) {
        estado.forEach((e) => {
          e.ax = 0;
          e.ay = 0;
        });
        acordar();
        return;
      }
      dedos.forEach((dedo, i) => {
        const r = dedo.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = ev.clientX - cx;
        const dy = ev.clientY - cy;
        const dist = Math.hypot(dx, dy);
        // Campo de atração: uma vez e meia o raio do dedo.
        const alcance = r.width * 1.5;
        const forca = dist > alcance ? 0 : (1 - dist / alcance) ** 2;
        estado[i].ax = dx * 0.16 * forca;
        estado[i].ay = dy * 0.16 * forca;
      });
      acordar();
    };

    const aoSair = () => {
      estado.forEach((e) => {
        e.ax = 0;
        e.ay = 0;
      });
      acordar();
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerleave", aoSair);
    window.addEventListener("blur", aoSair);

    return () => {
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerleave", aoSair);
      window.removeEventListener("blur", aoSair);
      if (quadro) cancelAnimationFrame(quadro);
      dedos.forEach((dedo) => {
        dedo.style.removeProperty("--puxao-x");
        dedo.style.removeProperty("--puxao-y");
      });
    };
  }, []);

  return null;
}
