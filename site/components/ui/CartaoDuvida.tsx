import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { contato } from "@/content/site";

/**
 * "Não achou a sua dúvida?" — ocupa a coluna esquerda das seções de dúvidas,
 * na home e em todas as páginas internas (27/09/2026, JM: "espaço negativo na
 * parte esquerda… deixa tudo padronizado").
 *
 * Não é enfeite para preencher espaço: é o próximo passo natural de quem leu
 * as perguntas e não achou a sua. Leva o WhatsApp, com a
 * mensagem da página de onde a pessoa veio.
 */
export function CartaoDuvida({ href = contato.whatsapp }: { href?: string }) {
  return (
    <div className="duvida-cartao">
      <p className="font-display text-xl leading-snug font-bold">Não achou a sua dúvida?</p>
      <p className="mt-2 leading-relaxed text-text-2">
        Pergunte direto para a equipe. Quem responde é quem vai atender o seu pet.
      </p>
      <div className="mt-5">
        <BotaoWhatsapp rotulo="Perguntar no WhatsApp" href={href} />
      </div>
    </div>
  );
}
