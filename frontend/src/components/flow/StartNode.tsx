"use client";

import { Handle, Position } from "reactflow";
import { Play } from "lucide-react";

export const StartNode = () => {
    return (
        <div className="px-5 py-3 rounded-2xl bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 min-w-[120px] transition-all duration-300 hover:border-primary/50 group">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                <Play className="w-5 h-5 text-primary fill-primary" />
            </div>
            <div>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Trigger</p>
                <p className="text-sm font-bold text-white">Start</p>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-primary !border-2 !border-[#0c0a09]"
            />
        </div>
    );
};
