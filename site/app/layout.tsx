import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { meta, ehProposta } from "@/content/site";
import "./globals.css";

/*
  TIPOGRAFIA (11/09/2026, decisão do JM: "uma fonte mais suave e acolhedora,
  diferente dessa que está muito séria").

  Saiu Bricolage Grotesque + Plus Jakarta Sans. A Bricolage é uma grotesca de
  contraste alto e terminais retos — desenho excelente, mas o registro dela é
  editorial/sério, o oposto do "cuidado de longo prazo, mão de gente" do brief.

  Entra NUNITO nos títulos e NUNITO SANS no corpo. Nunito tem os terminais
  arredondados (é daí que vem o acolhimento) sem perder peso: nos pesos altos
  ela continua firme, que é o que um serviço de SAÚDE precisa. Foram avaliadas
  ainda Baloo 2 (redonda demais, lia infantil para clínica) e Quicksand (leve
  e calma, mas sem peso para passar autoridade clínica).

  As duas são da mesma superfamília, então corpo e título casam de origem em
  vez de ser um par montado.

  ⚠️ As variáveis são nomeadas pelo PAPEL (`--fonte-titulo`/`--fonte-corpo`) e
  não pelo nome da fonte, que era o caso antes (`--font-bricolage`). Nomear pela
  fonte obriga a renomear tudo a cada troca de tipografia.
*/
const fonteTitulo = Nunito({
  variable: "--fonte-titulo",
  subsets: ["latin"],
  display: "swap",
});

const fonteCorpo = Nunito_Sans({
  variable: "--fonte-corpo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: meta.titulo,
  description: meta.descricao,
  alternates: { canonical: "/" },
  // Enquanto for proposta, nenhum buscador indexa (ver `ehProposta` em content/site.ts).
  robots: ehProposta ? { index: false, follow: false } : undefined,
  openGraph: {
    title: meta.titulo,
    description: meta.descricao,
    url: meta.url,
    siteName: "Clínica Pet Caroline Keffer",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${meta.url}/og.png`,
        width: 1200,
        height: 630,
        alt: "Fachada da Clínica Veterinária Caroline Keffer, na Torre, ao lado da chamada do site",
      },
    ],
  },
  // O WhatsApp, que é por onde este site mais circula, lê o card do Twitter.
  twitter: {
    card: "summary_large_image",
    title: meta.titulo,
    description: meta.descricao,
    images: [`${meta.url}/og.png`],
  },
};

export const viewport: Viewport = {
  // Uma cor só: o site não acompanha mais o tema do sistema (ver THEME LOCK
  // em globals.css). Duas entradas aqui pintariam a barra do navegador de
  // escuro numa página que é clara.
  // Acompanha --surface (atualizado com a escala mais azul de 09/09/2026).
  themeColor: "#cce4f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fonteTitulo.variable} ${fonteCorpo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
