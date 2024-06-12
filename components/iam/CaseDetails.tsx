"use client";
import React, { useState } from "react";
import { CaseType } from "@/lib/types";
import { sendMessage, handleCaseReview } from "@/lib/actions";
import { redirect, useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useToast } from "@/components/ui/use-toast";
import MapChart from "@/components/MapChart"; // Adjust the import based on your file structure
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CaseDetailsProps {
  caseData: CaseType;
  response: any; // Adjust the type based on your actual response structure
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData, response }) => {
  const score = parseInt(String(caseData.case_score));
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { toast } = useToast(); // Destructure the toast function

  const [caseId, description] = caseData.model_name.split(" (");
  const formattedDescription = `(${description}`;

  const defaultMessage = `Semangat Pagi Mandirian!\n\nKami menemukan aktivitas yang mencurigakan terkait dengan akun kerja anda yaitu:
  \n${formattedDescription}
  \nOleh karena itu, akun anda sekarang telah di deaktivasi. Untuk menindaklanjuti kasus ini, mohon untuk segera mengisi formulir berikut: 
  \nID Case (copy ID ini ke forms yang ada):\n${caseData._id}
  \nLink Forms Pengisian:\nhttps://forms.office.com/r/PFBpX5zHWv
  \nApabila ini merupakan false positive dan aktivitas LEGITIMATE, mohon untuk konfirmasi melalui form dengan memilih opsi "LEGITIMATE ACTIVITY".
  \nSalam dan terima kasih atas perhatian Anda,
  \nTim DTP Security, CISO Group.`;

  const [whatsappMessage, setWhatsappMessage] = useState(defaultMessage);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNoticeSent, setIsNoticeSent] = useState(!!response);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWhatsappMessage(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage(phoneNumber, whatsappMessage);
      if (response && response.message === "Message sent successfully") {
        setIsNoticeSent(true);
        toast({
          title: "Message sent successfully",
          description: "The WhatsApp message was sent successfully.",
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.5)",
            backdropFilter: "blur(10px)",
            color: "white",
          },
        });
      } else {
        toast({
          title: "Failed to send message",
          description: "There was an error sending the WhatsApp message.",
          style: {
            backgroundColor: "rgba(239, 68, 68, 0.5)",
            backdropFilter: "blur(10px)",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending the WhatsApp message.",
        style: {
          backgroundColor: "rgba(239, 68, 68, 0.75)",
          backdropFilter: "blur(10px)",
          color: "white",
        },
      });
    }
  };

  const convertNewlinesToBr = (text: string) => {
    return text.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  // Extract country code from the location
  const countryCode = caseData.location.split("-")[0].toUpperCase();

  const getPathColor = (score: number) => {
    if (score <= 10) return "#00ac46"; // Green for 0-10
    if (score <= 30) return "#fdc500"; // Yellow for 11-30
    if (score <= 60) return "#fd8c00"; // Orange for 31-60
    return "#dc0000"; // Red for 61-100
  };

  const handleContinue = () => {
    setShowToast(true);
  };

  const handleStatusChange = async () => {
    try {
      const response = await handleCaseReview(caseData._id);
      if (response === 200) {
        toast({
          title: "Case successfully sent for review",
          description:
            "The case has been sent back to the SOC team for review.",
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            backdropFilter: "blur(3px)",
            color: "white",
            border: "1px solid rgb(232, 233, 234)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
        });
        router.push("/iam");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending the WhatsApp message.",
        style: {
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          backdropFilter: "blur(3px)",
          color: "white",
          border: "1px solid rgb(232, 233, 234)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        },
      });
    }
  };

  React.useEffect(() => {
    if (showToast) {
      toast({
        title: "Account successfully reset",
        description: "Notify user immediately!",
        style: {
          backgroundColor: "rgba(34, 197, 94, 0.9)",
          backdropFilter: "blur(3px)",
          color: "white",
          border: "1px solid rgb(232, 233, 234)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        },
      });
      setShowToast(false); // Reset the state after showing the toast
    }
  }, [showToast, toast]);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg space-y-8 mb-12 mt-4 h-fit">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/iam">IAM</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/iam">Case</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{caseData.model_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row ">
        <div className="flex flex-col">
          <div className="flex flex-col pb-10">
            <h1 className="text-3xl font-bold text-black">{caseId}</h1>
            <h2 className="text-xl text-black/70">{formattedDescription}</h2>
            <h3 className="text-base text-black py-3">
              <strong>Impact Scope:</strong> {caseData.impact_scope}
            </h3>
            <p className="text-base text-black">
              <strong>User Job Level:</strong>{" "}
              {caseData.job_level.charAt(0).toUpperCase() +
                caseData.job_level.slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-row space-x-4 items-start justify-start">
                <div className="flex flex-col space-y-4 items-start justify-start">
                  <div className="bg-white p-6 rounded-lg shadow-md w-full justify-center items-center">
                    <div className="w-36 mx-auto">
                      <CircularProgressbar
                        value={score}
                        maxValue={100}
                        text={`${score}`}
                        styles={buildStyles({
                          pathColor: getPathColor(score),
                          textColor: getPathColor(score),
                          trailColor: "#e6e6e6",
                        })}
                      />
                    </div>

                    <div className="w-full items-center justify-center text-center mx-auto">
                      <h2 className="text-xl font-semibold text-blue-900 py-2 mx-auto text-center">
                        Case Severity Score
                      </h2>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-xl font-semibold text-mandiriBlue-950 mb-2">
                      Impact Details
                    </h2>
                    <div className="py-6">
                      <p>
                        <strong>Information:</strong>{" "}
                        {caseData.highlight_information}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-black">
                      <p>
                        <strong>Logon Attempt:</strong> {caseData.logon_attempt}
                      </p>

                      <p className="capitalize">
                        <strong>Data Source:</strong> {caseData.data_source}
                      </p>
                      <p>
                        <strong>Technique:</strong> {caseData.technique}
                      </p>
                      <p>
                        <strong>Associated Insight:</strong>{" "}
                        {caseData.associated_insight}
                      </p>
                      <p>
                        <strong>Rules:</strong> {caseData.rules}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-fit">
                  <h2 className="text-xl font-semibold text-mandiriBlue-950 mb-4">
                    Case Location
                  </h2>
                  <div className=" rounded-3xl overflow-hidden">
                    <MapChart highlightCountry={countryCode} />
                  </div>
                  <p className=" mt-4">
                    <strong>Location:</strong> {caseData.location}
                  </p>
                  <p>
                    <strong>IP Address:</strong> {caseData.ip_address}
                  </p>
                  <p>
                    <strong>MAC Address:</strong> {caseData.mac_address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 w-fit mt-12 h-fit mx-8">
          <Tabs defaultValue="sendMessage" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="sendMessage"
                className="rounded-none data-[state=active]:bg-mandiriWhite border-b-2 data-[state=active]:border-b-mandiriYellow-500 data-[state=active]:text-mandiriBlue-950 data-[state=active]:font-semibold text-base data-[state=inactive]:text-mandiriBlue-950 data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-transparent"
              >
                Send Whatsapp Message
              </TabsTrigger>
              <TabsTrigger
                value="Actions"
                className="rounded-none data-[state=active]:bg-mandiriWhite border-b-2 data-[state=active]:border-b-mandiriYellow-500 data-[state=active]:text-mandiriBlue-950 data-[state=active]:font-semibold text-base data-[state=inactive]:text-mandiriBlue-950 data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-transparent"
              >
                Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sendMessage">
              {!isNoticeSent && !response ? (
                <>
                  <div className="bg-[#202C33] p-4 rounded-lg my-4">
                    <div className="p-2 rounded-lg bg-[#009970] text-white shadow-lg">
                      {convertNewlinesToBr(whatsappMessage)}
                    </div>
                  </div>

                  <Textarea
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    rows={4}
                    placeholder="Enter message"
                    value={whatsappMessage}
                    onChange={handleInputChange}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="bg-mandiriBlue-950 text-white py-2 px-4 rounded hover:bg-mandiriBlue-900 transition"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            "https://forms.office.com/r/PFBpX5zHWv"
                          )
                        }
                      >
                        Copy Forms Link
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-50">Copied!</PopoverContent>
                  </Popover>
                  <h2 className="text-xl font-semibold text-blue-900 my-4">
                    Input Phone Number
                  </h2>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    placeholder="62xxxxxxxxxx"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <button
                    className="w-full bg-blue-900 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition"
                    onClick={handleSendMessage}
                  >
                    Send Notice to User
                  </button>
                </>
              ) : isNoticeSent && !response ? (
                <div>
                  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                    Notice Sent
                  </h2>
                  <p>The notice has been sent to the user.</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                    User Response
                  </h2>
                  <p>
                    <strong>Response:</strong> {response.deskripsi_aktivitas}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="Actions">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <h2 className="text-2xl font-semibold text-mandiriBlue-950 mb-4">
                  Actions
                </h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="w-fit bg-white hover:bg-mandiriBlue-900 hover:text-white text-mandiriBlue-950 border-2 border-mandiriBlue-950 py-3 px-6 rounded-lg transition mb-4 ">
                      Reset User Credentials
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-black text-xl text-mandiriBlue-950">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        reset the user&apos;s password and remove user access
                        from the servers. Please immediately notify the user
                        after proceeding.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-black text-white font-semibold hover:bg-white hover:text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-mandiriBlue-950 text-white font-semibold hover:bg-mandiriBlue-800"
                        onClick={handleContinue}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="w-fit bg-white hover:bg-[#ff3030] hover:text-white text-[#ff3030] border-2 border-[#ff3030]  py-3 px-6 rounded-lg transition">
                      Finish Case
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-bold text-xl text-mandiriBlue-950">
                        Send case for review?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will send case back to the SOC team for review. Are
                        you sure you want to proceed?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-black text-white font-semibold hover:bg-white hover:text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-mandiriBlue-950 text-white font-semibold hover:bg-mandiriBlue-800"
                        onClick={handleStatusChange}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
