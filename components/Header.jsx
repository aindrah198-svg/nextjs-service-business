"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="nav-wrap">
        <Link href="/" className="logo" aria-label="Forma home">
          forma<span>✳</span>
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
        >
          {open ? "Close" : "Menu"} <span>{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-nav"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["/services", "Services"],
            ["/work", "Our work"],
            ["/about", "About us"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="button small"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <span>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
