import { useState } from "react";
import { ArrowIcon, SearchIcon } from "../components/Icons";
import { Status } from "../components/Status";
import type { Skill } from "../types";

export function ExplorePage({
  skills,
  loading,
  error,
  openSkill,
}: {
  skills: Skill[];
  loading: boolean;
  error: boolean;
  openSkill: (name: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const categories = [
    "All categories",
    ...Array.from(new Set(skills.map((skill) => skill.category))),
  ];
  const filtered = skills.filter(
    (skill) =>
      (category === "All categories" || skill.category === category) &&
      `${skill.name} ${skill.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-brand-600">SKILL DIRECTORY</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Explore the skill graph
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Understand the building blocks behind every software-development role.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="absolute left-4 top-3.5 text-slate-400">
            <SearchIcon />
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search skills"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <Status kind="loading" />
      ) : error ? (
        <div className="mt-10">
          <Status kind="error" />
        </div>
      ) : filtered.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <button
              key={skill.name}
              onClick={() => openSkill(skill.name)}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-brand-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {skill.category}
                </span>
                <span className="text-slate-300 group-hover:text-brand-600">
                  <ArrowIcon />
                </span>
              </div>
              <h2 className="mt-5 font-semibold text-ink">{skill.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {skill.description}
              </p>
              <p className="mt-5 text-xs font-semibold text-brand-600">
                View connected skills
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="font-semibold">No skills found</h2>
          <p className="mt-2 text-sm text-slate-500">
            Try another search term or category.
          </p>
        </div>
      )}
    </main>
  );
}
