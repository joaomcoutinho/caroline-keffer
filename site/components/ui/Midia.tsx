import Image from "next/image";
import { CameraIcon } from "@phosphor-icons/react/dist/ssr";
import { caminhoPublico } from "@/lib/caminho";

type Props = {
  /** Caminho em /public/images quando a foto real existir. Sem isso, renderiza o slot com o briefing. */
  src?: string;
  alt: string;
  /** O que precisa ser fotografado. Aparece no slot enquanto a foto real não chega. */
  briefing: string;
  /** Proporção fixa. Omita quando a altura vier do container (caso do hero sangrado). */
  proporcao?: string;
  prioridade?: boolean;
  /** Dissolve a mídia no fundo da seção em vez de recortá-la como card. */
  mesclar?: boolean;
  /** Sangra: sem borda e sem canto, preenchendo o container inteiro. */
  sangrar?: boolean;
  /** `object-position` do recorte. Útil quando o assunto não está no centro. */
  posicao?: string;
  /** Fio ciano em repouso e halo no hover. Não use junto com `mesclar`. */
  realce?: boolean;
  className?: string;
};

/**
 * Slot de mídia.
 *
 * ⚠️ A clínica ainda não tem fotografia própria em alta (ver brief.md).
 * Enquanto não chega, este componente renderiza um slot desenhado com o briefing
 * da foto — em vez de stock genérico, que é justamente o que os concorrentes fazem.
 * Assim que a foto existir, basta passar `src`: nenhum layout muda.
 */
export function Midia({
  src,
  alt,
  briefing,
  proporcao,
  prioridade = false,
  mesclar = false,
  sangrar = false,
  posicao,
  realce = false,
  className = "",
}: Props) {
  // Com realce quem desenha a borda é a própria classe, então o fio padrão sai.
  const forma = sangrar
    ? "h-full w-full"
    : `rounded-[var(--radius-card)] ${realce ? "midia-realce" : "border border-hairline"}`;
  const mescla = mesclar ? "midia-mesclada" : "";
  const estilo = proporcao ? { aspectRatio: proporcao } : undefined;

  if (src) {
    return (
      <div
        className={`relative overflow-hidden bg-surface-3 ${forma} ${mescla} ${className}`}
        style={estilo}
      >
        <Image
          src={caminhoPublico(src)}
          alt={alt}
          fill
          priority={prioridade}
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover"
          style={posicao ? { objectPosition: posicao } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto: ${alt}`}
      className={`relative flex items-center justify-center overflow-hidden bg-surface-3 ${forma} ${mescla} ${className}`}
      style={estilo}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 20% 0%, color-mix(in srgb, var(--brand) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="relative flex max-w-[24ch] flex-col items-center gap-3 px-6 text-center">
        <CameraIcon size={26} weight="light" className="text-text-3" aria-hidden />
        <p className="text-sm leading-snug text-text-3">{briefing}</p>
      </div>
    </div>
  );
}
