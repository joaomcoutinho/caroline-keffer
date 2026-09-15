import type React from "react";
import Image from "next/image";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { contato, hero } from "@/content/site";

/**
 * Dobra 1 — a fachada da clínica e a promessa do site.
 *
 * HISTÓRICO CURTO. A fachada já foi full-bleed atrás de um véu (virava
 * fantasma), depois uma coluna à direita dissolvida por máscara na copy
 * (09 a 15/09/2026). Em 15/09/2026 o JM escolheu entre prévias:
 *
 * DESKTOP (15/09/2026, opção B entre três conceitos): fundo ciano com as
 * patinhas do site e a PATA DA MARCA montada com fotos reais. A almofada é a
 * fachada; os quatro dedos são atendimentos e o consultório. O endereço vai
 * num cartão de vidro sobre a almofada.
 *
 * CELULAR E TABLET: opção B. A fachada ocupa a tela inteira, recortada até o
 * letreiro, e a copy vai no pé, clara, sobre um véu que só escurece embaixo.
 *
 * Nos dois tamanhos é o MESMO elemento de foto (`.hero-palco`), e só a
 * geometria muda no CSS. Duas <Image> com `priority` baixariam a fachada duas
 * vezes. A copy é clara sempre: as cores vêm da troca de tokens em
 * `.hero-copy` (globals.css), então botão e textos se adaptam sem classe
 * duplicada.
 *
 * `min-h-[100dvh]` (nunca `h-screen`: no iOS a barra do Safari faz a página
 * pular). O header é `fixed` e passa por cima da dobra.
 */
export function Hero() {
  const corte = hero.headline.lastIndexOf(hero.headlineDestaque);
  const tituloAntes = corte > 0 ? hero.headline.slice(0, corte) : hero.headline;
  const tituloDestaque = corte > 0 ? hero.headlineDestaque : "";

  return (
    <section
      id="topo"
      className="hero fundo-patas relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden lg:justify-center"
    >
      <div className="hero-palco">
        {/* Dedos da pata: só no desktop (ver `.hero-dedo`). */}
        {hero.pata.map((dedo) => (
          <div key={dedo.src} className="hero-dedo">
            <Image
              src={caminhoPublico(dedo.src)}
              alt={dedo.alt}
              fill
              sizes="190px"
              className="object-cover"
              style={{ objectPosition: dedo.posicao }}
            />
          </div>
        ))}

        <div className="hero-janela">
          <Revelar atraso={0.1} className="revelar-zoom h-full">
            <div className="relative h-full w-full">
              <Image
                src={caminhoPublico(hero.foto.src)}
                alt={hero.foto.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 500px"
                className="hero-foto object-cover"
                style={
                  {
                    "--hero-pos": hero.foto.posicao,
                    "--hero-pos-mobile": hero.foto.posicaoMobile,
                  } as React.CSSProperties
                }
              />
            </div>
          </Revelar>

          {/* Véu do celular: meio limpo no letreiro, pé escuro para a copy. */}
          <div aria-hidden className="hero-veu absolute inset-0 lg:hidden" />
        </div>

        {/* Cartão do endereço: só no desktop (ver `.hero-cartao`). */}
        <div className="hero-cartao hero-cartao--local">
          <MapPinIcon size={16} weight="fill" className="text-[#d6453d]" aria-hidden />
          {contato.endereco} · Torre
        </div>
      </div>

      <div className="hero-copy relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="pt-24 pb-10 sm:max-w-[36rem] sm:pb-14 lg:w-[28rem] lg:max-w-none lg:py-28 xl:w-[30rem]">
          <Revelar>
            <p className="hero-rotulo text-xs font-semibold tracking-[0.08em] text-brand uppercase lg:text-sm lg:tracking-[0.12em]">
              {hero.rotulo}
            </p>
          </Revelar>

          <Revelar atraso={0.04}>
            <h1 className="hero-titulo mt-2.5 font-display text-[2.25rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:mt-4 lg:text-[3.1rem] lg:leading-[1.03] xl:text-[3.75rem]">
              {tituloAntes}
              {tituloDestaque ? <span className="text-[#7ec0dc] lg:text-[#bfe9f7]">{tituloDestaque}</span> : null}
            </h1>
          </Revelar>

          <Revelar atraso={0.08}>
            <p className="hero-sub mt-3 max-w-[46ch] text-base leading-relaxed text-text-2 sm:mt-5 sm:text-lg lg:mt-6 lg:text-lg xl:text-xl">
              <span className="sm:hidden">{hero.subheadCurta}</span>
              <span className="hidden sm:inline">{hero.subhead}</span>
            </p>
          </Revelar>

          {/*
            `id` só marca posição: a barra fixa observa este ponto para saber
            quando o CTA saiu da tela. Não altera layout nem estilo.
          */}
          <Revelar atraso={0.16}>
            <div
              id="ancora-cta-hero"
              className="mt-6 flex flex-col items-start gap-3 sm:mt-8 lg:mt-10"
            >
              <BotaoWhatsapp rotulo={hero.cta} />
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
