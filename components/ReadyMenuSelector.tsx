"use client";

import Image from "next/image";
import { Check, Info } from "lucide-react";
import { CARDAPIOS_ALMOCO_JANTAR } from "@/data/menu";
import { cx, SectionCard } from "./ui";

export function ReadyMenuSelector({
  selecionado,
  onSelecionar,
}: {
  selecionado: string;
  onSelecionar: (nome: string) => void;
}) {
  return (
    <SectionCard
      titulo="Cardápios prontos"
      descricao="Escolha um cardápio completo ou combine com os itens que preferir abaixo."
    >
      {CARDAPIOS_ALMOCO_JANTAR.length > 0 ? (
        <div
          role="radiogroup"
          aria-label="Cardápios prontos de almoço e jantar"
          className="grid gap-3"
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
                  "flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition sm:flex-row",
                  ativo
                    ? "border-accent/70 bg-accent/[0.08]"
                    : "border-line bg-surface-2/40 hover:border-accent/40",
                )}
              >
                {cardapio.imagem ? (
                  <span className="relative block h-28 w-full shrink-0 sm:h-auto sm:w-1/3">
                    <Image
                      src={cardapio.imagem}
                      alt={cardapio.nome}
                      fill
                      sizes="(max-width: 640px) 100vw, 10rem"
                      className="object-cover"
                    />
                  </span>
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col p-4">
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
                          ativo ? "text-ink" : "text-muted",
                        )}
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

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
