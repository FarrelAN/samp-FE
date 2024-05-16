"use client";
import React from "react";
import { Nav } from "./ui/nav";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";

// Import icons from lucide-react
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

type Props = {};

export default function SidenavBar({}: Props) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const onlyWidth = useWindowWidth();
  const onlyHeight = useWindowHeight();
  const mobileWidth = onlyWidth < 768;

  // Toggle the collapsed state
  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    // <div
    //   className={`bg-gradient-to-t from-mandiriBlue-900 to-mandiriBlue-950 relative border-r px-3 pb-10 pt-24 transition-all duration-500 ease-in-out ${
    //     isCollapsed ? "w-[100px]" : "w-[200px]"
    //   }`}
    <div
      className={`bg-gradient-to-t from-mandiriBlue-900 to-mandiriBlue-950 relative border-r px-3 pb-10 pt-24 transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-[100px]" : "w-[200px]"
      }`}
      onMouseEnter={() => !mobileWidth && setIsCollapsed(false)} // Only trigger on non-mobile widths
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
            title: "Users",
            href: "/users",
            icon: Users,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Log Out",
            href: "/logout",
            icon: LogOut,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
