"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** `<ol>` quando a ordem importa (fases da vida); `<ul>` no resto. */
  ordenada?: boolean;
};

/**
 * Lista que vira TRILHO HORIZONTAL no celular (`.trilho-mobile`), com o
 * indicador embaixo (01/10/2026, JM: "bota um indicador que é scrollável").
 * Os pontos mostram quantos cartões há e qual está na tela, e levam até ele
 * ao toque; o "deslize" some depois do primeiro movimento. Do tablet para
 * cima a lista é grade e o indicador não aparece.
 */
export function Trilho({ children, className = "", ordenada = false }: Props) {
  const ref = useRef<HTMLOListElement & HTMLUListElement>(null);
  const total = Children.count(children);
  const [ativo, setAtivo] = useState(0);
  const [mexeu, setMexeu] = useState(false);

  useEffect(() => {
    const trilho = ref.current;
    if (!trilho) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const itens = Array.from(trilho.children) as HTMLElement[];
        if (!itens.length) return;
        const fim = trilho.scrollLeft >= trilho.scrollWidth - trilho.clientWidth - 4;
        let indice = 0;
        if (fim) indice = itens.length - 1;
        else {
          const base = itens[0].offsetLeft;
          let menor = Infinity;
          itens.forEach((item, i) => {
            const distancia = Math.abs(item.offsetLeft - base - trilho.scrollLeft);
            if (distancia < menor) {
              menor = distancia;
              indice = i;
            }
          });
        }
        setAtivo(indice);
        if (trilho.scrollLeft > 8) setMexeu(true);
      });
    };
    trilho.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      trilho.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  const irPara = (i: number) => {
    const trilho = ref.current;
    const item = trilho?.children[i] as HTMLElement | undefined;
    if (!trilho || !item) return;
    const base = (trilho.children[0] as HTMLElement).offsetLeft;
    trilho.scrollTo({ left: item.offsetLeft - base, behavior: "smooth" });
  };

  const Lista = ordenada ? "ol" : "ul";

  return (
    <>
      <Lista ref={ref} className={`trilho-mobile ${className}`}>
        {children}
      </Lista>
      {total > 1 ? (
        <div className="trilho-indicador">
          <div className="trilho-pontos">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                className="trilho-ponto"
                data-ativo={i === ativo ? "" : undefined}
                aria-label={`Ver o cartão ${i + 1} de ${total}`}
                aria-current={i === ativo ? "true" : undefined}
                onClick={() => irPara(i)}
              />
            ))}
          </div>
          <span className="trilho-dica" data-oculta={mexeu ? "" : undefined} aria-hidden>
            Deslize
            <ArrowRightIcon size={13} weight="bold" />
          </span>
        </div>
      ) : null}
    </>
  );
}
