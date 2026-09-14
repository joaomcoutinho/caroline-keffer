import { CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { comparativo } from "@/content/site";

/**
 * Comparativo honesto com o hospital 24h.
 *
 * A dobra só funciona porque NÃO é espantalho: em dois dos cinco critérios o
 * hospital ganha, e o site diz isso com todas as letras. O tutor já sabe que
 * clínica de bairro não tem plantão de madrugada — fingir o contrário destruiria
 * a credibilidade que o resto da página constrói.
 *
 * Marcação em `<table>` de verdade: é dado tabular comparativo, e o leitor de
 * tela precisa relacionar cada célula ao critério e à coluna. No mobile a
 * tabela vira lista empilhada por critério, sem rolagem horizontal.
 */
export function Comparativo() {
  return (
    <Secao tom="alt">
      <div className="max-w-[46ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {comparativo.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {comparativo.subhead}
          </p>
        </Revelar>
      </div>

      <Revelar atraso={0.12} className="mt-12">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Comparação entre a Clínica Pet Caroline Keffer e um hospital
            veterinário 24 horas
          </caption>
          <thead className="hidden lg:table-header-group">
            <tr>
              <th scope="col" className="w-[26%] pb-4" />
              <th
                scope="col"
                className="w-[37%] rounded-t-[var(--radius-card)] bg-brand/12 px-6 pt-5 pb-4 font-display text-lg font-bold text-brand"
              >
                {comparativo.colunas.aqui}
              </th>
              <th
                scope="col"
                className="w-[37%] px-6 pt-5 pb-4 font-display text-lg font-bold text-text-2"
              >
                {comparativo.colunas.hospital}
              </th>
            </tr>
          </thead>

          <tbody>
            {comparativo.linhas.map((linha) => (
              <tr
                key={linha.criterio}
                className="block border-b border-hairline py-6 last:border-0 lg:table-row lg:py-0"
              >
                <th
                  scope="row"
                  className="block pb-3 font-display text-base font-bold lg:table-cell lg:py-6 lg:pr-6 lg:align-top"
                >
                  {linha.criterio}
                </th>

                <td className="block bg-brand/12 px-4 py-3 first-of-type:rounded-t-[var(--radius-card)] lg:table-cell lg:rounded-none lg:px-6 lg:py-6 lg:align-top">
                  <span className="flex gap-2.5">
                    <Marca vence={linha.aqui.vence} />
                    <span className="leading-relaxed text-text">
                      {linha.aqui.texto}
                    </span>
                  </span>
                </td>

                <td className="block px-4 py-3 lg:table-cell lg:px-6 lg:py-6 lg:align-top">
                  <span className="flex gap-2.5">
                    <Marca vence={linha.hospital.vence} />
                    <span className="leading-relaxed text-text-2">
                      {linha.hospital.texto}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Revelar>

      <Revelar atraso={0.2}>
        {/* `text-brand` aqui dava 4,17 sobre `surface-2`, abaixo do AA para 18px.
            O peso e o tamanho já destacam a frase sem depender da cor. */}
        <p className="mt-10 max-w-[62ch] font-display text-lg leading-snug font-bold text-balance text-text sm:text-xl">
          {comparativo.fecho}
        </p>
      </Revelar>
    </Secao>
  );
}

/** Sinal do critério. Texto acessível junto, para não depender só da forma. */
function Marca({ vence }: { vence: boolean }) {
  const Icone = vence ? CheckIcon : MinusIcon;
  return (
    <span className="mt-0.5 shrink-0">
      <Icone
        size={18}
        weight="bold"
        className={vence ? "text-brand" : "text-text-3"}
        aria-hidden
      />
      <span className="sr-only">{vence ? "Ponto forte: " : "Limitação: "}</span>
    </span>
  );
}
