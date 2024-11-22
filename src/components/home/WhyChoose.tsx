import { whyChoose } from "@/utils/constants";

const WhyChooseSection = () => {
    return (
        <section className="py-8 md:py-16 lg:py-24 relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-color-1 to-color-7"></div>
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">
                    Why Choose{" "}
                    <span className="text-color-3">Mystery Message?</span>
                </h2>
                <div className="grid lg:grid-cols-3 gap-8">
                    {whyChoose.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sm:p-8 cursor-pointer transform transition-all duration-300 hover:scale-95 border border-color-2/20"
                        >
                            <item.icon className="h-12 w-12 text-color-2 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-color-4">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
