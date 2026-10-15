"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function GaleriaGrid({ fotos }: { fotos: string[] }) {
  const [aberta, setAberta] = useState<string | null>(null);

  useEffect(() => {
    if (!aberta) {
      return;
    }
    const aoTeclar = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAberta(null);
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberta]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {fotos.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setAberta(src)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {aberta ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setAberta(null)}
        >
          <button
            type="button"
            onClick={() => setAberta(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={aberta}
              alt=""
              fill
              sizes="100vw"
              className="animate-[galeria-zoom_300ms_ease-out] object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
