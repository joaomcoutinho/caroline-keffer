"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima em graus. */
  grau?: number;
};

/**
 * Card que se inclina de leve seguindo o cursor.
 *
 * O valor contínuo do ponteiro é escrito DIRETO em variáveis CSS do elemento,
 * nunca em estado do React. Guardar posição de mouse em `useState` re-renderiza
 * a árvore a cada pixel e trava no celular — é o erro clássico desse efeito.
 * Aqui o React não re-renderiza uma vez sequer: quem anima é o compositor.
 *
 * Só age em dispositivo com cursor de verdade e sem `prefers-reduced-motion`;
 * o CSS é que faz esse gate (ver `.cartao-inclinavel` no globals.css), então em
 * toque o componente é um `div` comum.
 */
export function CartaoInclinavel({ children, className = "", grau = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // -0.5 a 0.5 em cada eixo, a partir do centro do card.
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * grau).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * grau).toFixed(2)}deg`);
    el.style.setProperty("--brilho-x", `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const sair = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={sair}
      className={`cartao-inclinavel ${className}`}
    >
      {children}
    </div>
  );
}
