"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/iam/IAMDataTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust the import path if necessary
import { sampLogo1 } from "@/public/assets";
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
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonLoader from "../skeletonLoader";
import Image from "next/image";

interface HomeProps {
  cases: CaseType[];
}

export default function IAMPage({ cases }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [firstPath, setFirstPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = pathname ? pathname.split("/")[1].toUpperCase() : "";
    setFirstPath(path);
  }, [pathname]);

  useEffect(() => {
    if (status === "loading") return; // If status is loading, do nothing

    if (status === "authenticated" && session?.user) {
      const userDivision = session.user.division?.toLowerCase();
      console.log("User Division:", userDivision); // Debugging line

      if (userDivision !== "iam" && userDivision !== "admin") {
        router.push(
          `/${
            userDivision === "soc" || userDivision === "iam"
              ? userDivision
              : "iam"
          }`
        ); // Redirect to a "not authorized" page or any other page
      } else {
        setIsLoading(false); // Set loading to false once the user is authenticated and authorized
      }
    } else if (status === "unauthenticated") {
      redirect("/signIn");
    }
  }, [status, session, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg:mandiriGrey p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <Skeleton className="h-[90px] w-[90px] rounded" />
            <Skeleton className="h-8 w-64 rounded" />
          </div>
          <Skeleton className="h-10 w-24 rounded" />
        </div>
        <Skeleton className="h-8 w-48 mt-4 rounded" />
        <div className="mt-6">
          <Skeleton className="h-64 w-full rounded" />
        </div>
      </div>
    );
  }

  const userName = session?.user?.username || "admin";

  return (
    <div className="h-screen w-full bg:mandiriGrey p-4">
      <SkeletonLoader />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Image
            src={sampLogo1.src}
            alt="Bank Mandiri Logo"
            className="w-[90px] aspect-auto"
            width={90}
            height={90}
          />
          <PageTitle
            title={`Security Dashboard: Identity Access & Management Team`}
          />
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
