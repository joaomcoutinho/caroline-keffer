import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  DogIcon,
  HeartbeatIcon,
  PawPrintIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { caminhoPublico } from "@/lib/caminho";
import { Revelar } from "@/components/ui/Revelar";
import { Trilho } from "@/components/ui/Trilho";
import { Icone } from "@/components/paginas/Icone";
import { PassosCaminho } from "@/components/paginas/PassosCaminho";
import { BlocoChamada, BlocoEmergencia, BlocoLimites, BlocoPerfis, SinaisAlerta } from "@/components/paginas/Destaques";
import { preventivo } from "@/content/site";
import { especialistas, type Bloco, type Cartao } from "@/content/paginas";

/*
  Blocos das páginas internas. Cada um é SÓ o miolo: a casca da seção (fundo,
  respiro, onda) é do PaginaSeo, que alterna os tons em sequência. Assim nenhum
  bloco decide a própria cor e a página sempre alterna, como a home.

  Todos são servidor: o texto sai no HTML da primeira resposta, que é o que o
  Google e a IA leem. Nada aqui esconde conteúdo atrás de clique.
*/

function Titulo({ children, intro }: { children: string; intro?: string }) {
  return (
    <div className="max-w-[52ch]">
      <Revelar>
        <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
          {children}
        </h2>
      </Revelar>
      {intro ? (
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">{intro}</p>
        </Revelar>
      ) : null}
    </div>
  );
}

function ConteudoCartao({ cartao }: { cartao: Cartao }) {
  return (
    <>
      <span className="cartao-icone">
        <Icone nome={cartao.icone} />
      </span>
      <h3 className="mt-5 font-display text-xl leading-snug font-bold text-balance">{cartao.titulo}</h3>
      <p className="mt-2 leading-relaxed text-text-2">{cartao.texto}</p>
      {cartao.href ? (
        <span className="cartao-link mt-auto pt-5">
          {cartao.rotuloLink ?? "Saiba mais"}
          <ArrowRightIcon size={14} weight="bold" aria-hidden />
        </span>
      ) : null}
    </>
  );
}

