import { contato, meta, equipe } from "@/content/site";
import type { Pagina } from "@/content/paginas";

/**
 * JSON-LD das páginas internas, num @graph só (receita de
 * `referencias/schema-json-ld.md` da checklist-final).
 *
 * - A clínica entra com o MESMO @id da home (`/#clinica`), em versão curta:
 *   é o que diz ao buscador que as páginas falam da mesma entidade.
 * - SEM `BreadcrumbList`: a trilha visível saiu do topo (27/09/2026), e a
 *   régua pede a marcação casada com o que está na tela.
 * - `Service` só em página de serviço, com a clínica como `provider`.
 * - `FAQPage` só com as perguntas que ESTÃO na tela. O resultado rico de FAQ
 *   foi desligado pelo Google em 05/2026; fica como sinal semântico, sem
 *   promessa de destaque.
 * - `reviewedBy` só existe depois da revisão real. Pendente = não declara.
 */
export function DadosPagina({ pagina }: { pagina: Pagina }) {
  const url = `${meta.url}${pagina.caminho}/`;
  const idClinica = `${meta.url}/#clinica`;

  const clinica = {
    "@type": "VeterinaryCare",
    "@id": idClinica,
    name: "Clínica Pet Caroline Keffer",
    url: `${meta.url}/`,
    telephone: "+5581993037584",
    address: {
      "@type": "PostalAddress",
      streetAddress: contato.endereco,
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: contato.cep,
      addressCountry: "BR",
    },
  };

  const pessoaDraCarol = {
    "@type": "Person",
    "@id": `${meta.url}/equipe/#dra-caroline-keffer`,
    name: "Caroline Keffer",
    honorificPrefix: "Dra.",
    jobTitle: equipe.membros[0].papel,
    worksFor: { "@id": idClinica },
    /* Registro no conselho, confirmado pela clínica (29/09/2026). */
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Registro profissional",
      name: "CRMV-PE 3053",
      recognizedBy: { "@type": "Organization", name: "Conselho Regional de Medicina Veterinária de Pernambuco" },
    },
  };

  const pagina_ = {
    "@type": "WebPage",
    "@id": `${url}#pagina`,
    url,
    name: pagina.seo.titulo,
    description: pagina.seo.descricao,
    inLanguage: "pt-BR",
    about: { "@id": idClinica },
    dateModified: pagina.revisao.data,
    ...(pagina.revisao.por
      ? { reviewedBy: { "@id": pessoaDraCarol["@id"] }, lastReviewed: pagina.revisao.data }
      : {}),
  };

  const servico = pagina.servico
    ? {
        "@type": "Service",
        "@id": `${url}#servico`,
        name: pagina.servico.nome,
        serviceType: pagina.servico.tipo,
        provider: { "@id": idClinica },
        areaServed: { "@type": "City", name: "Recife" },
        url,
      }
    : null;

  const perguntas = {
    "@type": "FAQPage",
    "@id": `${url}#duvidas`,
    mainEntity: pagina.faq.itens.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };

  const grafo = [
    clinica,
    pagina_,
    perguntas,
    ...(servico ? [servico] : []),
    // A página da equipe e qualquer página já revisada precisam da pessoa no grafo.
    ...(pagina.caminho === "/equipe" || pagina.revisao.por ? [pessoaDraCarol] : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": grafo }),
      }}
    />
  );
}
