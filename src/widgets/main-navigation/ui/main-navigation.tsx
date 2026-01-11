"use client";

import { usePathname } from "next/navigation";

import { MainNavigationItem } from "./main-navigation-item";

export function MainNavigation() {
  const items = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/stock-dashboard",
      label: "Stock Dashboard",
    },
  ];

  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <nav className="min-w-[190px] w-[190px] h-full bg-surface-default">
      <div className="p-2 text-2xl font-bold text-center italic text-accent-primary">
        Market Watch
      </div>

      <ul className="flex flex-col items-center gap-1 p-1">
        {items.map((item) => (
          <MainNavigationItem
            key={item.href}
            href={item.href}
            isActive={isActiveRoute(item.href)}
          >
            {item.label}
          </MainNavigationItem>
        ))}
      </ul>
    </nav>
  );
}
