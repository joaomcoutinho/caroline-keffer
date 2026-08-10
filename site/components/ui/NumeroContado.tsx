"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  alvo: number;
  casas?: number;
  sufixo?: string;
};

const useEfeitoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const formatar = (valor: number, casas: number) =>
  valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });

/**
 * Número que conta de zero até o valor final quando entra na tela, uma vez só.
 *
 * Mesma regra do resto do site: o CONTEÚDO NÃO DEPENDE DA ANIMAÇÃO. O valor final
 * é o estado inicial, tanto no HTML do servidor quanto na primeira pintura. A
 * contagem só começa se der para animar de verdade (JS ligado, aba visível, sem
 * `prefers-reduced-motion`). Se não der, o número simplesmente já está lá.
 *
 * `tabular-nums` trava a largura dos dígitos para o texto ao lado não tremer
 * enquanto os números trocam.
 */
export function NumeroContado({ alvo, casas = 0, sufixo = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(alvo);

  useEfeitoLayout(() => {
    const el = ref.current;
    if (!el) return;
    if (document.visibilityState === "hidden") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setValor(0);

    let quadro = 0;
    let inicio = 0;
    const duracao = 1400;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();

        const passo = (agora: number) => {
          if (!inicio) inicio = agora;
          const t = Math.min((agora - inicio) / duracao, 1);
          // desaceleração no fim: o número "assenta" no valor em vez de parar seco
          const suave = 1 - Math.pow(1 - t, 3);
          setValor(alvo * suave);
          if (t < 1) quadro = requestAnimationFrame(passo);
        };

        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );

    observador.observe(el);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [alvo]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatar(valor, casas)}
      {sufixo}
    </span>
  );
}
