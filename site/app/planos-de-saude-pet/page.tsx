import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["planos"];

export const metadata = metadadosDe(pagina);

export default function PaginaPlanos() {
  return <PaginaSeo pagina={pagina} />;
}
