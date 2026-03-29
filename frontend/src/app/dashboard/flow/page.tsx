"use client";

import { useState, useCallback } from "react";
import {
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    ReactFlowProvider
} from "reactflow";
import { FlowCanvas } from "@/components/flow/FlowCanvas";
import { FlowSidebar } from "@/components/flow/FlowSidebar";
import { ResultPanel } from "@/components/flow/ResultPanel";
import { toast } from "sonner";
import { apiClient } from "@/services/apiClient";

interface FlowResult {
    message: string;
    total_spent: number;
    timeline: { title: string; amount: number; category: string; }[];
    category_breakdown: Record<string, number>;
    ai_insight: string;
}


const initialNodes: Node[] = [
    {
        id: "start",
        type: "start",
        position: { x: 50, y: 150 },
        data: { label: "Start" }
    },
    {
        id: "expense_init",
        type: "expense",
        position: { x: 300, y: 150 },
        data: { title: "Welcome Expense", amount: 100 },
    },
];

const initialEdges: Edge[] = [];

export default function FlowPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [results, setResults] = useState<FlowResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    const addExpenseNode = useCallback(() => {
        const id = `expense_${Date.now()}`;
        const newNode: Node = {
            id,
            type: "expense",
            position: { x: 400, y: 150 },
            data: { title: "New Expense", amount: 0 },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
        toast.info("New expense node added to canvas");
    }, [setNodes]);

    const addStartNode = useCallback(() => {
        const id = `start_${Date.now()}`;
        const newNode: Node = {
            id,
            type: "start",
            position: { x: 50, y: 150 },
            data: { label: "Start" },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
        toast.info("Start node added to canvas");
    }, [setNodes]);


    const addEndNode = useCallback(() => {
        const id = `end_${Date.now()}`;
        const newNode: Node = {
            id,
            type: "end",
            position: { x: 800, y: 150 },
            data: { label: "End" },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
        toast.info("End node added to canvas");
    }, [setNodes]);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isResultPanelCollapsed, setIsResultPanelCollapsed] = useState(false);

    const updateNodeData = useCallback((id: string, data: Record<string, unknown>) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    return { ...node, data };
                }
                return node;
            })
        );
        setSelectedNode((prev) => (prev?.id === id ? { ...prev, data } : prev));
    }, [setNodes]);

    const deleteNode = useCallback((id: string) => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
        setSelectedNode(null);
    }, [setNodes, setEdges]);

    const analyzeFlow = async () => {
        setIsAnalyzing(true);
        try {
            const data = await apiClient("/expense-flow", {
                method: "POST",
                body: JSON.stringify({
                    nodes: nodes.map(n => ({
                        id: n.id,
                        type: n.type,
                        data: n.data
                    })),
                    edges: edges.map(e => ({
                        source: e.source,
                        target: e.target
                    }))
                })
            });

            setResults(data);
            toast.success("Flow analyzed successfully!");
        } catch (error: unknown) {
            const err = error as Error;
            console.error("Error analyzing flow:", err);
            toast.error(err.message || "Error analyzing flow. Please check your connections.");
        } finally {
            setIsAnalyzing(false);
        }
    };


    return (
        <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden bg-[#050505] rounded-3xl border border-white/5 shadow-2xl transition-all duration-500 ease-in-out">
            <ReactFlowProvider>
                <FlowSidebar
                    onAddExpense={addExpenseNode}
                    onAddStart={addStartNode}
                    onAddEnd={addEndNode}
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    selectedNode={selectedNode}
                    onUpdateNode={updateNodeData}
                    onDeleteNode={deleteNode}
                />

                <div className="flex-1 relative h-full transition-all duration-500 ease-in-out">
                    <FlowCanvas
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        onAnalyze={analyzeFlow}
                        isAnalyzing={isAnalyzing}
                    />
                </div>

                <ResultPanel
                    results={results}
                    isCollapsed={isResultPanelCollapsed}
                    onToggleCollapse={() => setIsResultPanelCollapsed(!isResultPanelCollapsed)}
                />
            </ReactFlowProvider>
        </div>
    );
}

