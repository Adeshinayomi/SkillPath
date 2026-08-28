type IconProps = { className?: string };

function Icon({ path, className = "h-5 w-5" }: IconProps & { path: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export const SearchIcon = () => (
  <Icon path="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0" />
);
export const ArrowIcon = () => <Icon path="m5 12h14m-6-6 6 6-6 6" />;
export const CloseIcon = () => (
  <Icon className="h-3.5 w-3.5" path="M18 6 6 18M6 6l12 12" />
);
export const BackIcon = () => (
  <Icon className="h-4 w-4" path="m15 18-6-6 6-6" />
);
