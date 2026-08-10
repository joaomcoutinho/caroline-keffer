import { Cabecalho } from "@/components/sections/Cabecalho";
import { Hero } from "@/components/sections/Hero";
import { Prova } from "@/components/sections/Prova";
import { Servicos } from "@/components/sections/Servicos";
import { SemEstresse } from "@/components/sections/SemEstresse";
import { DraCarol } from "@/components/sections/DraCarol";
import { Planos } from "@/components/sections/Planos";
import { Pets } from "@/components/sections/Pets";
import { Vacinas } from "@/components/sections/Vacinas";
import { GuiaFilhote } from "@/components/sections/GuiaFilhote";
import { Faq } from "@/components/sections/Faq";
import { OndeFicamos } from "@/components/sections/OndeFicamos";
import { Fechamento } from "@/components/sections/Fechamento";
import { DadosEstruturados } from "@/components/DadosEstruturados";
import { BotaoFlutuante } from "@/components/ui/BotaoFlutuante";
import { BarraAgendamento } from "@/components/ui/BarraAgendamento";

/**
 * A home é composição: cada dobra é removível e reordenável sem quebrar as outras.
 * A ordem segue o plano por dobra do brief.md.
 *
 * A dobra de depoimentos solta saiu daqui: as avaliações do Google agora vivem
 * dentro de SemEstresse, onde elas provam o argumento em vez de repeti-lo. O
 * componente continua em components/sections/Depoimentos.tsx — para trazer de
 * volta, é só reimportar e inserir entre Planos e OndeFicamos.
 *
 * O comparativo com o hospital 24h também saiu da composição. O componente e o
 * conteúdo seguem em components/sections/Comparativo.tsx e em `comparativo` no
 * content/site.ts — reimportar e inserir depois de GuiaFilhote traz de volta.
 */
export default function Home() {
  return (
    <>
      <DadosEstruturados />
      <Cabecalho />
      <main>
        <Hero />
        <Prova />
        <Servicos />
        <SemEstresse />
        <DraCarol />
        <Pets />
        <Vacinas />
        <GuiaFilhote />
        <Planos />
        <Faq />
        <OndeFicamos />
      </main>
      <Fechamento />
      <BotaoFlutuante />
      <BarraAgendamento />
    </>
  );
}
