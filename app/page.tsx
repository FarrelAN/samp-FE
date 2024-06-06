"use client";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen"; // Your loading screen component

export default function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn");
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Session is still loading
      return;
    }

    if (!session) {
      // No session found, redirect to login
      redirect("/signIn");
    } else {
      const userDivision = session.user.division;
      switch (userDivision) {
        case "iam":
          redirect("/iam");
          break;
        case "soc":
          redirect("/soc");
          break;
        case "gva":
          redirect("/responses");
          break;
        case "admin":
          redirect("/soc");
          break;
        default:
          redirect("/signIn");
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return null; // Return null as this component only handles redirection
}
