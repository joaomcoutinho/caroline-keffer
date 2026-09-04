import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { meta, ehProposta } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
        alt: "Dra. Caroline Keffer com um cão no colo, ao lado da chamada do site",
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
  themeColor: "#eef6f9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
