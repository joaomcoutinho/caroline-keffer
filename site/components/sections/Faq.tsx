import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { ItemFaq } from "@/components/ui/ItemFaq";
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
 * fechado.
 *
 * A SEÇÃO continua sendo servidor — só o item é cliente (`ItemFaq`), porque o
 * que precisa de JS é a animação de abrir e fechar, não o texto. Assim as
 * perguntas e respostas seguem no HTML servido, que é o que alimenta o schema
 * FAQPage e a leitura do Google.
 */
export function Faq() {
  return (
    <Secao id="duvidas" tom="base">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
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
              <ItemFaq pergunta={item.pergunta} resposta={item.resposta} />
            </Revelar>
          ))}
        </div>
      </div>
    </Secao>
  );
}
