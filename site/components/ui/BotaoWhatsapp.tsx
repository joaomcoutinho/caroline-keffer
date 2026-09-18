import { LogoWhatsapp } from "@/components/ui/LogoWhatsapp";
import { contato } from "@/content/site";

type Tamanho = "grande" | "normal" | "compacto" | "icone";

type Props = {
  /** Vazio renderiza o botão só com o ícone. Use `nomeAcessivel` nesse caso. */
  rotulo: string;
  nomeAcessivel?: string;
  /**
   * O tamanho vem por prop, e NUNCA por classe de fora.
   * `px-4` mandado por className não vence o `px-7` da base: os dois são
   * utilitários de padding na mesma camada do Tailwind, e quem decide é a ordem
   * da folha de estilo, não a ordem no atributo class. Emitindo um conjunto só
   * de classes por tamanho, o conflito deixa de existir.
   */
  tamanho?: Tamanho;
  /**
   * Destino com mensagem já escrita (ver `linkWhatsapp`). Muda só o texto que
   * chega no WhatsApp; o rótulo e o visual continuam os do CTA único.
   */
  href?: string;
  className?: string;
};

/*
  Escala de peso do CTA, e a regra de quando usar cada uma:

  - `grande`   → só o fechamento. É o último pedido da página e não divide
                 atenção com nada.
  - `normal`   → CTA de seção (hero, planos, vacinas). Mesmo peso entre si,
                 porque todos representam o mesmo compromisso do visitante.
  - `compacto` → só o header. É elemento persistente: precisa estar sempre
                 acessível sem competir com o conteúdo da dobra.
  - `icone`    → header no mobile, onde não cabe rótulo.

  Sair dessa escala é o que fazia o CTA das vacinas parecer secundário mesmo
  estando no ponto de maior intenção da página.
*/
const tamanhos: Record<Tamanho, { caixa: string; texto: string; icone: number }> = {
  grande: { caixa: "gap-3 px-10 py-5", texto: "text-lg", icone: 26 },
  normal: { caixa: "gap-2.5 px-7 py-4", texto: "text-base", icone: 22 },
  compacto: { caixa: "gap-2 px-4 py-2", texto: "text-sm", icone: 18 },
  icone: { caixa: "h-10 w-10 p-0", texto: "text-sm", icone: 18 },
};

/**
 * O único CTA do site. Uma intenção, um rótulo, um destino, UM visual.
 *
 * Não existe variante de contorno de propósito: quando existia, um dos CTAs
 * aparecia vazado e quebrava a leitura de "isto é a ação da página". Todo botão
 * de WhatsApp é ciano sólido, em qualquer seção e em qualquer tema.
 *
 * Pílula (shape lock) e contraste AA garantido pelos tokens --action / --on-action.
 */
export function BotaoWhatsapp({
  rotulo,
  nomeAcessivel,
  tamanho = "normal",
  href = contato.whatsapp,
  className = "",
}: Props) {
  const t = tamanhos[tamanho];

  // `relative` e `cta-brilho` dão o halo em loop; ver globals.css.
  const base = `cta-brilho relative inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[transform,background-color] duration-200 ease-[var(--ease-soft)] active:scale-[0.98] ${t.caixa} ${t.texto}`;

  const estilo = "bg-action text-on-action hover:bg-action-hover";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nomeAcessivel ?? undefined}
      className={`${base} ${estilo} ${className}`}
    >
      {/*
        O glifo é o OFICIAL, na tinta da Caroline (JM, 18/09/2026). Verde
        original só no botão flutuante.
      */}
      <LogoWhatsapp size={t.icone} />
      {rotulo}
    </a>
  );
}
