import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CARDAPIOS } from "@/data/cardapios";
import { SERVICOS } from "@/data/services";
import type { ServicoId } from "@/types/quote";

export function generateStaticParams() {
  return SERVICOS.map((servico) => ({ id: servico.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const servico = SERVICOS.find((item) => item.id === id);

  if (!servico) {
    return { title: "Serviço — Sr. e Srta. Gourmet" };
  }

  return {
    title: `${servico.nome} — Sr. e Srta. Gourmet`,
    description: servico.descricao,
  };
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const servico = SERVICOS.find((item) => item.id === id);

  if (!servico) {
    notFound();
  }

  const secoes = CARDAPIOS[servico.id as ServicoId] ?? [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/servicos"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent-soft"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para serviços
      </Link>

      <Reveal>
        <h1 className="mt-5 font-display text-3xl text-accent-soft sm:text-4xl">
          {servico.nome}
        </h1>
      </Reveal>

      {servico.imagem ? (
        <Reveal delay={80}>
          <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src={servico.imagem}
              alt={servico.nome}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
            />
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={120}>
        <p className="mt-5 text-sm text-muted sm:text-base">
          {servico.descricao}
        </p>
      </Reveal>

      <div className="mt-6 space-y-5">
        {secoes.map((secao, indice) =>
          secao.itens.length > 0 ? (
            <Reveal key={secao.titulo} delay={(indice % 3) * 80}>
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted">
                {secao.titulo}
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {secao.itens.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null,
        )}
      </div>

      <Reveal delay={120}>
        <div className="mt-8">
          <Link
            href="/orcamento"
            className="btn-orcamento inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold"
          >
            Faça seu orçamento
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
