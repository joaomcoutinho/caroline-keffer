import { contato, meta, equipe } from "@/content/site";
import { geoClinica, horarioClinica } from "@/components/DadosEstruturados";
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
    "@type": ["VeterinaryCare", "LocalBusiness"],
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
    geo: geoClinica,
    openingHoursSpecification: horarioClinica,
  };

  /* As veterinárias (quem tem registro na equipe). Os três números foram
     conferidos na consulta pública do CFMV/CRMV (siscad.cfmv.gov.br) em
     31/10/2026: 03053, 06871 e 07763, todos ativos (seo-mxc 1.31 e 1.88). */
  const veterinarias = equipe.membros.flatMap((m) =>
    "registro" in m
      ? [
          {
            "@type": "Person",
            "@id": `${meta.url}/equipe/#${idPessoa(m.nome)}`,
            name: m.nome.replace(/^Dra?\.\s*/, ""),
            honorificPrefix: "Dra.",
            jobTitle: m.papel,
            worksFor: { "@id": idClinica },
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "Registro profissional",
              name: m.registro,
              recognizedBy: { "@type": "Organization", name: "Conselho Regional de Medicina Veterinária de Pernambuco" },
            },
          },
        ]
      : [],
  );
  const pessoaDraCarol = veterinarias[0];
  const profissional = pagina.profissional
    ? veterinarias.find((v) => v["@id"].endsWith(`#${idPessoa(pagina.profissional!)}`))
    : undefined;

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
    // A equipe leva as três; página revisada leva a Dra. Carol; serviço com
    // profissional nomeado leva quem atende.
    ...(pagina.caminho === "/equipe"
      ? veterinarias
      : [
          ...(pagina.revisao.por ? [pessoaDraCarol] : []),
          ...(profissional && profissional !== pessoaDraCarol
            ? [{ ...profissional, knowsAbout: pagina.servico?.nome }]
            : []),
        ]),
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

/** "Dra. Adriana Lyra" → "dra-adriana-lyra" (o @id da Dra. Carol já era assim). */
function idPessoa(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
