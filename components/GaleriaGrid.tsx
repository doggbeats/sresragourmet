"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { cx } from "./ui";

export function GaleriaGrid({ fotos }: { fotos: string[] }) {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const [ativo, setAtivo] = useState(0);
  const trilhaRef = useRef<HTMLDivElement>(null);
  const toqueRef = useRef<number | null>(null);

  useEffect(() => {
    if (indiceAberto === null) {
      return;
    }
    const aoTeclar = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIndiceAberto(null);
      } else if (event.key === "ArrowRight") {
        setIndiceAberto((i) => (i === null ? i : (i + 1) % fotos.length));
      } else if (event.key === "ArrowLeft") {
        setIndiceAberto((i) =>
          i === null ? i : (i - 1 + fotos.length) % fotos.length,
        );
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indiceAberto, fotos.length]);

  const irLightbox = (delta: number) => {
    setIndiceAberto((i) =>
      i === null ? i : (i + delta + fotos.length) % fotos.length,
    );
  };

  const irPara = (destino: number) => {
    const trilha = trilhaRef.current;
    if (!trilha) {
      return;
    }
    const indice = Math.max(0, Math.min(fotos.length - 1, destino));
    trilha.scrollTo({ left: indice * trilha.clientWidth, behavior: "smooth" });
    setAtivo(indice);
  };

  const aoRolar = () => {
    const trilha = trilhaRef.current;
    if (!trilha || trilha.clientWidth === 0) {
      return;
    }
    const indice = Math.round(trilha.scrollLeft / trilha.clientWidth);
    setAtivo((anterior) => (anterior === indice ? anterior : indice));
  };

  const fotoAberta = indiceAberto === null ? null : fotos[indiceAberto];

  return (
    <>
      <div
        ref={trilhaRef}
        onScroll={aoRolar}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory overflow-x-auto scroll-smooth md:grid md:grid-cols-3 md:gap-3 md:overflow-visible lg:grid-cols-4"
      >
        {fotos.map((src, indice) => (
          <Reveal
            key={src}
            delay={(indice % 4) * 80}
            className="min-w-full flex-none snap-center md:min-w-0"
          >
            <button
              type="button"
              onClick={() => setIndiceAberto(indice)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => irPara(ativo - 1)}
          disabled={ativo === 0}
          aria-label="Foto anterior"
          className={cx(
            "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-muted transition hover:border-accent/40 hover:text-accent-soft",
            ativo === 0 &&
              "cursor-default opacity-40 hover:border-line hover:text-muted",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="min-w-16 text-center text-xs text-muted">
          {fotos.length > 0 ? `${ativo + 1} / ${fotos.length}` : "0 / 0"}
        </span>
        <button
          type="button"
          onClick={() => irPara(ativo + 1)}
          disabled={ativo === fotos.length - 1}
          aria-label="Próxima foto"
          className={cx(
            "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-muted transition hover:border-accent/40 hover:text-accent-soft",
            ativo === fotos.length - 1 &&
              "cursor-default opacity-40 hover:border-line hover:text-muted",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {fotoAberta ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIndiceAberto(null)}
          onTouchStart={(event) => {
            toqueRef.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const inicio = toqueRef.current;
            toqueRef.current = null;
            if (inicio === null) {
              return;
            }
            const delta = (event.changedTouches[0]?.clientX ?? inicio) - inicio;
            if (Math.abs(delta) > 40) {
              irLightbox(delta > 0 ? -1 : 1);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setIndiceAberto(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>

          {fotos.length > 1 ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                irLightbox(-1);
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:bg-black/70 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={fotoAberta}
              src={fotoAberta}
              alt=""
              fill
              sizes="100vw"
              className="animate-[galeria-zoom_300ms_ease-out] object-contain"
            />
          </div>

          {fotos.length > 1 ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                irLightbox(1);
              }}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:bg-black/70 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}

          {fotos.length > 1 ? (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {(indiceAberto ?? 0) + 1} / {fotos.length}
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
