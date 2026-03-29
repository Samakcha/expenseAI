import { apiClient } from "./apiClient";

export interface Budget {
    id: number;
    amount: number;
    user_id: number;
}

export const budgetService = {
    getBudget: () => {
        return apiClient("/budget");
    },
    updateBudget: (amount: number) => {
        return apiClient("/budget", {
            method: "PUT",
            body: JSON.stringify({ amount }),
        });
    },

    getCategoryBudgets: () => {
        return apiClient("/budgets/categories");
    },

    updateCategoryBudget: (category: string, amount: number) => {
        return apiClient("/budgets/categories", {
            method: "POST",
            body: JSON.stringify({ category, amount }),
        });
    },

    deleteCategoryBudget: (categoryId: number) => {
        return apiClient(`/budgets/categories/${categoryId}`, {
            method: "DELETE",
        });
    },
};
