"use client";

import { Check } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const CAMPO_BASE =
  "w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-50";

export function Field({
  label,
  htmlFor,
  erro,
  dica,
  children,
}: {
  label: string;
  htmlFor?: string;
  erro?: string;
  dica?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
      {erro ? (
        <span className="text-xs text-danger">{erro}</span>
      ) : dica ? (
        <span className="text-xs text-muted/80">{dica}</span>
      ) : null}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(CAMPO_BASE, className)} />;
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(CAMPO_BASE, className)} />;
}

export function TextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(CAMPO_BASE, className)} />;
}

type Variante = "primario" | "contorno" | "fantasma";

const VARIANTES: Record<Variante, string> = {
  primario:
    "bg-accent text-black hover:bg-accent-soft focus-visible:ring-accent/50",
  contorno:
    "border border-accent/60 text-accent-soft hover:bg-accent/10 focus-visible:ring-accent/40",
  fantasma:
    "border border-line text-muted hover:text-ink hover:border-accent/40 focus-visible:ring-accent/30",
};

export function Button({
  variante = "primario",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        VARIANTES[variante],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OpcaoSelecionavel({
  ativo,
  onClick,
  children,
  className,
  role = "checkbox",
}: {
  ativo: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  role?: "checkbox" | "radio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={ativo}
      onClick={onClick}
      className={cx(
        "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition",
        ativo
          ? "border-accent/70 bg-accent/[0.08] text-ink"
          : "border-line bg-surface-2/40 text-muted hover:border-accent/40 hover:text-ink",
        className,
      )}
    >
      <span
        className={cx(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
          ativo ? "border-accent bg-accent text-black" : "border-line",
        )}
      >
        {ativo ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

export function SectionCard({
  numero,
  titulo,
  descricao,
  children,
}: {
  numero?: string;
  titulo: string;
  descricao?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface/80 p-5 sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        {numero ? (
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 font-display text-sm text-accent">
            {numero}
          </span>
        ) : null}
        <div>
          <h2 className="font-display text-xl text-accent-soft">{titulo}</h2>
          {descricao ? (
            <p className="mt-0.5 text-sm text-muted">{descricao}</p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}
