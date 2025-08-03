import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardLoader = () => {
    return (
        <div className="bg-color-1 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <Skeleton className="h-16 w-2/6 mb-12 bg-color-7" />

                <div className="grid gap-8 md:grid-cols-2 mb-12">
                    <Card className="bg-color-7 border-none shadow-lg">
                        <CardHeader>
                            <Skeleton className="h-7 w-1/2 bg-color-2" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-11 w-full bg-color-1" />
                            <div className="flex justify-end">
                                <Skeleton className="h-11 w-24 bg-color-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-color-7 border-none shadow-lg">
                        <CardHeader>
                            <Skeleton className="h-7 w-1/2 bg-color-2" />
                        </CardHeader>
                        <CardContent className="flex items-center space-x-4">
                            <Skeleton className="h-6 w-12 bg-color-2 rounded-full" />
                            <Skeleton className="h-6 grow bg-color-1" />
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <Skeleton className="h-10 w-1/3 bg-color-7" />
                        <Skeleton className="h-11 w-32 bg-color-7" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4].map((index) => (
                            <Card
                                key={index}
                                className="bg-color-7 border-none shadow-md"
                            >
                                <CardContent className="p-6 space-y-4">
                                    <Skeleton className="h-4 w-full bg-color-1" />
                                    <Skeleton className="h-4 w-5/6 bg-color-1" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-1/3 bg-color-6" />
                                        <Skeleton className="h-8 w-8 rounded-full bg-color-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLoader;
