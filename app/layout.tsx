import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono, JetBrains_Mono, Inter } from "next/font/google";
// @ts-expect-error Next.js handles this global stylesheet import at build time.
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ndlovu Tech Solutions — Infra-estrutura digital para Moçambique",
  description:
    "Aplicações móveis, APIs construídas para o mercado moçambicano. Criadores do CarroNaMão.",
  metadataBase: new URL("https://ndlovutechsolutions.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} ${jetBrainsMono.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
