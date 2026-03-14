import Link from "next/link";

export type MainNavigationItemProps = {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

export function MainNavigationItem({
  children,
  href,
  isActive = false,
  onClick,
}: MainNavigationItemProps) {
  const defaultStyles =
    "w-full text-text-primary text-left hover:bg-surface-alt rounded-md font-bold cursor-pointer";
  const activeStyles = isActive ? "bg-surface-alt" : "";

  return (
    <li
      data-active={isActive ? "true" : "false"}
      className={`${defaultStyles} ${activeStyles}`}
    >
      <Link className="w-full inline-block py-2 px-4" href={href} onClick={onClick}>
        {children}
      </Link>
    </li>
  );
}
