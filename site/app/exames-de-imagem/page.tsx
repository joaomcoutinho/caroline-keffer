import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["exames-de-imagem"];

export const metadata = metadadosDe(pagina);

export default function PaginaExamesImagem() {
  return <PaginaSeo pagina={pagina} />;
}
