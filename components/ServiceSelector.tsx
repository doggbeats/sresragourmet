"use client";

import { Beef, Cake, Soup, Utensils, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";
import { SERVICOS } from "@/data/services";
import type { ServicoId } from "@/types/quote";
import { OpcaoSelecionavel, SectionCard } from "./ui";

const ICONES: Record<ServicoId, ComponentType<{ className?: string }>> = {
  "crepe-salgado": Utensils,
  "crepe-doce": Cake,
  "rodizio-massas": Soup,
  churrasco: Beef,
  "almoco-jantar": UtensilsCrossed,
};

export function ServiceSelector({
  selecionados,
  onToggle,
  erro,
}: {
  selecionados: ServicoId[];
  onToggle: (id: ServicoId) => void;
  erro?: string;
}) {
  return (
    <SectionCard
      titulo="Serviços do evento"
      descricao="Escolha um ou vários serviços. Você pode combinar o que precisar."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICOS.map((servico) => {
          const Icone = ICONES[servico.id];
          const ativo = selecionados.includes(servico.id);

          return (
            <OpcaoSelecionavel
              key={servico.id}
              ativo={ativo}
              onClick={() => onToggle(servico.id)}
            >
              <span className="flex items-start gap-3">
                {servico.imagem ? (
                  <Image
                    src={servico.imagem}
                    alt={servico.nome}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
                  />
                ) : (
                  <Icone className="mt-0.5 h-5 w-5 shrink-0" />
                )}
                <span>
                  <span className="block font-display text-base text-accent-soft">
                    {servico.nome}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {servico.descricao}
                  </span>
                </span>
              </span>
            </OpcaoSelecionavel>
          );
        })}
      </div>

      {erro ? <p className="mt-3 text-xs text-danger">{erro}</p> : null}
    </SectionCard>
  );
}
