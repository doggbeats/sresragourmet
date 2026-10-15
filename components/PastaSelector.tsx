"use client";

import { Info } from "lucide-react";
import { MASSAS_ITENS, MASSAS_MOLHOS } from "@/data/menu";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function PastaSelector({
  selecionados,
  onToggle,
  onDefinirTodos,
}: {
  selecionados: string[];
  onToggle: (item: string) => void;
  onDefinirTodos: (itens: string[]) => void;
}) {
  const todosSelecionados = MASSAS_ITENS.every((item) =>
    selecionados.includes(item),
  );

  return (
    <SectionCard
      titulo="Rodízio de massas"
      descricao="Selecione os tipos de massa desejados. Molhos e complementos são definidos pelo buffet."
    >
      {MASSAS_ITENS.length > 0 ? (
        <>
          <label className="mb-3 flex w-fit cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={todosSelecionados}
              onChange={() =>
                onDefinirTodos(todosSelecionados ? [] : [...MASSAS_ITENS])
              }
              className="h-4 w-4 rounded border-line accent-white"
            />
            Selecionar todos
          </label>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {MASSAS_ITENS.map((item) => (
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
        </>
      ) : (
        <p className="text-sm text-muted">
          Os tipos de massa ainda não foram cadastrados pelo buffet.
        </p>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3 py-2 text-xs text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          {MASSAS_MOLHOS.length > 0
            ? `Molhos disponíveis: ${MASSAS_MOLHOS.join(", ")}.`
            : "Molhos, ingredientes e quantidades serão confirmados pelo buffet."}
        </span>
      </div>
    </SectionCard>
  );
}
