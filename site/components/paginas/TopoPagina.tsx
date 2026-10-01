import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { CTA_PRIMARIO, contato, linkWhatsapp } from "@/content/site";
import type { Pagina } from "@/content/paginas";

/**
 * Topo das páginas internas.
 *
 * Não repete o hero da home (a pata com quatro fotos): aqui quem chega veio de
 * uma busca específica e quer a resposta, não a marca. Então: H1 com o
 * termo da busca, a resposta direta logo abaixo, o CTA e os três fatos que
 * decidem a visita (onde é, a nota, o horário). A foto é sangrada, como no
 * hero da home no celular (ver o comentário no JSX).
 *
 * A linha "em revisão clínica" saiu do topo em 01/10/2026 (a Dra. Carol já
 * está validando). A data segue no JSON-LD (`dateModified`), e `reviewedBy`
 * entra quando `revisao.por` for preenchido em content/paginas.ts.
 */
export function TopoPagina({ pagina }: { pagina: Pagina }) {
  const { topo } = pagina;

  const foto = topo.foto;
  const enquadramento = {
    "--pos-d": foto.posicao ?? "50% 30%",
    "--pos-m": foto.posicaoCelular ?? foto.posicao ?? "50% 30%",
  } as React.CSSProperties;

  return (
    /*
      TOPO "FOTO SANGRADA" (opção H1, escolhida pelo JM em 30/09/2026). É o
      mesmo gesto do hero da home no celular: a foto vai de ponta a ponta, sobe
      por trás do header e se DISSOLVE na cor da página, e o título nasce
      dentro dessa dissolução — foto e copy viram uma peça só.
      No desktop fica o padrão de antes: copy à esquerda, foto no oval.
      Enquadramento por página em `topo.foto.posicao` (desktop) e
      `posicaoCelular` (celular), para o assunto ficar sempre à vista.
    */
    <section className="topo-sangrado fundo-patas">
      <div className="topo-sangrado-foto">
        <Image
          src={caminhoPublico(foto.src)}
          alt={foto.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover${foto.srcCelular ? " hidden lg:block" : ""}`}
          style={enquadramento}
        />
        {/* Foto própria do celular, quando o rosto da principal ficaria atrás da navbar. */}
        {foto.srcCelular ? (
          <Image
            src={caminhoPublico(foto.srcCelular)}
            alt={foto.altCelular ?? foto.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover lg:hidden"
            style={enquadramento}
          />
        ) : null}
      </div>

      <div className="topo-sangrado-copy">
        <Revelar>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">
            {topo.sobretitulo}
          </p>
        </Revelar>
        <Revelar atraso={0.04}>
          <h1 className="mt-3 font-display text-[2.05rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
            {topo.h1}
          </h1>
        </Revelar>
        <Revelar atraso={0.08}>
          <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-text-2 sm:mt-5 sm:text-xl">
            {topo.lead}
          </p>
        </Revelar>
        <Revelar atraso={0.12}>
          {/* Mesma âncora do hero da home: quando este CTA sai da tela, a
              barra fixa de agendamento do celular aparece (BarraAgendamento). */}
          <div id="ancora-cta-hero" className="mt-6 sm:mt-7">
            <BotaoWhatsapp rotulo={CTA_PRIMARIO} href={linkWhatsapp(topo.mensagemWhatsapp)} />
          </div>
        </Revelar>
        <Revelar atraso={0.16}>
          {/*
            A FICHA DA CLÍNICA (01/10/2026, JM: as três pílulas tinham "cara de
            IA"). Sem cápsula, sem fundo: rótulo pequeno em cima, o dado
            embaixo, e um fio entre um e outro, como numa placa de endereço.
            O endereço abre a clínica no Google Maps.
          */}
          <dl className="topo-ficha mt-8">
            <div>
              <dt>Onde fica</dt>
              <dd>
                <a href={contato.mapa} target="_blank" rel="noopener noreferrer" className="topo-ficha-link">
                  {/* No celular só o bairro, para os três caberem numa linha. */}
                  <span className="hidden sm:inline">{contato.endereco}, </span>Torre
                </a>
              </dd>
            </div>
            <div>
              <dt>No Google</dt>
              <dd>
                <StarIcon size={14} weight="fill" aria-hidden className="topo-ficha-estrela" />
                4,8 de 5
              </dd>
            </div>
            <div>
              <dt>Atende</dt>
              <dd>Seg a sáb</dd>
            </div>
          </dl>
        </Revelar>
      </div>
    </section>
  );
}
