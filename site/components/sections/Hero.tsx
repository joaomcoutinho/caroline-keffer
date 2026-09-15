import type React from "react";
import Image from "next/image";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { hero, prova } from "@/content/site";

/**
 * Dobra 1 — copy à esquerda, fachada à direita.
 *
 * 09/09/2026, segunda rodada (JM: "do jeito que está não consigo enxergar e
 * perceber nada da fachada, precisa estar bem visível logo de cara e com boa
 * qualidade, havendo uma integração profissional entre o lado esquerdo (copy) e
 * o lado direito (imagem 100%)").
 *
 * O que estava errado na versão anterior: a fachada era full-bleed atrás da
 * página inteira e levava por cima um véu forte, porque a copy escura precisava
 * de contraste em cima dela. Resultado: a foto virava fantasma. Véu suficiente
 * para o texto e foto visível são objetivos que brigam quando os dois ocupam o
 * MESMO espaço.
 *
 * A solução é não dividir o espaço: cada um tem o seu.
 *   - Esquerda: só superfície e copy, num bloco de 30rem. Zero foto embaixo.
 *   - Direita: fachada em opacidade CHEIA, começando onde o texto termina
 *     (ver `--hero-foto-x` no globals.css, 15/09/2026).
 *
 * A COSTURA entre as duas metades (refeita em 11/09/2026 — ver `.hero-mistura`
 * no globals.css). Era feita com três peças empilhadas: uma lâmina da cor da
 * superfície por cima da foto, um fio vertical de 1px marcando a divisa e um
 * brilho ciano do lado da copy. Três emendas a poucos pixels uma da outra, e a
 * do meio era um fio — ou seja, uma aresta reta bem no lugar que as outras duas
 * tentavam dissolver.
 *
 * Agora é UMA peça só: uma máscara na própria foto, com rampa smoothstep de 40%
 * da coluna. A imagem perde opacidade de verdade e a superfície da seção
 * aparece através dela. Não há lâmina de cor para descasar com o fundo, não há
 * fio, e a rampa não tem ponto de saturação visível.
 *
 * QUALIDADE: a foto é a de céu aberto (1001x1251, retrato). Numa coluna alta e
 * estreita ela entra quase sem recorte, e a densidade sobe muito em relação ao
 * full-bleed anterior — a mesma imagem que cobria 1440px agora cobre ~660px.
 *
 * `min-h-[100dvh]` (nunca `h-screen`: no iOS a barra do Safari faz a página
 * pular). O header é `fixed`, então a foto sobe até a borda superior da tela e
 * passa por trás da pílula.
 *
 * No MOBILE e no TABLET (15/09/2026, opção B escolhida pelo JM entre três
 * prévias): a fachada ocupa a tela inteira, recortada até o letreiro, e a copy
 * vai no pé, clara, sobre um véu escuro que só fecha embaixo. A tentativa
 * anterior, foto como coluna estreita à direita, escondia a fachada: nenhuma
 * parte do letreiro cabia numa coluna de 270px. As cores claras vêm da troca
 * de tokens em `.hero-copy` (globals.css), então botão e textos se adaptam sem
 * classe duplicada.
 *
 * A section é `flex flex-col justify-center` nos DOIS tamanhos, e não `lg:block`.
 * No desktop a foto é `absolute`, então sai do fluxo e sobra só a copy dentro do
 * flex — que é o que a centra verticalmente na dobra. Com `lg:block` ela grudava
 * no topo e deixava um vão morto embaixo.
 */
export function Hero() {
  const [nota, anos] = prova.itens;
  const selo = `${String(nota.alvo).replace(".", ",")} no Google · ${anos.alvo}${anos.sufixo} anos na Torre`;

  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-surface lg:justify-center"
    >
      {/* Patinhas: só do lado da copy no desktop. No celular a foto cobre tudo. */}
      <div
        aria-hidden
        className="fundo-patas pointer-events-none absolute inset-0 -z-10 hidden lg:right-[calc(100vw-var(--hero-foto-x))] lg:block"
      />

      {/*
        A FACHADA. No desktop é a metade direita, do topo ao rodapé da dobra.
        No celular e no tablet ocupa a tela inteira (opção B, escolhida pelo JM
        em 15/09/2026 entre três prévias).
      */}
      <div className="absolute inset-0 lg:left-[var(--hero-foto-x)]">
        <Revelar atraso={0.1} className="revelar-zoom h-full">
          {/*
            A máscara vai NO CONTÊINER da foto, não numa camada por cima: é o
            que faz a imagem dissolver no fundo da seção em vez de ser coberta
            por uma lâmina colorida. Ver `.hero-mistura` no globals.css. Só
            vale no desktop.
          */}
          <div className="hero-mistura relative h-full w-full">
            <Image
              src={caminhoPublico(hero.foto.src)}
              alt={hero.foto.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
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

        {/*
          VÉU do celular: um toque escuro no topo, para a pílula do header, o
          meio LIMPO, onde está o letreiro, e fecha escuro no pé, onde a copy
          clara precisa de contraste.
        */}
        <div aria-hidden className="hero-veu absolute inset-0 lg:hidden" />
      </div>

      <div className="hero-copy relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="pt-24 pb-10 sm:max-w-[36rem] sm:pb-14 lg:w-[var(--hero-copy-w)] lg:max-w-none lg:py-28">
          <Revelar>
            <p className="hero-rotulo text-xs font-semibold tracking-[0.08em] text-brand uppercase lg:hidden">
              {hero.rotuloMobile}
            </p>
          </Revelar>

          <Revelar atraso={0.04}>
            <h1 className="hero-titulo mt-2.5 font-display text-[2.25rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:mt-0 lg:text-[3.5rem]">
              {hero.headline}
            </h1>
          </Revelar>

          <Revelar atraso={0.08}>
            <p className="hero-sub mt-3 max-w-[46ch] text-base leading-relaxed text-text-2 sm:mt-5 sm:text-lg lg:mt-6">
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
              className="mt-6 flex flex-col items-start gap-3 sm:mt-8 lg:mt-9"
            >
              <BotaoWhatsapp rotulo={hero.cta} />
              <p className="hidden text-sm text-text-3 lg:block">{hero.ctaMicrocopy}</p>
              <p className="flex items-center gap-1.5 text-[0.8125rem] text-text-3 lg:hidden">
                <StarIcon size={14} weight="fill" className="text-[#f2b53a]" aria-hidden />
                {selo}
              </p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
