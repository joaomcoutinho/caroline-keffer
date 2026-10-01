import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["odontologia"];

export const metadata = metadadosDe(pagina);

export default function PaginaOdontologia() {
  return <PaginaSeo pagina={pagina} />;
}
