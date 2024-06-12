"use client";
import React, { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import { useWindowWidth } from "@react-hook/window-size";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  BookOpenText,
  BookText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export default function SidenavBar({ isCollapsed, setIsCollapsed }: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { data: session } = useSession();
  const [userDivision, setUserDivision] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.user && session.user.division) {
      // Assuming session.user.division contains the division info
      const division = session.user.division.toLowerCase();
      setUserDivision(division);
    } else {
      setUserDivision("soc"); // Default to 'soc' if division is not available
    }
  }, [session]);

  const links = [
    {
      title: "Dashboard",
      href: `/${
        userDivision === "soc" || userDivision === "iam"
          ? userDivision
          : "admin"
      }`,
      icon: LayoutDashboard,
      variant: "default" as const,
    },
    {
      title: "Rules",
      href: "/rules",
      icon: BookOpenText,
      variant: "ghost" as const,
    },
    ...(userDivision !== "soc"
      ? [
          {
            title: "Responses",
            href: "/responses",
            icon: BookText,
            variant: "ghost" as const,
          },
        ]
      : []),
  ];

  return (
    <div
      className={`bg-gradient-to-t from-mandiriBlue-900 to-mandiriBlue-950 fixed top-0 left-0 h-full border-r p-3 transition-all duration-500 ease-in-out flex flex-col ${
        isCollapsed ? "w-[100px]" : "w-[200px]"
      }`}
      onMouseEnter={() => !mobileWidth && setIsCollapsed(false)}
      onMouseLeave={() => !mobileWidth && setIsCollapsed(true)}
    >
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={links}
        settingsLink={{
          title: "Settings",
          href: "/settings",
          icon: Settings,
          variant: "ghost",
        }}
        logoutLink={{
          title: "Log Out",
          onClick: () => signOut(),
          href: "/signIn",
          icon: LogOut,
          variant: "ghost",
        }}
      />
    </div>
  );
}
