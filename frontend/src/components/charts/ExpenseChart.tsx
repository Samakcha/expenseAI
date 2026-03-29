"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Expense } from "@/services/expenseService";
import { motion } from "framer-motion";

export function ExpenseChart({ data }: { data: Expense[] }) {
    // Process data for the chart: Group by month
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map(month => ({ name: month, total: 0 }));

    data.forEach(expense => {
        if (!expense.date) return;
        const date = new Date(expense.date);
        const monthIndex = date.getMonth();

        // Safety check for valid date/monthIndex
        if (!isNaN(monthIndex) && chartData[monthIndex]) {
            chartData[monthIndex].total += Number(expense.amount) || 0;
        }
    });

    // Only show months with data or last 6 months
    const currentMonth = new Date().getMonth();
    const displayData = chartData.slice(Math.max(0, currentMonth - 6), currentMonth + 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-full"
        >
            <Card className="glass-card border-none overflow-hidden group p-6 h-full hover:border-white/10 transition-all duration-500">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-black text-white">Cash Velocity</CardTitle>
                    <CardDescription className="text-zinc-500 font-bold tracking-tight uppercase text-[10px] mt-1">Monthly spending throughput</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pt-8">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={displayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#52525b"
                                    fontSize={10}
                                    fontWeight="bold"
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#52525b"
                                    fontSize={10}
                                    fontWeight="bold"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                    dx={-10}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.03)", radius: 12 }}
                                    contentStyle={{
                                        backgroundColor: "rgba(9, 9, 11, 0.9)",
                                        backdropFilter: "blur(16px)",
                                        borderRadius: "20px",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                                        padding: "16px"
                                    }}
                                    labelStyle={{ color: "#71717a", fontWeight: "bold", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}
                                    itemStyle={{ color: "#fff", fontWeight: "900", fontSize: "16px" }}
                                    formatter={(value: string | number | readonly (string | number)[] | undefined) => [`$${Number(value || 0).toLocaleString()}`, "Total Outflow"]}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="url(#barGradient)"
                                    radius={[8, 8, 0, 0]}
                                    barSize={32}
                                    animationDuration={1500}
                                    animationBegin={700}
                                >
                                    {displayData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            className="hover:opacity-80 transition-opacity cursor-pointer duration-300"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
