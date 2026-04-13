import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GISKA — Adivina la palabra",
  description:
    "Un juego diario donde debes adivinar el significado de palabras en otros idiomas haciendo preguntas. ¡Con IA!",
  keywords: [
    "GISKA",
    "juego de palabras",
    "adivinar palabras",
    "idiomas",
    "juego diario",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧊</text></svg>",
  },
  openGraph: {
    title: "GISKA — Adivina la palabra",
    description:
      "Un juego diario donde debes adivinar el significado de palabras en otros idiomas haciendo preguntas de Sí o No.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
