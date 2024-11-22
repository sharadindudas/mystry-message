import {
    Lock,
    UserPlus,
    Send,
    Shield,
    Eye,
    FileText,
    Scale,
    AlertTriangle,
    UserCheck,
    Mail
} from "lucide-react";

// Backend data
export const DB_NAME = `mystry-message`,
    EXPIRY_TIME = 600;

// Frontend data
export const navLinks = [
        {
            id: 1,
            name: "Home",
            link: "/"
        },
        {
            id: 2,
            name: "About us",
            link: "/about"
        },
        {
            id: 3,
            name: "Contact us",
            link: "/contact"
        }
    ],
    whyChoose = [
        {
            id: 1,
            title: "Completely Anonymous",
            description:
                "Your identity remains a secret. Express yourself freely without fear of judgment.",
            icon: Lock
        },
        {
            id: 2,
            title: "Easy to Use",
            description:
                "Simple sign-up process and intuitive interface. Start sending messages in minutes.",
            icon: UserPlus
        },
        {
            id: 3,
            title: "Instant Delivery",
            description:
                "Messages are sent and received instantly. No delays in your mysterious conversations.",
            icon: Send
        }
    ],
    footerLinks = [
        {
            title: "Quick Links",
            links: [
                { id: 1, href: "/about", label: "About" },
                { id: 2, href: "/contact", label: "Contact" }
            ]
        },
        {
            title: "Support",
            links: [
                { id: 7, href: "/privacy-policy", label: "Privacy Policy" },
                { id: 8, href: "/terms", label: "Terms of Service" }
            ]
        }
    ],
    initialMessages = [
        "What's your favorite movie?",
        "Do you have any pets?",
        "What's your dream job?"
    ],
    privacyPolicies = [
        {
            id: 1,
            icon: Shield,
            title: "Data Protection",
            description:
                "We employ industry-standard security measures to protect your data from unauthorized access, alteration, or destruction."
        },
        {
            id: 2,
            icon: Lock,
            title: "Anonymity First",
            description:
                "Our core principle is preserving your anonymity. We design our systems to minimize the collection of identifiable information."
        },
        {
            id: 3,
            icon: Eye,
            title: "Transparency",
            description:
                "We believe in being clear about our data practices. If you have questions about our policy, we're here to answer them."
        },
        {
            id: 4,
            icon: FileText,
            title: "User Control",
            description:
                "You have the right to access, correct, or delete your information. We provide tools to help you manage your data."
        }
    ],
    termsOfServices = [
        {
            id: 1,
            icon: Scale,
            title: "Liability",
            description:
                "Mystry Message is not responsible for any content posted by users. Use the service at your own risk."
        },
        {
            id: 2,
            icon: AlertTriangle,
            title: "Termination",
            description:
                "We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms."
        },
        {
            id: 3,
            icon: UserCheck,
            title: "Privacy",
            description:
                "Your use of the service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices."
        },
        {
            id: 4,
            icon: FileText,
            title: "Changes to Terms",
            description:
                "We may revise these Terms at any time without notice. By using this service, you agree to be bound by the current version of these Terms."
        }
    ],
    aboutUs = [
        {
            id: 1,
            icon: Lock,
            title: "Uncompromising Privacy",
            description:
                "Your identity is sacred. Our advanced encryption ensures your anonymity is never compromised."
        },
        {
            id: 2,
            icon: UserPlus,
            title: "Community-Driven",
            description:
                "Our users shape the Mystry Message experience. We&apos;re constantly evolving based on community feedback."
        },
        {
            id: 3,
            icon: Send,
            title: "Instant Connections",
            description:
                "From thought to post in seconds. Our platform is designed for spontaneous, real-time interactions."
        },
        {
            id: 4,
            icon: Mail,
            title: "Diverse Conversations",
            description:
                "Engage in discussions on any topic. Our community spans interests, cultures, and perspectives."
        }
    ];
