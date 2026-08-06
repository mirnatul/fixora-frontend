import { RegisterForm } from "../_components/RegisterForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {

    return (
        <div className="relative min-h-svh bg-muted/30">
            <Link
                href="/"
                className="absolute left-4 top-4 z-20 flex items-center gap-2 text-sm font-medium md:left-8 md:top-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            {/* <div className="flex h-svh items-center justify-center overflow-hidden">
                <div className="scale-[0.85] 3xl:scale-100">
                    <div className="grid w-[90vw] grid-cols-2 overflow-hidden rounded-3xl border bg-card shadow-2xl">
                        <div className="relative">
                            <img
                                src="/auth-image.png"
                                alt="Fixora"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        <div className="flex items-center justify-center p-6 xl:p-8">
                            <div className="w-full max-w-2xl">
                                <RegisterForm />
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}


            <div className="flex min-h-svh items-center justify-center overflow-hidden p-4 md:p-12">
                <div className="hidden max-w-7xl overflow-hidden rounded-3xl border bg-card shadow-2xl lg:grid lg:grid-cols-2">

                    <div className="relative">
                        <img
                            src="/auth-image.png"
                            alt="Fixora"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="flex items-center justify-center p-6 xl:p-8">
                        <div className="w-full max-w-xl">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-xl lg:hidden md:p-8 mt-8">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}