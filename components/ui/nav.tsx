"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import logo from "@/public/assets/images/logo2.png";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <div className="ml-2 top-0 left-0 flex justify-center bg-mandiriBlue">
          <img
            src={logo.src}
            alt="Bank Mandiri Logo"
            className="w-[140px]"
            style={{ aspectRatio: "auto" }}
          />
        </div>
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 text-mandiriWhite mt-8">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={10000}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathname ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground ">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="transition-all delay-7000 ">
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: link.href === pathname ? "default" : "ghost",
                      size: "sm",
                    }),
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-mandiriYellow dark:hover:bg-muted dark:hover:text-white",
                    "justify-start my-3 mr-3"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
              </div>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
