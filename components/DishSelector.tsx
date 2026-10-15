"use client";

import { Info } from "lucide-react";
import { ALMOCO_JANTAR_PRATOS } from "@/data/menu";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function DishSelector({
  selecionados,
  onToggle,
}: {
  selecionados: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <SectionCard
      titulo="Almoço e jantar"
      descricao="Selecione os tipos de pratos desejados. Acompanhamentos são definidos pelo buffet conforme o evento."
    >
      {ALMOCO_JANTAR_PRATOS.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ALMOCO_JANTAR_PRATOS.map((item) => (
            <OpcaoSelecionavel
              key={item}
              ativo={selecionados.includes(item)}
              onClick={() => onToggle(item)}
              className="py-2.5"
            >
              {item}
            </OpcaoSelecionavel>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          O buffet ainda não cadastrou os tipos de pratos disponíveis.
        </p>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3 py-2 text-xs text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Os pratos e acompanhamentos serão confirmados pelo buffet.
        </span>
      </div>
    </SectionCard>
  );
}
