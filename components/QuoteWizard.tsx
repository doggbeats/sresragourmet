"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BarbecueSelector } from "./BarbecueSelector";
import { BeverageSelector } from "./BeverageSelector";
import { EventForm } from "./EventForm";
import { MultiItemSelector } from "./MultiItemSelector";
import { ReadyMenuSelector } from "./ReadyMenuSelector";
import { PastaSelector } from "./PastaSelector";
import { QuoteSummary } from "./QuoteSummary";
import { SavoryCrepeSelector } from "./SavoryCrepeSelector";
import { ServiceSelector } from "./ServiceSelector";
import { StaffSelector } from "./StaffSelector";
import { StepIndicator } from "./StepIndicator";
import { SweetCrepeSelector } from "./SweetCrepeSelector";
import { Button, Field, SectionCard, TextArea } from "./ui";
import {
  alternarLista,
  alternarServico,
  criarEstadoInicial,
  parseConvidados,
  resumirBebidas,
} from "@/lib/quote";
import {
  ACOMPANHAMENTOS,
  PRATOS_PRINCIPAIS,
  SALADAS,
  SOBREMESAS,
} from "@/data/menu";
import { validarDadosEvento, validarServicos, type ErrosOrcamento } from "@/lib/validation";
import { gerarLinkWhatsApp, montarMensagemWhatsApp, whatsappConfigurado } from "@/lib/whatsapp";
import type {
  DadosEvento,
  EquipeResposta,
  FuncaoEquipeId,
  OrcamentoState,
  ServicoId,
} from "@/types/quote";

const PASSOS = ["Evento", "Serviços", "Cardápio", "Bebidas", "Equipe", "Revisão"];

