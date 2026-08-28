import { useState } from "react";
import type { Page } from "../types";

export function Header({
  page,
  navigate,
}: {
  page: Page;
  navigate: (page: Page) => void;
}) {
  
  const [open, setOpen] = useState(false);

  const links: { text: string; page: Page }[] = [
    { text: "Analyze Skills", page: "home" },
    { text: "Explore Skills", page: "explore" },
    { text: "About", page: "home" },
  ];

  const go = (next: Page) => {
    navigate(next);
    setOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink"
          aria-label="SkillPath home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            ⌁
          </span>
          SkillPath
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.text}
              onClick={() => go(link.page)}
              className={`text-sm font-medium ${page === link.page && link.page !== "home" ? "text-brand-600" : "text-slate-600 hover:text-ink"}`}
            >
              {link.text}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? "×" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-100 px-5 py-3 md:hidden">
          {links.map((link) => (
            <button
              key={link.text}
              onClick={() => go(link.page)}
              className="block w-full py-2 text-left text-sm font-medium text-slate-600"
            >
              {link.text}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
