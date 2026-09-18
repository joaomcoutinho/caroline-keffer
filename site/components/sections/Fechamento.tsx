import Image from "next/image";
import { caminhoPublico } from "@/lib/caminho";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Revelar } from "@/components/ui/Revelar";
import { ctaFinal, rodape, contato, navegacao } from "@/content/site";

/**
 * Dobras 9 e 10 — CTA final e rodapé, no mesmo bloco escuro.
 *
 * É a ÚNICA inversão de tema da página, e ela fecha a página em vez de
 * interromper o scroll no meio (theme lock, ver globals.css).
 */
export function Fechamento() {
  return (
    <div className="bloco-escuro mt-px">
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
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
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

          <nav className="flex flex-col gap-3">
            {navegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="-my-2 py-2.5 text-sm text-text-2 transition-colors hover:text-acao-texto"
              >
                {item.rotulo}
              </a>
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

        <div className="mx-auto mt-12 flex w-full max-w-[1200px] flex-col gap-2 border-t border-hairline pt-6 text-xs text-text-3 sm:flex-row sm:justify-between">
          <p>{rodape.legal}</p>
          <p>{rodape.credito}</p>
        </div>
      </footer>
    </div>
  );
}
