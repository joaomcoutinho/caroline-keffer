import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { ListaFaq } from "@/components/ui/ListaFaq";
import { CartaoDuvida } from "@/components/ui/CartaoDuvida";
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
 * A SEÇÃO continua sendo servidor — só a lista é cliente (`ListaFaq`), porque o
 * que precisa de JS é saber qual pergunta está aberta e animar, não o texto. Assim as
 * perguntas e respostas seguem no HTML servido, que é o que alimenta o schema
 * FAQPage e a leitura do Google.
 */
export function Faq() {
  return (
    <Secao id="duvidas" tom="base" className="faq-secao">
      {/* As duas colunas no mesmo eixo horizontal, como nas páginas internas (28/09/2026). */}
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
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
          {/* Mesmo cartão das páginas internas: a coluna não fica vazia (27/09/2026). */}
          <Revelar atraso={0.12}>
            <div className="mt-8 max-w-[440px]">
              <CartaoDuvida />
            </div>
          </Revelar>
        </div>

        <ListaFaq itens={faq.itens} />
      </div>
    </Secao>
  );
}
