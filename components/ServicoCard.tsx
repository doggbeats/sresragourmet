"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServicoInfo } from "@/types/quote";
import { cx } from "./ui";

export function ServicoCard({ servico }: { servico: ServicoInfo }) {
  const imagens =
    servico.imagens && servico.imagens.length > 0
      ? servico.imagens
      : servico.imagem
        ? [servico.imagem]
        : [];
  const total = imagens.length;
  const temCarrossel = total > 1;
  const [ativo, setAtivo] = useState(0);

  return (
    <Link
      href={`/servicos/${servico.id}`}
      className="group relative isolate block overflow-hidden rounded-2xl border border-line bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <div className="relative h-56 w-full sm:h-60">
        {imagens.map((src, indice) => (
          <Image
            key={src}
            src={src}
            alt={servico.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cx(
              "object-cover transition-opacity duration-500",
              indice === ativo ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {temCarrossel ? (
          <Image
            src={imagens[(ativo + 1) % total]}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
          aria-hidden
        />

        {temCarrossel ? (
          <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
            {imagens.map((src, indice) => (
              <button
                key={src}
                type="button"
                aria-label={`Ver foto ${indice + 1}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setAtivo(indice);
                }}
                className={cx(
                  "h-1.5 w-1.5 rounded-full transition",
                  indice === ativo ? "bg-white" : "bg-white/40",
                )}
              />
            ))}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h2 className="font-display text-xl text-white drop-shadow-sm">
            {servico.nome}
          </h2>
          <p className="mt-1 line-clamp-2 text-xs text-white/85">
            {servico.descricao}
          </p>
        </div>
      </div>
    </Link>
  );
}
