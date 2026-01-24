export type TileProps = {
  className?: string;
  children: React.ReactNode;
};

export function Tile({ className, children }: TileProps) {
  return (
    <div className={`bg-surface-default rounded-lg shadow-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}
