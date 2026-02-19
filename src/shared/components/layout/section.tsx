export type SectionProps = {
  title: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({
  title,
  actions,
  className,
  children,
}: SectionProps) {
  return (
    <section className={`flex flex-col gap-4 w-full bg-bg-elevated py-4 px-6 rounded-lg shadow-sm ${className ?? ""}`}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        {actions ? <div className="flex items-center">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
