"use client";
import React, { useState, useEffect } from "react";
import { CaseType } from "@/lib/types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import PageTitle from "@/components/PageTitle";
import { sampLogo } from "@/public/assets";
import { Pie } from "react-chartjs-2";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface CaseDetailsProps {
  caseData: CaseType;
  response: any; // Adjust the type based on your actual response structure
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData, response }) => {
  const score = parseInt(String(caseData.case_score));

  const pieData = {
    labels: ["Severity Score"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#ffb700", "#003d79"],
        hoverBackgroundColor: ["#fff485", "#36A2EB"],
      },
    ],
  };

  const truncateImpactScope = (impactScope: string) => {
    const regex = /(.+)\s(\S+@\S+\.\S+)/;
    const matches = impactScope.match(regex);

    if (!matches) return impactScope;

    const [_, name] = matches;

    return name;
  };

  const defaultMessage = `Semangat Pagi Mandirian!\n\nKami menemukan aktivitas yang mencurigakan terkait dengan akun kerja anda. Oleh karena itu, akun anda sekarang telah di deaktivasi. Untuk menindaklanjuti kasus ini, mohon untuk segera mengisi formulir berikut: 
  \nID Case (copy ID ini ke forms yang ada):\n${caseData._id}
  \nLink Forms Pengisian:\nhttps://forms.office.com/r/rw2LBjTMmm
  \nSalam dan terima kasih atas perhatian Anda,
  \nTim DTP Security, CISO Group.`;

  const [whatsappMessage, setWhatsappMessage] = useState(defaultMessage);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNoticeSent, setIsNoticeSent] = useState(!!response); // Set based on response

  const handleInputChange = (e: any) => {
    setWhatsappMessage(e.target.value);
  };

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendMessage = async () => {
    // Implement the logic to send WhatsApp message here
    // For example, you can use Twilio API or other services
    setIsNoticeSent(true);
  };

  const convertNewlinesToBr = (text: string) => {
    return text.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  console.log(response);
  return (
    <div className="h-screen w-full bg:mandiriGrey">
      <div className="flex flex-row items-center gap-1 pb-3">
        <img
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
        />
        <PageTitle
          title={`Security Dashboard: Identity Access & Management Team`}
        />
      </div>

      <div className="p-8 bg-gray-50 rounded-lg shadow-lg flex space-x-8">
        {/* Left Section */}
        <div className="w-2/3 space-y-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
            Case Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Identifiers Section */}
            <div className="bg-white rounded-lg shadow-md p-8 h-fit">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Identifiers
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>ID:</strong> {caseData._id}
                </p>
                <p>
                  <strong>Status:</strong> {caseData.case_status}
                </p>
                <p>
                  <strong>Score:</strong> {String(caseData.case_score)}
                </p>
                <p>
                  <strong>Model Name:</strong> {caseData.model_name}
                </p>
              </div>
            </div>

            {/* Visual Analysis Section */}
            <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
                Visual Analysis
              </h2>
              <div className="flex justify-center">
                <Pie data={pieData} />
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-lg shadow-md p-8 h-fit">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Highlights
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>Severity:</strong> {caseData.case_severity}
                </p>
                <p>
                  <strong>Impact Scope:</strong> {caseData.impact_scope}
                </p>
                <p>
                  <strong>Highlight Information:</strong>{" "}
                  {caseData.highlight_information}
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
              Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p>
                  <strong>Data Processor:</strong> {caseData.data_processor}
                </p>
              </div>
              <div>
                <p>
                  <strong>Created At:</strong> {caseData.created_at}
                </p>
              </div>
              <div>
                <p>
                  <strong>Finding:</strong> {caseData.finding}
                </p>
              </div>
              <div>
                <p>
                  <strong>Impact Scope:</strong> {caseData.impact_scope}
                </p>
              </div>
              <div>
                <p>
                  <strong>Associated Insight:</strong>{" "}
                  {caseData.associated_insight}
                </p>
              </div>
              <div>
                <p>
                  <strong>Technique:</strong> {caseData.technique}
                </p>
              </div>
              <div>
                <p>
                  <strong>Rules:</strong> {caseData.rules}
                </p>
              </div>
              <div>
                <p>
                  <strong>IP Address:</strong> {caseData.ip_address}
                </p>
              </div>
              <div>
                <p>
                  <strong>MAC Address:</strong> {caseData.mac_address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3 space-y-8">
          {!isNoticeSent && !response ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Send WhatsApp Message
              </h2>
              <div
                className="p-4 border-2 border-gray-300 rounded-lg mb-4"
                style={{ backgroundColor: "#121212" }}
              >
                <div className="flex items-start space-x-2">
                  <div
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    {convertNewlinesToBr(whatsappMessage)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <textarea
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-100 "
                  rows={4}
                  placeholder="Enter message"
                  value={whatsappMessage}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-100 mb-4"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <button
                  className="bg-indigo-900 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
                  onClick={handleSendMessage}
                >
                  Send Notice to User
                </button>
              </div>
            </div>
          ) : isNoticeSent && !response ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Notice has been sent to user
              </h2>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                User has completed the form
              </h2>
              <p>
                <strong>Response:</strong> {response && response.some_field}{" "}
                {/* Adjust the field */}
              </p>
              <button className="bg-indigo-900 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                Close Case
              </button>
            </div>
          )}

          {/* Actions Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
              Actions
            </h2>
            <div className="mt-8 flex flex-col space-y-4">
              <button className="bg-indigo-900 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                Reset User Password
              </button>
              <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-400 transition">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
