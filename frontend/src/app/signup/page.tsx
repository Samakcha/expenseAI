"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await authService.signup({ name, email, password });

            if (response.id || response.user_id) {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError(response.error || "Signup failed");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center px-4 bg-[#050505] text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] opacity-60" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] opacity-60" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md z-10"
                >
                    <Card className="border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-[0_48px_100px_-20px_rgba(0,0,0,0.6)] rounded-[2.5rem] p-10 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                                <CheckCircle2 className="h-20 w-20 text-emerald-500 relative z-10" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black mb-4 tracking-tight text-white">Account Created!</CardTitle>
                        <CardDescription className="text-lg text-zinc-400 font-medium leading-relaxed">
                            Your account has been successfully created. Redirecting to login page...
                        </CardDescription>
                        <div className="mt-8 flex justify-center">
                            <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4 bg-[#050505] text-white selection:bg-primary/30 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] opacity-60" />
                <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 my-12"
            >
                <div className="flex justify-center mb-10">
                    <Link className="flex items-center justify-center group" href="/">
                        <div className="relative w-12 h-12 mr-3 flex items-center justify-center bg-white text-black rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.12)] rotate-3 group-hover:rotate-0 transition-all duration-300">
                            <span className="font-black text-2xl italic">X</span>
                        </div>
                        <span className="font-bold text-3xl tracking-tight text-white">
                            Expense<span className="text-primary italic">AI</span>
                        </span>
                    </Link>
                </div>

                <div className="relative">
                    {/* Animated Pulse Glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 1.0, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -inset-20 bg-[#211C30] rounded-[3rem] blur-[120px] z-0 pointer-events-none"
                    />
                    <Card className="border border-[#211C30] ring-[#211C30] bg-zinc-900/40 backdrop-blur-xl shadow-[0_48px_100px_-20px_rgba(0,0,0,0.6)] rounded-[2.5rem] overflow-hidden relative z-10">
                        <CardHeader className="space-y-2 pb-8">
                            <CardTitle className="text-3xl text-center font-black tracking-tight text-white text-3d italic">Create account</CardTitle>
                            <CardDescription className="text-center text-zinc-400 font-medium">
                                Enter your details below to create your account
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="grid gap-6">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-red-500/10 text-red-400 text-sm rounded-2xl border border-red-500/20 font-medium text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                                <div className="grid gap-3">
                                    <Label htmlFor="name" className="text-zinc-300 font-bold ml-1">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-white/5 border border-transparent rounded-2xl h-12 border-[#231C31] transition-all"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email" className="text-zinc-300 font-bold ml-1">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white/5 border border-transparent rounded-2xl h-12 border-[#231C31] transition-all"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password" className="text-zinc-300 font-bold ml-1">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-white/5 border border-transparent rounded-2xl h-12 border-[#231C31] transition-all"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-6 pt-6 pb-8 border-t-0 bg-transparent">
                                <Button
                                    className="w-full h-14 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-400 ease-in-out hover:scale-[1.02] active:scale-[0.98] hover:bg-[#211C30] hover:text-white btn-3d"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>
                                    )}
                                </Button>
                                <div className="text-sm text-center text-zinc-500 font-medium">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-primary hover:text-primary/80 hover:underline font-bold transition-colors">
                                        Sign In
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
