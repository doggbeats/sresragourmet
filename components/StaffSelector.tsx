"use client";

import { FUNCOES_EQUIPE } from "@/data/services";
import type { EquipeResposta, FuncaoEquipeId } from "@/types/quote";
import { OpcaoSelecionavel, SectionCard } from "./ui";

const RESPOSTAS: { valor: Exclude<EquipeResposta, "">; rotulo: string }[] = [
  { valor: "sim", rotulo: "Sim, quero contratar equipe" },
  { valor: "nao", rotulo: "Não preciso de equipe" },
  { valor: "orientacao", rotulo: "Preciso de orientação do buffet" },
];

export function StaffSelector({
  resposta,
  onResposta,
  funcoes,
  onToggleFuncao,
}: {
  resposta: EquipeResposta;
  onResposta: (valor: EquipeResposta) => void;
  funcoes: FuncaoEquipeId[];
  onToggleFuncao: (id: FuncaoEquipeId) => void;
}) {
  return (
    <SectionCard
      titulo="Equipe de atendimento"
      descricao="Deseja contratar equipe para atender seu evento?"
    >
      <div className="grid gap-2">
        {RESPOSTAS.map((opcao) => (
          <OpcaoSelecionavel
            key={opcao.valor}
            ativo={resposta === opcao.valor}
            role="radio"
            onClick={() => onResposta(opcao.valor)}
          >
            {opcao.rotulo}
          </OpcaoSelecionavel>
        ))}
      </div>

      {resposta === "sim" ? (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Funções de interesse
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {FUNCOES_EQUIPE.map((funcao) => (
              <OpcaoSelecionavel
                key={funcao.id}
                ativo={funcoes.includes(funcao.id)}
                onClick={() => onToggleFuncao(funcao.id)}
              >
                <span className="flex flex-col">
                  <span>{funcao.nome}</span>
                  <span className="mt-0.5 text-xs text-muted">
                    {funcao.descricao}
                  </span>
                </span>
              </OpcaoSelecionavel>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            A quantidade de profissionais será definida pelo buffet.
          </p>
        </div>
      ) : null}
    </SectionCard>
  );
}
