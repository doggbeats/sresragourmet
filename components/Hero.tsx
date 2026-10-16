"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NOME_BUFFET } from "@/lib/buffet";
import { cx } from "./ui";

const SLIDES = [
  {
    src: "/salgados.jpg",
    titulo: `Seja bem-vindos ao Buffet ${NOME_BUFFET}`,
    texto: "Fica à vontade para conhecer nossos serviços.",
  },
  {
    src: "/pene.jpg",
    titulo: "Seu evento merece um sabor inesquecível!",
    texto:
      "Crepes irresistíveis e massas deliciosas para transformar cada ocasião em um momento especial.",
  },
  {
    src: "/churrasco-2.jpg",
    titulo: "Seu evento merece um sabor inesquecível!",
    texto:
      "Crepes irresistíveis e massas deliciosas para transformar cada ocasião em um momento especial.",
  },
];

export function Hero() {
  const [atual, setAtual] = useState(0);
  const slide = SLIDES[atual];

  useEffect(() => {
    const id = setInterval(() => {
      setAtual((indice) => (indice + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex h-[26rem] items-center overflow-hidden border-b border-line/70 sm:h-[34rem]">
      {SLIDES.map((item, indice) => (
        <div
          key={item.src}
          className={cx(
            "absolute inset-0 -z-10 transition-opacity duration-1000",
            indice === atual ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        >
          <div
            key={`${item.src}-${atual}`}
            className={cx(
              "hero-foto absolute inset-0 bg-cover bg-center bg-no-repeat",
              indice === atual && "hero-zoom",
            )}
            style={{ backgroundImage: `url(${item.src})` }}
            aria-hidden
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-10 text-center sm:gap-5 sm:px-6">
        <h1
          key={`titulo-${atual}`}
          className="slide-legenda font-display text-3xl text-white drop-shadow-md sm:text-5xl"
        >
          {slide.titulo}
        </h1>
        <p
          key={`texto-${atual}`}
          className="slide-legenda max-w-xl text-sm text-white/90 drop-shadow sm:text-base"
        >
          {slide.texto}
        </p>
        <Link
          href="/orcamento"
          className="btn-orcamento inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:text-xl"
        >
          Solicite seu orçamento
        </Link>
      </div>
    </section>
  );
}
