"use client";

import { Info } from "lucide-react";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function MultiItemSelector({
  titulo,
  descricao,
  dica,
  vazio,
  itens,
  selecionados,
  onToggle,
}: {
  titulo: string;
  descricao: string;
  dica: string;
  vazio: string;
  itens: string[];
  selecionados: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <SectionCard titulo={titulo} descricao={descricao}>
      {itens.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
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
        <p className="text-sm text-muted">{vazio}</p>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3 py-2 text-xs text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{dica}</span>
      </div>
    </SectionCard>
  );
}
