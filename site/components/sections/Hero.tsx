import type React from "react";
import Image from "next/image";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { PataViva } from "@/components/ui/PataViva";
import { caminhoPublico } from "@/lib/caminho";
import { hero } from "@/content/site";

/**
 * Dobra 1 — a fachada da clínica e a promessa do site.
 *
 * HISTÓRICO CURTO. A fachada já foi full-bleed atrás de um véu (virava
 * fantasma), depois coluna à direita dissolvida por máscara, depois arco. Em
 * 15/09/2026, depois de várias prévias, o JM escolheu a PATA DA MARCA montada
 * com fotos reais, no arranjo "fios pontilhados":
 *
 * DESKTOP (16/09/2026, tarde: o JM achou "texto à esquerda, pata à direita"
 * simples demais; um council cego comparou o atual com três protótipos e
 * escolheu "texto dentro da pata"): a copy fica CENTRALIZADA e a pata se abre
 * em volta dela, com os quatro dedos em arco nas laterais e a almofada (a
 * FACHADA) logo abaixo dos CTAs, grande, entrando na primeira tela em
 * qualquer altura (JM: "sobe a fachada, ela é a primeira impressão"). Só
 * título, frase e dois CTAs (WhatsApp e serviços).
 * Passar o mouse num dedo acende o dedo, todos no padrão da Dra. Carol.
 *
 * CELULAR E TABLET (o mesmo council preferiu manter): a pata inteira no alto
 * da dobra, com a copy centralizada embaixo. Ver o bloco HERO no globals.css.
 *
 * A pata e a copy são as mesmas em qualquer largura; só a composição muda no
 * CSS. A copy é clara sempre: as cores vêm da troca de tokens em `.hero-copy`.
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
      className="hero fundo-patas relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      {/*
        FUNDO IMERSIVO. A própria fachada, desfocada e bem grande, vira a luz
        ambiente da dobra (como a capa de um álbum atrás do player). Por cima,
        os anéis que giram devagar e uma trilha de pegadas que caminha até a
        clínica. (O facho de luz vindo do alto foi vetado pelo JM.)
      */}
      {/*
        CELULAR (17/09/2026, JM escolheu a prévia "M2 · tela cheia"): a
        fachada ocupa a tela e a copy sobe por cima da base da foto. A pata
        some no celular; a equipe vira a fileira de rostos acima do título.
      */}
      <div className="hero-m-foto">
        <Image
          src={caminhoPublico(hero.fotoMobile.src)}
          alt={hero.fotoMobile.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: hero.fotoMobile.posicao }}
        />
      </div>

      <div aria-hidden className="hero-ambiente">
        <Image src={caminhoPublico(hero.foto.src)} alt="" fill sizes="40vw" className="object-cover" />
      </div>
      <div aria-hidden className="hero-orbitas" />
      {(["esq", "dir"] as const).map((lado) => (
        <div key={lado} aria-hidden className={`hero-trilha hero-trilha--${lado}`}>
          {[0, 1, 2, 3, 4].map((passo) => (
            <svg key={passo} viewBox="0 0 40 40" fill="currentColor">
              <ellipse cx="20" cy="27" rx="10" ry="8.5" />
              <ellipse cx="8" cy="17" rx="4" ry="5" transform="rotate(-20 8 17)" />
              <ellipse cx="15.5" cy="9.5" rx="4" ry="5.2" />
              <ellipse cx="24.5" cy="9.5" rx="4" ry="5.2" />
              <ellipse cx="32" cy="17" rx="4" ry="5" transform="rotate(20 32 17)" />
            </svg>
          ))}
        </div>
      ))}

      {/* Movimento contínuo da pata no cursor (ver PataViva). */}
      <PataViva />

      <div className="hero-palco">
        {/*
          Dedos da pata. O rótulo fica FORA do recorte da foto, pendurado na
          borda de baixo: dentro do oval ele era cortado e cobria o pet.
        */}
        {hero.pata.map((dedo) => (
          <div key={dedo.src} className={`hero-dedo${dedo.destaque ? " hero-dedo--destaque" : ""}`}>
            <div className="hero-dedo-foto">
            <Image
              src={caminhoPublico(dedo.src)}
              alt={dedo.alt}
              fill
              sizes="200px"
              className="object-cover"
              style={{
                objectPosition: dedo.posicao,
                // Aproxima o recorte quando a foto tem cartaz ou rosto de pet na borda.
                transform: `scale(${dedo.zoom})`,
                transformOrigin: dedo.origem,
              }}
            />
            </div>
            <span className="hero-dedo-rotulo">{dedo.rotulo}</span>
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
                sizes="(max-width: 639px) 70vw, (max-width: 1023px) 45vw, 560px"
                className="hero-foto object-cover"
                style={
                  {
                    "--hero-pos": hero.foto.posicao,
                  } as React.CSSProperties
                }
              />
            </div>
          </Revelar>

          {/* O coração do logo, no canto da almofada. */}
          <svg aria-hidden className="hero-coracao" viewBox="0 0 32 30">
            <path
              d="M16 28 C 5 20, 1 13, 3 7.5 C 5 2.5, 11.5 1.8, 16 7 C 20.5 1.8, 27 2.5, 29 7.5 C 31 13, 27 20, 16 28 Z"
              fill="#e2463f"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      <div className="hero-copy relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-4 2xl:max-w-[1400px]">
        <div className="mx-auto max-w-[24rem] pt-7 pb-14 text-center sm:max-w-[34rem] sm:pt-10 lg:max-w-[36rem] lg:pb-0">
          <Revelar atraso={0.04}>
            <h1 className="hero-titulo font-display text-[2.25rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
              {/*
                No desktop cada trecho vira uma linha, quebrando por sentido
                ("Tudo para seu pet," / "onde ele se sente" / "em casa.").
                No celular o título corre normal.
              */}
              {tituloAntes.split(/(?<=,) /).map((trecho) => (
                <span key={trecho} className="hero-trecho">
                  {trecho}{" "}
                </span>
              ))}
              {tituloDestaque ? <span className="hero-trecho hero-destaque">{tituloDestaque}</span> : null}
            </h1>
          </Revelar>

          <Revelar atraso={0.08}>
            <p className="hero-sub mx-auto mt-3 max-w-[46ch] text-base leading-normal text-balance text-text-2 sm:leading-relaxed sm:mt-5 sm:text-lg lg:mt-4 lg:text-base xl:mt-5 xl:text-xl">
              <span className="sm:hidden">{hero.subheadCurta}</span>
              <span className="hidden sm:inline">
                {hero.subhead.split(/(?<=especialidades,) /).map((trecho) => (
                  <span key={trecho} className="block">
                    {trecho}
                  </span>
                ))}
              </span>
            </p>
          </Revelar>

          {/*
            `id` só marca posição: a barra fixa observa este ponto para saber
            quando o CTA saiu da tela. Não altera layout nem estilo.
          */}
          <Revelar atraso={0.16}>
            <div
              id="ancora-cta-hero"
              className="mx-auto mt-6 flex w-fit flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:mt-6 xl:mt-8"
            >
              <BotaoWhatsapp rotulo={hero.cta} />
              <a href={hero.ctaServicos.href} className="hero-cta-servicos cta-brilho relative">
                {hero.ctaServicos.rotulo}
                <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" fill="none">
                  <path d="M10 4v12m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Revelar>
        </div>
      </div>

    </section>
  );
}
