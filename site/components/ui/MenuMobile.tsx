"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ListIcon,
  XIcon,
  CaretRightIcon,
  PhoneIcon,
  MapPinIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { StatusHorario } from "@/components/ui/StatusHorario";
import { navegacao, contato, CTA_PRIMARIO } from "@/content/site";

/**
 * Menu de seções no mobile, em folha inferior.
 *
 * Folha inferior e não dropdown: no celular o polegar alcança a base da tela,
 * não o canto superior direito. O painel que abria embaixo do botão obrigava a
 * esticar a mão justamente para a área mais difícil.
 *
 * O CTA vive DENTRO da folha, não no header. Na tela inicial ele seria o
 * terceiro pedido de clique; aqui, com o menu já aberto, é o passo natural
 * depois de olhar as seções — e não disputa atenção com nada.
 *
 * Enquanto aberta, a rolagem da página fica travada: sem isso o fundo desliza
 * atrás da folha e a leitura se perde.
 *
 * A folha é renderizada num PORTAL, direto em `document.body`, e não como
 * filha do header. O header tem animação de encolher ligada à rolagem
 * (`animation-timeline: scroll()`); no Safari, um ancestral com animação em
 * execução vira contêiner de posicionamento para os descendentes `fixed`,
 * então a folha parava de se ancorar na tela inteira e se ancorava dentro da
 * pílula pequena do header. O portal tira a folha desse parentesco e ela volta
 * a se fixar no viewport de verdade, não importa o que o header esteja fazendo.
 *
 * Sem gate de montagem: o portal só é criado quando `aberto` vira `true`, e
 * isso só acontece depois de um clique no botão — ou seja, já no navegador,
 * onde `document.body` sempre existe. No primeiro render (servidor e cliente)
 * `aberto` é `false` nos dois lados, então a hidratação nunca vê o portal.
 */
export function MenuMobile() {
  const [aberto, setAberto] = useState(false);
  const folha = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);

    const rolagemAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /*
      Marca o body para o CSS esconder a barra fixa de agendamento: sem isso
      ela continua sobre a folha e a tela fica com DOIS CTAs empilhados, além
      do horário repetido.
    */
    document.body.dataset.menuAberto = "sim";

    // O foco entra na folha para quem navega por teclado ou leitor de tela.
    folha.current?.focus();

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = rolagemAntes;
      delete document.body.dataset.menuAberto;
    };
  }, [aberto]);

  const linhaContato =
    "flex items-center gap-3 rounded-[var(--radius-field)] px-3 py-3 text-sm text-text-2 transition-colors hover:bg-brand/10 hover:text-acao-texto";

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        aria-label="Abrir menu"
        className="cabecalho-botao-menu flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-text transition-[border-color,color] duration-200 hover:border-brand hover:text-acao-texto lg:hidden"
      >
        <ListIcon size={20} weight="bold" aria-hidden />
      </button>

      {aberto
        ? createPortal(
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setAberto(false)}
                className="menu-fundo absolute inset-0 h-full w-full cursor-default"
              />

              <div
                ref={folha}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navegação"
                tabIndex={-1}
                className="menu-folha vidro absolute inset-x-0 bottom-0 rounded-t-[1.75rem] px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] outline-none"
              >
                {/* Alça: sinaliza folha arrastável e dá um ponto de descanso visual. */}
                <span
                  aria-hidden
                  className="mx-auto mb-5 block h-1 w-10 rounded-full bg-text-3/40"
                />

                <div className="mb-4 flex items-center justify-between">
                  <StatusHorario />
                  <button
                    type="button"
                    onClick={() => setAberto(false)}
                    aria-label="Fechar menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-text-2 transition-colors hover:border-brand hover:text-acao-texto"
                  >
                    <XIcon size={16} weight="bold" aria-hidden />
                  </button>
                </div>

                <nav className="border-t border-hairline">
                  {navegacao.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setAberto(false)}
                      className="flex items-center justify-between border-b border-hairline py-4 font-display text-lg font-bold transition-colors hover:text-acao-texto"
                    >
                      {item.rotulo}
                      <CaretRightIcon
                        size={18}
                        weight="bold"
                        className="text-text-3"
                        aria-hidden
                      />
                    </a>
                  ))}
                </nav>

                <div className="mt-5">
                  <BotaoWhatsapp rotulo={CTA_PRIMARIO} className="w-full" />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1">
                  <a href={contato.telefoneFixoLink} className={linhaContato}>
                    <PhoneIcon size={18} weight="light" aria-hidden />
                    Ligar
                  </a>
                  <a
                    href={contato.mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linhaContato}
                  >
                    <MapPinIcon size={18} weight="light" aria-hidden />
                    Chegar
                  </a>
                  <a
                    href={contato.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linhaContato}
                  >
                    <InstagramLogoIcon size={18} weight="light" aria-hidden />
                    Instagram
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
