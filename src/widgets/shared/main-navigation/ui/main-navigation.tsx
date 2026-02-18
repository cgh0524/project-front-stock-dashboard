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

  return (
    <nav className="min-w-[190px] w-[190px] bg-surface-default shadow-[10px_0_16px_rgba(0,0,0,0.08)]">
      <div className="p-2 text-2xl font-bold text-center italic text-accent-primary">
        Market Watch
      </div>

      <ul className="flex flex-col items-center gap-1 p-1">
        {items.map((item) => (
          <MainNavigationItem
            key={item.href}
            href={item.href}
            isActive={item.href === pathname}
          >
            {item.label}
          </MainNavigationItem>
        ))}
      </ul>
    </nav>
  );
}
