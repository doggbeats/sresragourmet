"use client";

import { Check } from "lucide-react";
import { cx } from "./ui";

export function StepIndicator({
  passos,
  atual,
  maxVisitado,
  onIr,
}: {
  passos: string[];
  atual: number;
  maxVisitado: number;
  onIr: (indice: number) => void;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {passos.map((passo, indice) => {
        const concluido = indice < atual;
        const ativo = indice === atual;
        const acessivel = indice <= maxVisitado;

        return (
          <li key={passo}>
            <button
              type="button"
              disabled={!acessivel}
              onClick={() => acessivel && onIr(indice)}
              aria-current={ativo ? "step" : undefined}
              className={cx(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
                ativo
                  ? "border-accent/70 bg-accent/10 text-ink"
                  : acessivel
                    ? "border-line text-muted hover:border-accent/40 hover:text-ink"
                    : "cursor-not-allowed border-line/60 text-muted/50",
              )}
            >
              <span
                className={cx(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  concluido
                    ? "bg-accent text-black"
                    : ativo
                      ? "border border-accent text-accent"
                      : "border border-line text-muted",
                )}
              >
                {concluido ? <Check className="h-3 w-3" strokeWidth={3} /> : indice + 1}
              </span>
              <span className="hidden sm:inline">{passo}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
