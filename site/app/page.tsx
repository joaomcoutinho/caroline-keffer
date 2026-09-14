import { Cabecalho } from "@/components/sections/Cabecalho";
import { Hero } from "@/components/sections/Hero";
import { Prova } from "@/components/sections/Prova";
import { Servicos } from "@/components/sections/Servicos";
import { SemEstresse } from "@/components/sections/SemEstresse";
import { DraCarol } from "@/components/sections/DraCarol";
import { Equipe } from "@/components/sections/Equipe";
import { Planos } from "@/components/sections/Planos";
import { Pets } from "@/components/sections/Pets";
import { Preventivo } from "@/components/sections/Preventivo";
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
 * content/site.ts — reimportar e inserir traz de volta.
 *
 * VACINAS saiu em 11/09/2026, quando a clínica mandou o catálogo real de
 * serviços e vacinação não estava nele. Um calendário de vacinas interativo para
 * um serviço que a clínica não presta seria promessa falsa. A dobra está
 * PARQUEADA, não apagada: components/sections/Vacinas.tsx segue inteiro e
 * `vacinas` continua em content/site.ts.
 *
 * O antigo GUIA DO FILHOTE virou PREVENTIVO: mesma mecânica de trilha, conteúdo
 * reapontado para periodicidade de consulta e exame, que é o que a clínica faz.
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
        <Planos />
        <SemEstresse />
        <DraCarol />
        <Equipe />
        <Pets />
        <Preventivo />
        <Faq />
        <OndeFicamos />
      </main>
      <Fechamento />
      <BotaoFlutuante />
      <BarraAgendamento />
    </>
  );
}
