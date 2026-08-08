import { ReactNode } from "react";

interface FeatureProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function Feature({
    icon,
    title,
    description,
}: FeatureProps) {
    return (
        <div className="flex items-start gap-2">

            <div
                className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-[#E8FFF7]
                    text-[#007A55]
                    text-2xl
                "
            >
                {icon}
            </div>

            <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {title}
                </h3>

                <p className="text-muted-foreground text-xs">
                    {description}
                </p>
            </div>

        </div>
    );
}