import { MainLayout as Layout } from "@/widgets/main-layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
