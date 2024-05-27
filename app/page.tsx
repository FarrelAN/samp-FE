"use client";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen"; // Your loading screen component

export default function Page() {
  const { data: session, status } = useSession({
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
      router.push("/signIn");
    } else {
      router.push("/iam");
    }

    setLoading(false);
  }, [session, status, router]);

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }

  return null; // Return null as this component only handles redirection
}
