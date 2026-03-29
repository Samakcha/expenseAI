"use client";

import * as React from "react";
import { Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiService } from "@/services/aiService";
import { useAuth } from "@/context/AuthContext";
import ReactMarkdown from "react-markdown";

const suggestedPrompts = [

    "Where am I overspending this month?",
    "How can I reduce my expenses?",
    "Show my spending trends over the last quarter",
    "How much do I have left in my food budget?",
];

type Message = {
    id: string;
    role: "assistant" | "user";
    content: string;
};

export default function ChatPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I am your AI financial assistant. I've analyzed your recent transactions. How can I help you manage your money today?",
        },
    ]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async (text: string = input) => {
        if (!text.trim() || loading || !user) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await aiService.chat(user.id, text);
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.response || "I couldn't generate a response. Please try again.",
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I encountered an error connecting to the AI service.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white mb-2 text-zinc-100 text-3d italic">AI Assistant</h2>
                    <p className="text-zinc-500 font-medium">Hyper-intelligent financial guidance at your fingertips.</p>
                </div>
            </div>

            <Card className="flex-1 flex flex-col min-h-0 overflow-hidden border border-purple-500/20 ring-0 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative">
                <ScrollArea className="flex-1 min-h-0 p-8">
                    <div className="space-y-8 pb-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <Avatar className="w-10 h-10 shrink-0 border border-white/10">
                                    {message.role === "assistant" ? (
                                        <AvatarFallback className="bg-primary text-white font-black italic">
                                            X
                                        </AvatarFallback>
                                    ) : (
                                        <>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                                            <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                                <div
                                    className={`flex flex-col gap-2 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"
                                        }`}
                                >
                                    <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">
                                        {message.role === "assistant" ? "ExpenseAI Intelligence" : user?.name || "User"}
                                    </span>
                                    <div
                                        className={`px-6 py-4 rounded-[1.5rem] text-base font-medium leading-relaxed ${message.role === "user"
                                            ? "bg-primary text-white rounded-tr-sm shadow-[0_10px_30px_rgba(var(--primary),0.2)]"
                                            : "bg-white/5 text-zinc-200 rounded-tl-sm ring-0 border-none prose prose-invert max-w-none prose-p:leading-relaxed"
                                            }`}
                                    >
                                        {message.role === "assistant" ? (
                                            <ReactMarkdown>{message.content}</ReactMarkdown>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-4 flex-row">
                                <Avatar className="w-10 h-10 shrink-0 border border-white/10">
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                        <Bot className="w-6 h-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-white/5 px-6 py-4 rounded-[1.5rem] rounded-tl-sm flex items-center">
                                    <Loader2 className="h-4 w-4 animate-spin text-primary mr-3" />
                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Architecting response...</span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-6 pb-4 bg-transparent">
                    <div className="mb-4 overflow-x-auto flex gap-3 pb-2 scrollbar-none">
                        {suggestedPrompts.map((prompt, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="rounded-full shrink-0 text-xs font-bold text-zinc-400 border-none ring-0 bg-white/5 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                                onClick={() => handleSend(prompt)}
                                disabled={loading}
                            >
                                <Sparkles className="w-3 h-3 mr-2 text-primary" />
                                {prompt}
                            </Button>
                        ))}
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="relative flex items-center group"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Consult your financial intelligence..."
                            disabled={loading}
                            className="pr-20 h-10 rounded-xl bg-white/5 border-none ring-0 
  focus-visible:ring-0 focus-visible:outline-none 
  hover:bg-white/[0.08] transition-all text-xs font-medium"
                        />

                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || loading}
                            className="absolute right-1 h-10 w-12 rounded-xl bg-[#231C31] text-white 
  hover:bg-[#231C31]/90 shadow-xl disabled:opacity-20 
  transition-all active:scale-95 btn-3d"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