function BlocoCartoes({ bloco }: { bloco: Extract<Bloco, { tipo: "cartoes" }> }) {
  /*
    Flex com quebra, e não grid (27/09/2026, JM): a última fileira incompleta
    fica CENTRALIZADA no eixo das de cima (5 cartões = 3 em cima, 2 no meio
    embaixo). No grid ela encostava à esquerda. A largura de cada cartão
    desconta os vãos (gap-4 = 1rem; lg:gap-5 = 1.25rem).
  */
  const largura =
    bloco.colunas === 2
      ? "sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-1.25rem)/2)]"
      : "sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2.5rem)/3)]";
  return (
    <>
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <ul className="lista-compacta mt-10 flex flex-wrap justify-center gap-4 lg:gap-5">
        {bloco.itens.map((c, i) => {
          const externo = c.href?.startsWith("http");
          return (
            <li key={c.titulo} className={`flex w-full ${largura}`}>
              <Revelar atraso={i * 0.04} className="flex w-full">
                {c.href && externo ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="cartao-pagina" data-link="">
                    <ConteudoCartao cartao={c} />
                  </a>
                ) : c.href ? (
                  <Link href={c.href} className="cartao-pagina" data-link="">
                    <ConteudoCartao cartao={c} />
                  </Link>
                ) : (
                  <div className="cartao-pagina">
                    <ConteudoCartao cartao={c} />
                  </div>
                )}
              </Revelar>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function BlocoPassos({ bloco }: { bloco: Extract<Bloco, { tipo: "passos" }> }) {
  /*
    Título em cima e o caminho na largura toda (27/09/2026, JM: "espaço
    negativo na parte esquerda"). No desktop os passos correm na horizontal,
    como uma linha do tempo, e o fio se desenha da esquerda para a direita;
    no celular voltam a ser a lista vertical. Título parado, sem sticky.
  */
  return (
    <>
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <div className="mt-10">
        <PassosCaminho itens={bloco.itens} />
      </div>
    </>
  );
}

function Paragrafos({ itens, centro = false }: { itens: readonly string[]; centro?: boolean }) {
  return (
    <>
      {itens.map((p, i) => (
        <Revelar key={p} atraso={0.06 + i * 0.04}>
          <p className={`mt-5 max-w-[62ch] text-lg leading-relaxed text-text-2 ${centro ? "mx-auto" : ""}`}>{p}</p>
        </Revelar>
      ))}
    </>
  );
}

function BlocoTexto({ bloco }: { bloco: Extract<Bloco, { tipo: "texto" }> }) {
  /*
    SEM FOTO: bloco centralizado no eixo da página (27/09/2026, JM:
    "centralizar melhor esse texto"). Encostado à esquerda, metade da seção
    ficava vazia. A lista, quando existe, vira etiquetas em pílula — lista
    com marcador centralizada não se lê.
  */
  if (!bloco.foto) {
    return (
      <div className="mx-auto max-w-[760px] text-center">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {bloco.titulo}
          </h2>
        </Revelar>
        <Paragrafos itens={bloco.paragrafos} centro />
        {bloco.lista ? (
          <Revelar atraso={0.14}>
            <ul className="texto-etiquetas mt-8">
              {bloco.lista.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Revelar>
        ) : null}
      </div>
    );
  }

  return (
    /* Texto e foto como UM conjunto centralizado na página (01/10/2026, JM:
       "centralizar os textos e imagem nessa seção"). Com colunas em fr, a foto
       (360px) ficava no meio de uma coluna mais larga e sobrava vão à direita. */
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,640px)_360px] lg:justify-center lg:gap-24">
      <div>
        <Titulo>{bloco.titulo}</Titulo>
        <Paragrafos itens={bloco.paragrafos} />
        {bloco.causas ? (
          <Revelar atraso={0.14}>
            {/* Causas em cartão (28/09/2026, JM: "mais destacado e intuitivo"). */}
            <ul className="causas mt-8">
              {bloco.causas.map((c) => (
                <li key={c.titulo} className="causa" data-destaque={c.selo ? "" : undefined}>
                  <span className="causa-icone" aria-hidden>
                    <Icone nome={c.icone} tamanho={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="causa-titulo">
                      {c.titulo}
                      {c.selo ? <span className="causa-selo">{c.selo}</span> : null}
                    </p>
                    <p className="causa-detalhe">{c.detalhe}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Revelar>
        ) : null}
        {bloco.lista ? (
          <Revelar atraso={0.14}>
            <ul className="mt-7 grid gap-3">
              {bloco.lista.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed text-text-2">
                  <span className="lista-check" aria-hidden>
                    <CheckIcon size={12} weight="bold" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Revelar>
        ) : null}
      </div>
      <Revelar atraso={0.1}>
        <div className="moldura-pata relative mx-auto aspect-4/5 w-full max-w-[360px]">
          <Image
            src={caminhoPublico(bloco.foto.src)}
            alt={bloco.foto.alt}
            fill
            sizes="(max-width: 1024px) 80vw, 360px"
            className="object-cover"
            style={bloco.foto.posicao ? { objectPosition: bloco.foto.posicao } : undefined}
          />
        </div>
      </Revelar>
    </div>
  );
}

/*
  As fases do check-up, TODAS abertas. Na home a mesma informação é um seletor
  (uma fase por vez); aqui é a página inteira sobre isso, e conteúdo atrás de
  clique não entra no HTML que o buscador lê. O dado é o mesmo `preventivo`.
*/
const iconesFase: Record<string, Icon> = {
  filhote: PawPrintIcon,
  adulto: DogIcon,
  setemais: HeartbeatIcon,
  alerta: WarningCircleIcon,
};

function BlocoFases({ bloco }: { bloco: Extract<Bloco, { tipo: "fases" }> }) {
  const fases = preventivo.etapas.filter((e) => e.id !== "alerta");
  const alerta = preventivo.etapas.find((e) => e.id === "alerta");

  return (
    <>
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <Trilho ordenada className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {fases.map((f, i) => {
          const IconeFase = iconesFase[f.id] ?? PawPrintIcon;
          return (
            <li key={f.id} className="flex">
              <Revelar atraso={i * 0.05} className="flex w-full">
                <article className="cartao-pagina">
                  <span className="cartao-icone">
                    <IconeFase size={22} weight="light" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug font-bold">{f.rotulo}</h3>
                  <p className="text-sm font-semibold text-brand">{f.detalhe}</p>
                  <ul className="mt-4 grid gap-3 border-t border-hairline pt-4">
                    {f.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-text-2">
                        <span className="lista-check mt-1" aria-hidden>
                          <CheckIcon size={10} weight="bold" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Revelar>
            </li>
          );
        })}
      </Trilho>

      {alerta ? <SinaisAlerta titulo="Sinais de alerta: não espere o check-up." itens={alerta.itens} /> : null}
    </>
  );
}

/*
  AS ESPECIALIDADES DA CLÍNICA (29/09/2026). A clínica confirmou que a
  equipe fixa são a Dra. Carol e a Dra. Isa, e que especialidades e exames de
  imagem chegam com médicos volantes, em dias agendados. O bloco deixou de
  mostrar cinco retratos "a confirmar" (promessa de gente que não é da casa) e
  passou a mostrar as cinco especialidades, cada uma levando à sua página.
  Por decisão do JM, o texto público não fala de dias nem de médico volante.
*/
function BlocoEspecialistas({ bloco }: { bloco: Extract<Bloco, { tipo: "especialistas" }> }) {
  return (
    <>
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <ul className="lista-compacta mt-10 flex flex-wrap justify-center gap-4 lg:gap-5">
        {especialistas.map((e, i) => (
          <li key={e.especialidade} className="flex w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-5rem)/5)]">
            <Revelar atraso={i * 0.04} className="flex w-full">
              <Link href={e.caminho} className="cartao-pagina" data-link="">
                <span className="cartao-icone">
                  <Icone nome={e.icone} />
                </span>
                <h3 className="mt-5 font-display text-lg leading-snug font-bold">{e.especialidade}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-text-2">{e.resumo}</p>
                <span className="cartao-link mt-auto pt-4">
                  Ver especialidade
                  <ArrowRightIcon size={14} weight="bold" aria-hidden />
                </span>
              </Link>
            </Revelar>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Renderiza o miolo de um bloco de conteúdo. Planos e equipe são seções inteiras, tratadas no PaginaSeo. */
export function MioloBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case "cartoes":
      return <BlocoCartoes bloco={bloco} />;
    case "passos":
      return <BlocoPassos bloco={bloco} />;
    case "texto":
      return <BlocoTexto bloco={bloco} />;
    case "aviso":
      return <BlocoEmergencia bloco={bloco} />;
    case "limites":
      return <BlocoLimites bloco={bloco} />;
    case "perfis":
      return <BlocoPerfis bloco={bloco} />;
    case "chamada":
      return <BlocoChamada bloco={bloco} />;
    case "fases":
      return <BlocoFases bloco={bloco} />;
    case "especialistas":
      return <BlocoEspecialistas bloco={bloco} />;
    default:
      return null;
  }
}
