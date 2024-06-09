"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/soc/SOCDataTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust the import path if necessary
import { sampLogo } from "@/public/assets";
import { CaseType } from "@/lib/types";
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
import SkeletonLoader from "../skeletonLoader";
import Image from "next/image";

interface HomeProps {
  cases: CaseType[];
}

export default function SOCPage({ cases }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [firstPath, setFirstPath] = useState("");

  useEffect(() => {
    const path = pathname ? pathname.split("/")[1].toUpperCase() : "";
    setFirstPath(path);
  }, [pathname]);

  useEffect(() => {
    if (status === "authenticated") {
      const userDivision = session?.user?.division?.toLowerCase();

      if (userDivision !== "soc" && userDivision !== "admin") {
        router.push(
          `/${
            userDivision === "soc" || userDivision === "iam"
              ? userDivision
              : "soc"
          }`
        ); // Redirect to a "not authorized" page or any other page
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated" || !session) {
    redirect("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  const userName = session?.user?.username || "admin";

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <SkeletonLoader />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Image
            src={sampLogo.src}
            alt="Bank Mandiri Logo"
            className="w-[90px] aspect-auto"
            width={90}
            height={90}
          />
          <PageTitle title="Security Dashboard: Security Operations Center Team" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-24">
              {firstPath}
              <Menu className="mx-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Division</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={firstPath.toLowerCase()}
              onValueChange={(value) => {
                if (value === "soc") {
                  router.push("/soc");
                } else if (value === "iam") {
                  router.push("/iam");
                }
              }}
            >
              <DropdownMenuRadioItem
                value="iam"
                onClick={() => router.push("/iam")}
              >
                IAM
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="soc"
                onClick={() => router.push("/soc")}
              >
                SOC
              </DropdownMenuRadioItem>
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

      <DataTable data={cases} />
    </div>
  );
}
