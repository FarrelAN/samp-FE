"use client";
import React from "react";
import RulesTable from "@/components/table/rules/RulesTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust the import path if necessary
import { sampLogo } from "@/public/assets";
import { CaseType, RuleSetType } from "@/lib/types";
import { rulesData } from "@/components/data/projects/dummie";

export default function SOCPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated") {
    redirect("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  const userName = session?.user?.username || "admin";
  const rules = rulesData;

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row items-center gap-1">
        <img
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
        />
        <PageTitle title="Security Dashboard: Security Operations Center Team" />
      </div>

      <h1>Welcome, {userName}</h1>

      <RulesTable data={rules} />
    </div>
  );
}
