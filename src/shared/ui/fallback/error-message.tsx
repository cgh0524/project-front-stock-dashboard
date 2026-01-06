export type ErrorMessageProps = {
  message: string;
  retry?: () => void;
};

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 font-bold">
      <div className="flex gap-2 items-center">
        <span className="text-2xl text-negative">❌</span>
        <span className="text-2xl text-negative font-bold">{message}</span>
      </div>

      {retry && (
        <button
          className="border border-positive rounded-md px-2 py-1 text-positive font-bold hover:bg-positive-subtle"
          type="button"
          onClick={retry}
        >
          Retry
        </button>
      )}
    </div>
  );
}
