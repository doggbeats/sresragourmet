"use client";

import { AlertCircle, MessageCircle, Pencil, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { FUNCOES_EQUIPE, SERVICOS } from "@/data/services";
import { formatarQuantidade } from "@/lib/beverage-calculator";
import { formatarData } from "@/lib/format";
import { parseConvidados } from "@/lib/quote";
import type { BebidaResumo, OrcamentoState } from "@/types/quote";
import { Button, SectionCard } from "./ui";

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <dt className="shrink-0 text-muted">{rotulo}</dt>
      <dd className="text-right text-ink">{valor || "—"}</dd>
    </div>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="mb-2 font-display text-base text-accent-soft">{titulo}</h3>
      {children}
    </div>
  );
}

function nomeServico(id: string): string {
  return SERVICOS.find((servico) => servico.id === id)?.nome ?? id;
}

function nomeFuncao(id: string): string {
  return FUNCOES_EQUIPE.find((funcao) => funcao.id === id)?.nome ?? id;
}

export function QuoteSummary({
  estado,
  resumos,
  whatsappOk,
  onEditar,
  onEnviar,
}: {
  estado: OrcamentoState;
  resumos: BebidaResumo[];
  whatsappOk: boolean;
  onEditar: () => void;
  onEnviar: () => void;
}) {
  const { evento } = estado;
  const convidados = parseConvidados(evento.convidados);

  const pendencias: string[] = [];
  if (estado.incluirBebidas) {
    for (const resumo of resumos) {
      if (resumo.pendente || resumo.quantidade == null) {
        pendencias.push(
          `Quantidade de ${resumo.nome} a confirmar pelo buffet.`,
        );
      }
    }
  }
  if (estado.servicos.includes("rodizio-massas") && estado.massas.length === 0) {
    pendencias.push("Itens do rodízio de massas a confirmar pelo buffet.");
  }
  if (estado.servicos.includes("churrasco") && estado.churrasco.length === 0) {
    pendencias.push(
      "Carnes e acompanhamentos do churrasco a confirmar pelo buffet.",
    );
  }
  if (estado.servicos.includes("almoco-jantar") && estado.pratoPrincipal.length === 0) {
    pendencias.push("Prato principal de almoço e jantar a confirmar pelo buffet.");
  }
  if (estado.equipe === "orientacao") {
    pendencias.push("Equipe de atendimento: cliente pediu orientação do buffet.");
  }
  if (estado.equipe === "sim") {
    pendencias.push(
      "Quantidade de profissionais e condições da equipe a confirmar pelo buffet.",
    );
  }

  return (
    <SectionCard
      titulo="Resumo da solicitação"
      descricao="Confira as informações antes de enviar ao buffet."
    >
      <div className="space-y-5">
        <dl className="space-y-2">
          <Linha rotulo="Nome" valor={evento.nome.trim()} />
          <Linha rotulo="Telefone" valor={evento.telefone.trim()} />
          <Linha rotulo="Tipo de evento" valor={evento.tipoEvento.trim()} />
          <Linha
            rotulo="Data"
            valor={evento.dataEvento ? formatarData(evento.dataEvento) : ""}
          />
          <Linha rotulo="Horário" valor={evento.horario.trim()} />
          <Linha rotulo="Local" valor={evento.localEvento.trim()} />
          <Linha
            rotulo="Convidados"
            valor={convidados > 0 ? String(convidados) : ""}
          />
        </dl>

        <Bloco titulo="Serviços selecionados">
          {estado.servicos.length === 0 ? (
            <p className="text-sm text-muted">Nenhum serviço selecionado.</p>
          ) : (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink">
              {estado.servicos.map((id) => (
                <li key={id}>{nomeServico(id)}</li>
              ))}
            </ul>
          )}
        </Bloco>

        <Bloco titulo="Cardápio">
          <dl className="space-y-2">
            {estado.servicos.includes("crepe-salgado") ? (
              <Linha
                rotulo="Crepe salgado"
                valor={estado.crepesSalgados.join(", ") || "a definir pelo buffet"}
              />
            ) : null}
            {estado.servicos.includes("crepe-doce") ? (
              <Linha
                rotulo="Crepe doce"
                valor={estado.crepesDoces.join(", ") || "a definir pelo buffet"}
              />
            ) : null}
            {estado.servicos.includes("rodizio-massas") ? (
              <Linha
                rotulo="Massas"
                valor={
                  estado.massas.join(", ") || "itens a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.servicos.includes("churrasco") ? (
              <Linha
                rotulo="Churrasco"
                valor={
                  estado.churrasco.join(", ") ||
                  "carnes e acompanhamentos a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") &&
            estado.cardapioPronto.trim() ? (
              <Linha rotulo="Cardápio pronto" valor={estado.cardapioPronto} />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <Linha
                rotulo="Prato principal"
                valor={
                  estado.pratoPrincipal.join(", ") ||
                  "prato principal a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <Linha
                rotulo="Acompanhamentos"
                valor={
                  estado.acompanhamentos.join(", ") ||
                  "acompanhamentos a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <Linha
                rotulo="Saladas"
                valor={
                  estado.saladas.join(", ") || "saladas a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <Linha
                rotulo="Sobremesas"
                valor={
                  estado.sobremesas.join(", ") ||
                  "sobremesas a confirmar pelo buffet"
                }
              />
            ) : null}
            {estado.cardapioPersonalizado.trim() ? (
              <Linha
                rotulo="Sugestões"
                valor={estado.cardapioPersonalizado.trim()}
              />
            ) : null}
          </dl>
        </Bloco>

        <Bloco titulo="Bebidas">
          {!estado.incluirBebidas ? (
            <p className="text-sm text-muted">Não solicitar bebidas.</p>
          ) : estado.bebidas.length === 0 ? (
            <p className="text-sm text-muted">
              Bebidas desejadas, mas nenhum item selecionado.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {resumos.map((resumo) => (
                <li
                  key={resumo.id}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-ink">{resumo.nome}</span>
                  <span className="text-right text-muted">
                    {resumo.pendente || resumo.quantidade == null
                      ? "quantidade a confirmar"
                      : `${formatarQuantidade(
                          resumo.quantidade,
                          resumo.unidade,
                        )}${
                          resumo.embalagens != null &&
                          resumo.embalagemDescricao
                            ? ` — ${resumo.embalagens} x ${resumo.embalagemDescricao}`
                            : ""
                        }`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Bloco>

        <Bloco titulo="Equipe de atendimento">
          <p className="text-sm text-ink">
            {estado.equipe === "sim"
              ? `Sim — ${
                  estado.funcoesEquipe.map(nomeFuncao).join(", ") ||
                  "funções a definir"
                }`
              : estado.equipe === "nao"
                ? "Não."
                : estado.equipe === "orientacao"
                  ? "Precisa de orientação do buffet."
                  : "A confirmar."}
          </p>
        </Bloco>

        {pendencias.length > 0 ? (
          <Bloco titulo="Pendências para o buffet">
            <ul className="space-y-1.5 text-sm text-muted">
              {pendencias.map((pendencia) => (
                <li key={pendencia} className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
                  <span>{pendencia}</span>
                </li>
              ))}
            </ul>
          </Bloco>
        ) : null}

        <Bloco titulo="Observações">
          <p className="whitespace-pre-line text-sm text-ink">
            {evento.observacoes.trim() || "Nenhuma."}
          </p>
        </Bloco>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Button type="button" variante="contorno" onClick={onEditar}>
          <Pencil className="h-4 w-4" />
          Voltar e editar
        </Button>
        <Button
          type="button"
          onClick={onEnviar}
          disabled={!whatsappOk}
          aria-disabled={!whatsappOk}
        >
          <MessageCircle className="h-4 w-4" />
          Solicitar orçamento pelo WhatsApp
        </Button>
      </div>

      {!whatsappOk ? (
        <p className="mt-3 rounded-lg border border-danger/50 bg-danger/10 px-3 py-2 text-xs text-danger">
          O número do WhatsApp do buffet ainda não foi configurado. A solicitação
          não pode ser encaminhada até que o telefone seja cadastrado.
        </p>
      ) : (
        <p className="mt-3 text-center text-xs text-muted/70">
          O WhatsApp será aberto com a mensagem pronta; você ainda precisa
          enviá-la.
        </p>
      )}

      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/[0.06] px-3 py-2.5 text-xs text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
        <p>
          Suas informações são usadas apenas para montar este orçamento. Nada é
          armazenado em nossos servidores — a mensagem é enviada diretamente
          pelo seu WhatsApp.
        </p>
      </div>
    </SectionCard>
  );
}
