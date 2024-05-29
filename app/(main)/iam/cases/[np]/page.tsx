// pages/iam/cases/[np]/page.tsx
import React from "react";
import CaseDetails from "@/components/iam/CaseDetails"; // Client component
import { CaseType } from "@/lib/types"; // Assuming you have this type definition
import { getCaseByID } from "@/lib/actions";

interface CasePageProps {
  params: { np: string };
  data: CaseType;
}

export default async function Home({ params }: { params: { np: string } }) {
  const data = await getCaseByID(params.np);

  return <CaseDetails caseData={data ? data : ({} as CaseType)} />;
}
