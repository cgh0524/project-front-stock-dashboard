export type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return (
    <main className="flex-1 overflow-auto w-full max-w-6xl  min-h-0 p-5 mx-auto">
      {children}
    </main>
  );
}
