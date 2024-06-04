"use client";
import React, { useState } from "react";
import { Nav } from "./ui/nav";
import { useWindowWidth } from "@react-hook/window-size";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  BookOpenText,
  BookText,
} from "lucide-react";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export default function SidenavBar({ isCollapsed, setIsCollapsed }: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

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
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Rules",
            href: "/rules",
            icon: BookOpenText,
            variant: "ghost",
          },
          {
            title: "Responses",
            href: "/responses",
            icon: BookText,
            variant: "ghost",
          },
        ]}
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
