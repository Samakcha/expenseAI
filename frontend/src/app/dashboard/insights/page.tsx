"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { TrendingUp, AlertTriangle, Lightbulb, TrendingDown, Loader2 } from "lucide-react";
import { aiService } from "@/services/aiService";
import { useAuth } from "@/context/AuthContext";
import ReactMarkdown from "react-markdown";

export default function InsightsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [insights, setInsights] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            const fetchInsights = async () => {
                try {
                    const response = await aiService.getInsights(user.id, "Provide 4 distinct financial insights and a detailed actionable plan for next month based on my spending.");
                    const text = response.insight || "";
                    setInsights(text.split("\n").filter((i: string) => i.trim().length > 0));
                } catch (error) {
                    console.error("Insights fetch error:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchInsights();
        }
    }, [user, authLoading]);

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
                    <h2 className="text-4xl font-black tracking-tight text-white mb-2 text-zinc-100 text-3d italic">AI Financial Insights</h2>
                    <p className="text-zinc-500 font-medium">Hyper-personalized analysis powered by neural intelligence.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <InsightCard
                    icon={TrendingUp}
                    title="Spending Trends"
                    description={insights[0] || "Your overall spending analysis is being generated..."}
                    color="text-red-400"
                    bg="bg-red-500/10"
                    actionText="Review transactions"
                    href="/dashboard/expenses"
                />
                <InsightCard
                    icon={TrendingDown}
                    title="Smart Savings"
                    description={insights[1] || "Calculated savings based on your recent activity."}
                    color="text-emerald-400"
                    bg="bg-emerald-500/10"
                    actionText="View budget"
                    href="/dashboard/budget"
                />
                <InsightCard
                    icon={AlertTriangle}
                    title="Category Alert"
                    description={insights[2] || "Potential overspending detected in specific categories."}
                    color="text-orange-400"
                    bg="bg-orange-500/10"
                    actionText="Manage categories"
                    href="/dashboard"
                />
                <InsightCard
                    icon={Lightbulb}
                    title="Monthly Comparison"
                    description={insights[3] || "Comparison against your typical spending patterns."}
                    color="text-sky-400"
                    bg="bg-sky-500/10"
                    actionText="See details"
                    href="/dashboard"
                />
            </div>

            <Card className="mt-12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-purple-500/20 ring-0 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                <CardHeader className="p-10">
                    <CardTitle className="flex items-center text-3xl font-black text-white mb-4">
                        <div className="p-3 rounded-2xl bg-primary/10 mr-4">
                            <Lightbulb className="w-8 h-8 text-primary" />
                        </div>
                        Actionable Plan for Next Month
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-lg font-semibold">
                        Strategic architectural advice to optimize your financial narrative.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12">
                    <div className="space-y-6 text-zinc-200 text-xl leading-relaxed font-medium border-l-2 border-primary/30 pl-8 prose prose-invert max-w-none">
                        <ReactMarkdown>
                            {insights.slice(4).join("\n") || "Keep tracking your expenses to generate a custom roadmap."}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function InsightCard({ icon: Icon, title, description, color, bg, actionText, href }: { icon: React.ElementType, title: string, description: string, color: string, bg: string, actionText: string, href?: string }) {
    return (
        <Card className="flex flex-col border border-purple-500/20 ring-0 bg-white/[0.03] hover:bg-white/[0.05] transition-all rounded-[2rem] overflow-hidden group">
            <CardHeader className="flex flex-row items-center gap-5 space-y-0 p-8 pb-4">
                <div className={`p-4 rounded-2xl ${bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <CardTitle className="text-2xl font-black text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-8 pt-4">
                <div className="text-zinc-400 font-semibold text-lg leading-relaxed mb-8 prose prose-invert max-w-none prose-p:leading-relaxed">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </div>

                {href ? (
                    <Link href={href} className="text-sm font-black text-white bg-[#231C31] hover:bg-[#231C31]/90 px-6 py-3 rounded-full transition-all self-start mt-auto flex items-center group/btn btn-3d">
                        {actionText} <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                ) : (
                    <button className="text-sm font-black text-white bg-[#231C31] hover:bg-[#231C31]/90 px-6 py-3 rounded-full transition-all self-start mt-auto flex items-center group/btn btn-3d">
                        {actionText} <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                )}
            </CardContent>
        </Card>
    );
}
