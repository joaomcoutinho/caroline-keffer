import Image from "next/image";
import { caminhoPublico } from "@/lib/caminho";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
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
 * O vidro segue o tom da marca (teal), não um cinza neutro: `bg-surface/70` mais
 * uma lâmina teal por cima, borda de 1px e brilho interno na aresta superior.
 */
export function Cabecalho() {
  return (
    /*
      `fixed`, e não `sticky`: assim o header não ocupa espaço no fluxo e o hero
      pode começar no topo absoluto da página, com a foto subindo até a borda.
    */
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="vidro mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 rounded-full pr-2 pl-3 sm:gap-6 sm:pr-3 sm:pl-4">
        <a
          href="#topo"
          aria-label="Clínica Pet Caroline Keffer, ir para o topo"
          className="shrink-0 transition-transform duration-200 ease-[var(--ease-soft)] hover:scale-[1.04]"
        >
          <Image
            src={caminhoPublico("/images/logo-caroline-keffer.jpg")}
            alt="Clínica Pet Caroline Keffer"
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-full object-cover ring-1 ring-brand/20"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-text-2 transition-colors hover:text-brand"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        {/* Um único rótulo de CTA no site inteiro. No mobile o botão fica só com o
            ícone (com nome acessível), para não criar um segundo rótulo concorrente.

            A visibilidade fica no wrapper, e não no próprio botão: `hidden` e o
            `inline-flex` do botão são utilitários de display na mesma camada do
            Tailwind, então a ordem no atributo class não decide quem vence e os
            dois botões acabavam visíveis ao mesmo tempo. */}
        <span className="hidden shrink-0 sm:block">
          {/* Maior que os links de nav, mas sem virar o dono da barra. */}
          <BotaoWhatsapp rotulo={CTA_PRIMARIO} tamanho="compacto" />
        </span>
        <span className="shrink-0 sm:hidden">
          <BotaoWhatsapp
            rotulo=""
            nomeAcessivel={CTA_PRIMARIO}
            tamanho="icone"
          />
        </span>
      </div>
    </header>
  );
}
