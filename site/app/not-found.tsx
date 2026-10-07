import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Cabecalho } from "@/components/sections/Cabecalho";
import { Fechamento } from "@/components/sections/Fechamento";
import { Onda } from "@/components/ui/Onda";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { BotaoFlutuante } from "@/components/ui/BotaoFlutuante";
import { CTA_PRIMARIO, linkWhatsapp } from "@/content/site";

/* Sem `robots` aqui: o Next já emite `noindex` na 404, e repetir gerava duas
   metas. E sem canônica (checklist-final, bloco 2): herdada do layout, ela
   apontava a 404 para a home. */
export const metadata: Metadata = {
  title: "Página não encontrada | Clínica Pet Caroline Keffer",
  alternates: { canonical: null },
};

/*
  404 NA IDENTIDADE DO SITE (checklist-final, higiene). Quem cai aqui veio de
  um link velho ou digitou errado: em vez de um beco sem saída, o caminho para
  o que mais se procura e o WhatsApp, que resolve qualquer dúvida.
*/
const atalhos = [
  { rotulo: "Página inicial", caminho: "/" },
  { rotulo: "Consulta veterinária", caminho: "/consulta-veterinaria" },
  { rotulo: "Urgência até 18h", caminho: "/urgencia-veterinaria" },
  { rotulo: "Vacinação", caminho: "/vacinacao-de-caes-e-gatos" },
  { rotulo: "Planos de saúde pet", caminho: "/planos-de-saude-pet" },
  { rotulo: "Como chegar", caminho: "/como-chegar" },
] as const;

export default function NaoEncontrada() {
  return (
    <>
      <Cabecalho />
      <main>
        <section className="fundo-patas relative bg-surface px-5 pt-36 pb-24 sm:px-8 sm:pt-44 md:pb-32">
          <div className="mx-auto w-full max-w-[760px] text-center">
            <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">Erro 404</p>
            <h1 className="mt-3 font-display text-[2.05rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
              Essa página não existe, mas a gente continua aqui.
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-text-2 sm:text-xl">
              O link pode estar desatualizado. Escolha um caminho abaixo ou fale direto com a clínica.
            </p>
            <div className="mt-8 flex justify-center">
              <BotaoWhatsapp rotulo={CTA_PRIMARIO} href={linkWhatsapp("Olá! Vim pelo site e não achei a página que procurava.")} />
            </div>
            <ul className="texto-ficha mx-auto mt-12 max-w-[440px] text-left">
              {atalhos.map((a) => (
                <li key={a.caminho}>
                  <Link href={a.caminho} className="flex w-full items-center justify-between gap-3 transition-colors hover:text-acao-texto">
                    {a.rotulo}
                    <ArrowRightIcon size={16} weight="bold" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Onda cor="#0b2129" />
      </main>
      <Fechamento />
      <BotaoFlutuante />
    </>
  );
}
