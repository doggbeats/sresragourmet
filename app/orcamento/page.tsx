import type { Metadata } from "next";
import { QuoteWizard } from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Montar orçamento — Sr. e Srta. Gourmet",
  description:
    "Monte sua solicitação de orçamento para eventos: crepes, massas, churrasco, bebidas e equipe de atendimento.",
};

export default function OrcamentoPage() {
  return (
    <div className="min-h-full">
      <QuoteWizard />
    </div>
  );
}
