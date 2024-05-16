"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ReceiveSamplingType,
  ProjectLHPType,
  LabDataType,
  ProjectType,
  ProjectMarketingType,
  UserType,
} from "@/lib/type";
import Link from "next/link";
import { ProjectSamplingType } from "@/lib/type";

const severitySort = (rowA: any, rowB: any, columnId: string) => {
  const severityOrder: { [key: string]: number } = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);
  return severityOrder[a] - severityOrder[b];
};

export const PPLHPFinalReviewPageColumns: ColumnDef<ProjectLHPType>[] = [
  //No Penawaran
  {
    accessorKey: "case_id",
    header: "Case ID",
    cell: ({ row }) => <div className="">{row.getValue("case_id")}</div>,
  },
  {
    accessorKey: "case_name",
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
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("case_name")}</div>
    ),
  },
  //Status
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
      return (
        <div className="capitalize pl-0.5">{row.getValue("case_severity")}</div>
      );
    },
    // Attach the custom sorting function
    sortingFn: severitySort,
    // Optionally, set the default sort order to descending
    sortDescFirst: true,
  },
  //Lokasi
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
    accessorKey: "case_status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("case_status")}</div>
      );
    },
  },
  {
    accessorKey: "_id",
  },
];
