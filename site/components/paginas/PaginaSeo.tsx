import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Cabecalho } from "@/components/sections/Cabecalho";
import { Fechamento } from "@/components/sections/Fechamento";
import { Planos } from "@/components/sections/Planos";
import { Equipe } from "@/components/sections/Equipe";
import { Onda } from "@/components/ui/Onda";
import { Revelar } from "@/components/ui/Revelar";
import { ListaFaq } from "@/components/ui/ListaFaq";
import { BotaoFlutuante } from "@/components/ui/BotaoFlutuante";
import { BarraAgendamento } from "@/components/ui/BarraAgendamento";
import { CartaoDuvida } from "@/components/ui/CartaoDuvida";
import { linkWhatsapp } from "@/content/site";
import { TopoPagina } from "@/components/paginas/TopoPagina";
import { MioloBloco } from "@/components/paginas/Blocos";
import { DadosPagina } from "@/components/paginas/DadosPagina";
import { paginas, type Pagina, type ChavePagina } from "@/content/paginas";

type Tom = "base" | "alt" | "forte";
const corDoTom: Record<Tom, string> = {
  base: "var(--surface)",
  alt: "var(--surface-2)",
  forte: "var(--surface-3)",
};
const classeDoTom: Record<Tom, string> = {
  base: "bg-surface",
  alt: "bg-surface-2",
  forte: "bg-surface-3",
};

function Casca({
  tom,
  children,
  id,
  className = "",
}: {
  tom: Tom;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`fundo-patas relative ${classeDoTom[tom]} scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

/** Primeira frase do lead: o resumo que vai no cartão de "continue por aqui". */
function resumo(p: Pagina) {
  const frase = p.topo.lead.split(/(?<=\.)\s/)[0];
  return frase.length > 150 ? `${frase.slice(0, 147).trimEnd()}…` : frase;
}

/**
 * A página interna inteira: header, topo, blocos alternando tom com a onda da
 * parede do consultório entre eles (a mesma divisa da home), dúvidas,
 * relacionados e o mesmo fechamento escuro.
 *
 * O TOM é decidido aqui, em sequência, e não em cada bloco. As seções
 * reaproveitadas da home (Planos, Equipe) já trazem a própria cor e entram na
 * sequência com ela.
 */
/**
 * Sequência de tons, calculada ANTES de renderizar (função pura). Topo é
 * `base`; cada bloco alterna com o anterior, e depois vêm dúvidas e
 * relacionados. As seções reaproveitadas da home já trazem a própria cor.
 */
function sequenciaDeTons(blocos: Pagina["blocos"]) {
  const tons: Tom[] = [];
  let anterior: Tom = "base";
  const proximo = (): Tom => (anterior === "base" ? "alt" : "base");
  for (const bloco of blocos) {
    const tom: Tom = bloco.tipo === "planos" ? "alt" : bloco.tipo === "equipe" ? "forte" : proximo();
    tons.push(tom);
    anterior = tom;
  }
  const faq = proximo();
  anterior = faq;
  const relacionados = proximo();
  return { blocos: tons, faq, relacionados };
}

/**
 * A página interna inteira: header, topo, blocos alternando tom com a onda da
 * parede do consultório entre eles (a mesma divisa da home), dúvidas,
 * relacionados e o mesmo fechamento escuro.
 */
export function PaginaSeo({ pagina }: { pagina: Pagina }) {
  const tons = sequenciaDeTons(pagina.blocos);
  const tomFaq = tons.faq;
  const tomRel = tons.relacionados;
  /* A onda alterna de lado a cada divisa, como na home. */
  const nBlocos = pagina.blocos.length;

  const secoes = pagina.blocos.map((bloco, i) => {
    const tom = tons.blocos[i];
    const onda = <Onda cor={corDoTom[tom]} espelhar={i % 2 === 0} />;

    if (bloco.tipo === "planos") return <div key={i}>{onda}<Planos /></div>;
    if (bloco.tipo === "equipe") return <div key={i}>{onda}<Equipe /></div>;

    return (
      <div key={i}>
        {onda}
        {/* A chamada é um cartão só: centralizada na faixa entre as ondas. */}
        <Casca tom={tom} className={bloco.tipo === "chamada" ? "casca-chamada" : ""}>
          <MioloBloco bloco={bloco} />
        </Casca>
      </div>
    );
  });

  const relacionados = pagina.relacionados
    .map((chave) => paginas[chave as ChavePagina])
    .filter(Boolean);

  return (
    <>
      <DadosPagina pagina={pagina} />
      <Cabecalho />
      <main>
        <TopoPagina pagina={pagina} />
        {secoes}

        <Onda cor={corDoTom[tomFaq]} espelhar={nBlocos % 2 === 0} />
        {/* Sem a classe `faq-secao` da home (01/10/2026): ela põe as seções
            seguintes em camadas de GPU (truque de Safari para listas longas) e,
            nas emendas entre camadas, apareciam linhas de 1 a 2px. As listas
            daqui são curtas e não precisam disso. */}
        <Casca tom={tomFaq} id="duvidas">
          {/*
            A coluna da esquerda não fica mais só com o título (27/09/2026, JM:
            "espaço negativo na parte esquerda"). Embaixo dele entra a saída
            para quem não achou a própria dúvida: o horário ao vivo e o
            WhatsApp com a mensagem desta página. É o próximo passo natural de
            quem leu as perguntas, não enfeite para ocupar espaço.
          */}
          {/* As duas colunas no mesmo eixo horizontal (JM, 28/09/2026). */}
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <Revelar>
                <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                  {pagina.faq.titulo}
                </h2>
              </Revelar>
              <Revelar atraso={0.08}>
                <div className="mt-8">
                  <CartaoDuvida href={linkWhatsapp(pagina.topo.mensagemWhatsapp)} />
                </div>
              </Revelar>
            </div>
            <ListaFaq itens={pagina.faq.itens} />
          </div>
        </Casca>

        <Onda cor={corDoTom[tomRel]} espelhar={nBlocos % 2 === 1} />
        <Casca tom={tomRel}>
          <Revelar>
            <h2 className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
              Continue por aqui.
            </h2>
          </Revelar>
          <ul className="lista-compacta lista-compacta--sem-icone mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
            {relacionados.map((r, i) => (
              <li key={r.caminho} className="flex">
                <Revelar atraso={i * 0.05} className="flex w-full">
                  <Link href={r.caminho} className="cartao-pagina" data-link="">
                    <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">{r.rotulo}</p>
                    <p className="mt-3 leading-relaxed text-text-2">{resumo(r)}</p>
                    <span className="cartao-link mt-auto pt-5">
                      Ver página
                      <ArrowRightIcon size={14} weight="bold" aria-hidden />
                    </span>
                  </Link>
                </Revelar>
              </li>
            ))}
          </ul>
        </Casca>
        <Onda cor="#0b2129" espelhar={nBlocos % 2 === 0} />
      </main>
      <Fechamento />
      <BotaoFlutuante />
      <BarraAgendamento />
    </>
  );
}
