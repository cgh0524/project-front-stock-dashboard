export type EmptyContentProps = {
  message: string;
  size?: "sm" | "md" | "lg";
};

export function EmptyContent({
  message = "No data",
  size = "md",
}: EmptyContentProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  return (
    <div
      className={`w-full text-text-muted ${sizeStyles[size]} font-bold text-center`}
    >
      {message}
    </div>
  );
}
