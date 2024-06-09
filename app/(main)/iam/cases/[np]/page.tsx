// pages/iam/cases/[np]/page.tsx
import React from "react";
import CaseDetails from "@/components/iam/CaseDetails"; // Client component
import { CaseType } from "@/lib/types"; // Assuming you have this type definition
import { getCaseByID, getResponseByID } from "@/lib/actions"; // Add this import
import PageTitle from "@/components/PageTitle";
import { sampLogo } from "@/public/assets";
import Image from "next/image";

export default async function Home({ params }: { params: { np: string } }) {
  const data = await getCaseByID(params.np);
  const response = await getResponseByID(params.np); // Fetch the response data
  console.log(response);

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
      <CaseDetails
        caseData={data ? data : ({} as CaseType)}
        response={response}
      />
    </div>
  );
}
