"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Sparkles, Plus, Wallet, Loader2, Pencil, Trash2, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { budgetService } from "@/services/budgetService";
import { aiService } from "@/services/aiService";
import { expenseService, Expense } from "@/services/expenseService";
import { useAuth } from "@/context/AuthContext";
import ReactMarkdown from "react-markdown";

export default function BudgetPlannerPage() {

    const { user, isLoading: authLoading } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categoryBudgets, setCategoryBudgets] = useState<any[]>([]);
    const [budgetAdvice, setBudgetAdvice] = useState<string>("Analyze your spending to get AI-powered budget recommendations.");
    const [loading, setLoading] = useState(true);
    const [newBudget, setNewBudget] = useState({ category: "", amount: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const fetchData = async () => {
        if (!user) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userId = user?.id || (user as any)?.user_id;

        try {
            console.log("Fetching budget data for user:", userId);

            // Core data requests
            const fetchCoreData = async () => {
                try {
                    const [expenseResponse, catBudgetResponse] = await Promise.all([
                        expenseService.getExpenses(1, 100),
                        budgetService.getCategoryBudgets()
                    ]);
                    console.log("Core data received:", { expenseResponse, catBudgetResponse });
                    setExpenses(expenseResponse.data || []);
                    setCategoryBudgets(catBudgetResponse || []);
                } catch (err) {
                    console.error("Error fetching core budget data:", err);
                }
            };

            // AI Advice request (separate because it can be slow)
            const fetchAIAdvice = async () => {
                try {
                    console.log("Fetching AI budget advice...");
                    const adviceData = await aiService.getBudgetAdvice(userId);
                    console.log("AI message received");
                    setBudgetAdvice(adviceData.budget_advice || adviceData.advice || "Keep tracking to see more AI insights!");
                } catch (err) {
                    console.error("Error fetching AI advice:", err);
                    setBudgetAdvice("Keep tracking to see more AI insights!");
                }
            };

            await Promise.all([fetchCoreData(), fetchAIAdvice()]);
        } catch (error) {
            console.error("Global budget fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, authLoading]);

    const handleAddBudget = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBudget.category || !newBudget.amount) return;

        setIsSaving(true);
        try {
            console.log("Saving budget for:", newBudget);
            const saved = await budgetService.updateCategoryBudget(newBudget.category, parseFloat(newBudget.amount));
            console.log("Budget saved successfully:", saved);
            setNewBudget({ category: "", amount: "" });
            setEditMode(false);

            // Trigger data refresh by simulating what useEffect does or calling it if we move it out
            // For now, I'll just reload the page or trigger another way.
            // Actually, I'll just redefine it inside handleAddBudget too or export it.
            window.location.reload(); // Simple fix for now to ensure data consistency after save
        } catch (error) {
            console.error("Failed to save budget:", error);
            alert("Failed to save budget. Please check the console for details.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteBudget = async (categoryId: number) => {
        if (!confirm("Are you sure you want to delete this budget limit?")) return;

        try {
            await budgetService.deleteCategoryBudget(categoryId);
            window.location.reload();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startEditing = (budget: any) => {
        setNewBudget({ category: budget.category, amount: budget.amount.toString() });
        setEditMode(true);
        // Scroll to form on mobile/small screens
        document.getElementById("category")?.focus();
    };

    const cancelEdit = () => {
        setNewBudget({ category: "", amount: "" });
        setEditMode(false);
    };

    // Mapping for UI Category Colors
    const categoryColors: Record<string, string> = {
        "Groceries": "bg-violet-500",
        "Transport": "bg-blue-500",
        "Entertainment": "bg-pink-500",
        "Utilities": "bg-emerald-500",
        "Dining": "bg-orange-500",
        "Health": "bg-red-500",
        "Shopping": "bg-amber-500",
        "Other": "bg-zinc-500"
    };

    // Calculate spent amount per category for current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const spendingByCategory = expenses.reduce((acc: Record<string, number>, curr: Expense) => {
        const d = new Date(curr.date);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        }
        return acc;
    }, {});

    if (authLoading || loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-10 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white mb-2 text-zinc-100 text-3d italic">Budget Planner</h2>
                    <p className="text-zinc-500 font-medium">Strategic asset allocation and performance tracking.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-12">
                <Card className="md:col-span-12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-purple-500/20 ring-0 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="flex items-center text-primary text-2xl font-black">
                            <Sparkles className="w-7 h-7 mr-3 animate-pulse" /> AI Budget Optimization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <div className="text-lg text-zinc-200 leading-relaxed font-bold border-l-2 border-primary/30 pl-6 prose prose-invert max-w-none prose-p:leading-relaxed">
                            <ReactMarkdown>{budgetAdvice}</ReactMarkdown>
                        </div>
                    </CardContent>

                </Card>

                <Card className="md:col-span-5 h-fit border border-purple-500/20 ring-0 bg-white/[0.02] rounded-[2.5rem] p-4 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-white">{editMode ? "Edit Framework" : "Define Budget"}</CardTitle>
                        <CardDescription className="text-zinc-500 font-semibold">Allocate capital to specific lifestyle categories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddBudget} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="category" className="text-zinc-400 font-bold uppercase text-xs tracking-widest pl-1">Category Segment</Label>
                                <Select
                                    value={newBudget.category}
                                    onValueChange={(val: string | null) => setNewBudget({ ...newBudget, category: val || "" })}
                                    disabled={editMode}
                                >
                                    <SelectTrigger id="category" className="bg-white/5 border-white/5 h-14 rounded-2xl text-base font-semibold">
                                        <SelectValue placeholder="Select segment" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
                                        {Object.keys(categoryColors).map(cat => (
                                            <SelectItem key={cat} value={cat} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="amount" className="text-zinc-400 font-bold uppercase text-xs tracking-widest pl-1">Monthly Threshold</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">$</span>
                                    <Input
                                        id="amount"
                                        placeholder="0.00"
                                        className="pl-10 h-14 bg-white/5 border-white/5 rounded-2xl text-base font-semibold"
                                        type="number"
                                        value={newBudget.amount}
                                        onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {editMode && (
                                    <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl border-white/5 hover:bg-white/5 font-bold" onClick={cancelEdit}>
                                        <X className="w-5 h-5 mr-2" /> Cancel
                                    </Button>
                                )}
                                <Button type="submit" className={`flex-1 h-14 rounded-2xl font-black text-lg ${editMode ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white text-black hover:bg-zinc-200'} transition-all active:scale-95`} disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : (editMode ? <Pencil className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />)}
                                    {isSaving ? "Processing..." : (editMode ? "Confirm Update" : "Establish Budget")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="md:col-span-7">
                    <Card className="border border-purple-500/20 ring-0 bg-white/[0.02] rounded-[2.5rem] p-4 backdrop-blur-sm h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl font-black text-white">
                                <Wallet className="w-7 h-7 mr-3 text-zinc-500" /> Active Budgets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-10 py-6">
                            {categoryBudgets.length > 0 ? (
                                categoryBudgets.map((budget, idx) => {
                                    const spent = spendingByCategory[budget.category] || 0;
                                    const percentage = Math.min((spent / budget.amount) * 100, 100);
                                    const isOver = spent > budget.amount;
                                    const color = categoryColors[budget.category] || "bg-zinc-500";

                                    return (
                                        <div key={idx} className="space-y-4 group">
                                            <div className="flex items-center justify-between">
                                                <div className="font-black text-lg flex items-center text-white">
                                                    {budget.category}
                                                    {isOver && <AlertCircle className="w-5 h-5 ml-2 text-red-500 animate-pulse" />}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-base font-bold text-zinc-500">
                                                        <span className={isOver ? "text-red-500 font-black" : "text-white"}>
                                                            ${spent.toLocaleString()}
                                                        </span>
                                                        {" "} / <span className="text-zinc-300 font-black">${budget.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 bg-white/5 hover:bg-white/10 text-white rounded-xl"
                                                            onClick={() => startEditing(budget)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl"
                                                            onClick={() => handleDeleteBudget(budget.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isOver ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : `${color} shadow-[0_0_15px_rgba(0,0,0,0.2)]`}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 text-zinc-500 flex flex-col items-center">
                                    <div className="p-4 rounded-3xl bg-white/5 mb-6">
                                        <Wallet className="w-10 h-10 opacity-20" />
                                    </div>
                                    <p className="text-xl font-bold text-white mb-2">No active budgets found</p>
                                    <p className="text-sm font-semibold max-w-[250px]">Define your first allocation segment to begin tracking performance.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
