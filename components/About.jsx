"use client";

import { motion } from "motion/react";
import { Award, GraduationCap, Languages, ShieldCheck } from "lucide-react";

const About = ({ basics, summary, education, certifications, languages, previousExperience }) => {
    const featureCards = [
        {
            icon: ShieldCheck,
            title: "Compliance and RCM depth",
            description:
                "Hands-on command of billing workflows, denial management, payer follow-up, and compliant healthcare operations.",
        },
        {
            icon: Award,
            title: "Recognized credentials",
            description:
                `${certifications[0].name} and Microsoft Fabric certification reinforce both domain and analytics expertise.`,
        },
        {
            icon: GraduationCap,
            title: "Technical foundation",
            description:
                `${education[0].degree} with practical delivery experience across SQL, Python, BI, and process improvement.`,
        },
    ];

    return (
        <section id="about" className="section-shell scroll-mt-24 py-16 sm:py-24">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr]"
            >
                <div className="section-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
                    <p className="section-eyebrow">Profile</p>
                    <h2 className="section-title mt-3">Built for operational accountability and measurable improvement</h2>
                    <div className="mt-6 space-y-4 text-base muted-copy">
                        {summary.map((item) => (
                            <p key={item}>{item}</p>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/50 p-5 dark:bg-slate-900/50">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-200">
                                Base Location
                            </p>
                            <p className="mt-2 text-lg font-semibold">
                                {basics.location.city}, {basics.location.country}
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/50 p-5 dark:bg-slate-900/50">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-200">
                                Languages
                            </p>
                            <p className="mt-2 text-lg font-semibold">{languages.join(" • ")}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {featureCards.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="section-card rounded-[1.75rem] p-6">
                                <Icon size={22} className="text-teal-700 dark:text-teal-300" />
                                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                                <p className="mt-2 text-sm muted-copy">{description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="section-card rounded-[1.75rem] p-6">
                            <div className="flex items-center gap-3">
                                <Languages size={20} className="text-teal-700 dark:text-teal-300" />
                                <h3 className="text-xl font-semibold">Earlier Experience</h3>
                            </div>
                            <div className="mt-5 space-y-4">
                                {previousExperience.map((item) => (
                                    <div key={`${item.company}-${item.role}`} className="rounded-2xl border border-white/10 bg-white/50 p-4 dark:bg-slate-900/50">
                                        <p className="font-semibold">{item.role}</p>
                                        <p className="text-sm muted-copy">{item.company}</p>
                                        <p className="mt-1 text-sm muted-copy">
                                            {item.location} • {item.duration}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="section-card rounded-[1.75rem] p-6">
                            <h3 className="text-xl font-semibold">Education</h3>
                            <div className="mt-5 space-y-5">
                                {education.map((item) => (
                                    <div key={`${item.institution}-${item.degree}`}>
                                        <p className="font-semibold">{item.degree}</p>
                                        <p className="text-sm muted-copy">{item.institution}</p>
                                        <p className="text-sm muted-copy">
                                            {item.location} • {item.startYear} - {item.endYear}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
