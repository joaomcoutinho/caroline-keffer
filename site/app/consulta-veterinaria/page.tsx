import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["consulta"];

export const metadata = metadadosDe(pagina);

export default function PaginaConsulta() {
  return <PaginaSeo pagina={pagina} />;
}
