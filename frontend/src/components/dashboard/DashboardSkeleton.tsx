import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="glass-card border-none p-6">
                        <CardHeader className="p-0 space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32" />
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                            <Skeleton className="h-2 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-card border-none p-6 h-[400px]">
                    <CardHeader className="p-0 mb-6">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-60 mt-2" />
                    </CardHeader>
                    <div className="h-[280px] w-full mt-4">
                        <Skeleton className="h-full w-full rounded-2xl" />
                    </div>
                </Card>
                <Card className="glass-card border-none p-6 h-[400px]">
                    <CardHeader className="p-0 mb-6">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-60 mt-2" />
                    </CardHeader>
                    <div className="h-[280px] w-full mt-4 flex items-center justify-center">
                        <Skeleton className="h-48 w-48 rounded-full" />
                    </div>
                </Card>
            </div>

            <Card className="glass-card border-none p-6">
                <CardHeader className="p-0 mb-6">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-60 mt-2" />
                </CardHeader>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-20" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
