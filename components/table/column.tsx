"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseType, ResponseType, RuleSetType } from "@/lib/types";

const severitySort = (rowA: any, rowB: any, columnId: string) => {
  const severityOrder: { [key: string]: number } = {
    low: 1,
    medium: 2,
    high: 3,
  };
  const a = rowA.getValue(columnId).toLowerCase();
  const b = rowB.getValue(columnId).toLowerCase();
  return severityOrder[a] - severityOrder[b];
};

const statusSort = (rowA: any, rowB: any, columnId: string) => {
  const statusOrder: { [key: string]: number } = {
    open: 1,
    "on progress": 2,
    review: 3,
  };
  const a = rowA.getValue(columnId).toLowerCase();
  const b = rowB.getValue(columnId).toLowerCase();
  return statusOrder[a] - statusOrder[b];
};

export const SOCTableColumns: ColumnDef<CaseType>[] = [
  {
    accessorKey: "case_status",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue("case_status") as string).toLowerCase();
      let statusColor =
        "border-2 border-mandiriBlue-200 bg-mandiriBlue-100 text-mandiriBlue-900"; // Default color for "Open"
      let displayStatus = "Open"; // Default display for "Open"

      if (status === "on progress") {
        statusColor = "border-2 border-green-300 bg-green-100 text-green-700";
        displayStatus = "On Progress";
      } else if (status === "review") {
        statusColor =
          "border-2 border-mandiriYellow-200 bg-mandiriYellow-100 text-yellow-600";
        displayStatus = "Awaiting Review";
      } else if (status === "closed") {
        statusColor = "bg-red-100 text-red-700";
        displayStatus = "Closed";
      }

      return (
        <div className="flex justify-center">
          <div
            className={`flex items-center py-1 px-3 rounded-full ${statusColor} bg-opacity-50`}
          >
            <div className="capitalize font-medium">{displayStatus}</div>
          </div>
        </div>
      );
    },
    sortingFn: statusSort,
    sortDescFirst: true,
  },

  {
    accessorKey: "case_severity",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Case Severity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const severity = (row.getValue("case_severity") as string).toLowerCase();
      let dotColor = "bg-[#04b34f]"; // Default color for "Low"
      if (severity === "medium") dotColor = "bg-[#ff9900]";
      if (severity === "high") dotColor = "bg-[#a6192e]";

      return (
        <div className="flex items-center justify-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${dotColor}`}></span>
          <div className="uppercase pl-0.5">{severity}</div>
        </div>
      );
    },
    sortingFn: severitySort,
    sortDescFirst: true,
  },
  {
    accessorKey: "model_name",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const modelName: string = row.getValue("model_name");
      const [caseId, description] = modelName.split(" (");
      const formattedDescription = `(${description}`;

      return (
        <div className="capitalize">
          <div className="font-bold">{caseId}</div>
          <div className="text-gray-500">{formattedDescription}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date Opened",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("created_at")}</div>
      );
    },
  },
  {
    accessorKey: "impact_scope",
    header: "Impact Scope",
    cell: ({ row }) => {
      const impactScope: string = row.getValue("impact_scope");
      const regex = /(.+)\s(\S+@\S+\.\S+)/;
      const matches = impactScope.match(regex);

      if (!matches)
        return <div className="capitalize pl-0.5">{impactScope}</div>;

      const [_, name, email] = matches;

      return (
        <div className="capitalize pl-0.5">
          <div className="font-bold">{name}</div>
          <div className="lowercase text-gray-500">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "PIC.PIC_IAM",
    header: "SOC Controller",
    cell: ({ row }) => {
      const status = (row.getValue("case_status") as string).toLowerCase();
      const picIAM = row.original.PIC?.PIC_IAM || "N/A";
      return (
        <div className="capitalize pl-0.5">
          {status === "open" ? "Not Assigned" : picIAM}
        </div>
      );
    },
  },
];

export const IAMTableColumns: ColumnDef<CaseType>[] = [
  {
    accessorKey: "case_status",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue("case_status") as string).toLowerCase();
      let statusColor =
        "border-2 border-mandiriYellow-200 bg-mandiriYellow-100 text-yellow-600"; // Default color for "On Progress"
      let displayStatus = "Awaiting Action"; // Default display for "On Progress"

      if (status === "review") {
        statusColor =
          "border-2 border-mandiriBlue-200 bg-mandiriBlue-100 text-mandiriBlue-900";
        displayStatus = "Sent for Review";
      }

      return (
        <div
          className={`flex items-center justify-center px-1 py-1 rounded-md ${statusColor}`}
        >
          <div className={`capitalize drop-shadow-2xl font-medium`}>
            {displayStatus}
          </div>
        </div>
      );
    },
    sortingFn: statusSort,
    sortDescFirst: true,
  },
  {
    accessorKey: "case_severity",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Case Severity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const severity = (row.getValue("case_severity") as string).toLowerCase();
      let dotColor = "bg-[#04b34f]"; // Default color for "Low"
      if (severity === "medium") dotColor = "bg-[#ff9900]";
      if (severity === "high") dotColor = "bg-[#a6192e]";

      return (
        <div className="flex items-center justify-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${dotColor}`}></span>
          <div className="uppercase pl-0.5">{severity}</div>
        </div>
      );
    },
    sortingFn: severitySort,
    sortDescFirst: true,
  },
  {
    accessorKey: "model_name",
    header: ({ column }) => {
      return (
        <Button
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const modelName: string = row.getValue("model_name");
      const [caseId, description] = modelName.split(" (");
      const formattedDescription = `(${description}`;

      return (
        <div className="capitalize">
          <div className="font-bold">{caseId}</div>
          <div className="text-gray-500">{formattedDescription}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("created_at")}</div>
      );
    },
  },
  {
    accessorKey: "impact_scope",
    header: "Impact Scope",
    cell: ({ row }) => {
      const impactScope: string = row.getValue("impact_scope");
      const regex = /(.+)\s(\S+@\S+\.\S+)/;
      const matches = impactScope.match(regex);

      if (!matches)
        return <div className="capitalize pl-0.5">{impactScope}</div>;

      const [_, name, email] = matches;

      return (
        <div className="capitalize pl-0.5">
          <div className="font-bold">{name}</div>
          <div className="lowercase text-gray-500">{email}</div>
        </div>
      );
    },
  },
];

