import { MainHeader } from "@/widgets/main-header";
import { MainNavigation } from "@/widgets/main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />

      <div className="flex flex-1">
        <MainNavigation />
        <main className="flex-1 p-3">{children}</main>
      </div>
    </div>
  );
}
