// import { Wrench, Sparkles } from "lucide-react";

// export default function Loading() {
//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
//             {/* Ambient background */}
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#22c55e18,transparent_35%),radial-gradient(circle_at_80%_80%,#3b82f612,transparent_35%)]" />

//             {/* Subtle grid */}
//             <div
//                 className="absolute inset-0 opacity-[0.035]"
//                 style={{
//                     backgroundImage:
//                         "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
//                     backgroundSize: "40px 40px",
//                 }}
//             />

//             {/* Large ambient glow */}
//             <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] animate-pulse" />

//             {/* Main card */}
//             <div className="relative w-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-background/60 px-8 py-9 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl">

//                 {/* Top shine */}
//                 <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

//                 {/* Logo / Icon */}
//                 <div className="relative mx-auto flex h-28 w-28 items-center justify-center">

//                     {/* Outer orbit */}
//                     <div className="absolute inset-0 rounded-full border border-primary/10" />

//                     {/* Rotating orbit */}
//                     <div className="absolute inset-2 animate-[spin_6s_linear_infinite] rounded-full border border-dashed border-primary/30" />

//                     {/* Orbit dot */}
//                     <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
//                         <span className="absolute left-1/2 -top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
//                     </div>

//                     {/* Inner glow */}
//                     <div className="absolute h-20 w-20 rounded-full bg-primary/10 blur-xl" />

//                     {/* Icon container */}
//                     <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(34,197,94,0.12)]">
//                         <Wrench className="h-7 w-7 animate-[float_2s_ease-in-out_infinite] text-primary" />

//                         <Sparkles className="absolute -right-1 -top-1 h-4 w-4 animate-pulse text-primary" />
//                     </div>
//                 </div>

//                 {/* Text */}
//                 <div className="mt-6 text-center">
//                     <h2 className="text-xl font-semibold tracking-tight">
//                         Loading Fixora
//                     </h2>

//                     <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
//                         <span>Preparing your experience</span>

//                         <span className="flex gap-0.5">
//                             <span className="animate-[dot_1.4s_infinite]">.</span>
//                             <span className="animate-[dot_1.4s_0.2s_infinite]">.</span>
//                             <span className="animate-[dot_1.4s_0.4s_infinite]">.</span>
//                         </span>
//                     </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="mt-7">
//                     <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
//                         <span>Initializing</span>
//                         <span className="text-primary">Please wait</span>
//                     </div>

//                     <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/70">
//                         <div className="absolute inset-y-0 left-0 w-1/3 animate-[loading_1.7s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
//                     </div>
//                 </div>

