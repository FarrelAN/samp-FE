"use client";
import React, { FC, useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import Aos from "aos";
import "aos/dist/aos.css";

import { IAMTableColumns, RuleSetColumns } from "@/components/table/column";
import { SOCTableColumns } from "@/components/table/column";

import { RuleSetType } from "@/lib/types";
import {
  handleCaseClosed,
  handleCaseReview,
  handleSendToResolver,
  updateCaseStatus,
} from "@/lib/actions";

Aos.init();

interface DataTableProps {
  data: RuleSetType[];
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    _id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: RuleSetColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: data.length,
        pageIndex: 0, // Set initial pageIndex
      }, // Set pageSize to the length of the data to display all rows
    },
  });

  return (
    <div className="w-full mt-4 border-2  rounded-xl p-5">
      <div className="font-bold text-xl text-mandiriBlue-950">
        <h1>Risk Events Rules and Factors </h1>
      </div>
      <div className="py-8 rounded-lg ">
        <Table className="font-dm-sans ">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="b" key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  let className =
                    "text-center text-black italic border-y-2 border-black/30";
                  return (
                    <TableHead key={header.id} className={className}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className={`hover:bg-mandiriSkyBlue/40 transition-all ease-in-out duration-500 text-s hover:cursor-pointer hover:rounded-sm text-center`}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      let className = "py-4";
                      if (index === 0) {
                        className += " rounded-l-xl";
                      }
                      if (index === row.getVisibleCells().length - 1) {
                        className += " rounded-r-xl";
                      }
                      return (
                        <TableCell key={cell.id} className={className}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={SOCTableColumns.length}
                  className="h-24 text-center hover:rounded-xl"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 max-sm:flex-col gap-5">
        <div className="flex-1 text-sm text-light_brown">
          Total : {table.getFilteredRowModel().rows.length} rules(s).
        </div>
      </div>
    </div>
  );
};

export default DataTable;
