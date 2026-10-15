import type { Metadata } from "next";
import { ServicosGrid } from "@/components/ServicosGrid";

export const metadata: Metadata = {
  title: "Serviços — Sr. e Srta. Gourmet",
  description:
    "Conheça os serviços do buffet Sr. e Srta. Gourmet: crepes, rodízio de massas, churrasco, almoço e jantar.",
};

export default function ServicosPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <h1 className="font-display text-3xl text-accent-soft sm:text-4xl">
          Serviços
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Tudo preparado na hora, com os detalhes que você escolher para o seu
          evento. Toque em um serviço para ver os detalhes.
        </p>
        <p className="mx-auto mt-4 max-w-xl rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#e6c65c]">
          Você também pode montar um cardápio ao seu gosto! Escolha os itens que
          preferir e envie direto para o buffet.
        </p>
      </header>

      <ServicosGrid />
    </main>
  );
}
