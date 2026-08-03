import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="border-b bg-linear-to-br from-primary/10 via-background to-primary/5 md:px-6">
            <div className="container grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
                <div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Find Trusted Home Service Professionals
                    </h1>

                    <p className="mt-6 text-lg text-muted-foreground">
                        Book skilled technicians for plumbing, electrical,
                        painting, AC repair, cleaning and more—all from one
                        place.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Button asChild size="lg">
                            <Link href="/services">Browse Services</Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                        >
                            <Link href="/technicians">
                                Find Technician
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative h-[420px] overflow-hidden rounded-xl border">
                    <Image
                        src="https://img.magnific.com/free-photo/part-male-construction-worker_329181-3734.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Home service professionals"
                        fill
                        className="object-cover"
                        unoptimized
                        priority
                    />
                </div>
            </div>
        </section>
    );
}