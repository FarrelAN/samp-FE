"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Session is still loading
      return;
    }

    if (!session) {
      // No session found, redirect to login
      router.push("/signIn");
    } else {
      const userDivision = session.user.division
        ? session.user.division.toLowerCase()
        : "soc"; // Default to "soc" if division is undefined
      switch (userDivision) {
        case "iam":
          router.push("/iam");
          break;
        case "soc":
          router.push("/soc");
          break;
        case "gva":
          router.push("/responses");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/signIn");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen w-full p-4">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-10 w-1/2 rounded-full" />
          <Skeleton className="h-8 w-1/3 rounded-full" />
          <Skeleton className="h-screen w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full p-4">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-full" />
        <Skeleton className="h-8 w-1/3 rounded-full" />
        <Skeleton className="h-screen w-full rounded-3xl" />
      </div>
    </div>
  );
}
