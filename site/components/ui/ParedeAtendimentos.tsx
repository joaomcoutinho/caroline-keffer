"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsOutSimpleIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";

/*
  `largura`/`altura` são as dimensões REAIS do arquivo. Sem elas o navegador
  reservava um retângulo genérico para cada foto e reajustava a coluna quando a
  imagem chegava, e as fotos variam de 0,64 a 0,80 de proporção.
*/
type Foto = { src: string; alt: string; largura: number; altura: number };

type Props = {
  fotos: readonly Foto[];
};

/**
 * Parede de atendimentos: colunas em contrafluxo + visualizador em tela cheia.
 *
 * ─ POR QUE ESTE DESENHO ────────────────────────────────────────────────────
 *
 * A faixa horizontal anterior mostrava 4 ou 5 fotos por vez, uma atrás da
 * outra. Com 20 atendimentos isso escondia justamente o que a dobra tem de mais
 * forte: o VOLUME. Aqui as 20 estão na tela ao mesmo tempo, em colunas, e as
 * colunas alternadas deslizam em sentidos opostos. É o padrão de "parede viva"
 * de sites de estúdio premiados, e aqui ele não é enfeite: a sensação de
 * "não acaba nunca" é o próprio argumento de que a clínica atende muito, e
 * atende com carinho.
 *
 * ─ PERFORMANCE ─────────────────────────────────────────────────────────────
 *
 * Cada coluna é um trilho com as fotos DUPLICADAS, animado só por `transform`
 * até -50%, exatamente onde a cópia começa. O loop não tem emenda e roda no
 * compositor, sem JavaScript por quadro. As cópias são `aria-hidden` e não
 * focáveis, então teclado e leitor de tela passam por cada foto uma vez só.
 * A parede pausa quando o cursor entra (dá tempo de olhar) e quando a aba sai
 * de vista. Sob `prefers-reduced-motion` nada se mexe.
 *
 * ─ VISUALIZADOR ────────────────────────────────────────────────────────────
 *
 * Clique numa foto abre a foto grande num `<dialog>` nativo: ele já resolve
 * foco preso, Esc para fechar e a camada de fundo. Setas do teclado e arraste
 * lateral no toque navegam entre as 20.
 */
