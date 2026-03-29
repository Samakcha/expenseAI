"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Sparkles } from "lucide-react";
import { expenseService } from "@/services/expenseService";
import { motion } from "framer-motion";

const categories = [
    "Groceries",
    "Transport",
    "Entertainment",
    "Utilities",
    "Dining",
    "Health",
    "Shopping",
    "Other",
];

export function AddExpenseDialog({ onExpenseAdded }: { onExpenseAdded: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await expenseService.createExpense({
                title: formData.title,
                amount: parseFloat(formData.amount),
                category: formData.category,
            });
            setOpen(false);
            setFormData({ title: "", amount: "", category: "" });
            onExpenseAdded();
        } catch (error) {
            console.error("Failed to add expense:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button className="bg-white hover:bg-white/90 text-black h-11 px-6 text-sm font-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105 transition-all duration-300">
                        <Plus className="mr-2 h-5 w-5 stroke-[3]" /> Add Transaction
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-[480px] bg-[#09090b]/80 backdrop-blur-3xl border border-white/[0.05] p-8 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Plus className="h-64 w-64 -mr-16 -mt-16" />
                </div>

                <form onSubmit={handleSubmit} className="relative z-10">
                    <DialogHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-black text-white tracking-tight">Post Transaction</DialogTitle>
                        </div>
                        <DialogDescription className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
                            Official ledger entry for capital allocation
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">
                                Statement Title
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-white/[0.03] border-white/[0.05] text-white rounded-2xl h-14 px-5 focus-visible:ring-primary/20 hover:bg-white/[0.06] transition-all font-bold text-base"
                                placeholder="Where did you spend?"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">
                                    Capital Amount
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 font-black">$</span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="bg-white/[0.03] border-white/[0.05] text-white rounded-2xl h-14 pl-10 pr-5 focus-visible:ring-primary/20 hover:bg-white/[0.06] transition-all font-black text-xl"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">
                                    Classification
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(val) => setFormData({ ...formData, category: val || "" })}
                                    required
                                >
                                    <SelectTrigger className="bg-white/[0.03] border-white/[0.05] text-white rounded-2xl h-14 px-5 focus-visible:ring-primary/20 hover:bg-white/[0.06] transition-all font-bold text-sm">
                                        <SelectValue placeholder="Segment" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#09090b]/90 backdrop-blur-2xl border-white/[0.05] rounded-2xl">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="rounded-xl focus:bg-white/5 font-bold text-xs py-2.5">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-10">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white hover:bg-white/90 text-black font-black h-14 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full"
                                />
                            ) : (
                                "Confirm Transaction"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
