import { useEffect, useState } from "react";
import { api } from "../api";
import { BackIcon } from "../components/Icons";
import { Status } from "../components/Status";
import type { SkillDetail } from "../types";

export function SkillDetailPage({
  skillName,
  role,
  goBack,
  openSkill,
}: {
  skillName: string;
  role?: string;
  goBack: () => void;
  openSkill: (name: string) => void;
}) {
  const [detail, setDetail] = useState<SkillDetail | null>(null);
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const load = () => {
    setState("loading");
    api<SkillDetail>(`/skills/${encodeURIComponent(skillName)}`)
      .then((data) => {
        setDetail(data);
        setState("ready");
      })
      .catch(() => setState("error"));
  };
  useEffect(load, [skillName]);
  if (state === "loading")
    return (
      <main className="mx-auto max-w-5xl px-5 py-10">
        <Status kind="loading" />
      </main>
    );
  if (state === "error" || !detail)
    return (
      <main className="mx-auto max-w-5xl px-5 py-10">
        <button
          onClick={goBack}
          className="mb-7 text-sm font-semibold text-slate-500"
        >
          ← Back
        </button>
        <Status kind="error" onRetry={load} />
      </main>
    );
  const path = [...detail.prerequisites, detail.name];
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <BackIcon />
        Back to {role ? "analysis" : "skills directory"}
      </button>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-9">
        <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600">
          {detail.category}
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight">
          {detail.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {detail.description}
        </p>
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-brand-600">
            WHY THIS SKILL?
          </p>
          <h2 className="mt-2 text-xl font-bold">A meaningful connection</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {role
              ? `${detail.name} is required for the ${role} path you selected. Building it strengthens the foundation for the skills and projects that follow.`
              : `${detail.name} connects to other capabilities in the SkillPath graph and unlocks practical project work.`}
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-brand-600">PREREQUISITES</p>
          <h2 className="mt-2 text-xl font-bold">Build on what comes before</h2>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {path.map((node, index) => (
              <span className="contents" key={node}>
                <button
                  onClick={() => node !== detail.name && openSkill(node)}
                  disabled={node === detail.name}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${node === detail.name ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-700"}`}
                >
                  {node}
                </button>
                {index < path.length - 1 && (
                  <span className="text-brand-500">→</span>
                )}
              </span>
            ))}
          </div>
          {!detail.prerequisites.length && (
            <p className="mt-5 text-sm text-slate-500">
              This is a foundation skill—start here and branch outward.
            </p>
          )}
        </section>
      </div>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold text-brand-600">USED IN PROJECTS</p>
        <h2 className="mt-2 text-xl font-bold">Put it into practice</h2>
        {detail.projects.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {detail.projects.map((project) => (
              <article
                key={project.name}
                className="rounded-xl bg-slate-50 p-4"
              >
                <h3 className="font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            Project connections for this skill are coming soon.
          </p>
        )}
        {detail.relatedSkills.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Related skills
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.relatedSkills.map((name) => (
                <button
                  key={name}
                  onClick={() => openSkill(name)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
