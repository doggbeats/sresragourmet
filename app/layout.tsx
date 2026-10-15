import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const biko = localFont({
  src: "../fonts/Biko_Regular.otf",
  variable: "--font-biko",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: " Sr. e Srta. Gourmet",
  description:
    "Gerador de orçamentos para eventos do buffet Sr. e Srta. Gourmet: crepes, massas, churrasco e bebidas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${biko.variable} h-full`}
    >
      <body className="min-h-full">
        <div className="flex min-h-full flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
