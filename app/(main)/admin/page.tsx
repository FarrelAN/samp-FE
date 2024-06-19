import AdminPage from "@/components/pages/Admin";
import React from "react";
import { getAdminData } from "@/lib/actions";
import { DashboardData, RegionCounts, JobLevelByRegion } from "@/lib/types";

export default async function Page() {
  const adminData: DashboardData | null = await getAdminData();

  const fallbackData: DashboardData = {
    caseStatusCounts: {
      CLOSED: 0,
      "ON PROGRESS": 0,
      REVIEW: 0,
      OPEN: 0,
    },
    countryHeatmap: {},
    highSeverityCases: [{ highSeverityCount: 0 }],
    incomingCases: 0,
    jobLevelCounts: {},
    regionCounts: {} as RegionCounts,
    jobLevelByRegion: {} as JobLevelByRegion,
    time_caseComplete: 0,
    time_IAM: 0,
    time_SOC: 0,
  };

  return (
    <div>
      <AdminPage adminData={adminData || fallbackData} />
    </div>
  );
}
