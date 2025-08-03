import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthProvider";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/index.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap"
});

export const metadata: Metadata = {
    title: {
        default: "Mystry Message - Anonymous Feedback Platform",
        template: "%s | Mystry Message"
    },
    description:
        "Mystry Message is a unique web application that allows users to send and receive anonymous messages. By logging in, users can share their personalized links to gather anonymous feedback or send private messages to others using their links. With an emphasis on privacy and security, the platform ensures complete anonymity, fostering open and honest communication.",
    keywords: [
        "anonymous messaging",
        "feedback platform",
        "private communication",
        "anonymous feedback",
        "secure messaging"
    ],
    authors: [
        {
            name: "Sharadindu Das",
            url: "https://github.com/R3MODAS"
        }
    ],
    creator: "Sharadindu Das",
    publisher: "Mystry Message",
    applicationName: "Mystry Message",
    generator: "Next.js",
    metadataBase: new URL("https://mystry-message.sharadindudas.com") // Replace with your actual domain
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <AuthProvider>
                <body
                    className={`${inter.className} antialiased flex flex-col min-h-screen bg-color-1`}
                >
                    <Header />
                    {children}
                    <Footer />
                    <Toaster
                        toastOptions={{
                            position: "top-center",
                            className: "text-center"
                        }}
                    />
                </body>
            </AuthProvider>
            <SpeedInsights />
        </html>
    );
}
