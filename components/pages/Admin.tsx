"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { sampLogo, sampLogo1 } from "@/public/assets";
import Image from "next/image";
import { DashboardData } from "@/lib/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import MapChart from "./heatmap";
import "react-tooltip/dist/react-tooltip.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import PageTitle from "../PageTitle";

interface AdminPageProps {
  adminData: DashboardData;
}

const HalfCircleProgressBar = ({
  value,
  text,
  pathColor,
}: {
  value: number;
  text: string;
  pathColor: string;
}) => {
  return (
    <CircularProgressbar
      value={value}
      text={text}
      styles={buildStyles({
        pathColor,
        textColor: "black",
        trailColor: "#eeeff1",
        rotation: 0.75, // Rotate the progress bar
        pathTransitionDuration: 0.5,
      })}
      circleRatio={0.5}
      strokeWidth={6}
    />
  );
};

export default function AdminPage({ adminData }: AdminPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState("");
  const pathname = usePathname();
  const [firstPath, setFirstPath] = useState("");

  useEffect(() => {
    const path = pathname ? pathname.split("/")[1].toUpperCase() : "";
    setFirstPath(path);
  }, [pathname]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    router.push("/signIn");
    return null;
  }

  const userName = session?.user?.username || "admin";

  const jobLevelData = Object.keys(adminData.jobLevelCounts).map((key) => ({
    name: key,
    count: adminData.jobLevelCounts[key],
  }));

  const totalCases = Object.values(adminData.caseStatusCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const progressPercentage =
    (adminData.caseStatusCounts["ON PROGRESS"] / totalCases) * 100;
  const unresolvedPercentage =
    ((totalCases - adminData.caseStatusCounts.CLOSED) / totalCases) * 100;

  return (
    <div className="min-h-screen w-full  overflow-y-auto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Image
            src={sampLogo.src}
            alt="Bank Mandiri Logo"
            className="w-[90px] aspect-auto"
            width={90}
            height={90}
          />
          <PageTitle title="Security Dashboard: Security Operations Center Team" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-24">
              {firstPath}
              <Menu className="mx-auto pl-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Division</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={firstPath.toLowerCase()}
              onValueChange={(value) => {
                if (value === "soc") {
                  router.push("/soc");
                } else if (value === "iam") {
                  router.push("/iam");
                }
              }}
            >
              <DropdownMenuRadioItem
                value="iam"
                onClick={() => router.push("/iam")}
              >
                IAM
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="soc"
                onClick={() => router.push("/soc")}
              >
                SOC
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1>Welcome, {userName} </h1>
      <div className="flex flex-col gap-5 bg-slate-50 px-5 rounded-lg mt-5 h-screen">
        <div className="flex flex-row w-full gap-5 ">
          <div className="bg-white p-6 rounded-lg shadow-md my-5 w-10/12 h-[400px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Cases by Job Level
            </h3>
            <div className="h-72 font-semibold text-mandiriBlue-950">
              <ResponsiveContainer width="80%" height="100%">
                <BarChart data={jobLevelData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0057b3" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="">
            <div className="bg-white px-6 mx-6 rounded-lg shadow-lg h-fit py-3 w-4/5 mt-5">
              <h3 className="text-2xl font-semibold text-gray-800 m-4">
                Country Heatmap
              </h3>
              <h3 className="text-md text-gray-800 m-4">
                This is a heatmap of the sources of cases per country out of the
                total {Object.keys(adminData.countryHeatmap).length} countries.
                Hover over to check number of cases per individual country
              </h3>
              <div className="h-fit mt-20 px-5">
                <MapChart
                  highlightCountry={adminData.countryHeatmap}
                  setTooltipContent={setTooltipContent}
                />
                <ReactTooltip
                  anchorSelect=".geo"
                  place="top-start"
                  isOpen={true}
                  openOnClick={true}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 mt-14">
            {" "}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                In Progress Cases
              </h3>
              <div className="flex justify-center">
                <div className="w-2/3 text-center">
                  <HalfCircleProgressBar
                    value={progressPercentage}
                    text={`${progressPercentage.toFixed(2)}%`}
                    pathColor="blue"
                  />
                  <p className="text-sm font-semibold mt-[-45px]">
                    In Progress
                  </p>
                  <p className="text-sm mt-2">
                    Currently, there are{" "}
                    {adminData.caseStatusCounts["ON PROGRESS"]} cases in
                    progress, which constitutes {progressPercentage.toFixed(2)}%
                    of the total {totalCases} cases.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Unresolved Cases
              </h3>
              <div className="flex justify-center">
                <div className="w-2/3 text-center">
                  <HalfCircleProgressBar
                    value={unresolvedPercentage}
                    text={`${unresolvedPercentage.toFixed(2)}%`}
                    pathColor="red"
                  />
                  <p className="text-sm font-semibold mt-[-45px]">Unresolved</p>
                  <p className="text-sm mt-2">
                    There are {totalCases - adminData.caseStatusCounts.CLOSED}{" "}
                    unresolved cases, making up{" "}
                    {unresolvedPercentage.toFixed(2)}% of the total {totalCases}{" "}
                    cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-72  grid grid-cols-1 lg:grid-cols-4 gap-8 h-fit w-full">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit mt-[-220px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              High Severity Cases
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {adminData.highSeverityCases[0].highSeverityCount} cases
            </p>
            <p className="text-sm mt-2">
              with severity score 30 and above. Require immediate attention due
              to their potential impact.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit mt-[-220px] ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Incoming Cases
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {adminData.incomingCases} cases since 30 days
            </p>
            <p className="text-sm mt-2">
              The number of incoming cases indicates the recent activity and
              potential workload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
