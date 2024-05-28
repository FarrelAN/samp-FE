// components/pages/AdminPage.tsx
"use client";
import React from "react";
import DataTable from "@/components/table/soc/SOCDataTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust the import path if necessary
import { sampLogo } from "@/public/assets";
import { CaseType } from "@/lib/types";

interface HomeProps {
  cases: CaseType[];
}

export default function AdminPage({ cases }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated") {
    router.push("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  const userName = session?.user?.username || "admin";

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row items-center gap-1">
        <img
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
        />
        <PageTitle title="Security Dashboard" />
      </div>

      <h1>Welcome, {userName}</h1>

      <DataTable data={cases} />
    </div>
  );
}
