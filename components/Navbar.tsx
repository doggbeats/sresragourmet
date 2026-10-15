"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IDENTIFICADOR_BUFFET, NOME_BUFFET } from "@/lib/buffet";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/galeria", label: "Galeria" },
  { href: "/orcamento", label: "Orçamento" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  const ehAtivo = (href: string) => href.split("#")[0] === pathname;

  return (
    <header className="nao-imprimir sticky top-0 z-30 border-b border-line/70 bg-surface/80 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/sr.jpeg"
            alt={`Logo ${NOME_BUFFET}`}
            width={44}
            height={44}
            priority
            className="h-10 w-10 rounded-xl border border-line object-cover"
          />
          <span className="min-w-0">
            <span className="block font-display text-lg leading-tight text-accent-soft">
              {NOME_BUFFET}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted">
              {IDENTIFICADOR_BUFFET}
            </span>
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const ativo = ehAtivo(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  ativo
                    ? "relative text-lg font-semibold text-accent-soft after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent"
                    : "relative text-lg font-medium text-muted transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:text-accent hover:after:w-full"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setAberto((valor) => !valor)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition hover:text-accent md:hidden"
        >
          {aberto ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {aberto ? (
        <nav className="border-t border-line/70 bg-surface/95 px-4 py-2 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setAberto(false)}
              className={
                ehAtivo(link.href)
                  ? "block rounded-lg px-3 py-3 text-lg font-semibold text-accent-soft"
                  : "block rounded-lg px-3 py-3 text-lg font-medium text-muted transition hover:text-accent"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
