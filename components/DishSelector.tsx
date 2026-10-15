"use client";

import { Check, Info } from "lucide-react";
import { CARDAPIOS_ALMOCO_JANTAR } from "@/data/menu";
import { cx, SectionCard } from "./ui";

export function DishSelector({
  selecionado,
  onSelecionar,
}: {
  selecionado: string;
  onSelecionar: (nome: string) => void;
}) {
  return (
    <SectionCard
      titulo="Almoço e jantar"
      descricao="Escolha um dos cardápios completos. Os acompanhamentos já estão inclusos em cada opção."
    >
      {CARDAPIOS_ALMOCO_JANTAR.length > 0 ? (
        <div
          role="radiogroup"
          aria-label="Cardápios de almoço e jantar"
          className="grid gap-3 lg:grid-cols-3"
        >
          {CARDAPIOS_ALMOCO_JANTAR.map((cardapio) => {
            const ativo = selecionado === cardapio.nome;
            return (
              <button
                key={cardapio.nome}
                type="button"
                role="radio"
                aria-checked={ativo}
                onClick={() => onSelecionar(ativo ? "" : cardapio.nome)}
                className={cx(
                  "flex h-full w-full flex-col rounded-xl border p-4 text-left transition",
                  ativo
                    ? "border-accent/70 bg-accent/[0.08]"
                    : "border-line bg-surface-2/40 hover:border-accent/40",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-display text-base text-accent-soft">
                    {cardapio.nome}
                  </span>
                  <span
                    className={cx(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
                      ativo ? "border-accent bg-accent text-black" : "border-line",
                    )}
                  >
                    {ativo ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : null}
                  </span>
                </span>
                <ul className="mt-3 space-y-1">
                  {cardapio.itens.map((item) => (
                    <li
                      key={item}
                      className={cx(
                        "flex items-start gap-1.5 text-xs leading-snug",
                        ativo ? "text-ink" : "text-muted",
                      )}
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted">
          O buffet ainda não cadastrou os cardápios disponíveis.
        </p>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3 py-2 text-xs text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Os itens de cada cardápio podem ser ajustados pelo buffet conforme o
          evento.
        </span>
      </div>
    </SectionCard>
  );
}
