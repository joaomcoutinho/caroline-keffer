import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["urgencia"];

export const metadata = metadadosDe(pagina);

export default function PaginaUrgencia() {
  return <PaginaSeo pagina={pagina} />;
}
