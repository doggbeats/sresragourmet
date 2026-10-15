import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { GaleriaGrid } from "@/components/GaleriaGrid";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Galeria — Sr. e Srta. Gourmet",
  description: "Fotos do buffet Sr. e Srta. Gourmet.",
};

function obterFotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public"))
      .filter((arquivo) => /^\d+\.jpe?g$/i.test(arquivo))
      .sort(
        (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10),
      )
      .map((arquivo) => `/${arquivo}`);
  } catch {
    return [];
  }
}

export default function GaleriaPage() {
  const fotos = obterFotos();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <Reveal>
          <h1 className="font-display text-3xl text-accent-soft sm:text-4xl">
            Galeria
          </h1>
        </Reveal>
      </header>

      <GaleriaGrid fotos={fotos} />
    </main>
  );
}
