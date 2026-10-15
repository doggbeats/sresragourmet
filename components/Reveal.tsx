"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { cx } from "./ui";

export function Reveal({
  children,
  className,
  delay = 0,
  as,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisivel(true));
      return () => cancelAnimationFrame(frame);
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisivel(true);
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx("reveal", visivel && "reveal-visible", className)}
    >
      {children}
    </Tag>
  );
}
