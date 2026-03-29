"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#0c0a09]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="h-full relative flex h-screen overflow-hidden bg-[#050505] text-white selection:bg-primary/30">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] opacity-40" />
            </div>

            <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-20 md:w-72 transition-all duration-300">
                <Sidebar />
            </div>
            <main className="flex flex-col flex-1 h-full w-full relative z-10 transition-all duration-300 md:pl-72">
                <div className="flex-1 overflow-auto p-4 md:p-10 bg-transparent scrollbar-none">
                    {children}
                </div>
            </main>
        </div>
    );
}
