"use client";
import React, { useState } from "react";
import { CaseType } from "@/lib/types";
import { sendMessage, handleCaseReview } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useToast } from "@/components/ui/use-toast";

interface CaseDetailsProps {
  caseData: CaseType;
  response: any; // Adjust the type based on your actual response structure
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData, response }) => {
  const score = parseInt(String(caseData.case_score));
  const router = useRouter();
  const { toast } = useToast(); // Destructure the toast function

  const defaultMessage = `Semangat Pagi Mandirian!\n\nKami menemukan aktivitas yang mencurigakan terkait dengan akun kerja anda. Oleh karena itu, akun anda sekarang telah di deaktivasi. Untuk menindaklanjuti kasus ini, mohon untuk segera mengisi formulir berikut: 
  \nID Case (copy ID ini ke forms yang ada):\n${caseData._id}
  \nLink Forms Pengisian:\nhttps://forms.office.com/r/PFBpX5zHWv
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

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg space-y-8 my-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-mandiriBlue-950">
            {caseData.model_name}
          </h1>
          <p className="text-gray-600">Created At: {caseData.created_at}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-center space-y-4">
              <h2 className="text-mandiriBlue-950 text-lg">
                Case Severity Score
              </h2>
              <div className="w-24 mx-auto">
                <CircularProgressbar
                  value={score}
                  maxValue={100}
                  text={`${score}`}
                  styles={buildStyles({
                    pathColor: "#008dff",
                    textColor: "#003d79",
                    trailColor: "#e6e6e6",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-mandiriBlue-950">
                  Severity:
                </span>
                <div
                  className={`w-3 h-3 rounded-full ${
                    caseData.case_severity === "High"
                      ? "bg-red-500"
                      : caseData.case_severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <span>{caseData.case_severity.toUpperCase() as string}</span>
              </div>
              <div className="text-mandiriBlue-950 space-y-2">
                <p>
                  <strong>Impact Scope:</strong> {caseData.impact_scope}
                </p>
                <p>
                  <strong>Status:</strong> {caseData.case_status}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-mandiriSkyBlue-50 rounded-lg shadow-md p-6 grid grid-cols-2 gap-4 text-mandiriBlue-950">
            <p>
              <strong>ID:</strong> {caseData._id}
            </p>
            <p>
              <strong>Data Processor:</strong> {caseData.data_processor}
            </p>
            <p>
              <strong>Finding:</strong> {caseData.finding}
            </p>
            <p>
              <strong>Associated Insight:</strong> {caseData.associated_insight}
            </p>
            <p>
              <strong>Technique:</strong> {caseData.technique}
            </p>
            <p>
              <strong>Rules:</strong> {caseData.rules}
            </p>
            <p>
              <strong>Highlight Information:</strong>{" "}
              {caseData.highlight_information}
            </p>
            <p>
              <strong>IP Address:</strong> {caseData.ip_address}
            </p>
            <p>
              <strong>MAC Address:</strong> {caseData.mac_address}
            </p>
          </div>
        </div>
        <div className="space-y-8">
          {!isNoticeSent && !response ? (
            <div className="bg-mandiriSkyBlue-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-mandiriBlue-950 mb-4">
                Send WhatsApp Message
              </h2>
              <div className="bg-gray-200 p-4 rounded-lg mb-4">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  {convertNewlinesToBr(whatsappMessage)}
                </div>
              </div>
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
                rows={4}
                placeholder="Enter message"
                value={whatsappMessage}
                onChange={handleInputChange}
              />
              <h2 className="text-xl font-semibold text-mandiriBlue-950 mb-4">
                Input Phone Number
              </h2>
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
                placeholder="62xxxxxxxxxx"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <button
                className="bg-mandiriBlue-950 hover:bg-mandiriBlue-900 text-white py-3 px-6 rounded-lg transition"
                onClick={handleSendMessage}
              >
                Send Notice to User
              </button>
            </div>
          ) : isNoticeSent && !response ? (
            <div className="bg-mandiriSkyBlue-50 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-mandiriBlue-950 mb-4">
                Notice Sent
              </h2>
              <p>The notice has been sent to the user.</p>
            </div>
          ) : (
            <div className="bg-mandiriSkyBlue-50 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-mandiriBlue-950 mb-4">
                User Response
              </h2>
              <p>
                <strong>Response:</strong> {response.deskripsi_aktivitas}
              </p>
            </div>
          )}
          <div className="bg-mandiriSkyBlue-50 rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-mandiriBlue-950 mb-4">
              Actions
            </h2>
            <button className="bg-mandiriBlue-950 hover:bg-mandiriBlue-900 text-white py-3 px-6 rounded-lg transition mb-4">
              Reset User Password
            </button>
            <button
              className="bg-mandiriYellow-500 hover:bg-mandiriYellow-600 text-white py-3 px-6 rounded-lg transition"
              onClick={() => {
                handleCaseReview(caseData._id);
                router.push("/iam");
              }}
            >
              Finish Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
