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
  settingsLink: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  };
  logoutLink: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
    onClick: () => void;
  };
}

export function Nav({
  links,
  isCollapsed,
  settingsLink,
  logoutLink,
}: NavProps) {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <div data-collapsed={isCollapsed} className="group flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex justify-center bg-mandiriBlue py-4">
          <img
            src={logo.src}
            alt="Bank Mandiri Logo"
            className="w-[140px] aspect-auto"
          />
        </div>

        {/* Main Links and Bottom Links Section */}
        <nav className="flex flex-col flex-1 justify-between px-2 text-mandiriWhite mt-8 items-center">
          <div className="grid gap-6 items-center justify-center">
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
                      <link.icon className="h-6 w-6" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center">
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground ">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={index} className="transition-all delay-7000">
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathname ? "default" : "ghost",
                        size: "sm",
                      }),
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-mandiriYellow dark:hover:bg-muted dark:hover:text-white",
                      "justify-start mr-3 text-md"
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
          </div>

          <div className="pt-5 grid gap-5 items-center justify-center ml-2">
            <div>
              {isCollapsed ? (
                <Tooltip delayDuration={10000}>
                  <TooltipTrigger asChild>
                    <Link
                      href={settingsLink.href}
                      className={cn(
                        buttonVariants({
                          variant:
                            settingsLink.href === pathname
                              ? "default"
                              : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        settingsLink.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <settingsLink.icon className="h-6 w-6" />
                      <span className="sr-only">{settingsLink.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center">
                    {settingsLink.title}
                    {settingsLink.label && (
                      <span className="ml-auto text-muted-foreground ">
                        {settingsLink.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="transition-all delay-7000">
                  <Link
                    href={settingsLink.href}
                    className={cn(
                      buttonVariants({
                        variant:
                          settingsLink.href === pathname ? "default" : "ghost",
                        size: "sm",
                      }),
                      settingsLink.variant === "default" &&
                        "dark:bg-muted dark:text-mandiriYellow dark:hover:bg-muted dark:hover:text-white",
                      "justify-start mr-8 text-md"
                    )}
                  >
                    <settingsLink.icon className="mr-2 h-4 w-4" />
                    {settingsLink.title}
                    {settingsLink.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          settingsLink.variant === "default" &&
                            "text-background dark:text-white"
                        )}
                      >
                        {settingsLink.label}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>

            <div className="mb-4 pb-2 justify-center mr-1 ">
              {isCollapsed ? (
                <Tooltip delayDuration={10000}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={logoutLink.onClick}
                      className={cn(
                        buttonVariants({
                          variant:
                            logoutLink.href === pathname ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9 ml-1",
                        logoutLink.variant === "default" &&
                          "dark:bg-muted dark:text-mandiriYellow dark:hover:bg-muted dark:hover:text-white",
                        "scale-90"
                      )}
                    >
                      <logoutLink.icon className="h-7 w-7" />
                      <span className="sr-only">{logoutLink.title}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center">
                    {logoutLink.title}
                    {logoutLink.label && (
                      <span className="text-muted-foreground ">
                        {logoutLink.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="transition-all delay-7000 mr-3">
                  <button
                    onClick={logoutLink.onClick}
                    className={cn(
                      buttonVariants({
                        variant:
                          logoutLink.href === pathname ? "default" : "ghost",
                        size: "sm",
                      }),
                      logoutLink.variant === "default" &&
                        "dark:bg-muted dark:text-mandiriYellow dark:hover:bg-muted dark:hover:text-white",
                      "justify-start mr-3 text-md"
                    )}
                  >
                    <logoutLink.icon className="mr-2 h-4 w-4" />
                    {logoutLink.title}
                    {logoutLink.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          logoutLink.variant === "default" &&
                            "text-background dark:text-white"
                        )}
                      >
                        {logoutLink.label}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}
