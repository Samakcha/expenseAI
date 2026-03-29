import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export function TableSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-12 w-full max-w-sm rounded-2xl" />
            </div>

            <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-0 border-b border-white/[0.05] bg-white/[0.02]">
                    <div className="grid grid-cols-5 gap-4 p-6">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-20" />
                        ))}
                    </div>
                </CardHeader>
                <div className="p-0">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 p-6 border-b border-white/[0.02]">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-6 w-24 rounded-lg" />
                            <Skeleton className="h-6 w-20" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-8 w-16 ml-auto" />
                        </div>
                    ))}
                </div>
            </Card>

            <div className="flex items-center justify-between px-2">
                <Skeleton className="h-4 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <Skeleton className="h-9 w-9 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
