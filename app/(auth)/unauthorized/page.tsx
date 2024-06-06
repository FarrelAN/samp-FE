"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import logo from "@/public/assets/images/logo2.png";
import bgImage from "@/public/assets/images/bg8.jpg";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-mandiriBlue-950">
      <img
        src={logo.src}
        alt="Bank Mandiri Logo"
        className="aspect auto w-[200px] p-5"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>

      <p className="text-lg text-white mb-8">
        You do not have permission to view this page.
      </p>
      <Button
        className="bg-mandiriYellow-500 font-semibold text-mandiriBlue-950"
        onClick={() => router.push("/")}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Page;
