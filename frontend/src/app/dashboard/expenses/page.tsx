"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ExpenseTable } from "@/components/expenses/ExpenseTable";
import { expenseService, Expense } from "@/services/expenseService";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { useAuth } from "@/context/AuthContext";
import { Receipt } from "lucide-react";
import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/expenses/TableSkeleton";

export default function ExpensesPage() {
    const { isLoading: authLoading } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const response = await expenseService.getExpenses(1, 100); // Fetch more for display
            // Backend returns paginated object { data: [], total: ... }
            setExpenses(response.data || []);
            setError(null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading) {
            fetchExpenses();
        }
    }, [fetchExpenses, authLoading]);

    if (authLoading || (loading && expenses.length === 0)) {
        return <TableSkeleton />;
    }

    return (
        <div className="flex-1 space-y-10 max-w-7xl mx-auto py-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-end justify-between"
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Receipt className="h-4 w-4 text-primary" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-white italic">Expenses</h2>
                    </div>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest ml-11">Complete transactional forensics</p>
                </div>
                <AddExpenseDialog onExpenseAdded={fetchExpenses} />
            </motion.div>

            {error ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-red-500/5 text-red-500 rounded-[2rem] border border-red-500/10 font-bold flex items-center gap-4"
                >
                    <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">!</span>
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-wide">Sync Error</p>
                        <p className="text-xs opacity-60">{error}</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[2.5rem] p-1 bg-gradient-to-b from-white/[0.05] to-transparent shadow-2xl"
                >
                    <div className="bg-[#09090b]/40 backdrop-blur-3xl rounded-[2.4rem] p-8 border border-white/[0.05]">
                        <ExpenseTable data={expenses} onRefresh={fetchExpenses} />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
