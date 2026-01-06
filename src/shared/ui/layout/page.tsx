export type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <div className="max-w-6xl w-full h-full p-3">{children}</div>;
}
