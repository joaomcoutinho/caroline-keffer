import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["laboratorio"];

export const metadata = metadadosDe(pagina);

export default function PaginaLaboratorio() {
  return <PaginaSeo pagina={pagina} />;
}
