import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { depoimentos } from "@/content/site";

/** Deslocamento vertical por item: quebra a grade de três cards iguais. */
const deslocamento = ["lg:mt-0", "lg:mt-10", "lg:mt-20"];

/**
 * Dobra 7 — três citações reais do Google, curtas, escalonadas.
 * Sem foto de avatar (não existe) e sem nome completo (as avaliações são públicas
 * só com iniciais). A fonte é a atribuição honesta.
 */
export function Depoimentos() {
  return (
    <Secao tom="base">
      <Revelar>
        <h2 className="max-w-[24ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
          {depoimentos.headline}
        </h2>
      </Revelar>

      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
        {depoimentos.itens.map((item, i) => (
          <Revelar key={item.texto} atraso={i * 0.08} className={deslocamento[i]}>
            <figure className="border-l-2 border-brand pl-6">
              <blockquote className="font-display text-xl leading-snug font-medium text-balance">
                {item.texto}
              </blockquote>
              <figcaption className="mt-4 text-sm text-text-3">{item.fonte}</figcaption>
            </figure>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}
