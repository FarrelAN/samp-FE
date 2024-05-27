"use client";
import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import SidenavBar from "@/components/SidenavBar";
import SessionProvider from "./SessionProvider";
import "aos/dist/aos.css";
import AOS from "aos";
import localFont from "next/font/local";

const myriad = localFont({
  src: [
    {
      path: "../public/fonts/myriad/MYRIADPRO-REGULAR.woff",
      weight: "400",
    },
    {
      path: "../public/fonts/myriad/MYRIADPRO-BOLD.woff",
      weight: "700",
    },
  ],
  variable: "--font-myriad",
});

const ClientRootLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isLoggedIn = !!session;

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <SessionProvider session={session}>
      {isLoggedIn && (
        <SidenavBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}
      <div
        className={cn(
          "w-full transition-all duration-500 ease-in-out",
          isLoggedIn ? "py-5 px-2" : "",
          isLoggedIn ? (isCollapsed ? "ml-[125px]" : "ml-[225px]") : ""
        )}
      >
        {children}
      </div>
    </SessionProvider>
  );
};

export default ClientRootLayout;
