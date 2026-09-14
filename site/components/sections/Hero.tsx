import Image from "next/image";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { hero } from "@/content/site";

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
 *   - Esquerda (54%): só superfície e copy. Zero foto embaixo, então zero véu.
 *   - Direita (46%): fachada em opacidade CHEIA, sem tingimento e sem véu.
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
 * No MOBILE não há duas colunas: a foto vira uma faixa embaixo da copy, com
 * altura própria. Empilhar copy SOBRE foto era o que obrigava o véu no começo
 * desta história.
 *
 * A section é `flex flex-col justify-center` nos DOIS tamanhos, e não `lg:block`.
 * No desktop a foto é `absolute`, então sai do fluxo e sobra só a copy dentro do
 * flex — que é o que a centra verticalmente na dobra. Com `lg:block` ela grudava
 * no topo e deixava um vão morto embaixo.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-surface"
    >
      {/* Patinhas: só do lado da copy, nunca por cima da fachada. */}
      <div
        aria-hidden
        className="fundo-patas pointer-events-none absolute inset-0 -z-10 lg:right-[46%]"
      />

      {/*
        A FACHADA. No desktop é a metade direita, do topo ao rodapé da dobra.
        `absolute` para poder sangrar até as bordas sem esticar a linha da copy.
      */}
      <div className="relative order-2 h-[42vh] w-full shrink-0 sm:h-[46vh] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:h-auto lg:w-[46%]">
        <Revelar atraso={0.1} className="revelar-zoom h-full">
          {/*
            A máscara vai NO CONTÊINER da foto, não numa camada por cima: é o
            que faz a imagem dissolver no fundo da seção em vez de ser coberta
            por uma lâmina colorida. Ver `.hero-mistura` no globals.css.
          */}
          <div className="hero-mistura relative h-full w-full">
            <Image
              src={caminhoPublico(hero.foto.src)}
              alt={hero.foto.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
              style={{ objectPosition: hero.foto.posicao }}
            />
          </div>
        </Revelar>
      </div>

      <div className="relative order-1 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:order-none">
        <div className="pt-28 pb-10 sm:pt-32 sm:pb-12 lg:w-[52%] lg:py-28">
          <Revelar>
            <h1 className="font-display text-[2.6rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
          </Revelar>

          <Revelar atraso={0.08}>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-text-2">
              {hero.subhead}
            </p>
          </Revelar>

          {/*
            `id` só marca posição: a barra fixa observa este ponto para saber
            quando o CTA saiu da tela. Não altera layout nem estilo.
          */}
          <Revelar atraso={0.16}>
            <div
              id="ancora-cta-hero"
              className="mt-9 flex flex-col items-start gap-3"
            >
              <BotaoWhatsapp rotulo={hero.cta} />
              <p className="text-sm text-text-3">{hero.ctaMicrocopy}</p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
