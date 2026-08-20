"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image'

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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

  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-hairline bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between px-5 md:h-20 md:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="font-display text-[17px] leading-none tracking-[0.28em] whitespace-nowrap uppercase md:text-lg"
        >
          <Image
            src="/trav_trials.svg"
            width={125}
            height={125}
            alt="Picture of the author"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex lg:gap-11">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`text-[10.5px] font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:text-accent ${
                  isActive(href) ? "text-accent" : "text-muted"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/book"
              className="border border-hairline px-6 py-2.5 text-[10.5px] font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Enquire
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid size-11 place-items-center md:hidden"
        >
          <span aria-hidden className="relative block h-2.5 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open || undefined}
        className={`grid overflow-hidden bg-background transition-[grid-template-rows,opacity] duration-500 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="min-h-0 px-5">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`font-display block border-b border-hairline py-4 text-lg tracking-[0.14em] uppercase ${
                  isActive(href) ? "text-accent" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="py-6">
            <Link
              href="/book"
              className="block border border-hairline py-3.5 text-center text-[10.5px] font-light tracking-[0.2em] uppercase"
            >
              Enquire
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
