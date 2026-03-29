"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { Loader2, User, Mail, CheckCircle2, Trash2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await authService.getProfile();
                setName(profile.name);
                setEmail(profile.email);
            } catch (err: unknown) {
                const error = err as Error;
                setError(error.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const updatedProfile = await authService.updateProfile({ name, email });
            const token = localStorage.getItem("auth_token") || "";
            login(token, {
                id: updatedProfile.id,
                name: updatedProfile.name,
                email: updatedProfile.email
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl mx-auto space-y-10 pb-20"
        >
            {/* Header Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative h-64 rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/50 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-2xl blur opacity-50"></div>
                                <div className="relative h-24 w-24 bg-zinc-900 border-2 border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                                    <User className="h-12 w-12 text-primary/80" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                        <Camera className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white italic tracking-tighter text-3d mb-1">{name || "Account Profile"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                <motion.div variants={itemVariants} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur opacity-30"></div>
                    <div className="relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <span className="h-8 w-1 bg-primary rounded-full"></span>
                            Personal Details
                        </h2>

                        <form onSubmit={handleSave} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-red-500/10 text-red-500 text-sm font-bold rounded-2xl border border-red-500/20"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-emerald-500/10 text-emerald-500 text-sm font-bold rounded-2xl border border-emerald-500/20 flex items-center"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Changes captured and secured.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-zinc-400 font-bold text-xs uppercase tracking-widest pl-1">Full Name</Label>
                                    <div className="relative group/input">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/input:text-primary transition-colors" />
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-11 h-12 bg-white/5 border-white/5 rounded-2xl focus-visible:ring-primary/20 text-white font-semibold transition-all hover:bg-white/[0.08]"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-zinc-400 font-bold text-xs uppercase tracking-widest pl-1">Email Address</Label>
                                    <div className="relative group/input">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/input:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-11 h-12 bg-white/5 border-white/5 rounded-2xl focus-visible:ring-primary/20 text-white font-semibold transition-all hover:bg-white/[0.08]"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    style={{ backgroundColor: "#231C31" }}
                                    className="w-full h-12 rounded-2xl hover:opacity-90 text-white font-black italic text-lg btn-3d border border-white/5"
                                >
                                    {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Danger Zone */}
                <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-red-500/[0.01] border border-red-500/10 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-black text-red-500 mb-2 italic">Danger Zone</h2>
                            <p className="text-zinc-500 text-sm font-medium">Permanently delete your account and all associated data. This action is irreversible.</p>
                        </div>
                        <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-2xl font-bold h-11 px-6">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
