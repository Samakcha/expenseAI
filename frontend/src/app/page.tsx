"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  PieChart,
  Wallet,
  LineChart,
  Sparkles,
  MessageSquare,
  ChevronRight,

  Zap,
  LayoutDashboard,
  CalendarDays,
  PiggyBank
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] opacity-60" />
        <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <motion.header
          initial={false}
          animate={{
            y: isScrolled ? 0 : 0,
            scale: isScrolled ? 0.985 : 1,
            borderRadius: isScrolled ? "28px" : "28px",
            backgroundColor: isScrolled
              ? "rgba(33, 28, 48, 0.9)"
              : "rgba(33, 28, 48, 0.6)",
            borderColor: isScrolled
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.06)",
            backdropFilter: isScrolled ? "blur(18px)" : "blur(10px)",
            boxShadow: isScrolled
              ? "0 18px 50px rgba(0,0,0,0.45)"
              : "0 10px 30px rgba(0,0,0,0.22)"
          }}
          transition={{
            duration: 0.28,
            ease: "easeOut"
          }}
          className="w-full max-w-7xl border"
        >
          <div className="flex h-20 items-center justify-between px-6 md:px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center shrink-0"
            >
              <Link className="flex items-center justify-center group" href="/">
                <div className="relative w-11 h-11 mr-3 flex items-center justify-center bg-white text-black rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.12)] rotate-3 group-hover:rotate-0 transition-all duration-300">
                  <span className="font-black text-2xl italic">X</span>
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Expense<span className="text-primary italic">AI</span>
                </span>
              </Link>
            </motion.div>

            {/* Center Nav */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                href="#how-it-works"
              >
                How it Works
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/dashboard" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="rounded-full px-5 font-semibold text-zinc-300 "
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button className="rounded-full px-6 font-bold bg-white text-[#231C31] shadow-lg shadow-primary/20 hover:shadow-primary/30 transition duration-300  ease-in-out hover:bg-white/80 hover:scale-[1.02] active:scale-[0.98] btn-3d">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>
      </div >

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full pt-36 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm font-medium shadow-2xl mb-8 ring-1 ring-white/10"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary animate-pulse" />
              <span className="text-zinc-300">New: AI Prediction Engine 2.0</span>
              <ChevronRight className="h-4 w-4 ml-1 text-zinc-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 max-w-5xl leading-[0.9] text-white"
            >
              Master your money <br />
              <span
                className="italic text-[#3A2F56]"
                style={{
                  textShadow: `
      1px 1px 0 #1B1626,
      2px 2px 0 #15111F,
      3px 3px 0 #120E1A,
      0px 10px 30px rgba(58,47,86,0.35)
    `
                }}
              >
                with intelligence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-[750px] text-zinc-400 md:text-xl mb-12 leading-relaxed font-medium"
            >
              ExpenseAI uses advanced machine learning to track, categorize, and
              forecast your spending. The most powerful financial tool ever built
              for students and startups.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl shadow-[0_20px_50px_rgba(var(--primary),0.2)] rounded-full font-black w-full sm:w-auto hover:scale-105 active:scale-95 transition-all bg-white text-black hover:bg-zinc-200 btn-3d"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl bg-white/10 hover:bg-white/15 border-white/10 rounded-full font-black w-full sm:w-auto transition-all text-white btn-3d"
                >
                  <LayoutDashboard className="mr-3 w-6 h-6" />
                  Dashboard
                </Button>
              </Link>

            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="w-full pb-32 flex justify-center px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl w-full mx-auto p-4 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-[0_48px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.6)] relative group"
          >
            <div className="rounded-[1.75rem] overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/10] md:aspect-[21/10] shadow-inner relative">
              {/* Browser Bar */}
              <div className="w-full h-10 border-b border-zinc-800 bg-zinc-900 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" /> <div className="w-3 h-3 rounded-full bg-green-400/70" /> <div className="mx-auto text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
                  app.expenseai.com
                </div>
              </div>
              <div className="flex h-[calc(100%-2.5rem)]">
                {/* Sidebar */}
                <div className="w-56 border-r border-zinc-800 hidden md:flex flex-col p-6 gap-6">
                  {["Dashboard", "Expenses", "AI Insights", "AI Chat", "Budget Planner"].map((item, i) => (<div key={item} className={`h-10 w-full rounded-xl flex items-center px-4 cursor-pointer transition-all ${i === 0 ? "bg-primary/10 border border-primary/20" : "hover:bg-zinc-800"}`} > <div className={`h-4 w-4 rounded mr-3 ${i === 0 ? "bg-primary" : "bg-zinc-700"}`} /> <span className="text-sm text-zinc-400">{item}</span> </div>))}
                </div>
                {/* Main Dashboard */}
                <div className="flex-1 p-8 flex flex-col gap-8">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="text-zinc-500 text-xs uppercase tracking-wider">
                      </div>
                      <div className="text-3xl font-bold">
                        Dashboard Overview
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 shadow-lg" />
                  </div>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    {[
                      {
                        title: "Total Expenses",
                        value: "$4,820",
                        icon: Wallet,
                        progress: 85,
                        color: "text-red-400"
                      },
                      {
                        title: "Monthly Spending",
                        value: "$1,240",
                        icon: CalendarDays,
                        progress: 60,
                        color: "text-yellow-400"
                      },
                      {
                        title: "Remaining Budget",
                        value: "$760",
                        icon: PiggyBank,
                        progress: 40,
                        color: "text-green-400"
                      },
                      {
                        title: "AI Suggestion",
                        value: "Reduce Food",
                        icon: Sparkles,
                        progress: 70,
                        color: "text-violet-400"
                      }
                    ].map((card, i) => {

                      const Icon = card.icon;

                      return (
                        <div
                          key={i}
                          className="h-32 bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-4
      hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >

                          {/* Top Row */}
                          <div className="flex justify-between items-center">

                            <div className="text-xs text-zinc-500 uppercase tracking-wide">
                              {card.title}
                            </div>

                            <Icon className={`w-5 h-5 ${card.color}`} />

                          </div>

                          {/* Value */}
                          <div className="text-xl font-semibold">
                            {card.value}
                          </div>

                          {/* Progress Bar */}
                          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-primary rounded-full transition-all duration-700"
                              style={{ width: `${card.progress}%` }}
                            />

                          </div>

                        </div>
                      );

                    })}

                  </div>
                  {/* Chart */}
                  <div className="flex gap-6 flex-1"> <div className="flex-[2] bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 flex flex-col gap-6"> <div className="text-sm text-zinc-500"> Monthly spending </div> <div className="flex-1 flex items-end justify-between gap-3"> {[40, 70, 55, 80, 60, 95, 50, 100, 75, 45, 65, 85].map((h, i) => (<motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="flex-1 bg-zinc-800 rounded-full hover:bg-primary transition-all duration-300 cursor-pointer relative group" > <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-1 bg-black rounded opacity-0 group-hover:opacity-100 transition"> ${h * 10} </div> </motion.div>))} </div> </div> {/* Donut Chart */} <div className="flex-1 bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 hidden lg:flex flex-col gap-6"> <div className="text-sm text-zinc-500"> Spending split </div> <div className="flex-1 flex items-center justify-center"> <div className="w-32 h-32 rounded-full border-[14px] border-zinc-800 relative"> <div className="absolute inset-[-14px] rounded-full border-[14px] border-primary border-t-transparent border-l-transparent rotate-45" /> </div> </div> <div className="space-y-3"> <div className="h-2 w-full bg-zinc-800 rounded-full" /> <div className="h-2 w-[70%] bg-zinc-800 rounded-full" /> </div> </div> </div> </div> </div> </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-40 border-y border-white/5 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-32">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-[0.2em] text-sm mb-6 block uppercase"
              >
                Infinite Power
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white"
              >
                Built for the next <br />
                <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-400">
                  generation of finance.
                </span>
              </motion.h2>

              <motion.div
                animate={{
                  opacity: [0.3, 1.0, 0.3],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] h-[120%] pointer-events-none z-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124, 58, 237, 0.7) 0%, rgba(76, 29, 149, 0.3) 30%, transparent 60%)",
                  filter: "blur(120px)"
                }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto"
              >
                A suite of tools designed to give you absolute control over your
                financial narrative. Fast, secure, and incredibly smart.
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
            >
              <FeatureCard
                icon={PieChart}
                title="Smart Categorization"
                description="Our proprietary AI analyzes transaction metadata to categorize spending with 99.9% accuracy instantly."
                bg="bg-violet-500/10"
                iconColor="text-violet-500"
              />
              <FeatureCard
                icon={Bot}
                title="AI Financial Insights"
                description="Get hyper-personalized recommendations to optimize your spending and hit your savings goals faster."
                bg="bg-pink-500/10"
                iconColor="text-pink-500"
              />
              <FeatureCard
                icon={LineChart}
                title="Spending Analytics"
                description="Breathtaking visualizations that uncover patterns in your behavior you never knew existed."
                bg="bg-indigo-500/10"
                iconColor="text-indigo-500"
              />
              <FeatureCard
                icon={Wallet}
                title="Budget Planning"
                description="Dynamic budgets that adjust to your lifestyle. Set goals and let our AI handle the math."
                bg="bg-sky-500/10"
                iconColor="text-sky-500"
              />
              <FeatureCard
                icon={MessageSquare}
                title="AI Chat Assistant"
                description="Converse with your finances. Ask anything and get instant data-driven answers and projections."
                bg="bg-emerald-500/10"
                iconColor="text-emerald-500"
              />
              <FeatureCard
                icon={Zap}
                title="Expense Flow Builder"
                description="Visually map out your expenses with an node based interface and let AI analyze the entire path journey."
                bg="bg-amber-500/10"
                iconColor="text-amber-500"
              />

            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-40 relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-8">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white"
                >
                  Redefining how <br />
                  you <span className="text-primary italic">interact</span> <br />
                  with money.
                </motion.h2>
                <p className="text-xl text-zinc-400 font-medium max-w-md italic">
                  Three steps to financial nirvana. No manual entry, no stress,
                  just growth.
                </p>
              </div>

              <div className="flex-1 space-y-12">
                <StepItem
                  number="01"
                  title="Secure Data Sync"
                  description="Connect your bank accounts securely via Plaid or import your history. We handle the heavy lifting of importing and cleaning your data."
                />
                <StepItem
                  number="02"
                  title="AI Analysis"
                  description="Our neural engine goes to work, identifying spending leaks, predicting bills, and building your unique financial fingerprint."
                />
                <StepItem
                  number="03"
                  title="Take Control"
                  description="Access real-time dashboards and chat with your AI assistant to make informed decisions that compound over time."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-40 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[4rem] bg-[#0c0a09] overflow-hidden relative shadow-[0_0_100px_rgba(124,58,237,0.1)] border border-white/5"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute top-[-50%] right-[-10%] w-[70%] h-[150%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-50%] left-[-10%] w-[70%] h-[150%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
            </div>

            <div className="relative z-10 px-8 py-32 md:py-48 text-center flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-xl flex items-center justify-center mb-12 border border-white/10 shadow-2xl rotate-12"
              >
                <Zap className="w-10 h-10 text-primary fill-primary" />
              </motion.div>

              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] max-w-5xl">
                Ready to build <br /> your{" "}
                <span className="text-white italic underline decoration-primary underline-offset-[12px]">
                  legacy?
                </span>
              </h2>

              <p className="text-zinc-400 text-xl md:text-2xl font-medium mb-16 max-w-2xl px-4">
                Join and become the next smart individual who are taking their finances to the next
                level.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center px-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-16 px-12 text-xl bg-white/10 hover:bg-white/15 border-white/10 rounded-full font-black w-full sm:w-auto transition-all text-white btn-3d"
                  >
                    Let&apos;s begin
                  </Button>
                </Link>

              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="w-full py-24 border-t border-white/5 bg-[#050505]">
        <div className="container px-6 lg:px-14 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="space-y-6">
              <Link className="flex items-center" href="/">
                <div className="w-10 h-10 mr-4 flex items-center justify-center bg-white text-black rounded-xl font-black italic shadow-lg">
                  e
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Expense<span className="text-primary italic">AI</span>
                </span>
              </Link>
              <p className="text-zinc-400 max-w-sm font-medium text-lg italic pr-8">
                Building the financial operating system for the next generation.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-primary transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-32">
              <FooterColumn
                title="Product"
                links={["Features", "Pricing", "AI Engine", "Security", "Roadmap"]}
              />
              <FooterColumn
                title="Resources"
                links={["Documentation", "Help Center", "Community", "Blog"]}
              />
              <FooterColumn
                title="Company"
                links={["About Us", "Contact", "Careers", "Legal"]}
              />
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                System Status: All systems operational
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-500">
              © {new Date().getFullYear()} ExpenseAI Inc. Powered by Intelligence.
            </p>
          </div>
        </div>
      </footer> */}
    </div >
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  bg,
  iconColor
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  iconColor: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -10, scale: 1.02 }}
      className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] shadow-2xl transition-all group overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Icon className={`w-32 h-32 ${iconColor}`} />
      </div>
      <div
        className={`p-5 rounded-2xl w-fit mb-8 ${bg} group-hover:rotate-12 transition-all duration-500`}
      >
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed font-semibold text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function StepItem({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute -left-12 top-0 text-6xl font-black text-white/5 opacity-0 group-hover:opacity-100 group-hover:-left-16 transition-all duration-500 select-none">
        {number}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
            {number}
          </div>
          <h3 className="text-3xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-xl text-zinc-400 leading-relaxed font-semibold pl-16">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

