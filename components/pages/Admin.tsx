"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { sampLogo } from "@/public/assets";
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
import Sparkline from "../ui/sparkline"; // Import the Sparkline component

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

const formatHours = (hours: number) => {
  const roundedHours = Math.round(hours);
  return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""}`;
};

const generateRandomSparklineData = () => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
};

// Generate random sparkline data
const highSeveritySparklineData = generateRandomSparklineData();
const incomingCasesSparklineData = generateRandomSparklineData();
const timeCaseCompleteSparklineData = generateRandomSparklineData();
const timeIamReviewSparklineData = generateRandomSparklineData();
const timeSocProcessingSparklineData = generateRandomSparklineData();

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

  // Create regionJobLevelData and sort it by count
  const regionJobLevelData = Object.keys(adminData.jobLevelByRegion)
    .map((region) => ({
      name: region.split(" - ")[0],
      fullname: region,
      count: adminData.regionCounts[region],
      jobLevelCount: adminData.jobLevelByRegion[region].count,
      jobLevel: adminData.jobLevelByRegion[region].job_level,
    }))
    .sort((a, b) => b.count - a.count);

  const totalCases = Object.values(adminData.caseStatusCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const progressPercentage = Math.floor(
    (adminData.caseStatusCounts["ON PROGRESS"] / totalCases) * 100
  );
  const unresolvedPercentage = Math.floor(
    ((totalCases - adminData.caseStatusCounts.CLOSED) / totalCases) * 100
  );

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <Image
            src={sampLogo.src}
            alt="Bank Mandiri Logo"
            className="w-[90px] aspect-auto"
            width={90}
            height={90}
          />
          <PageTitle title="Security Dashboard: Security Data Insights & Overview" />
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
      <h1>Welcome, {userName}</h1>
      <div className="flex flex-col gap-5 bg-slate-50 px-5 rounded-lg mt-5 ">
        <div className="flex flex-row gap-5 h-1/2">
          <div className="flex flex-col gap-5 w-full">
            <div className="bg-white p-6 pb-12 rounded-lg shadow-md w-full h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Cases by Region and Job Level
              </h3>
              <div className="h-96 font-semibold text-mandiriBlue-950 pb-18 mb-16">
                <ResponsiveContainer width="100%" height="120%">
                  <BarChart data={regionJobLevelData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name, props) => {
                        if (name === "jobLevelCount") {
                          return [
                            `${value} (${props.payload.jobLevel})`,
                            "Job Level Count",
                          ];
                        }
                        return [value, name];
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#0057b3"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="jobLevelCount"
                      fill="#FFA500"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>

                <h3 className="mx-auto ml-12 items-center justify-center text-lg font-semibold text-gray-800 h-fit">
                  From the data collected, the highest number of cases are
                  detected from the offices of {regionJobLevelData[0].fullname}{" "}
                  with the highest job level being{" "}
                  {regionJobLevelData[0].jobLevel}.
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 rounded-lg shadow-md w-2/3 h-full">
            <h3 className="text-2xl font-semibold text-gray-800 m-4">
              Country Heatmap
            </h3>
            <h3 className="text-md text-gray-800 m-4">
              This is a heatmap of the sources of cases per country out of the
              total {Object.keys(adminData.countryHeatmap).length} countries.
              Hover over to check number of cases per individual country.
            </h3>
            <div className="rounded-xl place-items-start items-start justify-start h-full">
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
          <div className="flex flex-col gap-5 w-1/3 h-full">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                In Progress Cases
              </h3>
              <div className="flex justify-center h-full">
                <div className="w-2/3 text-center">
                  <HalfCircleProgressBar
                    value={progressPercentage}
                    text={`${progressPercentage}%`}
                    pathColor="blue"
                  />
                  <p className="text-sm font-semibold mt-[-45px]">
                    In Progress
                  </p>
                  <p className="text-sm mt-2">
                    Currently, there are{" "}
                    {adminData.caseStatusCounts["ON PROGRESS"]} cases in
                    progress, which constitutes {progressPercentage}% of the
                    total {totalCases} cases.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Unresolved Cases
              </h3>
              <div className="flex justify-center h-full">
                <div className="w-2/3 text-center">
                  <HalfCircleProgressBar
                    value={unresolvedPercentage}
                    text={`${unresolvedPercentage}%`}
                    pathColor="red"
                  />
                  <p className="text-sm font-semibold mt-[-45px]">Unresolved</p>
                  <p className="text-sm mt-2">
                    There are {totalCases - adminData.caseStatusCounts.CLOSED}{" "}
                    unresolved cases, making up {unresolvedPercentage}% of the
                    total {totalCases} cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 pb-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-fit w-full">
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                High Severity Cases
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-red-600 w-2/3">
                  {adminData.highSeverityCases[0].highSeverityCount} cases
                </p>
                <Sparkline data={highSeveritySparklineData} color="red" />
              </div>
              <p className="text-md mt-2">
                with severity score 30 and above. Require immediate attention
                due to their potential impact.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Incoming Cases
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-blue-600 w-2/3">
                  {adminData.incomingCases} cases since 30 days
                </p>
                <Sparkline data={incomingCasesSparklineData} color="blue" />
              </div>
              <p className="text-md mt-2">
                The number of incoming cases indicates the recent activity and
                potential workload.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-fit w-full">
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Average Time to Complete Case
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-blue-600 w-1/3">
                  {formatHours(adminData.time_caseComplete)}
                </p>
                <Sparkline data={timeCaseCompleteSparklineData} color="blue" />
              </div>
              <p className="text-md mt-2">
                The average time taken to complete a case from open to closed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Average Time for IAM Review
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-green-600 w-1/3">
                  {formatHours(adminData.time_IAM)}
                </p>
                <Sparkline data={timeIamReviewSparklineData} color="green" />
              </div>
              <p className="text-md mt-2">
                The average time taken for IAM to review a case.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-fit ">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Average Time for SOC Processing
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-orange-600 w-1/3">
                  {formatHours(adminData.time_SOC)}
                </p>
                <Sparkline
                  data={timeSocProcessingSparklineData}
                  color="orange"
                />
              </div>
              <p className="text-md mt-2">
                The average time taken for SOC to process a case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
