import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const scriptFont = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Freedom Fotografía | Fotografía y video de eventos en Córdoba",
  description:
    "Bodas, 15 años, egresos, eventos corporativos y sociales. Capturamos los momentos que se convierten en tus recuerdos más lindos. Córdoba y alrededores.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
