"use client";
import React, { useEffect, useState } from "react";
import RulesTable from "@/components/rules/RulesTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, redirect } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust the import path if necessary
import { sampLogo1 } from "@/public/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { rulesData } from "@/components/data/projects/dummie";
import Image from "next/image";

export default function RulesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [firstPath, setFirstPath] = useState("");

  useEffect(() => {
    const path = pathname ? pathname.split("/")[1].toUpperCase() : "";
    setFirstPath(path);
  }, [pathname]);

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated") {
    redirect("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  const userName = session?.user?.username || "admin";
  const userDivision = session?.user?.division || "IAM";

  const pageTitle =
    userDivision === "SOC"
      ? "Security Dashboard: Security Operations Center Team"
      : "Security Dashboard: Identity Access & Management Team";

  const rules = rulesData;

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Image
            src={sampLogo1.src}
            alt="Bank Mandiri Logo"
            className="w-[90px] aspect-auto"
            width={90}
            height={90}
          />
          <PageTitle title={pageTitle} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-24">
              {userDivision.toUpperCase()}
              <Menu className="mx-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={userDivision.toLowerCase()}
              onValueChange={(value) => {
                if (value === "soc") {
                  router.push("/soc");
                } else if (value === "iam") {
                  router.push("/iam");
                }
              }}
            >
              <DropdownMenuRadioItem value="iam">IAM</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="soc">SOC</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h1>Welcome, {userName} </h1>

      <RulesTable data={rules} />
    </div>
  );
}
