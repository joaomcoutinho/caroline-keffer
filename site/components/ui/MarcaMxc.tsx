type Props = {
  className?: string;
};

/**
 * Símbolo da MXC Digital — o planeta com o anel.
 *
 * ⚠️ PROVISÓRIO (17/09/2026): é um desenho equivalente, feito aqui, enquanto o
 * arquivo oficial da marca não entra no repositório. Quando o SVG/PNG oficial
 * chegar, troque SÓ este componente por um `<Image>`: quem consome (o rodapé e
 * a marca d'água) não muda.
 *
 * `currentColor` em tudo: o rodapé escuro pinta o símbolo com o tom do texto,
 * e a marca d'água usa o mesmo desenho com opacidade baixa.
 */
export function MarcaMxc({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden focusable="false">
      <circle cx="32" cy="30" r="15" stroke="currentColor" strokeWidth="3" />
      <ellipse
        cx="32"
        cy="30"
        rx="28"
        ry="9"
        stroke="currentColor"
        strokeWidth="3"
        transform="rotate(-24 32 30)"
      />
      <path
        d="M24 37V23l8 8 8-8v14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