//                 {/* Bottom status */}
//                 <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/70">
//                     <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
//                     Secure connection
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes loading {
//                     0% {
//                         transform: translateX(-140%);
//                     }
//                     100% {
//                         transform: translateX(430%);
//                     }
//                 }

//                 @keyframes float {
//                     0%, 100% {
//                         transform: translateY(0) rotate(0deg);
//                     }
//                     50% {
//                         transform: translateY(-4px) rotate(-4deg);
//                     }
//                 }

//                 @keyframes dot {
//                     0%, 20% {
//                         opacity: 0;
//                     }
//                     50% {
//                         opacity: 1;
//                     }
//                     100% {
//                         opacity: 0;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }




import { Wrench, Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#22c55e18,transparent_35%),radial-gradient(circle_at_80%_80%,#3b82f612,transparent_45%)]" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Huge ambient glow */}
            <div className="absolute left-1/2 top-1/2 h-[clamp(350px,55vw,750px)] w-[clamp(350px,55vw,750px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] animate-pulse" />

            {/* Main content */}
            <div className="relative flex w-[min(92vw,420px)] flex-col items-center">

                {/* ================= SOLAR SYSTEM ================= */}
                <div className="relative flex h-[clamp(250px,65vw,390px)] w-[clamp(250px,65vw,390px)] items-center justify-center">

                    {/* Very large outer orbit */}
                    <div className="absolute inset-0 rounded-full border border-primary/[0.08]" />

                    {/* Orbit 2 */}
                    <div className="absolute inset-[8%] animate-[spin_18s_linear_infinite] rounded-full border border-primary/[0.12]" />

                    {/* Orbit 3 */}
                    <div className="absolute inset-[18%] animate-[spin_12s_linear_infinite_reverse] rounded-full border border-dashed border-primary/[0.16]" />

                    {/* Orbit 4 */}
                    <div className="absolute inset-[29%] animate-[spin_8s_linear_infinite] rounded-full border border-primary/[0.13]" />

                    {/* Orbit 5 */}
                    <div className="absolute inset-[40%] animate-[spin_6s_linear_infinite_reverse] rounded-full border border-dashed border-primary/[0.18]" />

                    {/* ================= PLANETS ================= */}

                    {/* Outer planet */}
                    <div className="absolute inset-0 animate-[spin_18s_linear_infinite]">
                        <span className="absolute left-1/2 top-[-3px] h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_rgba(34,197,94,0.8)]" />
                    </div>

                    {/* Second planet */}
                    <div className="absolute inset-[8%] animate-[spin_12s_linear_infinite_reverse]">
                        <span className="absolute right-[3%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
                    </div>

                    {/* Third planet */}
                    <div className="absolute inset-[18%] animate-[spin_8s_linear_infinite]">
                        <span className="absolute bottom-[4%] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(34,197,94,0.9)]" />
                    </div>

                    {/* Tiny planet */}
                    <div className="absolute inset-[29%] animate-[spin_5s_linear_infinite_reverse]">
                        <span className="absolute left-[2%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-green-300 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                    </div>

                    {/* Another tiny planet */}
                    <div className="absolute inset-[40%] animate-[spin_4s_linear_infinite]">
                        <span className="absolute right-[-2px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/80 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                    </div>

                    {/* ================= CENTRAL CORE ================= */}

                    {/* Central glow */}
                    <div className="absolute h-28 w-28 rounded-full bg-primary/15 blur-3xl" />

                    {/* Core pulse */}
                    <div className="absolute h-20 w-20 animate-pulse rounded-full bg-primary/[0.06] blur-xl" />

                    {/* Wrench */}
                    <Wrench className="relative h-12 w-12 animate-[float_2s_ease-in-out_infinite] text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.55)]" />

                    {/* Spark */}
                    <Sparkles className="absolute right-[35%] top-[31%] h-4 w-4 animate-pulse text-primary" />

                    {/* Small central particle */}
                    <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
                </div>

                {/* ================= TEXT ================= */}

                <div className="mt-2 text-center">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Loading Fixora
                    </h2>

                    <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <span>Preparing your experience</span>

                        <span className="flex gap-0.5">
                            <span className="animate-[dot_1.4s_infinite]">.</span>
                            <span className="animate-[dot_1.4s_0.2s_infinite]">.</span>
                            <span className="animate-[dot_1.4s_0.4s_infinite]">.</span>
                        </span>
                    </div>
                </div>

                {/* ================= PROGRESS ================= */}

                <div className="mt-7 w-full px-8">
                    <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                        <span>Initializing</span>
                        <span className="text-primary">Please wait</span>
                    </div>

                    <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/70">
                        <div className="absolute inset-y-0 left-0 w-1/3 animate-[loading_1.7s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 shadow-[0_0_14px_rgba(34,197,94,0.65)]" />
                    </div>
                </div>

                {/* Status */}
                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/70">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Secure connection
                </div>
            </div>

            <style>{`
                @keyframes loading {
                    0% {
                        transform: translateX(-140%);
                    }

                    100% {
                        transform: translateX(430%);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }

                    50% {
                        transform: translateY(-5px) rotate(-5deg);
                    }
                }

                @keyframes dot {
                    0%, 20% {
                        opacity: 0;
                    }

                    50% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
