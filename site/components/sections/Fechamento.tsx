import Image from "next/image";
import Link from "next/link";
import { caminhoPublico } from "@/lib/caminho";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { ctaFinal, rodape, contato, navegacao } from "@/content/site";
import { rodapeServicos } from "@/content/paginas";


/**
 * Dobras 9 e 10 — CTA final e rodapé, no mesmo bloco escuro.
 *
 * É a ÚNICA inversão de tema da página, e ela fecha a página em vez de
 * interromper o scroll no meio (theme lock, ver globals.css).
 */
export function Fechamento() {
  return (
    // -mt-px, e não mt-px (01/10/2026): a margem de 1px abria uma fresta entre
    // a onda escura e este bloco, e o fundo claro aparecia como uma linha.
    // Sobrepondo 1px, a emenda some em todas as páginas.
    <div className="bloco-escuro -mt-px">
      {/* Patinhas da marca no fundo do convite final (JM, 16/09/2026). */}
      <section className="fechamento-patas fundo-patas relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-[52ch] text-center">
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
              {ctaFinal.headline}
            </h2>
          </Revelar>
          <Revelar atraso={0.06}>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              {ctaFinal.subhead}
            </p>
          </Revelar>
          <Revelar atraso={0.12}>
            {/* Maior que os demais de propósito: é o último pedido da página. */}
            <div className="mt-10 flex justify-center">
              <BotaoWhatsapp rotulo={ctaFinal.cta} tamanho="grande" />
            </div>
          </Revelar>
          <Revelar atraso={0.18}>
            <p className="mt-4 text-sm text-text-3">{ctaFinal.microcopy}</p>
          </Revelar>
        </div>
      </section>

      <footer className="border-t border-hairline px-5 py-12 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={caminhoPublico("/images/logo-caroline-keffer.jpg")}
                alt=""
                width={72}
                height={72}
                className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px]"
              />
              <span className="font-display text-[17px] leading-tight font-bold">
                Caroline Keffer
                <span className="block text-[13px] font-normal text-text-3">
                  Clínica Veterinária
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-text-3">
              {contato.endereco} · {contato.bairro}
            </p>
          </div>

          <nav aria-label="Seções" className="flex flex-col gap-3">
            {navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="-my-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>

          {/* As páginas internas (27/09/2026). Ficam no rodapé de TODAS as
              páginas: é o link rastreável que tira cada uma do isolamento, e
              o painel de serviços da home só mostra um link por vez. */}
          <nav aria-label="Serviços" className="flex flex-col gap-3">
            {rodapeServicos.map((item) => (
              <Link
                key={item.caminho}
                href={item.caminho}
                className="-my-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={contato.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
            >
              WhatsApp {contato.whatsappExibicao}
            </a>
            <a
              href={contato.telefoneFixoLink}
              className="-my-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
            >
              {contato.telefoneFixo}
            </a>
            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-2 flex items-center gap-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
            >
              <InstagramLogoIcon size={18} weight="light" aria-hidden />
              Instagram
            </a>
          </div>
        </div>

        {/*
          Três colunas iguais, e a assinatura na do MEIO (18/09/2026, JM): no
          canto direito ela ficava atrás do botão flutuante do WhatsApp. A
          terceira coluna fica vazia de propósito, para o centro ser o centro
          da página e não o meio do espaço que sobra ao lado do texto legal.
        */}
        <div className="mx-auto mt-12 grid w-full max-w-[1200px] gap-4 border-t border-hairline pt-6 text-xs text-text-3 sm:grid-cols-3 sm:items-center">
          <p className="text-center sm:text-left">{rodape.legal}</p>

          {/*
            Assinatura da MXC Digital (JM, 17/09/2026). A marca d'água atrás do
            crédito é o mesmo planeta do símbolo, em escala grande e quase
            invisível — assinatura, não anúncio.
          */}
          {/*
            ⚠️ LINK RASTREÁVEL (skill /rodape-rastreavel, 28/09/2026). O UTM em
            `rodape.agenciaUrl` é DE PROPÓSITO — não "limpe" o link: sem ele a
            visita cai em "direto" no GA4 da MXC e não dá para saber que veio
            daqui. E `rel` é só "noopener", SEM "noreferrer": o noreferrer apaga
            o referenciador, que é justamente o dado que interessa.
          */}
          <a
            href={rodape.agenciaUrl}
            target="_blank"
            rel="noopener"
            className="assinatura-mxc justify-self-center"
          >
            <span className="assinatura-texto">{rodape.credito}</span>
            <Image
              src={caminhoPublico("/images/mxc-digital.png")}
              alt={rodape.agencia}
              width={1046}
              height={238}
              sizes="150px"
              className="assinatura-marca"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
