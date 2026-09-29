"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { Passo } from "@/content/paginas";

const useEfeitoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Lista de passos que SE CONSTRÓI (27/09/2026, JM: "o caminho se construindo
 * do passo 1 até o passo 4").
 *
 * Quando a lista entra na tela: o número 1 pousa, o texto dele chega, o fio
 * desce até o 2, o 2 pousa quando o fio chega nele, e assim até o último. É a
 * mesma ideia do tracejado de rota do hover: um trajeto sendo traçado, não
 * itens aparecendo juntos.
 *
 * Mesma regra do `Revelar`: o conteúdo NUNCA depende da animação. O estado
 * escondido é posto pelo cliente, depois da hidratação — sem JavaScript, com
 * aba em segundo plano ou com `prefers-reduced-motion`, a lista já nasce
 * inteira.
 */
export function PassosCaminho({ itens }: { itens: readonly Passo[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEfeitoLayout(() => {
    const el = ref.current;
    if (!el) return;
    if (document.visibilityState === "hidden") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.caminho = "espera";

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          el.dataset.caminho = "anda";
          observador.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      className="lista-passos passos-caminho vidro rounded-[var(--radius-card)] p-7 sm:p-9"
      style={{ "--n": itens.length } as React.CSSProperties}
    >
      {itens.map((p, i) => (
        <li key={p.titulo} style={{ "--i": i } as React.CSSProperties}>
          <span className="lista-num" aria-hidden>
            {i + 1}
          </span>
          <h3 className="font-display text-lg leading-snug font-bold">{p.titulo}</h3>
          <p className="mt-1 leading-relaxed text-text-2">{p.texto}</p>
        </li>
      ))}
    </ol>
  );
}
