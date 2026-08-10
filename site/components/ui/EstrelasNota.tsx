"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  /** Nota de 0 a 5. */
  nota: number;
  tamanho?: number;
};

const useEfeitoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Cinco estrelas com preenchimento proporcional à nota.
 *
 * Substituiu o anel de progresso: um arco parado em 96% lia como carregamento
 * interrompido. Estrela parcialmente cheia é a convenção universal de nota —
 * ninguém lê "4,8 de 5 estrelas" como algo incompleto.
 *
 * A camada cheia cresce em largura sobre a camada apagada. Mesma regra do resto
 * do site: se não der para animar, já nasce no valor final.
 */
export function EstrelasNota({ nota, tamanho = 18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const alvo = Math.max(0, Math.min(nota / 5, 1));
  const [preenchido, setPreenchido] = useState(alvo);

  useEfeitoLayout(() => {
    const el = ref.current;
    if (!el) return;
    if (document.visibilityState === "hidden") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPreenchido(0);

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
          const suave = 1 - Math.pow(1 - t, 3);
          setPreenchido(alvo * suave);
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

  const fileira = (className: string) => (
    <div className={`flex w-max gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={tamanho} weight="fill" aria-hidden />
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      role="img"
      aria-label={`${nota.toLocaleString("pt-BR")} de 5 estrelas`}
    >
      {fileira("text-brand/20")}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${preenchido * 100}%` }}
        aria-hidden
      >
        {fileira("text-brand")}
      </div>
    </div>
  );
}
