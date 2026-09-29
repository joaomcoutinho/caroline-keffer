import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { StatusHorario } from "@/components/ui/StatusHorario";
import { Icone } from "@/components/paginas/Icone";
import { PainelAgora } from "@/components/paginas/PainelAgora";
import { CTA_PRIMARIO, linkWhatsapp } from "@/content/site";
import type { Bloco } from "@/content/paginas";

/*
  DESTAQUES DAS PÁGINAS INTERNAS (27/09/2026). Substituem a "ficha" de dois
  painéis (painel escuro, etiqueta em pílula e traçado animado), que o JM
  reprovou como genérica. A regra agora é a do resto do site: título FORA do
  cartão, no estilo das outras seções, e o cartão guardando só o que é útil —
  sinais que se leem num relance, a decisão pronta, a comparação lado a lado.
  Nenhuma animação além da entrada (Revelar).
*/

function Titulo({ children, intro, nivel = "h2" }: { children: string; intro?: string; nivel?: "h2" | "h3" }) {
  const T = nivel;
  return (
    <div className="max-w-[56ch]">
      <Revelar>
        <T className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
          {children}
        </T>
      </Revelar>
      {intro ? (
        <Revelar atraso={0.06}>
          <p className="mt-4 text-lg leading-relaxed text-text-2">{intro}</p>
        </Revelar>
      ) : null}
    </div>
  );
}