export const RuleSetColumns: ColumnDef<RuleSetType>[] = [
  {
    accessorKey: "risk_factor",
    header: "Risk Factor",
    cell: ({ row }) => {
      const riskFactor = row.getValue("risk_factor");
      let bgColor = "bg-orange-400"; // Default color for "Account Compromise"
      if (riskFactor === "Activity & Behaviour") bgColor = "bg-pink-500";

      return (
        <div className="flex justify-center px-5">
          <div
            className={`flex items-center py-1 px-2 rounded-md ${bgColor} text-white`}
            style={{ whiteSpace: "nowrap" }} // Prevent line breaks
          >
            <div className={`capitalize font-semibold`}>
              {riskFactor as string}
            </div>
          </div>
        </div>
      );
    },
    size: 200, // Set a specific width
  },
  {
    accessorKey: "risk_event",
    header: "Risk Event",
    cell: ({ row }) => <div className="px-5">{row.getValue("risk_event")}</div>,
    size: 200, // Set a specific width
  },
  {
    accessorKey: "real_time_score",
    header: "Realtime Score",
    cell: ({ row }) => (
      <div className="px-12">{row.getValue("real_time_score")}</div>
    ),
    size: 150, // Increase the width for "Realtime Score"
  },
  {
    accessorKey: "remediation",
    header: "Remediation",
    cell: ({ row }) => {
      const remediations = (row.getValue("remediation") as string)
        .split("\n")
        .map((line: string, index: number) => <div key={index}>{line}</div>);
      return <div className="pl-0.5">{remediations}</div>;
    },
    size: 250, // Reduce the width for "Remediation"
  },
];

export const ResponsesColumns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "nama_lengkap",
    header: "Nama Pegawai",
    cell: ({ row }) => (
      <div className="flex items-center justify-center px-5">
        <div
          className="flex items-center py-1 px-2 rounded-md "
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="capitalize ">{row.original.nama_lengkap}</div>
        </div>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "user_ad",
    header: "User AD",
    cell: ({ row }) => <div className="px-5">{row.original.user_ad}</div>,
    size: 200,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="px-5">{row.original.email}</div>,
    size: 250,
  },
  {
    accessorKey: "no_wa",
    header: "Nomor WA",
    cell: ({ row }) => <div className="px-5">{row.original.no_wa}</div>,
    size: 150,
  },
  {
    accessorKey: "departemen_tim",
    header: "Departemen/Tim",
    cell: ({ row }) => (
      <div className="px-5">{row.original.departemen_tim}</div>
    ),
    size: 150,
  },
  {
    accessorKey: "deskripsi_aktivitas",
    header: "Deskripsi Aktivitas",
    cell: ({ row }) => (
      <div className="px-5 whitespace-pre-line">
        {row.original.deskripsi_aktivitas}
      </div>
    ),
    size: 300,
  },
];
