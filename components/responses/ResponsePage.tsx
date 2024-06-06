"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/responses/ResponseTable";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { sampLogo } from "@/public/assets";
import { ResponseType } from "@/lib/types";
import { analyzeFeedbacks } from "@/lib/actions"; // Import the API call
import LoadingScreen from "@/app/(main)/home/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeProps {
  responses: ResponseType[];
}

const useTypingEffect = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
};

export default function ResponsePage({ responses }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [analyzeClicked, setAnalyzeClicked] = useState(false);

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated") {
    redirect("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  const userName = session?.user?.username || "admin";

  const handleAnalyzeFeedbacks = async () => {
    setAnalyzeClicked(true);
    try {
      const analysis = await analyzeFeedbacks();
      console.log("Analysis:", analysis); // Log the analysis to the console (for debugging purposes)
      setRawResponse(analysis);
    } catch (error) {
      console.error("Failed to analyze feedbacks", error);
      setRawResponse("Failed to analyze feedbacks.");
    }
  };

  const typedResponse = useTypingEffect(rawResponse || "", 50);

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row items-center gap-1">
        <img
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
        />
        <PageTitle
          title={`Security Dashboard: Identity Access & Management Team`}
        />
      </div>

      <h1>Welcome, {userName} </h1>

      <DataTable data={responses} />

      <div className="my-4 items-end justify-between w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => setAnalyzeClicked(false)}
              className="bg-mandiriBlue-950 text-white"
            >
              Analyze Feedbacks
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>AI Cybercase Analysis Report</DialogTitle>
              <DialogDescription>
                Generate AI Analysis of the feedbacks from the users.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 w-[600px]">
              {analyzeClicked ? (
                rawResponse ? (
                  <p className="whitespace-pre-line">{typedResponse}</p>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-4 w-[700px]" />
                    <Skeleton className="h-4 w-[600px]" />
                    <Skeleton className="h-4 w-[500px]" />
                  </div>
                )
              ) : null}
            </div>
            <DialogFooter>
              <Button onClick={handleAnalyzeFeedbacks}>
                Analyze Feedbacks
              </Button>
              <Button onClick={() => setAiResponse(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
