"use client";

import { Handle, Position } from "reactflow";
import { Square } from "lucide-react";

export const EndNode = () => {
    return (
        <div className="px-5 py-3 rounded-2xl bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 min-w-[120px] transition-all duration-300 hover:border-red-500/50 group">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                <Square className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Finish</p>
                <p className="text-sm font-bold text-white">End</p>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-red-500 !border-2 !border-[#0c0a09]"
            />
        </div>
    );
};
