import { apiClient } from "./apiClient";

export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
}

export interface ExpenseCreate {
    title: string;
    amount: number;
    category: string;
}

export const expenseService = {
    getExpenses: (page = 1, limit = 10, category?: string) => {
        let url = `/expenses?page=${page}&limit=${limit}`;
        if (category) url += `&category=${category}`;
        return apiClient(url);
    },

    createExpense: (expense: ExpenseCreate) => {
        return apiClient("/expense", {
            method: "POST",
            body: JSON.stringify(expense),
        });
    },

    deleteExpense: (expenseId: number) => {
        return apiClient(`/expense/${expenseId}`, {
            method: "DELETE",
        });
    },

    updateExpense: (expenseId: number, expense: ExpenseCreate) => {
        return apiClient(`/expense/${expenseId}`, {
            method: "PUT",
            body: JSON.stringify(expense),
        });
    },
};
