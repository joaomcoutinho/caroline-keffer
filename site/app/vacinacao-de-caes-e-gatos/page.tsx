import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["vacinacao"];

export const metadata = metadadosDe(pagina);

export default function PaginaVacinacao() {
  return <PaginaSeo pagina={pagina} />;
}
