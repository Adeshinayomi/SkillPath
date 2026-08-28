import { useState } from "react";
import { ArrowIcon, CloseIcon, SearchIcon } from "../components/Icons";
import { Status } from "../components/Status";
import type { Job, Skill } from "../types";

type Props = {
  jobs: Job[];
  skills: Skill[];
  loading: boolean;
  error: boolean;
  onAnalyze: (job: string, skills: string[]) => Promise<void>;
};

export function HomePage({ jobs, skills, loading, error, onAnalyze }: Props) {
  const [job, setJob] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const available = skills
    .filter(
      (skill) =>
        !selected.includes(skill.name) &&
        skill.name.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 7);
  const canSubmit = Boolean(job) && selected.length > 0 && !submitting;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    setSubmitting(true);
    await onAnalyze(job, selected);
    setSubmitting(false);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-600">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Career clarity starts here
            </div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Know what to <span className="text-brand-600">learn next.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover the skills you need for your target role and build a
              clear path from where you are to where you want to be.
            </p>
          </div>
        </div>
      </section>
      <main className="mx-auto -mt-4 max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Build your skill profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us where you are and where you’re headed.
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                Step 1 of 1
              </span>
            </div>
            {loading ? (
              <Status kind="loading" />
            ) : error ? (
              <Status kind="error" />
            ) : (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Target role
                </label>
                <select
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                >
                  <option value="">Search or select a role</option>
                  {jobs.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
                {touched && !job && (
                  <p className="mt-2 text-xs text-rose-600">
                    Choose a target role to continue.
                  </p>
                )}
                <div className="mt-7">
                  <label className="block text-sm font-semibold text-slate-700">
                    Your current skills
                  </label>
                  <p className="mt-1 text-sm text-slate-500">
                    Add the skills you already feel comfortable using.
                  </p>
                  <div className="mt-3 rounded-xl border border-slate-300 bg-white p-2 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50">
                    <div className="flex flex-wrap gap-2">
                      {selected.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5 text-sm font-medium text-brand-600"
                        >
                          {name}
                          <button
                            type="button"
                            onClick={() =>
                              setSelected(
                                selected.filter((skill) => skill !== name),
                              )
                            }
                            aria-label={`Remove ${name}`}
                          >
                            <CloseIcon />
                          </button>
                        </span>
                      ))}
                      <div className="flex min-w-40 flex-1 items-center gap-2 px-1 text-slate-400">
                        <SearchIcon />
                        <input
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          className="w-full py-1.5 text-sm text-ink outline-none placeholder:text-slate-400"
                          placeholder={
                            selected.length
                              ? "Add another skill"
                              : "Search skills"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {query && (
                    <div className="relative">
                      <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        {available.length ? (
                          available.map((skill) => (
                            <button
                              type="button"
                              key={skill.name}
                              onClick={() => {
                                setSelected([...selected, skill.name]);
                                setQuery("");
                              }}
                              className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50"
                            >
                              <span className="text-sm font-medium">
                                {skill.name}
                              </span>
                              <span className="text-xs text-slate-400">
                                {skill.category}
                              </span>
                            </button>
                          ))
                        ) : (
                          <p className="px-4 py-3 text-sm text-slate-500">
                            No matching skills found.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {touched && !selected.length && (
                    <p className="mt-2 text-xs text-rose-600">
                      Add at least one current skill to continue.
                    </p>
                  )}
                </div>
                <button
                  disabled={!canSubmit}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 disabled:bg-slate-200 disabled:text-slate-500"
                >
                  {submitting ? (
                    "Analyzing your path…"
                  ) : (
                    <>
                      Analyze my skills <ArrowIcon />
                    </>
                  )}
                </button>
              </>
            )}
          </form>
          <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
              How it works
            </p>
            <div className="mt-6 space-y-6">
              {[
                [
                  "1",
                  "Choose a destination",
                  "Select the role you want to grow into.",
                ],
                [
                  "2",
                  "Share your foundation",
                  "Add skills you already bring to the table.",
                ],
                [
                  "3",
                  "Follow the connections",
                  "See exactly what to learn—and why.",
                ],
              ].map(([number, title, copy]) => (
                <div key={number} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-300">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
