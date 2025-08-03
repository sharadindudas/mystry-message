import { termsOfServices } from "@/utils/constants";
import Link from "next/link";

const TermsOfServicePage = () => {
    return (
        <div className="pt-8 pb-14 bg-color-1 text-color-4">
            <main className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-linear-to-r from-color-2 to-color-3 text-transparent bg-clip-text py-2">
                    Terms of Service
                </h2>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Welcome to Mystry Message
                    </h2>
                    <p className="mb-4">
                        These Terms of Service (&ldquo;Terms&rdquo;) govern your
                        access to and use of Mystry Message&apos;s website and
                        services. By using our services, you agree to be bound
                        by these Terms. If you disagree with any part of the
                        terms, you may not use our services.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Use of Service
                    </h2>
                    <p className="mb-4">
                        Mystry Message provides a platform for anonymous
                        communication. By using our service, you agree to:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-2">
                        <li>
                            Use the service only for lawful purposes and in
                            accordance with these Terms.
                        </li>
                        <li>
                            Not use the service to send spam, advertise, or
                            engage in any commercial activities.
                        </li>
                        <li>Respect the privacy and rights of other users.</li>
                        <li>
                            Not attempt to circumvent any privacy or security
                            measures implemented by Mystry Message.
                        </li>
                    </ul>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        User Content
                    </h2>
                    <p className="mb-4">
                        You are solely responsible for the content you post on
                        Mystry Message. While we strive to maintain anonymity,
                        you agree not to post content that is illegal, abusive,
                        threatening, defamatory, or otherwise objectionable.
                    </p>
                    <p>
                        Mystry Message reserves the right to remove any content
                        that violates these Terms or is deemed inappropriate,
                        without prior notice.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Key Terms
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {termsOfServices.map((item) => (
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
                        Disclaimer of Warranties
                    </h2>
                    <p className="mb-4">
                        The service is provided &ldquo;as is&rdquo; and
                        &ldquo;as available&rdquo; without any warranties of any
                        kind, either express or implied, including but not
                        limited to the implied warranties of merchantability,
                        fitness for a particular purpose, or non-infringement.
                    </p>
                    <p>
                        Mystry Message does not warrant that the service will be
                        uninterrupted or error-free, that defects will be
                        corrected, or that the service or the server that makes
                        it available are free of viruses or other harmful
                        components.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Limitation of Liability
                    </h2>
                    <p>
                        To the fullest extent permitted by applicable law,
                        Mystry Message shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages,
                        or any loss of profits or revenues, whether incurred
                        directly or indirectly, or any loss of data, use,
                        goodwill, or other intangible losses resulting from your
                        access to or use of or inability to access or use the
                        service.
                    </p>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Contact Us
                    </h2>
                    <p className="mb-8">
                        If you have any questions about these Terms, please
                        contact us.
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

export default TermsOfServicePage;
