import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["equipe"];

export const metadata = metadadosDe(pagina);

export default function PaginaEquipe() {
  return <PaginaSeo pagina={pagina} />;
}
