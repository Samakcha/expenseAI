from sqlalchemy.orm import Session

from app.services.expense_service import create_expense
from app.services.insight_service import generate_insight


def build_graph(edges):
    graph = {}

    for edge in edges:
        graph.setdefault(edge.source, []).append(edge.target)

    return graph


def get_start_node(nodes, edges):

    targets = {edge.target for edge in edges}

    for node in nodes:
        if node.id not in targets:
            return node.id

    return None


def process_expense_flow(db: Session, flow, user_id):

    graph = build_graph(flow.edges)

    start_node = get_start_node(flow.nodes, flow.edges)

    node_map = {node.id: node for node in flow.nodes}

    current = start_node

    created_expenses = []
    timeline = []

    while current:

        node = node_map.get(current)

        if node and node.type == "expense" and node.data and node.data.title and node.data.amount:

            expense_data = type("ExpenseData", (), {})()

            expense_data.title = node.data.title
            expense_data.amount = node.data.amount

            created = create_expense(db, expense_data, user_id)

            created_expenses.append(created)

            timeline.append({
                "title": created.title,
                "amount": created.amount,
                "category": created.category
            })

        next_nodes = graph.get(current)

        if next_nodes:
            current = next_nodes[0]
        else:
            current = None

    total_spent = sum(exp.amount for exp in created_expenses)

    # category breakdown
    category_breakdown = {}

    for exp in created_expenses:
        category_breakdown[exp.category] = category_breakdown.get(exp.category, 0) + exp.amount

    # AI insight
    ai_insight = generate_insight(
        created_expenses,
        "Analyze this expense journey and give a short financial insight."
    )

    return {
        "timeline": timeline,
        "total_spent": total_spent,
        "category_breakdown": category_breakdown,
        "ai_insight": ai_insight,
        "expenses": created_expenses
    }