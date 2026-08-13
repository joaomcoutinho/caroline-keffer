"use client";

import { useEffect, useState } from "react";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { CTA_PRIMARIO, contato } from "@/content/site";

/**
 * Barra de agendamento fixa, só no mobile.
 *
 * **Ela só existe quando a ação sumiu.** Enquanto o CTA do hero está na tela,
 * esta barra não aparece: as duas juntas davam ao visitante o mesmo pedido duas
 * vezes na mesma dobra, e ainda comiam 15% da altura útil do celular. O papel da
 * barra é devolver o botão quando ele rolou para fora, não competir com ele.
 *
 * **Não carrega o horário.** Ele mora no header, que é fixo e está sempre
 * visível; repetir aqui recriava a duplicação por outro caminho. No lugar dele
 * entra "Ligar", que é outra intenção e não uma repetição: parte de quem está
 * com o animal passando mal tem pressa e prefere falar a digitar.
 *
 * Some no `sm` para cima, onde o botão flutuante já resolve sem tapar conteúdo.
 * `safe-area-inset-bottom` mantém a barra acima da faixa de gestos do iPhone.
 */
export function BarraAgendamento() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const ancora = document.getElementById("ancora-cta-hero");
    if (!ancora) {
      /*
       * A âncora vive no Hero, na mesma base de código, então some apenas se
       * alguém a remover sem querer. Nesse caso a barra fica escondida e o
       * agendamento continua alcançável pelo menu — degradação silenciosa, não
       * tela quebrada. O aviso existe para isso não passar despercebido.
       */
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "BarraAgendamento: #ancora-cta-hero não encontrada; a barra não vai aparecer.",
        );
      }
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => setMostrar(!entrada.isIntersecting),
      { rootMargin: "0px 0px -8px 0px" },
    );
    observador.observe(ancora);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      className={`barra-agendamento fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] transition-[opacity,translate] duration-300 ease-[var(--ease-soft)] sm:hidden ${
        mostrar
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
      role="complementary"
      aria-label="Agendamento rápido"
      aria-hidden={!mostrar}
    >
      <div className="vidro flex items-center gap-2 rounded-[1.4rem] p-2.5">
        {/*
          Contorno, não preenchido: o WhatsApp é o caminho principal e continua
          sendo o único elemento sólido da barra. Ligar é a saída para quem tem
          pressa, e precisa estar disponível sem disputar o olho.
        */}
        <a
          href={contato.telefoneFixoLink}
          aria-label="Ligar para a clínica"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-text-3/70 text-text transition-colors duration-200 hover:border-brand hover:text-brand"
        >
          <PhoneIcon size={22} weight="light" aria-hidden />
        </a>
        <BotaoWhatsapp rotulo={CTA_PRIMARIO} className="w-full" />
      </div>
    </div>
  );
}
