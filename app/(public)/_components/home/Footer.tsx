import Link from "next/link";

export default function Footer() {
    return (
        <div className="mx-auto px-2">
            <footer className="border-t">
                <div className="container grid gap-10 py-12 md:grid-cols-4">
                    <div>
                        <h3 className="text-xl font-bold">
                            Fixora
                        </h3>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Connecting customers with trusted home service professionals.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Company
                        </h4>

                        <div className="space-y-2">
                            <Link href="/about">About</Link>
                            <br />
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Services
                        </h4>

                        <div className="space-y-2">
                            <Link href="/services">
                                Browse Services
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Support
                        </h4>

                        <div className="space-y-2">
                            <Link href="/faq">FAQ</Link>
                            <br />
                            <Link href="/privacy">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t py-6 text-center text-sm text-muted-foreground">
                    © 2026 Fixora. All rights reserved.
                </div>
            </footer>
        </div>
    );
}