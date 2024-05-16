"use client";
import DataTable from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import SidenavBar from "@/components/SidenavBar";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn");
    },
  });

  const userName = session?.data?.user?.name;
  const userEmail = session?.data?.user?.email?.split("@")[0];
  console.log(JSON.stringify(session.data?.user));

  return (
    <>
      <div>
        <PageTitle title="SAMP Security Dashboard" />
        <h1>Welcome, {userName || userEmail}</h1>

        <button onClick={() => signOut()}>Log Out</button>

        <DataTable />
      </div>
    </>
  );
}

Home.requireAuth = true;
