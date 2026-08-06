import { LoginForm } from "../_components/LoginForm"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {

    return (
        <div className="relative min-h-svh bg-muted/30">
            <Link
                href="/"
                className="absolute left-4 top-4 z-20 flex items-center gap-2 text-sm font-medium md:left-8 md:top-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            <div className="flex min-h-svh items-center justify-center p-4 md:p-8">
                <div className="hidden aspect-video w-full max-w-7xl overflow-hidden rounded-3xl border bg-card shadow-2xl lg:grid lg:grid-cols-2">
                    <div className="relative">
                        <img
                            src="/auth-image.png"
                            alt="Fixora"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Laptop and Tablet */}
                    <div className="flex items-center justify-center p-10 xl:p-16">
                        <div className="w-full max-w-md">
                            <LoginForm />
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl lg:hidden">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}