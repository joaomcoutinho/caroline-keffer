"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em segundos, para escalonar itens de uma mesma lista. */
  atraso?: number;
  className?: string;
};

/** useLayoutEffect no cliente, useEffect no servidor (evita aviso de SSR). */
const useEfeitoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Revelação de entrada — a única camada de motion do site (MOTION_INTENSITY 4).
 *
 * Motivo: hierarquia. O conteúdo aparece na ordem em que deve ser lido, e para.
 * Sem loop, sem parallax, sem scroll narrativo: o registro aprovado é sóbrio, e
 * quem chega aqui está resolvendo um problema, não assistindo a um filme.
 *
 * Regra que vale mais que o efeito: CONTEÚDO NUNCA DEPENDE DA ANIMAÇÃO PARA EXISTIR.
 * Por isso o estado escondido é adicionado pelo cliente, nunca vem do HTML:
 * - sem JavaScript → nada é escondido;
 * - aba aberta em segundo plano (link em nova aba, caso comuníssimo) → nada é escondido,
 *   porque em aba oculta o IntersectionObserver e o rAF não rodam e a página ficaria em branco;
 * - `prefers-reduced-motion` → nada é escondido.
 *
 * O useLayoutEffect aplica a classe antes da pintura, então não há flash de conteúdo.
 */
export function Revelar({ children, atraso = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEfeitoLayout(() => {
    const el = ref.current;
    if (!el) return;
    if (document.visibilityState === "hidden") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.transitionDelay = `${atraso}s`;
    el.classList.add("revelar-oculto");

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          el.classList.remove("revelar-oculto");
          observador.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [atraso]);

  return (
    <div ref={ref} data-revelar className={className}>
      {children}
    </div>
  );
}
