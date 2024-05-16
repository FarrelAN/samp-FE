"use client";
import FinalReviewDataTable from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import SidenavBar from "@/components/SidenavBar";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; // Your loading screen component

export default function Page() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn");
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      // Session is still loading
      return;
    }

    if (!session) {
      // No session found, redirect to login
      router.push("/login");
    } else {
      router.push("/admin"); // Redirect to the main dashboard for admins
      // Check user role and division
      // if (session?.data?.user?.role === "admin") {
      //   router.push("/dashboard"); // Redirect to the main dashboard for admins
      // } else if (session.user.role === "member") {
      //   router.push("/member-dashboard"); // Redirect to a different dashboard for members
      // } else {
      //   router.push("/unauthorized"); // Redirect to an unauthorized page
      // }
    }

    setLoading(false);
  }, [session, status, router]);

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }

  return null;
}
