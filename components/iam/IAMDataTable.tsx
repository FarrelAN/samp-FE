"use client";
import React, { FC, useState } from "react";
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
} from "../ui/select";

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
  const [selectedFilterColumn, setSelectedFilterColumn] =
    useState("model_name");

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

  return (
    <div className="w-full mt-4 border-2 rounded-xl p-10">
      <div className="font-bold text-xl text-mandiriBlue-950 pb-5">
        <h1>Workstation</h1>
      </div>
      <div className="flex flex-row gap-4 pb-3">
        <div className="flex items-center text-mandiriWhite w-full">
          <Select
            value={selectedFilterColumn}
            onValueChange={setSelectedFilterColumn}
          >
            <SelectTrigger className="h-8 text-mandiriBlue-950 w-[200px]">
              <SelectValue placeholder={selectedFilterColumn} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="model_name">Search by Model Name</SelectItem>
              <SelectItem value="impact_scope">
                Search by Impact Scope
              </SelectItem>
            </SelectContent>
          </Select>
          <BiSearchAlt className="text-xl translate-x-9 fill-mandiriBlue-950 text-black" />
          <Input
            placeholder={`Filter Cases by ${selectedFilterColumn}`}
            value={
              (table
                .getColumn(selectedFilterColumn)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(selectedFilterColumn)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-12 bg-mandiriBlue-250 text-black rounded-full"
          />
        </div>

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
                <TableRow
                  className="hover:mandiriBlue-400/40 ease-in-out duration-500 text-xs hover:cursor-pointer hover:rounded-xl text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => router.push(`/iam/cases/${row.original._id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={data.length} className="h-24 text-center">
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
