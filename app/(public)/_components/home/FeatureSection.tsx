import {
    ShieldCheck,
    Clock3,
    Star,
} from "lucide-react";

const features = [
    {
        title: "Verified Professionals",
        icon: ShieldCheck,
        description:
            "Every technician is verified before joining.",
    },
    {
        title: "Quick Booking",
        icon: Clock3,
        description:
            "Book appointments within minutes.",
    },
    {
        title: "Top Rated",
        icon: Star,
        description:
            "Thousands of satisfied customers.",
    },
];

export default function FeatureSection() {
    return (
        <section className="container py-16">
            <div className="grid gap-6 md:grid-cols-3">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.title}
                            className="rounded-xl border p-6"
                        >
                            <Icon className="mb-4 h-10 w-10 text-primary" />

                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}