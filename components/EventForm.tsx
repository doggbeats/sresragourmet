"use client";

import { TIPOS_EVENTO } from "@/data/services";
import type { DadosEvento } from "@/types/quote";
import type { ErrosOrcamento } from "@/lib/validation";
import { Field, Input, Select, SectionCard, TextArea } from "./ui";

export function EventForm({
  dados,
  onChange,
  erros,
}: {
  dados: DadosEvento;
  onChange: (campo: keyof DadosEvento, valor: string) => void;
  erros: ErrosOrcamento;
}) {
  return (
    <SectionCard
      titulo="Dados do evento"
      descricao="Conte para o buffet quem é você e como será a festa."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome do cliente" htmlFor="nome" erro={erros.nome}>
          <Input
            id="nome"
            value={dados.nome}
            autoComplete="off"
            placeholder="Ex.: Maria Oliveira"
            onChange={(event) => onChange("nome", event.target.value)}
          />
        </Field>

        <Field
          label="Telefone de contato"
          htmlFor="telefone"
          erro={erros.telefone}
        >
          <Input
            id="telefone"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            value={dados.telefone}
            onChange={(event) => onChange("telefone", event.target.value)}
          />
        </Field>

        <Field label="Tipo de evento" htmlFor="tipoEvento">
          <Select
            id="tipoEvento"
            value={dados.tipoEvento}
            onChange={(event) => onChange("tipoEvento", event.target.value)}
          >
            <option value="">Selecione...</option>
            {TIPOS_EVENTO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Data do evento" htmlFor="dataEvento" erro={erros.dataEvento}>
          <Input
            id="dataEvento"
            type="date"
            value={dados.dataEvento}
            onChange={(event) => onChange("dataEvento", event.target.value)}
          />
        </Field>

        <Field label="Horário do evento" htmlFor="horario">
          <Input
            id="horario"
            type="time"
            value={dados.horario}
            onChange={(event) => onChange("horario", event.target.value)}
          />
        </Field>

        <Field
          label="Local ou endereço"
          htmlFor="localEvento"
          dica="O deslocamento é cobrado conforme a localidade e será tratado ao finalizar o orçamento."
        >
          <Input
            id="localEvento"
            placeholder="Endereço ou nome do espaço"
            value={dados.localEvento}
            onChange={(event) => onChange("localEvento", event.target.value)}
          />
        </Field>

        <Field
          label="Quantidade de convidados"
          htmlFor="convidados"
          erro={erros.convidados}
        >
          <Input
            id="convidados"
            inputMode="numeric"
            placeholder="0"
            value={dados.convidados}
            onChange={(event) => onChange("convidados", event.target.value)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Observações" htmlFor="observacoes">
            <TextArea
              id="observacoes"
              rows={3}
              placeholder="Informações adicionais para o buffet (opcional)."
              value={dados.observacoes}
              onChange={(event) => onChange("observacoes", event.target.value)}
            />
          </Field>
        </div>
      </div>
    </SectionCard>
  );
}