/** Um sinal por linha: ícone no ladrilho, o sinal em peso, o detalhe apagado. */
function ListaSinais({ sinais }: { sinais: readonly { titulo: string; detalhe?: string; icone: string }[] }) {
  return (
    <ul className="sinais-lista vidro">
      {sinais.map((s) => (
        <li key={s.titulo} className="sinal-linha">
          <span className="sinal-icone" aria-hidden>
            <Icone nome={s.icone} tamanho={22} />
          </span>
          <span>
            <span className="sinal-titulo">{s.titulo}</span>
            {s.detalhe ? <span className="sinal-detalhe">{s.detalhe}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function BlocoEmergencia({ bloco }: { bloco: Extract<Bloco, { tipo: "aviso" }> }) {
  return (
    <>
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <Revelar atraso={0.1} className="mt-10">
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <ListaSinais sinais={bloco.sinais} />
          <PainelAgora />
        </div>
      </Revelar>
    </>
  );
}

/* Ícone por sinal de alerta do preventivo, na ordem de `preventivo.etapas[alerta].itens`. */
const iconesAlerta = ["drop", "scales", "wind", "tooth"];

/** Sinais de alerta do check-up: a lista e, ao lado, o próximo passo. */
export function SinaisAlerta({ titulo, itens }: { titulo: string; itens: readonly string[] }) {
  return (
    <div className="mt-16">
      <Titulo nivel="h3">{titulo}</Titulo>
      <Revelar atraso={0.1} className="mt-8">
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <ListaSinais sinais={itens.map((t, i) => ({ titulo: t, icone: iconesAlerta[i] ?? "warning" }))} />
          <div className="agora flex flex-col justify-center">
            <p className="font-display text-xl font-bold">Viu um desses em casa?</p>
            <p className="mt-2 leading-relaxed text-text-2">
              Não espere o próximo check-up. Conte o que está acontecendo e a gente encaixa a consulta.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BotaoWhatsapp
                rotulo={CTA_PRIMARIO}
                tamanho="compacto"
                href={linkWhatsapp("Olá! Vim pela página de check-up. Notei um sinal no meu pet e queria marcar uma consulta.")}
              />
              <StatusHorario />
            </div>
          </div>
        </div>
      </Revelar>
    </div>
  );
}

/** É × Não é: título à esquerda, a comparação no cartão à direita (mesmo grid das dúvidas). */
export function BlocoLimites({ bloco }: { bloco: Extract<Bloco, { tipo: "limites" }> }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      <Revelar atraso={0.1}>
        <div className="limites vidro">
          <div className="limites-colunas">
            <div>
              <p className="limites-titulo">{bloco.e.titulo}</p>
              <ul className="limites-lista">
                {bloco.e.itens.map((item) => (
                  <li key={item}>
                    <span className="limites-marca" data-tipo="sim" aria-hidden>
                      <CheckIcon size={12} weight="bold" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="limites-titulo" data-tipo="nao">{bloco.naoE.titulo}</p>
              <ul className="limites-lista">
                {bloco.naoE.itens.map((item) => (
                  <li key={item}>
                    <span className="limites-marca" data-tipo="nao" aria-hidden>
                      <XIcon size={12} weight="bold" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="limites-rodape">
            <ArrowRightIcon size={16} weight="bold" aria-hidden />
            {bloco.rodape}
          </p>
        </div>
      </Revelar>
    </div>
  );
}

/*
  PERFIS: quem tem mais risco. Foto real da clínica no oval de aro branco (o
  mesmo da equipe), a condição como sobretítulo, e as raças como texto corrido
  — sem etiqueta em pílula.
*/
const listaPt = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" });

export function BlocoPerfis({ bloco }: { bloco: Extract<Bloco, { tipo: "perfis" }> }) {
  return (
    <>
      {/* Centralizado, no eixo das fichas embaixo. */}
      <div className="mx-auto flex max-w-[56ch] justify-center text-center">
        <Titulo intro={bloco.intro}>{bloco.titulo}</Titulo>
      </div>
      <ul className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
        {bloco.itens.map((p, i) => (
          <li key={p.titulo} className="flex">
            <Revelar atraso={0.06 + i * 0.06} className="flex w-full">
              <article className="perfil">
                <div className="moldura-pata relative aspect-5/4 w-full">
                  <Image
                    src={caminhoPublico(p.foto.src)}
                    alt={p.foto.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 360px"
                    className="object-cover"
                    style={p.foto.posicao ? { objectPosition: p.foto.posicao } : undefined}
                  />
                </div>
                <p className="perfil-condicao">{p.condicao}</p>
                <h3 className="perfil-titulo font-display text-[1.35rem] leading-snug font-bold text-balance">{p.titulo}</h3>
                <p className="mx-auto mt-3 max-w-[34ch] flex-1 leading-relaxed text-text-2">{p.texto}</p>
                <div className="perfil-racas">
                  <p className="perfil-racas-rotulo">Raças mais afetadas</p>
                  {/* Frase, não lista com separador: quebra de linha nunca começa num "·". */}
                  <p className="perfil-racas-nomes">{listaPt.format(p.racas)}</p>
                </div>
              </article>
            </Revelar>
          </li>
        ))}
      </ul>
      {bloco.nota ? (
        <Revelar atraso={0.2}>
          <Link href={bloco.nota.href} className="perfil-nota">
            <span className="perfil-nota-icone" aria-hidden>
              <Icone nome={bloco.nota.icone} tamanho={24} />
            </span>
            <p className="min-w-0 flex-1">{bloco.nota.texto}</p>
            <span className="perfil-nota-link">
              {bloco.nota.rotuloLink}
              <ArrowRightIcon size={14} weight="bold" aria-hidden />
            </span>
          </Link>
        </Revelar>
      ) : null}
    </>
  );
}

/** Faixa de chamada: pergunta, resposta curta e o botão que resolve. */
export function BlocoChamada({ bloco }: { bloco: Extract<Bloco, { tipo: "chamada" }> }) {
  return (
    <Revelar>
      <div className="chamada">
        <span className="chamada-icone" aria-hidden>
          <Icone nome={bloco.icone} tamanho={28} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-balance sm:text-[1.75rem]">
            {bloco.titulo}
          </h2>
          <p className="mt-2 max-w-[60ch] leading-relaxed text-text-2">{bloco.texto}</p>
        </div>
        <BotaoWhatsapp rotulo={bloco.rotuloBotao} href={linkWhatsapp(bloco.mensagem)} className="shrink-0" />
      </div>
    </Revelar>
  );
}
