import Image from "next/image";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { equipe } from "@/content/site";

/**
 * Dobra 6 — a equipe, logo depois da dobra da Dra. Carol.
 *
 * A ordem é deliberada: primeiro a pessoa que dá nome à clínica, depois quem
 * mais o tutor vai encontrar lá. Invertido, a equipe diluiria o argumento de
 * continuidade antes de ele ser feito.
 *
 * **Grid, e não carrossel.** São quatro pessoas, e quatro cabem na tela: 2x2 no
 * celular e 4 em linha no desktop. Carrossel aqui esconderia metade da equipe
 * atrás de um gesto — exatamente o oposto do que a seção existe para fazer, que
 * é mostrar rosto.
 *
 * O retrato é 4:5 em TODOS, com o mesmo recorte, porque as fotos vêm de origens
 * diferentes (duas de estúdio, duas de celular). Sem a proporção travada, o
 * grid vira uma colcha de retalhos.
 */
export function Equipe() {
  /*
    `forte` e não `alt`: a seção seguinte (Pets) já é `alt`, e dois fundos
    iguais encostados apagam a divisa — as duas passam a ler como uma seção só,
    muito longa. Assim o ritmo fica base (Dra. Carol) → forte (Equipe) → alt
    (Pets) → base (Vacinas), com todo par vizinho diferente.
  */
  return (
    <Secao id="equipe" tom="forte">
      <div className="max-w-[52ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {equipe.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {equipe.subhead}
          </p>
        </Revelar>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:gap-8">
        {equipe.membros.map((membro, i) => (
          <li key={membro.nome}>
            <Revelar atraso={0.08 + i * 0.06}>
              {/*
                `group` no article e não no <li>: o realce do hover precisa
                cobrir foto e nome juntos, sem herdar espaçamento do grid.
              */}
              <article className="group">
                <div className="midia-realce relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)]">
                  <Image
                    src={caminhoPublico(membro.foto)}
                    alt={membro.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 280px"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                </div>

                <h3 className="mt-4 font-display text-base leading-snug font-semibold text-balance sm:text-lg">
                  {membro.nome}
                </h3>
                <p className="mt-1 text-sm text-text-3">{membro.papel}</p>
              </article>
            </Revelar>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
