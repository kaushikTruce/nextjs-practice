"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-md dark:bg-neutral-950/80"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-full bg-sky-600 text-sm font-black text-white"
          >
            TT
          </span>
          TRAV TRAILS
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors}`}
              >
                {label.toUpperCase()}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link
              href="/book"
              className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Hamburger — three bars that fold into an X */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid size-11 place-items-center rounded-lg md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open || undefined}
        className={`grid overflow-hidden border-neutral-200 bg-white transition-[grid-template-rows,opacity] duration-300 md:hidden dark:border-neutral-800 dark:bg-neutral-950 ${
          open
            ? "grid-rows-[1fr] border-t opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="min-h-0 px-4 py-2 sm:px-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`block border-b border-neutral-100 py-3.5 text-base font-medium dark:border-neutral-900 ${
                  isActive(href)
                    ? "text-sky-600"
                    : "text-neutral-800 dark:text-neutral-200"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="py-4">
            <Link
              href="/book"
              className="block rounded-full bg-sky-600 px-5 py-3 text-center text-base font-semibold text-white"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
