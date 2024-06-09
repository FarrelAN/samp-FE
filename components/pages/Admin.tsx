"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { sampLogo } from "@/public/assets";
import Image from "next/image";
import { DashboardData } from "@/lib/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Heatmap from "./heatmap";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AdminPageProps {
  adminData: DashboardData;
}

export default function AdminPage({ adminData }: AdminPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    router.push("/signIn");
    return null;
  }

  const userName = session?.user?.username || "admin";

  const jobLevelData = {
    labels: Object.keys(adminData.jobLevelCounts),
    datasets: [
      {
        label: "Number of Cases",
        data: Object.values(adminData.jobLevelCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8 overflow-y-auto">
      <div className="flex flex-row items-center gap-1">
        <Image
          src={sampLogo.src}
          alt="Bank Mandiri Logo"
          className="w-[90px] aspect-auto"
          width={90}
          height={90}
        />
        <h1 className="text-3xl font-bold text-blue-900">Security Dashboard</h1>
      </div>
      <h2 className="text-xl text-gray-700 mt-4">Welcome, {userName}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Cases by Job Level
          </h3>
          <div className="h-96">
            <Bar
              data={jobLevelData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Case Status Counts
          </h3>
          <div className="flex justify-around">
            {Object.entries(adminData.caseStatusCounts).map(
              ([status, count]) => (
                <div key={status} className="w-1/4 text-center">
                  <CircularProgressbar
                    value={count}
                    text={`${count}`}
                    styles={buildStyles({
                      pathColor: count > 10 ? "red" : "green",
                      textColor: "black",
                    })}
                  />
                  <p className="text-sm font-medium mt-2">{status}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Country Heatmap
          </h3>
          <div className="h-80">
            <Heatmap highlightCountry={adminData.countryHeatmap} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              High Severity Cases
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {adminData.highSeverityCases[0].highSeverityCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Incoming Cases
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {adminData.incomingCases}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
