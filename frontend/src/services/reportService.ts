const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const reportService = {
    generateReport: async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

        const response = await fetch(`${BASE_URL}/generate-report`, {
            method: "GET",
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to generate report: ${response.statusText}`);
        }

        const blob = await response.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "AI_Financial_Report.pdf");
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return blob;
    }
};
