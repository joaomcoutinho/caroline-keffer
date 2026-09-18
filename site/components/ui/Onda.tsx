type Props = {
  /** Cor da seção de BAIXO (a onda é o topo dela invadindo a de cima). */
  cor: string;
  /** Espelha a curva, para as divisas alternarem de lado ao longo da página. */
  espelhar?: boolean;
};

/**
 * Divisa entre seções com a curva da PAREDE DO CONSULTÓRIO (17/09/2026, JM
 * mandou a foto da parede: a faixa azul sobe à esquerda, desce numa bacia
 * larga depois do meio e volta a subir forte na direita, embaixo da frase
 * "Cuidamos com o coração, tratamos com afeto").
 *
 * Substitui o veto de 15/09 à onda genérica: esta não é uma onda de template,
 * é o desenho real da clínica.
 *
 * MECÂNICA. A divisa não ocupa espaço: puxa a si mesma para cima
 * (`margin-top` negativo) e se pinta sobre o respiro de baixo da seção
 * anterior. Só a curva é preenchida, com a cor da seção seguinte, então as
 * patinhas da seção de cima continuam aparecendo acima dela.
 */
export function Onda({ cor, espelhar = false }: Props) {
  return (
    <div aria-hidden className="onda" style={{ color: cor }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={espelhar ? "-scale-x-100" : undefined}
      >
        <path
          fill="currentColor"
          d="M0 46 C 180 14, 380 6, 600 34 C 820 62, 980 104, 1160 96 C 1280 90, 1370 62, 1440 30 L 1440 121 L 0 121 Z"
        />
      </svg>
    </div>
  );
}
