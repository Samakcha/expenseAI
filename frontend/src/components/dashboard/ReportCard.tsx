"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Download, Sparkles } from "lucide-react";
import { reportService } from "@/services/reportService";
import { motion } from "framer-motion";

export function ReportCard() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        try {
            await reportService.generateReport();
        } catch (error) {
            console.error("Failed to generate report:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="h-full"
        >
            <Card className="glass-card border-white/[0.05] text-white overflow-hidden relative group h-full flex flex-col justify-between hover:border-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity group-hover:scale-110 duration-700">
                    <FileText className="w-32 h-32" />
                </div>

                <CardHeader className="relative z-10 pb-2">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-primary/20 w-fit group-hover:rotate-6 transition-transform duration-500">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Reports</div>
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight mb-2">AI Intelligence</CardTitle>
                    <CardDescription className="text-zinc-400 font-medium leading-relaxed">
                        Generate a comprehensive deep-dive into your spending habits with AI.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-4">
                    <Button
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className="w-full h-14 text-base font-bold rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                Synthesizing...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5 mr-3" />
                                Generate Report
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
