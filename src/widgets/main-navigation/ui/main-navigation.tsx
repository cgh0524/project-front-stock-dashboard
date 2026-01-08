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
    <>
      <nav className="fixed h-full bg-surface-default w-[190px] border-border-default border-solid border">
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

      <div className="block w-[190px]"></div>
    </>
  );
}
