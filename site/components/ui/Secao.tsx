import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  /** Tinta de fundo dentro da MESMA família de tema. Nunca inverte o tema. */
  tom?: "base" | "alt" | "forte";
  className?: string;
};

const tons = {
  base: "bg-surface",
  alt: "bg-surface-2",
  forte: "bg-surface-3",
} as const;

/** Casca de seção: respiro vertical e container. A composição interna é de cada seção. */
export function Secao({ id, children, tom = "base", className = "" }: Props) {
  return (
    <section
      id={id}
      className={`fundo-patas relative ${tons[tom]} scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}
