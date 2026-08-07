import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaFacebook,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Services",
        href: "/services",
    },
    {
        title: "Technicians",
        href: "/technicians",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    }
];

const Footer = () => {
    return (
        <footer className="w-full bg-[#F7F7F7]">
            <div className="text-center sm:text-left mx-auto max-w-7xl px-6 pt-12 xl:px-0">
                <Link href="/" className="flex items-center justify-center sm:justify-start">
                    <span className="text-2xl font-bold text-[#007A55] flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Fixora"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                        />
                        <p className="text-3xl">Fixora</p>
                    </span>
                </Link>

                <p className="mt-4 max-w-md mx-auto text-sm leading-6 text-muted-foreground sm:mx-0">
                    Find trusted professionals for your home services. Book reliable
                    technicians and get your work done with ease.
                </p>

                {/* Navigation */}
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
                    {footerLinks.map(({ title, href }) => (
                        <li key={title}>
                            <Link
                                className="text-sm text-muted-foreground transition-colors hover:text-[#007A55]"
                                href={href}
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <Separator className="mt-10" />

            {/* Bottom */}
            <div className="flex flex-col-reverse items-center justify-center gap-5 py-8 sm:flex-row sm:justify-between mx-auto max-w-7xl px-6 pt-12 xl:px-0">
                {/* Copyright */}
                <span className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link
                        href="/"
                        className="font-medium text-[#007A55] hover:underline"
                    >
                        Fixora
                    </Link>
                    . All rights reserved.
                </span>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-5 text-muted-foreground">
                    <Link
                        href="#"
                        aria-label="Facebook"
                        className="transition-colors hover:text-[#007A55]"
                    >
                        <FaFacebook className="h-5 w-5" />
                    </Link>

                    <Link
                        href="#"
                        aria-label="Instagram"
                        className="transition-colors hover:text-[#007A55]"
                    >
                        <FaInstagram className="h-5 w-5" />
                    </Link>

                    <Link
                        href="#"
                        aria-label="LinkedIn"
                        className="transition-colors hover:text-[#007A55]"
                    >
                        <FaLinkedin className="h-5 w-5" />
                    </Link>

                    <Link
                        href="#"
                        aria-label="GitHub"
                        className="transition-colors hover:text-[#007A55]"
                    >
                        <FaGithub className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;