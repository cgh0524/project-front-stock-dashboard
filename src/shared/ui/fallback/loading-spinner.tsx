export type LoadingSpinnerProps = {
  message?: string;
};

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 text-text-secondary"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-positive border-r-positive-subtle border-b-positive-subtle border-l-positive-subtle" />
      {message && <span className="text-sm font-bold">{message}</span>}
    </div>
  );
}
