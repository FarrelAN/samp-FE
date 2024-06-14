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
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Aos from "aos";
import "aos/dist/aos.css";
import { SOCTableColumns } from "@/components/table/column";
import { CaseType } from "@/lib/types";
import { handleCaseClosed, handleSendToResolver } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ExtendedCaseType extends CaseType {
  caseId: string;
  formattedDescription: string;
}

Aos.init();

interface DataTableProps {
  data: CaseType[];
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    _id: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRowData, setSelectedRowData] =
    useState<ExtendedCaseType | null>(null);

  const handleRowClick = (rowData: CaseType) => {
    const [caseId, description] = rowData.model_name.split(" (");
    const formattedDescription = `(${description}`;
    setSelectedRowData({ ...rowData, caseId, formattedDescription });
  };

  const handleStatusChange = async (caseId: string) => {
    try {
      const response = await handleSendToResolver(caseId);
      if (response === 200) {
        toast({
          title: "Case successfully sent for review",
          description:
            "The case has been sent back to the SOC team for review.",
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            backdropFilter: "blur(3px)",
            color: "white",
            border: "1px solid rgb(232, 233, 234)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
        });

        setTimeout(() => {
          window.location.reload(); // Reload the page after a delay
        }, 2000); // 2000ms = 2 seconds
      }
    } catch (error) {
      console.error("Error sending case:", error);
      toast({
        title: "Failed to send case",
        description: "There was an error sending the case to resolver team",
        style: {
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          backdropFilter: "blur(3px)",
          color: "white",
          border: "1px solid rgb(232, 233, 234)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        },
      });
    }
  };

  const handleCloseCase = async (caseId: string) => {
    try {
      const response = await handleCaseClosed(caseId);
      if (response === 200) {
        toast({
          title: "Case successfully closed",
          description: "The case has been successfully closed and archived.",
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            backdropFilter: "blur(3px)",
            color: "white",
            border: "1px solid rgb(232, 233, 234)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
        });

        setTimeout(() => {
          window.location.reload(); // Reload the page after a delay
        }, 2000); // 2000ms = 2 seconds
      }
    } catch (error) {
      console.error("Error sending case:", error);
      toast({
        title: "Failed to close case",
        description: "There was an error closing the case",
        style: {
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          backdropFilter: "blur(3px)",
          color: "white",
          border: "1px solid rgb(232, 233, 234)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        },
      });
    }
  };

  const table = useReactTable({
    data,
    columns: SOCTableColumns,
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
      <div className="font-bold text-xl text-mandiriBlue-950">
        <h1>Workstation</h1>
      </div>
      <div className="flex items-center py-4">
        <BiSearchAlt className="text-xl translate-x-9 fill-mandiriBlue-950 z-20" />
        <Input
          placeholder="Filter Cases by ID"
          value={
            (table.getColumn("model_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("model_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-12 bg-white text-mandiriBlue-950 rounded-full border-mandiriYellow-500/60 border-2 focus:border-mandiriYellow-500 focus:outline-none transition-all ease-in-out duration-500"
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
      <div className="text-light_brown rounded-lg">
        <Table className="font-dm-sans">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="b" key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  let className =
                    "text-center text-mandiriWhite italic bg-mandiriBlue-950 p-2";
                  if (index === 0) {
                    className += " rounded-l-full"; // Add rounded corners to the left side
                  }
                  if (index === headerGroup.headers.length - 1) {
                    className += " rounded-r-full"; // Add rounded corners to the right side
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
                    className={`hover:bg-mandiriSkyBlue/40 transition-all ease-in-out duration-500 text-s hover:cursor-pointer hover:rounded-sm text-center`}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.original)}
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

      {selectedRowData && (
        <Dialog
          open={!!selectedRowData}
          onOpenChange={() => setSelectedRowData(null)}
        >
          <DialogContent className="w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="font-bold">Case Details</DialogTitle>
              <DialogDescription>
                What actions would you like to take on this case?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 font-bold">
                <Label className="text-right">Case ID</Label>
                <div className="col-span-3">{selectedRowData?.caseId}</div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4 font-bold">
                <Label className="text-right mt-2">Description</Label>
                <div className="col-span-3">
                  {selectedRowData?.formattedDescription}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Impact Scope</Label>
                <div className="col-span-3">
                  {selectedRowData?.impact_scope}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Case Severity</Label>
                <div className="col-span-3">
                  {selectedRowData?.case_severity.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Data Source</Label>
                <div className="col-span-3">{selectedRowData?.data_source}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Associated Insight</Label>
                <div className="col-span-3">
                  {selectedRowData?.associated_insight}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-1">Information</Label>
                <div className="col-span-3">
                  {selectedRowData?.highlight_information}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">IP Address</Label>
                <div className="col-span-3">{selectedRowData?.ip_address}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">MAC Address</Label>
                <div className="col-span-3">{selectedRowData?.mac_address}</div>
              </div>
            </div>
            <AlertDialog>
              <DialogFooter>
                <AlertDialogTrigger>
                  <Button
                    onClick={() => handleStatusChange(selectedRowData?._id)}
                    className="bg-mandiriBlue-950 hover:bg-mandiriBlue-900"
                  >
                    Send to Resolver
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogTrigger>
                  <Button className="text-white ">Close Case</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently close
                      and archive the case
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCloseCase(selectedRowData?._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </DialogFooter>
            </AlertDialog>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
