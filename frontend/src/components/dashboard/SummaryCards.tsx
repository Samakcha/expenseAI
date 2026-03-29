"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, Sparkles, Edit2, Check, X, Loader2, ArrowUpRight } from "lucide-react";
import { budgetService } from "@/services/budgetService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SummaryData {
    totalExpenses: number;
    monthlySpending: number;
    remainingBudget: number;
    aiSuggestion: string;
}

export function SummaryCards({ data, onRefresh }: { data: SummaryData; onRefresh?: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

    const handleUpdateBudget = async () => {
        const amount = parseFloat(newBudget);
        if (isNaN(amount) || amount <= 0) return;

        setIsUpdating(true);
        try {
            await budgetService.updateBudget(amount);
            setIsEditing(false);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error("Failed to update budget:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const budgetAmount = data.remainingBudget + data.monthlySpending;
    const spendingPercentage = budgetAmount > 0
        ? Math.min((data.monthlySpending / budgetAmount) * 100, 100)
        : 0;

    const cards = [
        {
            title: "Total Expenses",
            value: formatCurrency(data.totalExpenses),
            sub: "Lifetime track",
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
        },
        {
            title: "Monthly Spending",
            value: formatCurrency(data.monthlySpending),
            sub: "Current month",
            icon: TrendingUp,
            color: "text-indigo-400",
            bg: "bg-indigo-400/10",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Card className="glass-card border-white/[0.05] overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-2.5 rounded-xl", card.bg)}>
                                    <card.icon className={cn("h-5 w-5", card.color)} />
                                </div>
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{card.title}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-black text-white">{card.value}</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{card.sub}</span>
                                    <ArrowUpRight className="h-3 w-3 text-emerald-400/50" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="glass-card border-white/[0.05] relative group overflow-hidden hover:border-white/10 transition-all duration-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 rounded-xl bg-orange-400/10">
                                <Wallet className="h-5 w-5 text-orange-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                {!isEditing && (
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setNewBudget(budgetAmount.toString());
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                )}
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Remaining Budget</div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.div
                                    key="editing"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        type="number"
                                        value={newBudget}
                                        onChange={(e) => setNewBudget(e.target.value)}
                                        className="h-10 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/50"
                                        autoFocus
                                    />
                                    <div className="flex gap-1">
                                        <Button
                                            size="icon"
                                            className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-white"
                                            onClick={handleUpdateBudget}
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-10 w-10 rounded-xl hover:bg-white/5"
                                            onClick={() => setIsEditing(false)}
                                            disabled={isUpdating}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="viewing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-3"
                                >
                                    <div className="text-2xl font-black text-white">{formatCurrency(data.remainingBudget)}</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                            <span>{data.remainingBudget < 0 ? "Over budget" : "Left to spend"}</span>
                                            <span>{Math.round(spendingPercentage)}% Used</span>
                                        </div>
                                        <div className="w-full bg-white/[0.03] rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${spendingPercentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={cn(
                                                    "h-full rounded-full transition-colors",
                                                    spendingPercentage > 90 ? 'bg-red-500' : 'bg-primary'
                                                )}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="glass-card bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent border-primary/20 group h-full hover:border-primary/40 transition-all duration-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 rounded-xl bg-primary/20">
                                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                            </div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">AI Insight</div>
                        </div>
                        <div className="text-sm font-semibold leading-relaxed text-zinc-200 line-clamp-3 italic">
                            &quot;{data.aiSuggestion}&quot;
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

