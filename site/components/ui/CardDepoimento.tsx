import Image from "next/image";
import { StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";

type Props = {
  texto: string;
  /** Primeiro nome. Vazio credita só a fonte. */
  nome: string;
  /** Foto de perfil do Google. Vazio cai no avatar neutro. */
  foto?: string;
  estrelas: number;
};

/**
 * Card de depoimento em destaque.
 *
 * A coreografia de hover é a mesma do protótipo da Nuvens de Desejos (JM,
 * 18/09/2026: "exatamente igual, adaptada ao contexto da Caroline"): fio da
 * marca crescendo no topo, aspas grandes que aparecem e deslizam, estrelas
 * pipocando em cascata e a foto de perfil dando uma volta. Ver
 * `.depoimento-card` no globals.css.
 *
 * Nome e foto entram quando existem; sem eles o card degrada para avatar neutro
 * e crédito da fonte, sem buraco no layout.
 */
export function CardDepoimento({ texto, nome, foto, estrelas }: Props) {
  return (
    <figure className="depoimento-card flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-surface p-7">
      <div
        className="depoimento-estrelas flex gap-0.5 text-brand"
        role="img"
        aria-label={`${estrelas} de 5 estrelas`}
      >
        {Array.from({ length: estrelas }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: i }}>
            <StarIcon size={17} weight="fill" aria-hidden />
          </span>
        ))}
      </div>

      <blockquote className="mt-5 flex-1 font-display text-lg leading-snug font-medium text-balance">
        {texto}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
        {foto ? (
          <Image
            src={caminhoPublico(foto)}
            alt=""
            width={40}
            height={40}
            className="depoimento-foto h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-brand/20"
          />
        ) : (
          <span className="depoimento-foto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand">
            <UserIcon size={18} weight="light" aria-hidden />
          </span>
        )}
        <span className="text-sm leading-tight">
          <span className="block font-medium text-text">
            {nome || "Avaliação no Google"}
          </span>
          {nome ? <span className="block text-text-3">Avaliação no Google</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}
