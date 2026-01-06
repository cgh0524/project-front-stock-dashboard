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
    <nav className="h-full bg-surface-default max-w-3xs border-border-default border-solid border">
      <ul className="flex flex-col items-center gap-1 p-1 ">
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
