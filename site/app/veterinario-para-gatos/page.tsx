import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["gatos"];

export const metadata = metadadosDe(pagina);

export default function PaginaGatos() {
  return <PaginaSeo pagina={pagina} />;
}
