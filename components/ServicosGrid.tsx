import Image from "next/image";
import Link from "next/link";
import { SERVICOS } from "@/data/services";

export function ServicosGrid() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {SERVICOS.map((servico) => (
        <Link
          key={servico.id}
          href={`/servicos/${servico.id}`}
          className="group relative isolate block overflow-hidden rounded-2xl border border-line bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <div className="relative h-56 w-full sm:h-60">
            {servico.imagem ? (
              <Image
                src={servico.imagem}
                alt={servico.nome}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : null}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              aria-hidden
            />
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
      ))}
    </div>
  );
}
