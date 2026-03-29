"use client";

import { PieChart, Clock, Lightbulb, TrendingUp, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResultPanelProps {

    results: {
        message: string;
        total_spent: number;
        timeline: Array<{ title: string; amount: number; category: string }>;
        category_breakdown: Record<string, number>;
        ai_insight: string;
    } | null;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export const ResultPanel = ({ results, isCollapsed, onToggleCollapse }: ResultPanelProps) => {
    if (isCollapsed) {
        return (
            <div className="w-16 h-full bg-[#0c0a09]/90 backdrop-blur-3xl border-l border-white/5 flex flex-col items-center py-6 gap-6">
                <button
                    onClick={onToggleCollapse}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
                >
                    <ChevronRight className="w-5 h-5 rotate-[180deg]" />
                </button>
                <div className="w-8 h-px bg-white/5" />
                <div className="[writing-mode:vertical-lr] text-white/20 font-black tracking-[0.3em] uppercase text-xs py-4">
                    Analysis Panel
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="w-[30%] h-full bg-[#0c0a09] border-l border-white/5 flex flex-col p-12 text-center relative">
                <button
                    onClick={onToggleCollapse}
                    className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-all z-20"
                    title="Collapse Panel"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex-1 flex flex-col items-center justify-center">

                    <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center mx-auto mb-6">
                        <PieChart className="w-8 h-8 text-white/10" />
                    </div>
                    <h3 className="text-lg font-bold text-white">No Analysis Yet</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
                        Build your expense path and click &quot;Analyze Flow&quot; to see AI insights.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[30%] h-full bg-[#0c0a09]/90 backdrop-blur-3xl border-l border-white/5 overflow-y-auto custom-scrollbar animate-in slide-in-from-right-full duration-700 ease-out relative">
            <button
                onClick={onToggleCollapse}
                className="absolute top-8 left-8 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-all z-20"
                title="Collapse Panel"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
            <div className="p-8 space-y-8 pb-20 pl-24">
                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">AI Analysis</h2>
                        <p className="text-white/40 text-sm mt-1">Journey Insights</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <SparklesIcon className="w-6 h-6 text-primary" />
                    </div>
                </div>

                {/* Total Stats */}
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-20 h-20 text-primary" />
                    </div>
                    <p className="text-primary/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Projected</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-white">${results.total_spent.toLocaleString()}</span>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">AI Recommendation</h3>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 leading-relaxed text-white/80 text-sm relative prose prose-invert max-w-none prose-p:leading-relaxed">
                        <div className="absolute -top-3 -left-2 text-4xl text-white/10 opacity-50 font-serif">&quot;</div>
                        <ReactMarkdown>{results.ai_insight}</ReactMarkdown>
                    </div>

                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <PieChart className="w-4 h-4 text-violet-400" />
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">Categories</h3>
                    </div>
                    <div className="space-y-2.5">
                        {Object.entries(results.category_breakdown).map(([cat, amount]) => (
                            <div key={cat} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-default">
                                <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform">{cat}</span>
                                <span className="text-sm font-bold text-white/80">${amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">Projected Path</h3>
                    </div>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {results.timeline.map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className="absolute -left-[24.5px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#0c0a09] border-[3px] border-white/10 group-hover:border-primary transition-colors z-10" />
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-white truncate pr-2">{item.title}</h4>
                                        <span className="text-xs font-black text-primary shrink-0">${item.amount}</span>
                                    </div>
                                    <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
);
