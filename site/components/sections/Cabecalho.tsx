import Image from "next/image";
import { caminhoPublico } from "@/lib/caminho";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { MenuMobile } from "@/components/ui/MenuMobile";
import { StatusHorario } from "@/components/ui/StatusHorario";
import { navegacao, CTA_PRIMARIO } from "@/content/site";

/**
 * Header flutuante em pílula de vidro.
 *
 * O wrapper é que gruda no topo; o respiro vem do padding dele, então a pílula
 * fica descolada da borda sem precisar compensar altura no hero.
 *
 * Só o logo, sem repetir "Caroline Keffer / Clínica Veterinária" ao lado: o nome
 * já está escrito dentro do selo, e o wordmark duplicado era redundante.
 *
 * 09/09/2026 (JM: "que ele tenha mais destaque com um azul mais escuro e não se
 * perca frente ao azul claro"). A pílula era `.vidro` — lâmina CLARA sobre fundo
 * claro — e sobre o hero e as seções azuis ela sumia. Agora é `.cabecalho-escuro`.
 *
 * A inversão é por TOKEN, não por classe em cada filho: a classe redefine
 * --text, --brand e --action no escopo do header, então os links, o selo de
 * horário, o botão do menu e o CTA se adaptam sozinhos. Nenhum desses
 * componentes precisou mudar. Mesma técnica do `.bloco-escuro` do rodapé.
 *
 * Efeito colateral desejado no CTA: dentro do escopo escuro, --action vira o
 * ciano CLARO com tinta escura (a mesma regra do rodapé), então o botão passa a
 * saltar da pílula em vez de se dissolver nela.
 */
export function Cabecalho() {
  return (
    /*
      `fixed`, e não `sticky`: assim o header não ocupa espaço no fluxo e o hero
      pode começar no topo absoluto da página, com a foto subindo até a borda.
    */
    <header className="cabecalho-encolhe fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="cabecalho-pilula cabecalho-escuro mx-auto flex h-16 w-full max-w-[1200px] 2xl:max-w-[1400px] items-center justify-between gap-4 rounded-full pr-2 pl-3 sm:gap-6 sm:pr-3 sm:pl-4">
        <a
          href="#topo"
          aria-label="Clínica Pet Caroline Keffer, ir para o topo"
          className="shrink-0 transition-transform duration-200 ease-[var(--ease-soft)] hover:scale-[1.04]"
        >
          <Image
            src={caminhoPublico("/images/logo-caroline-keffer.webp")}
            alt="Clínica Pet Caroline Keffer"
            width={48}
            height={48}
            priority
            className="cabecalho-selo h-12 w-12 rounded-full object-cover ring-1 ring-white/25"
          />
        </a>

        {/* O centro do header no mobile ficou vazio quando o CTA saiu daqui.
            Em vez de devolver outro botão, entra INFORMAÇÃO: se a clínica está
            aberta agora é a primeira dúvida de quem chega com o animal no colo,
            e ocupa o espaço sem disputar clique com o CTA da barra fixa. */}
        <span className="min-w-0 flex-1 justify-center lg:hidden">
          <StatusHorario className="justify-center" />
        </span>

        <nav className="hidden items-center gap-7 lg:flex">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-text-2 transition-colors hover:text-acao-texto"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        {/* Desktop: CTA no header, porque lá não existe a barra fixa embaixo.
            Mobile: menu de seções. O botão de WhatsApp saiu daqui — com a barra
            fixa e o CTA do hero, ele era o TERCEIRO pedido de clique na mesma
            tela, e três CTAs concorrentes diluem todos.

            A visibilidade fica no wrapper, e não no próprio botão: `hidden` e o
            `inline-flex` do botão são utilitários de display na mesma camada do
            Tailwind, então a ordem no atributo class não decide quem vence. */}
        <span className="hidden shrink-0 lg:block">
          <BotaoWhatsapp rotulo={CTA_PRIMARIO} tamanho="compacto" />
        </span>
        <MenuMobile />
      </div>
    </header>
  );
}
