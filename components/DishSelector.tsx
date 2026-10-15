"use client";

import { Check, Info } from "lucide-react";
import {
  CARDAPIOS_ALMOCO_JANTAR,
  ITENS_ALMOCO_JANTAR,
} from "@/data/menu";
import { cx, OpcaoSelecionavel, SectionCard } from "./ui";

export function DishSelector({
  selecionados,
  onToggle,
  onSelecionarCardapio,
}: {
  selecionados: string[];
  onToggle: (item: string) => void;
  onSelecionarCardapio: (itens: string[]) => void;
}) {
  return (
    <SectionCard
      titulo="Almoço e jantar"
      descricao="Escolha um cardápio pronto ou monte o seu selecionando os itens que preferir."
    >
      {CARDAPIOS_ALMOCO_JANTAR.length > 0 ? (
        <div className="grid gap-3">
          {CARDAPIOS_ALMOCO_JANTAR.map((cardapio) => {
            const ativo = cardapio.itens.every((item) =>
              selecionados.includes(item),
            );
            return (
              <button
                key={cardapio.nome}
                type="button"
                aria-pressed={ativo}
                onClick={() => onSelecionarCardapio(cardapio.itens)}
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
                      ativo
                        ? "border-accent bg-accent text-black"
                        : "border-line",
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
                        selecionados.includes(item) ? "text-ink" : "text-muted",
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
      ) : null}

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Ou monte o seu cardápio
        </p>
        <p className="mt-1 text-sm text-muted">
          Selecione cada item que deseja para o seu evento.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ITENS_ALMOCO_JANTAR.map((item) => (
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
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3 py-2 text-xs text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Ao escolher um cardápio pronto, você ainda pode ajustar os itens
          individualmente.
        </span>
      </div>
    </SectionCard>
  );
}
