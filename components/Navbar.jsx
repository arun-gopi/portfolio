"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
    { label: "Overview", href: "#top" },
    { label: "Profile", href: "#about" },
    { label: "Expertise", href: "#services" },
    { label: "Experience", href: "#work" },
    { label: "Contact", href: "#contact" },
];

const Navbar = ({ basics, isDarkMode, setIsDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-50 section-shell transition-all duration-300 ${
                    isScrolled ? "pt-3" : "pt-5"
                }`}
            >
                <div
                    className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-6 ${
                        isScrolled ? "section-card shadow-[0_20px_60px_rgba(15,23,42,0.12)]" : "bg-transparent"
                    }`}
                >
                    <a href="#top" className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-teal-500/20 dark:bg-teal-500 dark:text-slate-950">
                            AG
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {basics.name}
                            </p>
                            <p className="text-xs muted-copy">Healthcare RCM & Analytics</p>
                        </div>
                    </a>

                    <ul className="hidden items-center gap-6 lg:flex">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="text-sm font-medium text-slate-700 transition hover:text-teal-700 dark:text-slate-200 dark:hover:text-teal-300"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => setIsDarkMode((prev) => !prev)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/70 text-slate-900 transition hover:scale-[1.02] dark:bg-slate-900/60 dark:text-white"
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <a
                            href={basics.profiles.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300 sm:inline-flex"
                        >
                            LinkedIn
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/70 text-slate-900 lg:hidden dark:bg-slate-900/60 dark:text-white"
                            aria-label="Open navigation menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-[60] bg-slate-950/55 backdrop-blur-sm transition ${
                    isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={() => setIsMenuOpen(false)}
            />

            <aside
                className={`fixed right-0 top-0 z-[70] flex h-full w-[84%] max-w-sm flex-col section-card p-6 transition-transform duration-300 lg:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold">{basics.name}</p>
                        <p className="text-sm muted-copy">{basics.headline}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                        aria-label="Close navigation menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-2xl border border-white/10 px-4 py-3 text-base font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                    <a href={`mailto:${basics.email}`} className="block text-sm muted-copy">
                        {basics.email}
                    </a>
                    <a
                        href={basics.profiles.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                    >
                        Visit LinkedIn
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
