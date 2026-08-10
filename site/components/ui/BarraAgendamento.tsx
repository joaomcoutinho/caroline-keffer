import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { StatusHorario } from "@/components/ui/StatusHorario";
import { CTA_PRIMARIO } from "@/content/site";

/**
 * Barra de agendamento fixa, só no mobile.
 *
 * O celular é de onde vem quase todo o tráfego desta clínica, e um botão
 * redondo só com ícone pede que o usuário adivinhe o que ele faz. A barra diz
 * o que é, e carrega o horário vivo — que é a dúvida imediata de quem está com
 * o animal no colo: "será que está aberto agora?".
 *
 * O rótulo é o MESMO do resto do site. Encurtar para "Agendar" aqui criaria um
 * segundo rótulo para a mesma intenção, que é o problema que a gente já matou
 * uma vez no header. Por isso o botão ocupa a linha inteira, em vez de dividir
 * espaço com o texto.
 *
 * Some no `sm` para cima, onde o botão flutuante já resolve sem tapar conteúdo.
 * `safe-area-inset-bottom` mantém a barra acima da faixa de gestos do iPhone.
 */
export function BarraAgendamento() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] sm:hidden"
      role="complementary"
      aria-label="Agendamento rápido"
    >
      <div className="vidro rounded-[1.6rem] p-3">
        <div className="mb-2 flex items-center justify-between gap-3 px-1">
          <StatusHorario />
          <span className="shrink-0 text-xs text-text-3">Torre, Recife</span>
        </div>
        <BotaoWhatsapp rotulo={CTA_PRIMARIO} className="w-full" />
      </div>
    </div>
  );
}
