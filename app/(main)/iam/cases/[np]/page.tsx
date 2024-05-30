// pages/iam/cases/[np]/page.tsx
import React from "react";
import CaseDetails from "@/components/iam/CaseDetails"; // Client component
import { CaseType } from "@/lib/types"; // Assuming you have this type definition
import { getCaseByID, getResponseByID } from "@/lib/actions"; // Add this import

export default async function Home({ params }: { params: { np: string } }) {
  const data = await getCaseByID(params.np);
  const response = await getResponseByID(params.np); // Fetch the response data
  console.log(response);

  return (
    <CaseDetails
      caseData={data ? data : ({} as CaseType)}
      response={response}
    />
  );
}
