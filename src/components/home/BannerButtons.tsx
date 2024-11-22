"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BannerButtons = () => {
    const router = useRouter();

    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white px-8 py-6 rounded-lg font-medium sm:text-base text-sm"
            >
                Get Started
            </Button>
            <Button
                onClick={() => router.push("/about")}
                variant="outline"
                className="text-black border-white hover:text-color-1 px-8 py-6 rounded-lg font-medium sm:text-base"
            >
                Learn More
            </Button>
        </div>
    );
};

export default BannerButtons;
