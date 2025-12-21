export type EmptyContentProps = {
  message: string;
};

export function EmptyContent({ message = "No data" }: EmptyContentProps) {
  return (
    <div className="w-full text-text-muted text-md font-bold text-center">
      {message}
    </div>
  );
}
