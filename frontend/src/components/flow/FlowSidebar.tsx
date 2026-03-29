"use client";

import { Info, Plus, Receipt, DollarSign, Trash2, ChevronDown, PlayCircle, Square } from "lucide-react";
import { Node } from "reactflow";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FlowSidebarProps {
    onAddExpense: () => void;
    onAddStart: () => void;
    onAddEnd: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    selectedNode: Node | null;
    onUpdateNode: (id: string, data: Record<string, unknown>) => void;
    onDeleteNode: (id: string) => void;
}

export const FlowSidebar = ({
    onAddExpense,
    onAddStart,
    onAddEnd,
    isCollapsed,
    onToggleCollapse,
    selectedNode,
    onUpdateNode,
    onDeleteNode
}: FlowSidebarProps) => {
    if (isCollapsed) {
        return (
            <div className="w-16 h-full bg-[#0c0a09]/50 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-6 gap-6">
                <button
                    onClick={onToggleCollapse}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
                >
                    <ChevronDown className="w-5 h-5 rotate-[270deg]" />
                </button>
                <div className="w-8 h-px bg-white/5" />
                <DropdownMenu>
                    {/* @ts-expect-error asChild is valid for DropdownMenuTrigger but may have type conflicts */}
                    <DropdownMenuTrigger asChild>
                        <button className="w-10 h-10 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 flex items-center justify-center transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="bg-[#1A1A1A] border-white/10 text-white p-2 min-w-48 shadow-2xl rounded-2xl ml-2">
                        <DropdownMenuItem
                            onClick={onAddStart}
                            className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer"
                        >
                            <PlayCircle className="w-4 h-4 text-primary" />
                            <span className="font-bold text-xs pl-2">Start Node</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onAddExpense}
                            className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer mt-1"
                        >
                            <Receipt className="w-4 h-4 text-violet-400" />
                            <span className="font-bold text-xs pl-2">Expense Node</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onAddEnd}
                            className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer mt-1"
                        >
                            <Square className="w-4 h-4 text-red-500" />
                            <span className="font-bold text-xs pl-2">End Node</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div className="w-80 h-full bg-[#0c0a09]/50 backdrop-blur-3xl border-r border-white/5 p-6 flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Flow Builder</h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold italic">visual expense journey</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onToggleCollapse}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-all"
                        title="Collapse Sidebar"
                    >
                        <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                    <DropdownMenu>
                        {/* @ts-expect-error asChild is valid for DropdownMenuTrigger but may have type conflicts */}
                        <DropdownMenuTrigger asChild>
                            <button className="w-10 h-10 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 flex items-center justify-center transition-all">
                                <Plus className="w-5 h-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1A1A1A] border-white/10 text-white p-2 min-w-48 shadow-2xl rounded-2xl">
                            <DropdownMenuItem
                                onClick={onAddStart}
                                className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer"
                            >
                                <PlayCircle className="w-5 h-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Add Start Node</span>
                                    <span className="text-[10px] text-white/40">Trigger your flow</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={onAddExpense}
                                className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer mt-1"
                            >
                                <Receipt className="w-5 h-5 text-violet-400" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Add Expense Node</span>
                                    <span className="text-[10px] text-white/40">Single spending item</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={onAddEnd}
                                className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer mt-1"
                            >
                                <Square className="w-5 h-5 text-red-500" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Add End Node</span>
                                    <span className="text-[10px] text-white/40">Finish your flow</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="w-full h-px bg-white/5" />


            <div className="flex-1">
                {selectedNode && selectedNode.type === "expense" ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
                                <Receipt className="w-4 h-4" />
                                Edit Node
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5 block px-1">Title</label>
                                    <input
                                        type="text"
                                        value={selectedNode.data.title || ""}
                                        onChange={(e) => onUpdateNode(selectedNode.id, { ...selectedNode.data, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="e.g. Coffee"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5 block px-1">Amount ($)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                                        <input

                                            type="number"
                                            value={selectedNode.data.amount || ""}
                                            onChange={(e) => onUpdateNode(selectedNode.id, { ...selectedNode.data, amount: parseFloat(e.target.value) || 0 })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => onDeleteNode(selectedNode.id)}
                                    className="w-full py-2.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center gap-2 border border-red-500/20 hover:bg-red-500/20 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Node
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-3xl border border-dashed border-white/10 opacity-60">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Info className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Select a node to edit its properties or drag connections to build your flow.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Shortcuts</p>
                <div className="mt-2 space-y-2 text-[11px] text-white/40 font-medium">
                    <div className="flex justify-between items-center">
                        <span>Delete Node</span>
                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded uppercase">Del</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Zoom</span>
                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded uppercase">Scroll</kbd>
                    </div>
                </div>
            </div>
        </div>
    );
};
