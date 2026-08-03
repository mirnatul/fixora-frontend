import { Loader2, Wrench } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e20,transparent_45%),radial-gradient(circle_at_bottom_right,#3b82f620,transparent_45%)]" />

            {/* Blurred glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

            {/* Glass card */}
            <div className="relative flex w-[320px] flex-col items-center gap-5 rounded-3xl border border-white/10 bg-background/60 px-10 py-10 shadow-2xl backdrop-blur-xl">
                {/* Animated icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                    <Wrench className="h-9 w-9 animate-pulse text-primary" />
                </div>

                {/* Text */}
                <div className="space-y-1 text-center">
                    <h2 className="text-lg font-semibold">
                        Loading Fixora
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Preparing your experience...
                    </p>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
                </div>
            </div>

            <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
          }
        }
      `}</style>
        </div>
    );
}