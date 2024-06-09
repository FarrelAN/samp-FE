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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import jsPDF from "jspdf";
import Image from "next/image";

interface HomeProps {
  responses: ResponseType[];
}

const useTypingEffect = (text: string, speed: number = 50, skip: boolean) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (skip) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, skip]);

  return displayedText;
};

export default function ResponsePage({ responses }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [analyzeClicked, setAnalyzeClicked] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);

  const userName = session?.user?.username || "admin";

  const handleAnalyzeFeedbacks = async () => {
    setAnalyzeClicked(true);
    setSkipTyping(false);
    try {
      const analysis = await analyzeFeedbacks();
      console.log("Analysis:", analysis); // Log the analysis to the console (for debugging purposes)
      setRawResponse(analysis);
    } catch (error) {
      console.error("Failed to analyze feedbacks", error);
      setRawResponse("Failed to analyze feedbacks.");
    }
  };

  const typedResponse = useTypingEffect(rawResponse || "", 50, skipTyping);

  const handleSkipTyping = () => {
    setSkipTyping(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const responseText = rawResponse || "";
    const lines = doc.splitTextToSize(responseText, 180); // Adjust the width to fit the text
    doc.text(`SAMP Case Analysis: ${date}`, 10, 10);
    doc.text(`Analysis\n${lines.join("\n")}`, 10, 20);
    doc.save("AI_Case_Analysis.pdf");
  };

  if (status === "loading") {
    return <LoadingScreen />; // Use the custom loading screen component
  }

  if (status === "unauthenticated") {
    redirect("/signIn");
    return null; // Prevent rendering until redirect happens
  }

  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row items-center gap-1">
        <Image
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
          width={90}
          height={90}
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
            <div className=" w-[600px]">
              {analyzeClicked ? (
                rawResponse ? (
                  <div>
                    <p className="whitespace-pre-line">{typedResponse}</p>
                    {!skipTyping &&
                      typedResponse.length < rawResponse.length && (
                        <Button
                          onClick={handleSkipTyping}
                          className="text-xs "
                          variant="link"
                        >
                          Skip
                        </Button>
                      )}
                  </div>
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
              {rawResponse && (
                <Button onClick={handleDownloadPDF} className="mr-auto">
                  Download PDF
                </Button>
              )}
              <DialogClose asChild>
                <Button onClick={() => setAiResponse(null)}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
