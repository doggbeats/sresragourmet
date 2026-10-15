"use client";

import { CREPES_DOCES } from "@/data/menu";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function SweetCrepeSelector({
  selecionados,
  onToggle,
  onDefinirTodos,
}: {
  selecionados: string[];
  onToggle: (item: string) => void;
  onDefinirTodos: (itens: string[]) => void;
}) {
  const todosSelecionados = CREPES_DOCES.every((item) =>
    selecionados.includes(item),
  );

  return (
    <SectionCard
      titulo="Crepe doce — montagem livre"
      descricao="Escolha os recheios doces que deseja oferecer."
    >
      <label className="mb-3 flex w-fit cursor-pointer items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={todosSelecionados}
          onChange={() =>
            onDefinirTodos(todosSelecionados ? [] : [...CREPES_DOCES])
          }
          className="h-4 w-4 rounded border-line accent-white"
        />
        Selecionar todos
      </label>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CREPES_DOCES.map((item) => (
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
        {selecionados.length} recheio(s) selecionado(s).
      </p>
    </SectionCard>
  );
}
