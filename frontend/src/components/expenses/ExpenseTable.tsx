"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Search, Trash2, Edit3, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { expenseService } from "@/services/expenseService";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditExpenseDialog } from "./EditExpenseDialog";
import { motion, AnimatePresence } from "framer-motion";

import { Expense } from "@/services/expenseService";

interface ExpenseTableMeta {
    handleDelete: (id: number) => void;
    handleEdit: (expense: Expense) => void;
}

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "title",
        header: () => <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Transaction</div>,
        cell: ({ row }) => <div className="font-bold text-white text-sm">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "category",
        header: () => <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Classification</div>,
        cell: ({ row }) => (
            <Badge variant="outline" className="bg-white/[0.03] text-zinc-400 border-white/[0.05] capitalize px-2.5 py-0.5 rounded-lg font-bold text-[10px] tracking-wide">
                {row.getValue("category")}
            </Badge>
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
                >
                    Capital Outflow
                    <ArrowUpDown className="h-3 w-3 group-hover:scale-110 transition-transform" />
                </button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <div className="font-black text-white text-base tracking-tight">{formatted}</div>;
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
                >
                    Timestamp
                    <ArrowUpDown className="h-3 w-3 group-hover:scale-110 transition-transform" />
                </button>
            );
        },
        cell: ({ row }) => {
            const dateStr = row.getValue("date") as string;
            if (!dateStr) return <div className="text-zinc-600">—</div>;

            const date = new Date(dateStr);
            return (
                <div className="flex flex-col">
                    <div className="text-xs font-bold text-zinc-300">{date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const expense = row.original;
            const meta = table.options.meta as ExpenseTableMeta;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all">
                                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-48 bg-[#09090b]/90 backdrop-blur-2xl border-white/[0.05] p-1.5 rounded-2xl shadow-2xl">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Options</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(expense.id))} className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl focus:bg-white/5">
                                <Copy className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-xs font-bold">Copy ID</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => meta?.handleEdit(expense)} className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl focus:bg-white/5">
                                <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
                                <span className="text-xs font-bold">Edit Entry</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem
                                onClick={() => meta?.handleDelete(Number(expense.id))}
                                className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl focus:bg-red-500/10 text-red-400 focus:text-red-400"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span className="text-xs font-bold">Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function ExpenseTable({ data, onRefresh }: { data: Expense[], onRefresh?: () => void }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [editingExpense, setEditingExpense] = React.useState<Expense | null>(null);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this expense?")) {
            try {
                await expenseService.deleteExpense(id);
                onRefresh?.();
            } catch (error) {
                console.error("Failed to delete expense:", error);
            }
        }
    };

    const handleEdit = (expense: Expense) => {
        setEditingExpense(expense);
        setEditDialogOpen(true);
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        meta: {
            handleDelete,
            handleEdit,
        },
        state: {
            sorting,
            columnFilters,
        },
    });


    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative max-w-sm group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    <Input
                        placeholder="Search transactions..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="pl-11 h-12 bg-white/[0.03] border-white/[0.05] rounded-2xl focus-visible:ring-primary/20 hover:bg-white/[0.06] transition-all placeholder:text-zinc-600 font-medium"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-white/[0.01]">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-white/[0.05] hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="py-5 px-6">
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
                        <AnimatePresence mode="popLayout">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        key={row.id}
                                        className="border-white/[0.02] hover:bg-white/[0.03] transition-colors group"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-5 px-6">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow className="border-none">
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                                            <Search className="h-8 w-8 text-zinc-500 mb-2" />
                                            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">No entries found</p>
                                            <p className="text-zinc-600 text-xs font-medium uppercase tracking-tighter">Your financial ledger is currently empty</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between gap-4 px-2">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Showing <span className="text-zinc-300">{table.getRowModel().rows.length}</span> of <span className="text-zinc-300">{data.length}</span> entries
                </div>
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-white/5 border border-white/5"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-white/5 border border-white/5"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <EditExpenseDialog
                expense={editingExpense}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onExpenseUpdated={() => onRefresh?.()}
            />
        </div>
    );
}
