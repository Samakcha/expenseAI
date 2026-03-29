"use client";

import { useReactFlow, Panel } from "reactflow";
import { Maximize, ZoomIn, ZoomOut, RotateCcw, Sparkles, Loader2 } from "lucide-react";

interface FlowToolbarProps {
    onAnalyze: () => void;
    isAnalyzing: boolean;
}

export const FlowToolbar = ({ onAnalyze, isAnalyzing }: FlowToolbarProps) => {
    const { zoomIn, zoomOut, fitView, setNodes, setEdges } = useReactFlow();

    const handleReset = () => {
        // Reset to initial state or clear all
        if (confirm("Clear entire flow?")) {
            setNodes([{
                id: "start",
                type: "start",
                position: { x: 50, y: 150 },
                data: { label: "Start" }
            }]);
            setEdges([]);
        }
    };

    return (
        <>
            <Panel position="top-right" className="flex gap-2">
                <button
                    onClick={onAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 px-8 py-3 bg-[#231C31] text-white font-bold rounded-2xl shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] btn-3d transition-all duration-100 disabled:opacity-50 disabled:scale-100 disabled:top-0 h-12"
                >
                    {isAnalyzing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Sparkles className="w-5 h-5 text-primary" />
                    )}
                    <span className="tracking-wide">
                        {isAnalyzing ? "Analyzing..." : "Analyze Flow"}
                    </span>
                </button>

            </Panel>

            <Panel position="bottom-center" className="flex items-center gap-1.5 p-1.5 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mb-4">
                <button
                    onClick={() => zoomIn()}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                    title="Zoom In"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={() => zoomOut()}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button
                    onClick={() => fitView({ padding: 0.2 })}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                    title="Fit View"
                >
                    <Maximize className="w-4 h-4" />
                </button>
                <button
                    onClick={handleReset}
                    className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                    title="Reset Flow"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </Panel>
        </>
    );
};
