import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["especialidades"];

export const metadata = metadadosDe(pagina);

export default function PaginaEspecialidades() {
  return <PaginaSeo pagina={pagina} />;
}
