"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
interface SidebarMenuItemProps {
  menuItemData: {
    Icon: StaticImageData;
    title: string;
    path: string;
  };
}

const SidebarMenuItem = ({
  menuItemData: { Icon, title, path },
}: SidebarMenuItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={
        pathname === path
          ? "activemenu-item sidebar-menu-item"
          : "sidebar-menu-item"
      }
    >
      <Image src={Icon} width={24} height={24} alt="icon"/>
      {title}
    </Link>
  );
};

export default SidebarMenuItem;
