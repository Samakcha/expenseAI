import { apiClient } from "./apiClient";

export const aiService = {
    getInsights: (userId: number, question = "Provide a summary of my spending and suggestions to save.") => {
        return apiClient(`/ai-insight/${userId}?question=${encodeURIComponent(question)}`, {
            method: "POST",
        });
    },

    chat: (userId: number, question: string) => {
        return apiClient(`/ai-chat/${userId}?question=${encodeURIComponent(question)}`, {
            method: "POST",
        });
    },

    getBudgetAdvice: (userId: number) => {
        return apiClient(`/ai-budget/${userId}`);
    },
};
