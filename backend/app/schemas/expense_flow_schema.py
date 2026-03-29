from pydantic import BaseModel
from typing import List, Optional


class NodeData(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None


class FlowNode(BaseModel):
    id: str
    type: str
    data: Optional[NodeData] = None


class FlowEdge(BaseModel):
    source: str
    target: str


class ExpenseFlow(BaseModel):
    nodes: List[FlowNode]
    edges: List[FlowEdge]