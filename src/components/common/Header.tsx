"use client";

import Link from "next/link";
import { Mail, AlignJustify, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { navLinks } from "@/utils/constants";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogOut = async () => {
        await signOut({
            redirect: false
        });
        toast.success("Logged out successfully");
        router.replace("/login");
    };

    return (
        <header className="sticky top-0 left-0 right-0 w-full py-1 z-50 text-white transition-all duration-300 bg-color-1/50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Mail className="sm:h-6 sm:w-6 text-color-2" />
                    <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                        Mystry Message
                    </span>
                </Link>

                {/* Desktop Responsive Nav */}
                <nav className="lg:block hidden">
                    <ul className="flex items-center space-x-6 text-base">
                        {navLinks.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.link}
                                    className="hover:text-color-2 transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {session?.user && (
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-color-2 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            {session?.user ? (
                                <Button
                                    onClick={handleLogOut}
                                    className="bg-transparent px-6 h-11 font-medium text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg text-base"
                                >
                                    Log out
                                </Button>
                            ) : (
                                <Link
                                    href="/signup"
                                    className="inline-flex items-center justify-center px-6 h-11 font-medium text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg text-base"
                                >
                                    Sign up
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>

                {/* Mobile Responsive Nav */}
                <div className="lg:hidden block">
                    <Sheet>
                        <SheetTrigger>
                            <AlignJustify
                                size={25}
                                className="text-color-4 lg:hidden relative top-1"
                            />
                        </SheetTrigger>
                        <SheetContent className="w-[340px] sm:w-[400px] bg-color-1 border-color-2">
                            <SheetHeader>
                                <SheetTitle className="sm:text-2xl font-bold text-color-4">
                                    Mystry Message
                                </SheetTitle>
                                <SheetClose asChild>
                                    <div className="absolute right-4 top-4 cursor-pointer">
                                        <X size={24} className="text-color-4" />
                                    </div>
                                </SheetClose>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <ul className="space-y-8 text-white mt-8">
                                {navLinks.map((item) => (
                                    <li key={item.id}>
                                        <SheetClose asChild>
                                            <Link
                                                href={item.link}
                                                className="hover:text-color-2 transition-all duration-300"
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    </li>
                                ))}
                                {session?.user && (
                                    <li>
                                        <SheetTrigger asChild>
                                            <Link
                                                href="/dashboard"
                                                className="hover:text-color-2 transition-all duration-300"
                                            >
                                                Dashboard
                                            </Link>
                                        </SheetTrigger>
                                    </li>
                                )}
                                <li>
                                    <SheetTrigger asChild>
                                        {session?.user ? (
                                            <Button
                                                onClick={handleLogOut}
                                                className="bg-transparent px-6 h-11 font-medium text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg text-base"
                                            >
                                                Log out
                                            </Button>
                                        ) : (
                                            <Link
                                                href="/signup"
                                                className="inline-flex items-center justify-center px-6 h-11 font-medium text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg text-base"
                                            >
                                                Sign up
                                            </Link>
                                        )}
                                    </SheetTrigger>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};
export default Header;
