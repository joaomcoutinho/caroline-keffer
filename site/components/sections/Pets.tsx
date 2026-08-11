import { HandSwipeRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { Midia } from "@/components/ui/Midia";
import { pets } from "@/content/site";

/**
 * Galeria dos pets atendidos, em faixa contínua.
 *
 * A grade anterior misturava três coisas ao mesmo tempo — proporção diferente
 * por foto, duas células ocupando o dobro da largura e slots vazios — e isso
 * lia como ruído, não como ritmo. Aqui todas as fotos têm a MESMA altura e a
 * mesma proporção, deslizando sem fim: a repetição é o que passa acervo grande,
 * que é justamente a autoridade que a dobra precisa transmitir.
 *
 * A lista é duplicada no DOM para o loop não ter emenda visível. A cópia é
 * `aria-hidden`, então o leitor de tela lê os pets uma vez só.
 *
 * A animação pausa no hover, para dar tempo de olhar o pet que chamou atenção.
 */
export function Pets() {
  const comFoto = pets.itens.filter((item) => item.src);
  const fila = [...comFoto, ...comFoto];

  return (
    <Secao tom="alt" className="overflow-hidden">
      <div className="max-w-[40ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {pets.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">{pets.subhead}</p>
        </Revelar>
      </div>

      <Revelar atraso={0.12} className="mt-12">
        {/* Sangra até as bordas da tela: faixa cortada reforça que há mais. */}
        <div className="faixa-pets -mx-5 sm:-mx-8">
          <ul className="faixa-pets-trilho">
            {fila.map((item, i) => (
              <li
                key={`${item.src}-${i}`}
                aria-hidden={i >= comFoto.length}
                className="faixa-pets-item"
              >
                <Midia
                  src={item.src}
                  alt={item.alt}
                  briefing={item.briefing}
                  posicao={item.posicao || undefined}
                  proporcao="4 / 5"
                  className="h-full w-full"
                />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm text-text-3 lg:hidden">
          <HandSwipeRightIcon
            size={18}
            weight="light"
            className="dica-arraste shrink-0 text-brand"
            aria-hidden
          />
          Arraste para ver mais pets
        </p>
      </Revelar>
    </Secao>
  );
}
