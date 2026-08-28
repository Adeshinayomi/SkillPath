export function Status({
  kind,
  onRetry,
}: {
  kind: "loading" | "error";
  onRetry?: () => void;
}) {
  if (kind === "loading")
    return (
      <div className="grid min-h-56 place-items-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
          Loading your skill graph…
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-rose-50 text-rose-600">
        !
      </div>
      <h2 className="text-lg font-semibold">
        Unable to load your skill analysis.
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Please try again in a moment.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Try again
        </button>
      )}
    </div>
  );
}
