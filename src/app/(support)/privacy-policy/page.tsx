import { privacyPolicies } from "@/utils/constants";
import Link from "next/link";

const PrivacyPolicyPage = () => {
    return (
        <div className="pt-8 pb-14 bg-color-1 text-color-4">
            <main className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-linear-to-r from-color-2 to-color-3 text-transparent bg-clip-text py-2">
                    Privacy Policy
                </h2>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Our Commitment to Your Privacy
                    </h2>
                    <p className="mb-4">
                        At Mystry Message, we take your privacy seriously. This
                        policy outlines how we collect, use, and protect your
                        personal information. By using our service, you agree to
                        the terms described in this policy.
                    </p>
                    <p>
                        We are committed to maintaining the trust and confidence
                        of our users. We want you to know that Mystry Message is
                        not in the business of selling, renting or trading email
                        lists with other companies and businesses for marketing
                        purposes.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Information We Collect
                    </h2>
                    <p className="mb-4">
                        To provide our anonymous messaging service, we collect
                        minimal information necessary for the operation of our
                        platform. This may include:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-2">
                        <li>Anonymous user identifiers</li>
                        <li>Message content</li>
                        <li>Usage data and analytics</li>
                        <li>Device information</li>
                    </ul>
                    <p>
                        We do not collect personally identifiable information
                        unless explicitly provided by you for account-related
                        purposes.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        How We Use Your Information
                    </h2>
                    <p className="mb-4">
                        The information we collect is used solely for the
                        purpose of providing and improving our services. This
                        includes:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-2">
                        <li>Facilitating anonymous communication</li>
                        <li>Improving user experience</li>
                        <li>Ensuring platform security</li>
                        <li>Analyzing usage patterns to enhance our service</li>
                    </ul>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Our Privacy Principles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {privacyPolicies.map((item) => (
                            <div
                                key={item.id}
                                className="bg-color-7 p-6 rounded-lg"
                            >
                                <item.icon className="h-12 w-12 text-color-2 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Changes to This Policy
                    </h2>
                    <p>
                        We may update this privacy policy from time to time. We
                        will notify you of any changes by posting the new policy
                        on this page. We encourage you to review this policy
                        periodically for any changes.
                    </p>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Questions or Concerns?
                    </h2>
                    <p className="mb-8">
                        If you have any questions about our Privacy Policy,
                        please don&apos;t hesitate to contact us.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-linear-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white px-7 py-3 rounded-full text-base h-11"
                    >
                        Contact us
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
