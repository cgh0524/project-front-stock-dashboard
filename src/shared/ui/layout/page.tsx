export type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <div className="max-w-6xl w-full">{children}</div>;
}
