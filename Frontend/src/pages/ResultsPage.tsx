import { ArrowIcon, BackIcon } from "../components/Icons";
import type { Analysis, Skill } from "../types";

function SkillCard({
  skill,
  openSkill,
}: {
  skill: Skill;
  openSkill: (name: string) => void;
}) {
  const essential = skill.importance === "essential";
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{skill.category}</p>
          <h3 className="mt-1 font-semibold text-ink">{skill.name}</h3>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${essential ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}
        >
          {essential ? "Essential" : "Recommended"}
        </span>
      </div>
      <p className="mt-3 min-h-10 text-sm leading-5 text-slate-500">
        {skill.description}
      </p>
      <button
        onClick={() => openSkill(skill.name)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600"
      >
        View skill <ArrowIcon />
      </button>
    </article>
  );
}

export function ResultsPage({
  analysis,
  openSkill,
  newAnalysis,
}: {
  analysis: Analysis;
  openSkill: (name: string) => void;
  newAnalysis: () => void;
}) {
  const essential = analysis.missingSkills.filter(
    (skill) => skill.importance === "essential",
  );
  const recommended = analysis.missingSkills.filter(
    (skill) => skill.importance !== "essential",
  );
  const paths = Array.from(
    new Map(
      analysis.learningPaths.map((path) => [path.learningPath.join(","), path]),
    ).values(),
  ).slice(0, 5);
  const summary = [
    [
      "Skills you have",
      analysis.currentSkills.length,
      "bg-brand-50 text-brand-600",
    ],
    [
      "Essential skills missing",
      essential.length,
      "bg-amber-50 text-amber-700",
    ],
    ["Recommended skills", recommended.length, "bg-blue-50 text-blue-700"],
    ["Learning paths available", paths.length, "bg-violet-50 text-violet-700"],
  ];
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <button
        onClick={newAnalysis}
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <BackIcon />
        Start a new analysis
      </button>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-brand-600">
            SKILL GAP ANALYSIS
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your {analysis.job} skill gap
          </h1>
          <p className="mt-3 text-slate-600">
            A connected view of what you have, what’s next, and how to get
            there.
          </p>
        </div>
        <span className="w-fit rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-600">
          {analysis.currentSkills.length} skills in your profile
        </span>
      </div>
      <section className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map(([label, value, color]) => (
          <div
            key={String(label)}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}
            >
              +
            </span>
            <p className="mt-4 text-2xl font-bold">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </section>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <section>
          <p className="text-sm font-semibold text-brand-600">
            01 — MISSING SKILLS
          </p>
          <h2 className="mt-1 text-2xl font-bold">Focus your learning</h2>
          {analysis.missingSkills.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-brand-200 bg-brand-50 p-8 text-center">
              <h3 className="font-semibold">You’re already covered.</h3>
              <p className="mt-1 text-sm text-slate-600">
                Your selected skills match this role’s requirements.
              </p>
            </div>
          ) : (
            <>
              <h3 className="mt-7 text-sm font-semibold text-slate-700">
                Essential{" "}
                <span className="font-normal text-slate-400">
                  ({essential.length})
                </span>
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {essential.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    openSkill={openSkill}
                  />
                ))}
              </div>
              {recommended.length > 0 && (
                <>
                  <h3 className="mt-8 text-sm font-semibold text-slate-700">
                    Recommended{" "}
                    <span className="font-normal text-slate-400">
                      ({recommended.length})
                    </span>
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {recommended.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        openSkill={openSkill}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-brand-600">
            02 — LEARNING PATH
          </p>
          <h2 className="mt-1 text-2xl font-bold">Learn through connections</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Each step is linked by a prerequisite relationship in your skill
            graph.
          </p>
          <div className="mt-7 space-y-6">
            {paths.length ? (
              paths.map((path, index) => (
                <div
                  key={`${path.targetSkill}-${index}`}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Path to {path.targetSkill}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {path.learningPath.map((node, nodeIndex) => (
                      <span className="contents" key={node}>
                        <button
                          onClick={() => openSkill(node)}
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold ${nodeIndex === path.learningPath.length - 1 ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-700"}`}
                        >
                          {node}
                        </button>
                        {nodeIndex < path.learningPath.length - 1 && (
                          <span className="text-brand-500">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-brand-50 p-4 text-sm text-brand-700">
                No prerequisite gaps remain in the available paths.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
