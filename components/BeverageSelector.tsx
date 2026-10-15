"use client";

import { BEBIDAS, GRUPOS_BEBIDA } from "@/data/beverage-rules";
import { formatarQuantidade } from "@/lib/beverage-calculator";
import type { BebidaResumo } from "@/types/quote";
import { OpcaoSelecionavel, SectionCard } from "./ui";

export function BeverageSelector({
  incluir,
  onIncluir,
  selecionadas,
  onToggle,
  resumos,
  convidados,
}: {
  incluir: boolean;
  onIncluir: (valor: boolean) => void;
  selecionadas: string[];
  onToggle: (id: string) => void;
  resumos: BebidaResumo[];
  convidados: number;
}) {
  function resumoDe(id: string): BebidaResumo | undefined {
    return resumos.find((resumo) => resumo.id === id);
  }

  return (
    <SectionCard
      titulo="Bebidas"
      descricao="Informe se deseja incluir bebidas e escolha os itens."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <OpcaoSelecionavel
          ativo={incluir}
          role="radio"
          onClick={() => onIncluir(true)}
        >
          Sim, quero incluir bebidas
        </OpcaoSelecionavel>
        <OpcaoSelecionavel
          ativo={!incluir}
          role="radio"
          onClick={() => onIncluir(false)}
        >
          Não preciso de bebidas
        </OpcaoSelecionavel>
      </div>

      {incluir ? (
        <div className="mt-5 space-y-5">
          {convidados <= 0 ? (
            <p className="text-xs text-muted">
              Informe a quantidade de convidados na primeira etapa para calcular
              as bebidas.
            </p>
          ) : null}

          {GRUPOS_BEBIDA.map((grupo) => {
            const itens = BEBIDAS.filter((bebida) => bebida.grupo === grupo.id);
            if (itens.length === 0) {
              return null;
            }

            return (
              <div key={grupo.id}>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {grupo.nome}
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {itens.map((bebida) => {
                    const ativo = selecionadas.includes(bebida.id);
                    const resumo = resumoDe(bebida.id);

                    return (
                      <OpcaoSelecionavel
                        key={bebida.id}
                        ativo={ativo}
                        onClick={() => onToggle(bebida.id)}
                      >
                        <span className="flex flex-col">
                          <span>{bebida.nome}</span>
                          {ativo && resumo ? (
                            <span className="mt-0.5 text-xs text-muted">
                              {resumo.pendente || resumo.quantidade == null
                                ? "Quantidade a confirmar pelo buffet"
                                : `Estimativa: ${formatarQuantidade(
                                    resumo.quantidade,
                                    resumo.unidade,
                                  )}${
                                    resumo.embalagens != null &&
                                    resumo.embalagemDescricao
                                      ? ` — ${resumo.embalagens} x ${resumo.embalagemDescricao}`
                                      : ""
                                  }`}
                            </span>
                          ) : null}
                        </span>
                      </OpcaoSelecionavel>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <p className="text-xs text-muted">
            As quantidades por pessoa ainda não estão configuradas pelo buffet.
            Quando isso ocorrer, o cálculo aparece automaticamente aqui.
          </p>
        </div>
      ) : null}
    </SectionCard>
  );
}
