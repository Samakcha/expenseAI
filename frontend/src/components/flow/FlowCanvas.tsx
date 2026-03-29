"use client";

import { useMemo } from "react";
import ReactFlow, {
    Background,
    Edge,
    OnConnect,
    ConnectionMode,
    Node,
    OnNodesChange,
    OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";

import { StartNode } from "./StartNode";
import { ExpenseNode } from "./ExpenseNode";
import { EndNode } from "./EndNode";
import { FlowToolbar } from "./FlowToolbar";

const nodeTypes = {
    start: StartNode,
    expense: ExpenseNode,
    end: EndNode,
};


interface FlowCanvasProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
    onPaneClick: (event: React.MouseEvent) => void;
    onAnalyze: () => void;
    isAnalyzing: boolean;
}

export const FlowCanvas = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    onAnalyze,
    isAnalyzing
}: FlowCanvasProps) => {

    const defaultEdgeOptions = useMemo(() => ({
        style: { strokeWidth: 2, stroke: "#6366f1" },
        animated: true,
    }), []);

    return (
        <div className="flex-1 h-full bg-[#050505] relative overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionMode={ConnectionMode.Loose}
                fitView
                className="bg-dot-pattern"
            >
                <Background color="#222" gap={20} size={1} />
                <FlowToolbar onAnalyze={onAnalyze} isAnalyzing={isAnalyzing} />
            </ReactFlow>
        </div>
    );
};
