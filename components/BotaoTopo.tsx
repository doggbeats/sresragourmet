"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cx } from "./ui";

export function BotaoTopo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    const frame = requestAnimationFrame(aoRolar);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cx(
        "nao-imprimir fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/70 text-[#e6c65c] shadow-lg backdrop-blur transition duration-300 hover:bg-black/90",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
