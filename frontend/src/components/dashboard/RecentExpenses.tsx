"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Expense } from "@/services/expenseService";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, ArrowUpRight } from "lucide-react";

export function RecentExpenses({ data }: { data: Expense[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="h-full"
        >
            <Card className="glass-card border-none overflow-hidden group p-6 h-full hover:border-white/10 transition-all duration-500">
                <CardHeader className="px-0 pt-0 pb-6 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-primary" />
                            <CardTitle className="text-xl font-black text-white">Recent Ledger</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
                            Latest forensic audit of {data.length} entries
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <Table>
                        <TableHeader className="bg-white/[0.02] rounded-xl overflow-hidden">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 h-10 px-4">Transaction</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 h-10 px-4">Classification</TableHead>
                                <TableHead className="hidden sm:table-cell text-[10px] font-bold uppercase tracking-widest text-zinc-500 h-10 px-4 text-center">Status</TableHead>
                                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-zinc-500 h-10 px-4">Capital Outflow</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {data.length === 0 ? (
                                    <TableRow className="border-none">
                                        <TableCell colSpan={4} className="text-center py-16">
                                            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest opacity-50">Empty Ledger state</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((expense, index) => (
                                        <motion.tr
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + (index * 0.05) }}
                                            key={expense.id}
                                            className="border-white/[0.02] hover:bg-white/[0.03] transition-colors group cursor-pointer"
                                        >
                                            <TableCell className="font-bold text-white text-sm py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span>{expense.title}</span>
                                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4">
                                                <Badge variant="outline" className="bg-white/[0.03] text-zinc-400 border-white/[0.05] capitalize px-2 py-0.5 rounded-md font-bold text-[9px] tracking-wide">
                                                    {expense.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-center px-4">
                                                <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                                                    Settled
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-black text-white px-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <span>${expense.amount.toFixed(2)}</span>
                                                    <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-primary transition-colors" />
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}
