import { LogoWhatsapp } from "@/components/ui/LogoWhatsapp";
import { contato, CTA_PRIMARIO } from "@/content/site";

/**
 * Botão flutuante de WhatsApp, presente na página inteira.
 *
 * COR (09/09/2026, decisão do JM): era o verde oficial #25D366, a única cor
 * fora da paleta no site inteiro. Agora é o ciano de ação, como todo o resto.
 * O reconhecimento continua garantido pelo GLIFO, que é o oficial e não muda —
 * é a forma que as pessoas leem, não o verde.
 *
 * `bottom` respeita a área segura do iPhone para não ficar sob a barra de gestos.
 */
export function BotaoFlutuante() {
  return (
    <a
      href={contato.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={CTA_PRIMARIO}
      /* Escondido no mobile: lá quem faz esse papel é a BarraAgendamento, com
         rótulo por extenso. Dois CTAs flutuantes competiriam entre si. */
      className="botao-flutuante fixed right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-[var(--ease-soft)] hover:scale-105 active:scale-95 sm:right-7 sm:flex sm:h-16 sm:w-16"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <LogoWhatsapp size={30} className="text-[#25D366]" />
    </a>
  );
}
