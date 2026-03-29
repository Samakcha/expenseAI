"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Receipt, DollarSign, CreditCard } from "lucide-react";

export const ExpenseNode = memo(({ data, selected }: NodeProps) => {
    const Icon = DollarSign || CreditCard;

    return (
        <div className={`px-4 py-3 rounded-2xl bg-[#1e1e1e] border-2 backdrop-blur-xl transition-all duration-300 min-w-[200px] shadow-2xl z-50 ${selected ? "border-primary ring-2 ring-primary/20 scale-105" : "border-white/20"}`}>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-primary !border-2 !border-[#0c0a09]"
            />

            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center border border-violet-600/30">
                    <Receipt className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Expense Item</p>
                    <p className="text-sm font-semibold text-white truncate">{data.title || "New Expense"}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-black/30 rounded-lg px-2 py-1.5 border border-white/5">
                <Icon className="w-3.5 h-3.5 text-primary" />

                <span className="text-sm font-bold text-primary">
                    {data.amount || "0"}
                </span>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-primary !border-2 !border-[#0c0a09]"
            />
        </div>
    );
});

ExpenseNode.displayName = "ExpenseNode";
