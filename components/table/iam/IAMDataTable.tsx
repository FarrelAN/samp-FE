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

import { IAMTableColumns } from "@/components/table/column";
import { SOCTableColumns } from "@/components/table/column";

import { CaseType } from "@/lib/types";
import {
  handleCaseClosed,
  handleCaseReview,
  handleSendToResolver,
  updateCaseStatus,
} from "@/lib/actions";

Aos.init();

interface DataTableProps {
  data: CaseType[];
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    _id: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns: IAMTableColumns,
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
    },
  });

  const handleRowClick = (rowId: string) => {
    setExpandedRow((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <div className="w-full mt-4 border-2 rounded-xl p-10 ">
      <div className="font-bold text-xl text-mandiriBlue-950">
        <h1>Workstation</h1>
      </div>
      <div className="flex items-center py-4 text-mandiriWhite">
        <BiSearchAlt className="text-xl translate-x-9 fill-mandiriWhite " />
        <Input
          placeholder="Filter Cases by ID"
          value={
            (table.getColumn("model_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("model_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-12 bg-mandiriBlue-250 text-mandiriWhite rounded-full"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  column.id !== "_id" && (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" text-light_brown rounded-lg ">
        <Table className="font-dm-sans ">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="b" key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  let className =
                    "text-center text-mandiriWhite italic bg-mandiriBlue-950 p-2";
                  if (index === 0) {
                    className += " rounded-l-full "; // Add rounded corners to the left side
                  }
                  if (index === headerGroup.headers.length - 1) {
                    className += " rounded-r-full "; // Add rounded corners to the right side
                  }
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
                    className={`hover:bg-mandiriSkyBlue/40 transition-all ease-in-out duration-500 text-s hover:cursor-pointer hover:rounded-sm text-center ${
                      expandedRow === row.id
                        ? "bg-mandiriYellow-500/75 hover:bg-mandiriYellow-500/50"
                        : ""
                    }`}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.id)}
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
                  {expandedRow === row.id && (
                    <TableRow>
                      <TableCell colSpan={SOCTableColumns.length}>
                        <div
                          className={`expandable-content ${
                            expandedRow === row.id ? "expanded" : "collapsed"
                          } rounded-xl text-mandiriWhite flex transition-all duration-500 ease-in-out`}
                          style={{
                            background: "#192E52",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <div className="w-3/4 pr-4">
                            <h2 className="font-bold text-lg">Case Details</h2>
                            <div className="py-2 ml-5 text-md">
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Model Severity:
                                </span>
                                <span className="uppercase">
                                  {row.original.case_severity}
                                </span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Data Source:
                                </span>
                                <span>{row.original.data_processor}</span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Created:
                                </span>
                                <span>{row.original.created_at}</span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Owner:
                                </span>
                                <span className="capitalize">
                                  {row.original.owners}
                                </span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Associated Insight:
                                </span>
                                <span>{row.original.associated_insight}</span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">
                                  Impact Scope:
                                </span>
                                <span>{row.original.impact_scope}</span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">IP:</span>
                                <span>{row.original.ip_address}</span>
                              </p>
                              <p className="flex">
                                <span className="font-semibold w-40">Mac:</span>
                                <span>{row.original.mac_address}</span>
                              </p>
                            </div>
                          </div>
                          <div className="w-1/4 border-l pl-4 flex flex-col items-center">
                            <Button
                              onClick={() => handleCaseReview(row.original._id)}
                              className="mb-2"
                            >
                              Finish Investigation
                            </Button>
                            <Button onClick={() => alert("Edit")}>Edit</Button>
                            <Button className="mt-2">Delete</Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
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
          Total : {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-dark_green">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-dark_green">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
