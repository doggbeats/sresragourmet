"use client";

import { CREPES_SALGADOS } from "@/data/menu";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function SavoryCrepeSelector({
  selecionados,
  onToggle,
  onDefinirTodos,
}: {
  selecionados: string[];
  onToggle: (item: string) => void;
  onDefinirTodos: (itens: string[]) => void;
}) {
  const todosSelecionados = CREPES_SALGADOS.every((item) =>
    selecionados.includes(item),
  );

  return (
    <SectionCard
      titulo="Crepe salgado — Monte seu cardápio"
      descricao="Marque os ingredientes que deseja incluir. Não há combinações obrigatórias."
    >
      <label className="mb-3 flex w-fit cursor-pointer items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={todosSelecionados}
          onChange={() =>
            onDefinirTodos(todosSelecionados ? [] : [...CREPES_SALGADOS])
          }
          className="h-4 w-4 rounded border-line accent-white"
        />
        Selecionar todos
      </label>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CREPES_SALGADOS.map((item) => (
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
      <p className="mt-3 text-xs text-muted">
        {selecionados.length} ingrediente(s) selecionado(s). A quantidade por
        convidado será avaliada pelo buffet.
      </p>
    </SectionCard>
  );
}