export function ParedeAtendimentos({ fotos }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberta, setAberta] = useState<number | null>(null);
  const toqueX = useRef<number | null>(null);

  /*
    Distribui as fotos em colunas por rodízio (0,1,2,3,0,1,...), e não em
    blocos seguidos. Em blocos, fotos parecidas tiradas no mesmo dia caíam
    empilhadas na mesma coluna.
  */
  const emColunas = (n: number) =>
    Array.from({ length: n }, (_, c) =>
      fotos.map((f, i) => ({ ...f, i })).filter((_, i) => i % n === c),
    );

  /*
    Duas versões no DOM, e o CSS mostra só uma:
      - DESKTOP: 4 colunas verticais em contrafluxo (`.parede--4`);
      - CELULAR e TABLET (15/09/2026, JM: "no mobile tem que acompanhar o
        impacto do desktop"): 3 FAIXAS HORIZONTAIS em contrafluxo
        (`.parede-linhas`), de ponta a ponta da tela. Duas colunas verticais
        de 46vw mostravam quatro fotos por vez; três faixas mostram umas nove,
        e o movimento cruzado é o mesmo gesto da parede do desktop, deitado.
    Foto dentro de `display: none` não é baixada (o carregamento preguiçoso
    não dispara), então a versão escondida não custa rede.
  */
  const paredes = [{ cls: "parede parede--4", colunas: emColunas(4) }];
  const linhas = emColunas(3);

  /* Se a foto foi aberta por clique ou toque (e não por teclado). */
  const porPonteiro = useRef(false);

  const abrir = (i: number, ponteiro: boolean) => {
    porPonteiro.current = ponteiro;
    setAberta(i);
    dialogo.current?.showModal();
  };

  const fechar = () => dialogo.current?.close();

  const ir = useCallback(
    (passo: number) =>
      setAberta((atual) =>
        atual === null ? atual : (atual + passo + fotos.length) % fotos.length,
      ),
    [fotos.length],
  );

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const aoFechar = () => {
      setAberta(null);
      /*
        O `<dialog>` devolve o foco à foto que o abriu, ANTES deste evento. Para
        quem abriu com o mouse esse foco não serve para nada e mantinha a parede
        pausada (ver `.parede-trilho` no globals.css). Para quem abriu pelo
        teclado ele fica: é onde a pessoa estava.
      */
      if (porPonteiro.current) {
        const foco = document.activeElement;
        if (foco instanceof HTMLElement && d.parentElement?.contains(foco)) foco.blur();
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    d.addEventListener("close", aoFechar);
    d.addEventListener("keydown", aoTeclar);
    return () => {
      d.removeEventListener("close", aoFechar);
      d.removeEventListener("keydown", aoTeclar);
    };
  }, [ir]);

  const atual = aberta === null ? null : fotos[aberta];

  return (
    <>
      {paredes.map((parede) => (
      <div key={parede.cls} className={parede.cls}>
        {parede.colunas.map((coluna, c) => (
          <div
            key={c}
            className="parede-coluna"
            data-sentido={c % 2 === 0 ? "sobe" : "desce"}
            style={{ ["--duracao" as string]: `${54 + c * 7}s` }}
          >
            <ul className="parede-trilho">
              {[...coluna, ...coluna].map((foto, k) => {
                const copia = k >= coluna.length;
                return (
                  <li key={`${foto.src}-${k}`} aria-hidden={copia || undefined}>
                    <button
                      type="button"
                      className="parede-foto group"
                      // `detail` é 0 quando o clique veio de Enter/Espaço.
                      onClick={(e) => abrir(foto.i, e.detail > 0)}
                      tabIndex={copia ? -1 : 0}
                      aria-label={`Ampliar foto: ${foto.alt}`}
                    >
                      <Image
                        src={caminhoPublico(foto.src)}
                        alt={copia ? "" : foto.alt}
                        width={foto.largura}
                        height={foto.altura}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 280px"
                        className="h-auto w-full"
                      />
                      <span className="parede-lupa" aria-hidden>
                        <ArrowsOutSimpleIcon size={16} weight="bold" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      ))}

      <div className="parede-linhas">
        {linhas.map((linha, r) => (
          <div
            key={r}
            className="parede-linha"
            data-sentido={r % 2 === 0 ? "esquerda" : "direita"}
            style={{ ["--duracao" as string]: `${42 + r * 6}s` }}
          >
            <ul className="parede-faixa">
              {[...linha, ...linha].map((foto, k) => {
                const copia = k >= linha.length;
                return (
                  <li key={`${foto.src}-${k}`} aria-hidden={copia || undefined}>
                    <button
                      type="button"
                      className="parede-foto group"
                      onClick={(e) => abrir(foto.i, e.detail > 0)}
                      tabIndex={copia ? -1 : 0}
                      aria-label={`Ampliar foto: ${foto.alt}`}
                    >
                      <Image
                        src={caminhoPublico(foto.src)}
                        alt={copia ? "" : foto.alt}
                        width={foto.largura}
                        height={foto.altura}
                        sizes="160px"
                        className="h-full w-auto"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogo}
        className="visor"
        aria-label="Foto ampliada"
        onClick={(e) => {
          // Clique no fundo (fora da moldura) fecha.
          if (e.target === e.currentTarget) fechar();
        }}
      >
        {atual && aberta !== null ? (
          <div
            className="visor-moldura"
            onTouchStart={(e) => {
              toqueX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (toqueX.current === null) return;
              const dx = e.changedTouches[0].clientX - toqueX.current;
              if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
              toqueX.current = null;
            }}
          >
            {/* `key` remonta a imagem a cada troca: é o que reanima a entrada. */}
            <Image
              key={atual.src}
              src={caminhoPublico(atual.src)}
              alt={atual.alt}
              width={atual.largura}
              height={atual.altura}
              sizes="(max-width: 640px) 92vw, 560px"
              className="visor-imagem"
              priority
            />
            <p className="visor-legenda">
              <span className="visor-contador">
                {String(aberta + 1).padStart(2, "0")}
                <span className="opacity-50"> / {String(fotos.length).padStart(2, "0")}</span>
              </span>
              {atual.alt}
            </p>

            <button type="button" className="visor-botao visor-fechar" onClick={fechar} aria-label="Fechar">
              <XIcon size={20} weight="bold" aria-hidden />
            </button>
            <button type="button" className="visor-botao visor-anterior" onClick={() => ir(-1)} aria-label="Foto anterior">
              <ArrowLeftIcon size={20} weight="bold" aria-hidden />
            </button>
            <button type="button" className="visor-botao visor-proxima" onClick={() => ir(1)} aria-label="Próxima foto">
              <ArrowRightIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
