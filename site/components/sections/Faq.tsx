import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { faq } from "@/content/site";

/**
 * Dobra de dúvidas.
 *
 * Cada pergunta é uma objeção do brief, então esta dobra trabalha duas vezes:
 * quebra a objeção antes do WhatsApp e alimenta o schema FAQPage, que é o que
 * faz a resposta aparecer direto na busca do Google (ver DadosEstruturados).
 *
 * Construída com `<details>`/`<summary>` nativos: abre e fecha sem JavaScript,
 * já vem com semântica e teclado corretos, e o Google lê o conteúdo mesmo
 * fechado. A altura anima via `interpolate-size`, com degradação limpa onde
 * ainda não houver suporte.
 */
export function Faq() {
  return (
    <Secao id="duvidas" tom="base">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              {faq.headline}
            </h2>
          </Revelar>
          <Revelar atraso={0.06}>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-text-2">
              {faq.subhead}
            </p>
          </Revelar>
        </div>

        <div className="divide-y divide-hairline border-t border-b border-hairline">
          {faq.itens.map((item, i) => (
            <Revelar key={item.pergunta} atraso={i * 0.05}>
              <details className="faq-item group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
                  <span className="font-display text-lg leading-snug font-medium text-balance transition-colors duration-200 group-hover:text-brand">
                    {item.pergunta}
                  </span>
                  <span className="faq-sinal mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-brand transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-soft)] group-hover:border-brand">
                    <PlusIcon size={16} weight="bold" aria-hidden />
                  </span>
                </summary>
                <div className="faq-corpo">
                  <p className="max-w-[58ch] pb-6 leading-relaxed text-text-2">
                    {item.resposta}
                  </p>
                </div>
              </details>
            </Revelar>
          ))}
        </div>
      </div>
    </Secao>
  );
}
