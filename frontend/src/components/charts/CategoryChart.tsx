/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Expense } from "@/services/expenseService";
import { motion } from "framer-motion";

const COLORS = [
    "hsl(var(--primary))",
    "#60a5fa",
    "#fbbf24",
    "#f472b6",
    "#34d399",
    "#f87171",
    "#22d3ee",
    "#a1a1aa"
];

export function CategoryChart({ data }: { data: Expense[] }) {
    // Process data: Group by category
    const categories: Record<string, number> = {};
    data.forEach(expense => {
        const category = expense.category || "Uncategorized";
        const amount = Number(expense.amount) || 0;
        categories[category] = (categories[category] || 0) + amount;
    });

    const chartData = Object.entries(categories).map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="h-full"
        >
            <Card className="glass-card border-none overflow-hidden group p-6 h-full hover:border-white/10 transition-all duration-500">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-black text-white">Asset Allocation</CardTitle>
                    <CardDescription className="text-zinc-500 font-bold tracking-tight uppercase text-[10px] mt-1">Portfolio distribution by segment</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pt-6">
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={12}
                                    animationBegin={800}
                                    animationDuration={1800}
                                    animationEasing="ease-out"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className="hover:opacity-80 transition-all cursor-pointer outline-none active:scale-95 duration-300"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(9, 9, 11, 0.9)",
                                        backdropFilter: "blur(16px)",
                                        borderRadius: "20px",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                                        padding: "16px"
                                    }}
                                    itemStyle={{ color: "#fff", fontWeight: "900", fontSize: "14px" }}
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Capital"]}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 ml-2">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
