"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Receipt,
    LineChart,
    MessageSquare,
    Wallet,
    Bell,
    User as UserIcon,
    LogOut,
    Workflow,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const routes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-400" },
    { label: "Expenses", icon: Receipt, href: "/dashboard/expenses", color: "text-indigo-400" },
    { label: "AI Insights", icon: LineChart, href: "/dashboard/insights", color: "text-purple-400" },
    { label: "AI Chat", icon: MessageSquare, href: "/dashboard/chat", color: "text-emerald-400" },
    { label: "Expense Flow", icon: Workflow, href: "/dashboard/flow", color: "text-amber-400" },
    { label: "Budget Planner", icon: Wallet, href: "/dashboard/budget", color: "text-orange-400" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "JD";

    return (
        <div className="flex flex-col h-full bg-[#09090b]/80 backdrop-blur-2xl border-r border-white/[0.05] relative w-full overflow-hidden">
            <div className="px-6 py-8 flex-1 flex flex-col">
                <Link href="/dashboard" className="flex items-center gap-3 mb-10 group px-2">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg shadow-primary/20 transition-all duration-300"
                    >
                        <span className="font-black text-xl italic text-white">X</span>
                    </motion.div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                            Expense<span className="text-primary italic">AI</span>
                        </h1>
                        <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">Platform</span>
                    </div>
                </Link>

                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <motion.div
                            key={route.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={route.href}
                                className={cn(
                                    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                                    pathname === route.href
                                        ? "text-white bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                                )}
                            >
                                {pathname === route.href && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <route.icon className={cn(
                                    "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                    pathname === route.href ? route.color : "text-zinc-500 group-hover:text-zinc-300"
                                )} />
                                <span className="text-sm font-semibold flex-1">{route.label}</span>
                                {pathname === route.href && (
                                    <ChevronRight className="h-4 w-4 text-zinc-500 opacity-50" />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>


            </div>

            <div className="p-4 mt-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <button className="flex items-center gap-3 p-3 w-full rounded-2xl hover:bg-white/[0.04] transition-all group">
                                <Avatar className="h-10 w-10 border-2 border-white/[0.05]">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-200">{initials}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start overflow-hidden text-left flex-1">
                                    <p className="text-sm font-bold text-white truncate w-full">{user?.name || "Guest"}</p>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase truncate w-full">{user?.email || "Free Tier"}</p>
                                </div>
                            </button>
                        }
                    />
                    <DropdownMenuContent
                        side="right"
                        align="end"
                        sideOffset={12}
                        className="w-64 bg-[#09090b]/90 backdrop-blur-2xl border-white/[0.05] p-2 rounded-2xl shadow-2xl"
                    >
                        <DropdownMenuGroup className="space-y-1">
                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5 mb-1" />
                            <Link href="/dashboard/profile">
                                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl focus:bg-white/[0.06] focus:text-white transition-colors">
                                    <UserIcon className="h-4 w-4 text-zinc-500" />
                                    <span className="text-sm font-medium">Profile Settings</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl focus:bg-white/[0.06] focus:text-white transition-colors">
                                <Bell className="h-4 w-4 text-zinc-500" />
                                <span className="text-sm font-medium">Notifications</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem
                            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl focus:bg-red-500/10 text-red-400 focus:text-red-400 transition-colors mt-1"
                            onClick={() => logout()}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm font-bold">Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
