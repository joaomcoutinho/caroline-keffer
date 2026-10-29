import { contato, empresa, meta, faq, expediente } from "@/content/site";

/**
 * JSON-LD VeterinaryCare — é o que faz a clínica aparecer no mapa e ser citada
 * por buscador de IA. Os dados vêm todos do content/site.ts, então não há
 * chance de divergir do que está escrito na página.
 *
 * ⚠️ Horário e telefone ainda pendentes de validação com a clínica (ver brief.md).
 */
/** Pino da ficha no Google Maps (coordenadas do lugar, plus code X35R+HM,
 *  lidas em 29/10/2026; a leitura de 28/10 pegou o centro do mapa, ~1 km fora). */
export const geoClinica = {
  "@type": "GeoCoordinates",
  latitude: -8.04107,
  longitude: -34.90832,
};

/* Horário do dado estruturado sai do MESMO `expediente` que pinta a tela e o
   "aberto agora" (seo-mxc 1.101): mudou o horário, muda tudo junto. Dias com o
   mesmo horário viram um bloco só. Exportado para as páginas internas (1.41). */
const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const blocosDaSemana = Object.values(
  expediente.semana.reduce<Record<string, { opens: string; closes: string; dayOfWeek: string[] }>>(
    (blocos, dia, i) => {
      if (!dia) return blocos;
      const chave = `${dia.abre}-${dia.fecha}`;
      blocos[chave] ??= { opens: dia.abre, closes: dia.fecha, dayOfWeek: [] };
      blocos[chave].dayOfWeek.push(DIAS_SCHEMA[i]);
      return blocos;
    },
    {},
  ),
);

export const horarioClinica: Record<string, unknown>[] = [
  ...blocosDaSemana.map((b) => ({ "@type": "OpeningHoursSpecification", ...b })),
  /* Feriado = fechado o dia todo (00:00 às 00:00), como o Google pede. */
  ...expediente.feriados.map((dia) => ({
    "@type": "OpeningHoursSpecification",
    opens: "00:00",
    closes: "00:00",
    validFrom: dia,
    validThrough: dia,
  })),
];

export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    /* VeterinaryCare herda de MedicalOrganization, não de LocalBusiness: o par
       é o que faz o Google ler endereço e horário como negócio local. */
    "@type": ["VeterinaryCare", "LocalBusiness"],
    /* Âncora da entidade: as páginas internas apontam para este @id em vez de
       repetir o objeto inteiro (ver components/paginas/DadosPagina.tsx). */
    "@id": `${meta.url}/#clinica`,
    name: "Clínica Pet Caroline Keffer",
    /* O Perfil da Empresa e o letreiro dizem "Clínica Veterinária" (28/10/2026):
       o nome alternativo liga as duas formas à mesma entidade. */
    alternateName: contato.nomePerfilGoogle,
    description: meta.descricao,
    url: meta.url,
    /* O WhatsApp é o telefone principal (JM, 27/09/2026) — é o mesmo número que
       vai como principal no Perfil da Empresa no Google. */
    telephone: "+5581993037584",
    email: contato.email,
    legalName: empresa.razaoSocial ?? undefined,
    taxID: empresa.cnpj ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: contato.endereco,
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: contato.cep,
      addressCountry: "BR",
    },
    /* O Perfil da Empresa no Google (pelo CID) entra no `sameAs` e no `hasMap`:
       é o que amarra o site à ficha do mapa. */
    sameAs: [contato.instagram, contato.mapa],
    hasMap: contato.mapa,
    /* Logo quadrado (802 px) e a fachada real como imagem da entidade (seo-mxc
       1.42 e 1.111): o resultado do Google mostra foto de verdade, não arte. */
    logo: `${meta.url}/images/logo-caroline-keffer.jpg`,
    image: `${meta.url}/images/fachada_hero.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+5581993037584",
      availableLanguage: "Portuguese",
    },
    geo: geoClinica,
    openingHoursSpecification: horarioClinica,
    /* Sem `aggregateRating` (06/10/2026, checklist-final bloco 16): a nota é
       do Google, não de avaliações publicadas aqui. Marcá-la como da própria
       clínica é avaliação auto-atribuída, que o Google trata como marcação
       enganosa e não exibe. A nota continua no texto da página. */
  } satisfies Record<string, unknown>;

  /**
   * FAQPage: é o que permite ao Google mostrar as respostas direto no resultado
   * de busca. As perguntas vêm do mesmo `content/site.ts` que a dobra renderiza,
   * então o que o buscador lê é exatamente o que o tutor vê — que é a regra do
   * schema, e o que evita penalização por conteúdo divergente.
   */
  const perguntas = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  } satisfies Record<string, unknown>;

  /**
   * WebSite só na home (seo-mxc 1.35): é de onde o Google tira o nome do site
   * que aparece em cima do resultado. Mesmo nome do `og:site_name`.
   */
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${meta.url}/#site`,
    name: "Clínica Pet Caroline Keffer",
    alternateName: [contato.nomePerfilGoogle, "clinicacarolinekeffer.com.br"],
    url: `${meta.url}/`,
    publisher: { "@id": `${meta.url}/#clinica` },
  } satisfies Record<string, unknown>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perguntas) }}
      />
    </>
  );
}
