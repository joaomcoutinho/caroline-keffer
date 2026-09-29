import Image from "next/image";
import { ClockIcon, MapPinIcon, StarIcon, StethoscopeIcon } from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { CTA_PRIMARIO, contato, linkWhatsapp } from "@/content/site";
import type { Pagina } from "@/content/paginas";

/** "2026-09-27" → "27/09/2026", sem depender do fuso de quem gera o build. */
function dataBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/**
 * Topo das páginas internas.
 *
 * Não repete o hero da home (a pata com quatro fotos): aqui quem chega veio de
 * uma busca específica e quer a resposta, não a marca. Então: H1 com o
 * termo da busca, a resposta direta logo abaixo, o CTA e os três fatos que
 * decidem a visita (onde é, a nota, o horário). A foto vem no oval com aro
 * branco, o mesmo vocabulário das fotos da home.
 *
 * A linha de revisão é exigência de nicho YMYL: quem assina e quando. Enquanto
 * a Dra. Carol não revisar, ela DIZ que está pendente — nunca finge.
 */
export function TopoPagina({ pagina }: { pagina: Pagina }) {
  const { topo, revisao } = pagina;

  return (
    <section className="topo-pagina fundo-patas relative bg-surface px-5 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          {/* Sem trilha de navegação no topo (JM, 27/09/2026). */}
          <Revelar>
            <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">
              {topo.sobretitulo}
            </p>
          </Revelar>
          <Revelar atraso={0.08}>
            <h1 className="mt-3 font-display text-4xl leading-[1.06] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
              {topo.h1}
            </h1>
          </Revelar>
          <Revelar atraso={0.12}>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-text-2 sm:text-xl">
              {topo.lead}
            </p>
          </Revelar>
          <Revelar atraso={0.16}>
            {/* Mesma âncora do hero da home: quando este CTA sai da tela, a
                barra fixa de agendamento do celular aparece (BarraAgendamento). */}
            <div id="ancora-cta-hero" className="mt-8">
              <BotaoWhatsapp rotulo={CTA_PRIMARIO} href={linkWhatsapp(topo.mensagemWhatsapp)} />
            </div>
          </Revelar>
          <Revelar atraso={0.2}>
            <ul className="topo-fatos mt-8">
              <li>
                <MapPinIcon size={16} weight="fill" aria-hidden />
                {contato.endereco} · Torre, Recife
              </li>
              <li>
                <StarIcon size={16} weight="fill" aria-hidden />
                4,8 no Google
              </li>
              <li>
                <ClockIcon size={16} weight="fill" aria-hidden />
                Seg a sáb
              </li>
            </ul>
          </Revelar>
          <Revelar atraso={0.24}>
            <p className="topo-revisao mt-6" data-pendente={revisao.por ? undefined : ""}>
              <StethoscopeIcon size={16} weight="light" aria-hidden />
              {revisao.por ? (
                <span>
                  Revisado por {revisao.por} em <time dateTime={revisao.data}>{dataBr(revisao.data)}</time>
                </span>
              ) : (
                <span>
                  Conteúdo em revisão clínica pela Dra. Caroline Keffer · atualizado em{" "}
                  <time dateTime={revisao.data}>{dataBr(revisao.data)}</time>
                </span>
              )}
            </p>
          </Revelar>
        </div>

        <Revelar atraso={0.1}>
          <div className="moldura-pata relative mx-auto aspect-4/5 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px]">
            <Image
              src={caminhoPublico(topo.foto.src)}
              alt={topo.foto.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
              style={topo.foto.posicao ? { objectPosition: topo.foto.posicao } : undefined}
            />
          </div>
        </Revelar>
      </div>
    </section>
  );
}
