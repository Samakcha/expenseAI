"use client";

import React, { useEffect, useState } from "react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ReportCard } from "@/components/dashboard/ReportCard";
import { expenseService, Expense } from "@/services/expenseService";
import { budgetService } from "@/services/budgetService";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { aiService } from "@/services/aiService";
import { useAuth } from "@/context/AuthContext";


export default function DashboardPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [summary, setSummary] = useState({
        totalExpenses: 0,
        monthlySpending: 0,
        remainingBudget: 0,
        aiSuggestion: "Analyze your spending pattern to get personalized advice."
    });
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshData = () => setRefreshTrigger(prev => prev + 1);

    useEffect(() => {
        if (!authLoading && user) {
            const fetchData = async () => {
                try {
                    // Fetch expenses and budget in parallel
                    const [expenseResponse, budgetResponse] = await Promise.all([
                        expenseService.getExpenses(1, 100),
                        budgetService.getBudget()
                    ]);

                    const data = expenseResponse.data || [];
                    setExpenses(data);

                    const total = data.reduce((acc: number, curr: Expense) => acc + curr.amount, 0);

                    // Monthly spending logic
                    const now = new Date();
                    const currentMonth = now.getMonth();
                    const currentYear = now.getFullYear();
                    const monthly = data
                        .filter((e: Expense) => {
                            if (!e.date) return false;
                            const d = new Date(e.date);
                            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                        })
                        .reduce((acc: number, curr: Expense) => acc + curr.amount, 0);

                    const budgetAmount = budgetResponse.amount || 1000;

                    // Fetch AI Insight
                    const insightData = await aiService.getInsights(user.id, "Provide a one-sentence brief saving tip based on my spending.");

                    setSummary({
                        totalExpenses: total,
                        monthlySpending: monthly,
                        remainingBudget: budgetAmount - monthly,
                        aiSuggestion: insightData.insight || "Keep tracking to see more AI insights!"
                    });
                } catch (error) {
                    console.error("Dashboard fetch error:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user, authLoading, refreshTrigger]);

    if (authLoading || (loading && expenses.length === 0)) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="flex-1 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-zinc-100 mb-2 text-3d italic">Dashboard Overview</h2>
                    <p className="text-zinc-500 font-medium">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
                </div>
            </div>

            <SummaryCards data={summary} onRefresh={refreshData} />

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 mt-8">
                <div className="lg:col-span-4 rounded-3xl border border-purple-500/20 ring-0 bg-white/[0.02] p-6 backdrop-blur-sm">
                    <ExpenseChart data={expenses} />
                </div>
                <div className="lg:col-span-3 rounded-3xl border border-purple-500/20 ring-0 bg-white/[0.02] p-6 backdrop-blur-sm">
                    <CategoryChart data={expenses} />
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
                <div className="md:col-span-2 lg:col-span-2 rounded-3xl border border-purple-500/20 ring-0 bg-white/[0.02] p-6 backdrop-blur-sm">
                    <RecentExpenses data={expenses.slice(0, 5)} />
                </div>
                <div className="md:col-span-1 lg:col-span-1">
                    <ReportCard />
                </div>
            </div>
        </div>
    );
}