export function QuoteWizard() {
  const [estado, setEstado] = useState<OrcamentoState>(criarEstadoInicial);
  const [passo, setPasso] = useState(0);
  const [maxVisitado, setMaxVisitado] = useState(0);
  const [erros, setErros] = useState<ErrosOrcamento>({});
  const [aviso, setAviso] = useState<string | null>(null);

  const topoRef = useRef<HTMLDivElement>(null);
  const primeiroRender = useRef(true);

  const resumos = useMemo(() => resumirBebidas(estado), [estado]);
  const whatsappOk = whatsappConfigurado();
  const convidados = parseConvidados(estado.evento.convidados);

  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [passo]);

  function atualizarEvento(campo: keyof DadosEvento, valor: string) {
    setEstado((atual) => {
      const evento = { ...atual.evento };
      evento[campo] = valor;
      return { ...atual, evento };
    });
    setErros((atual) => {
      if (!atual[campo as string]) {
        return atual;
      }
      const copia = { ...atual };
      delete copia[campo as string];
      return copia;
    });
    setAviso(null);
  }

  function toggleServico(id: ServicoId) {
    setEstado((atual) => ({
      ...atual,
      servicos: alternarServico(atual.servicos, id),
    }));
    setErros((atual) => {
      if (!atual.servicos) {
        return atual;
      }
      const copia = { ...atual };
      delete copia.servicos;
      return copia;
    });
    setAviso(null);
  }

  function alternar(
    campo:
      | "crepesSalgados"
      | "crepesDoces"
      | "massas"
      | "churrasco"
      | "pratoPrincipal"
      | "acompanhamentos"
      | "saladas"
      | "sobremesas",
    item: string,
  ) {
    setEstado((atual) => {
      const copia = { ...atual };
      copia[campo] = alternarLista(atual[campo], item);
      return copia;
    });
  }

  function irPara(indice: number) {
    setPasso(indice);
  }

  function avancar() {
    if (passo === 0) {
      const novos = validarDadosEvento(estado.evento);
      if (Object.keys(novos).length > 0) {
        setErros(novos);
        setAviso("Revise os campos destacados antes de continuar.");
        topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    if (passo === 1) {
      const novos = validarServicos(estado);
      if (Object.keys(novos).length > 0) {
        setErros(novos);
        setAviso("Selecione ao menos um serviço para continuar.");
        return;
      }
    }

    const proximo = Math.min(passo + 1, PASSOS.length - 1);
    setPasso(proximo);
    setMaxVisitado((max) => Math.max(max, proximo));
    setErros({});
    setAviso(null);
  }

  function voltar() {
    setPasso((atual) => Math.max(atual - 1, 0));
    setAviso(null);
  }

  function enviarWhatsApp() {
    const mensagem = montarMensagemWhatsApp(estado);
    const link = gerarLinkWhatsApp(mensagem);

    if (!link) {
      setAviso(
        "O número do WhatsApp do buffet ainda não foi configurado. Não é possível gerar o link.",
      );
      return;
    }

    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div ref={topoRef} className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h2 className="font-display text-3xl text-accent-soft">
          Monte meu orçamento
        </h2>
        <p className="mt-1 text-sm text-muted">
          Etapa {passo + 1} de {PASSOS.length} — seus dados ficam salvos ao voltar.
        </p>
      </div>

      <div className="mb-6">
        <StepIndicator
          passos={PASSOS}
          atual={passo}
          maxVisitado={maxVisitado}
          onIr={irPara}
        />
      </div>

      {aviso ? (
        <p className="mb-4 rounded-lg border border-danger/50 bg-danger/10 px-3 py-2 text-xs text-danger">
          {aviso}
        </p>
      ) : null}

      <div className="space-y-6">
        {passo === 0 ? (
          <EventForm
            dados={estado.evento}
            onChange={atualizarEvento}
            erros={erros}
          />
        ) : null}

        {passo === 1 ? (
          <ServiceSelector
            selecionados={estado.servicos}
            onToggle={toggleServico}
            erro={erros.servicos}
          />
        ) : null}

        {passo === 2 ? (
          <div className="space-y-6">
            {estado.servicos.includes("crepe-salgado") ? (
              <SavoryCrepeSelector
                selecionados={estado.crepesSalgados}
                onToggle={(item) => alternar("crepesSalgados", item)}
                onDefinirTodos={(itens) =>
                  setEstado((atual) => ({ ...atual, crepesSalgados: itens }))
                }
              />
            ) : null}
            {estado.servicos.includes("crepe-doce") ? (
              <SweetCrepeSelector
                selecionados={estado.crepesDoces}
                onToggle={(item) => alternar("crepesDoces", item)}
                onDefinirTodos={(itens) =>
                  setEstado((atual) => ({ ...atual, crepesDoces: itens }))
                }
              />
            ) : null}
            {estado.servicos.includes("rodizio-massas") ? (
              <PastaSelector
                selecionados={estado.massas}
                onToggle={(item) => alternar("massas", item)}
                onDefinirTodos={(itens) =>
                  setEstado((atual) => ({ ...atual, massas: itens }))
                }
              />
            ) : null}
            {estado.servicos.includes("churrasco") ? (
              <BarbecueSelector
                selecionados={estado.churrasco}
                onToggle={(item) => alternar("churrasco", item)}
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <ReadyMenuSelector
                selecionado={estado.cardapioPronto}
                onSelecionar={(nome) =>
                  setEstado((atual) => ({ ...atual, cardapioPronto: nome }))
                }
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <MultiItemSelector
                titulo="Prato principal"
                descricao="Escolha os pratos principais de sua preferência para o almoço ou jantar."
                dica="Os pratos principais serão confirmados pelo buffet."
                vazio="O buffet ainda não cadastrou os pratos principais disponíveis."
                itens={PRATOS_PRINCIPAIS}
                selecionados={estado.pratoPrincipal}
                onToggle={(item) => alternar("pratoPrincipal", item)}
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <MultiItemSelector
                titulo="Acompanhamentos"
                descricao="Selecione os acompanhamentos que deseja incluir."
                dica="Os acompanhamentos serão confirmados pelo buffet."
                vazio="O buffet ainda não cadastrou os acompanhamentos disponíveis."
                itens={ACOMPANHAMENTOS}
                selecionados={estado.acompanhamentos}
                onToggle={(item) => alternar("acompanhamentos", item)}
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <MultiItemSelector
                titulo="Saladas"
                descricao="Selecione as saladas que deseja incluir."
                dica="As saladas serão confirmadas pelo buffet."
                vazio="O buffet ainda não cadastrou as saladas disponíveis."
                itens={SALADAS}
                selecionados={estado.saladas}
                onToggle={(item) => alternar("saladas", item)}
              />
            ) : null}
            {estado.servicos.includes("almoco-jantar") ? (
              <MultiItemSelector
                titulo="Sobremesas"
                descricao="Selecione as sobremesas que deseja incluir."
                dica="As sobremesas serão confirmadas pelo buffet."
                vazio="O buffet ainda não cadastrou as sobremesas disponíveis."
                itens={SOBREMESAS}
                selecionados={estado.sobremesas}
                onToggle={(item) => alternar("sobremesas", item)}
              />
            ) : null}

            <SectionCard
              titulo="Não encontrou o que procura?"
              descricao="Descreva pratos ou combinações que você deseja e que não estão na lista. Nós avaliamos a inclusão."
            >
              <Field label="Cardápio desejado" htmlFor="cardapioPersonalizado">
                <TextArea
                  id="cardapioPersonalizado"
                  rows={4}
                  placeholder="Ex.: crepe de frango com catupiry, massa ao molho branco com camarão..."
                  value={estado.cardapioPersonalizado}
                  onChange={(event) =>
                    setEstado((atual) => ({
                      ...atual,
                      cardapioPersonalizado: event.target.value,
                    }))
                  }
                />
              </Field>
            </SectionCard>
          </div>
        ) : null}

        {passo === 3 ? (
          <BeverageSelector
            incluir={estado.incluirBebidas}
            onIncluir={(valor) =>
              setEstado((atual) => ({ ...atual, incluirBebidas: valor }))
            }
            selecionadas={estado.bebidas}
            onToggle={(id) =>
              setEstado((atual) => ({
                ...atual,
                bebidas: alternarLista(atual.bebidas, id),
              }))
            }
            resumos={resumos}
            convidados={convidados}
          />
        ) : null}

        {passo === 4 ? (
          <StaffSelector
            resposta={estado.equipe}
            onResposta={(valor: EquipeResposta) =>
              setEstado((atual) => ({ ...atual, equipe: valor }))
            }
            funcoes={estado.funcoesEquipe}
            onToggleFuncao={(id: FuncaoEquipeId) =>
              setEstado((atual) => ({
                ...atual,
                funcoesEquipe: alternarLista(
                  atual.funcoesEquipe,
                  id,
                ) as FuncaoEquipeId[],
              }))
            }
          />
        ) : null}

        {passo === 5 ? (
          <QuoteSummary
            estado={estado}
            resumos={resumos}
            whatsappOk={whatsappOk}
            onEditar={() => irPara(0)}
            onEnviar={enviarWhatsApp}
          />
        ) : null}
      </div>

      {passo < PASSOS.length - 1 ? (
        <div className="mt-6 flex items-center justify-between gap-2">
          <Button
            type="button"
            variante="fantasma"
            onClick={voltar}
            disabled={passo === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button type="button" onClick={avancar}>
            Avançar
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
