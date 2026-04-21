"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";

const extractMetric = (items, pattern, fallback) => {
  for (const item of items) {
    const match = item.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return fallback;
};

const Header = ({ basics, summary, experience, achievements }) => {
  const years = extractMetric(summary, /(\d+\+?)\s*years/, "18+");
  const healthcareYears = extractMetric(summary, /(\d+\+?)\s*years supporting US healthcare/, "7+");
  const dashboards = extractMetric(
    experience.flatMap((item) => item.highlights),
    /(\d+\+?)\s*Power BI dashboards/,
    "15+"
  );
  const revenueImpact = achievements
    .flatMap((item) => [...item.matchAll(/\$(\d+)K/g)])
    .reduce((sum, match) => sum + Number(match[1]), 0);

  const heroStats = [
    { label: "Career Experience", value: `${years} years` },
    { label: "US Healthcare Focus", value: `${healthcareYears} years` },
    { label: "Dashboards Delivered", value: dashboards },
    { label: "Documented Revenue Impact", value: `$${revenueImpact || 194}K+` },
  ];

  return (
    <section id="top" className="section-shell relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-200">
            Revenue cycle leadership, compliance, and healthcare analytics
          </div>

          <div className="space-y-5">
            <p className="section-eyebrow">Professional Portfolio</p>
            <h1 className="balanced-text text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {basics.name}
              <span className="mt-2 block font-Ovo text-2xl text-slate-600 dark:text-slate-300 sm:text-3xl">
                {basics.headline}
              </span>
            </h1>
            <p className="max-w-2xl text-base muted-copy sm:text-lg">
              {summary[0]} {summary[3]} {summary[4]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 section-card">
              <MapPin size={16} className="text-teal-600 dark:text-teal-300" />
              {basics.location.city}, {basics.location.state}, {basics.location.country}
            </span>
            <a
              href={`mailto:${basics.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 section-card transition hover:border-teal-400/40"
            >
              <Mail size={16} className="text-teal-600 dark:text-teal-300" />
              {basics.email}
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
            >
              Start a conversation
              <ArrowRight size={16} />
            </a>
            <a
              href="/Resume_Arun_Gopi.pdf"
              download="Arun_Gopi_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:hover:border-teal-400 dark:hover:text-teal-300"
            >
              Download resume
              <Download size={16} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                className="section-card rounded-3xl p-5"
              >
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm muted-copy">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-x-8 top-4 -z-10 h-56 rounded-full bg-cyan-400/15 blur-3xl dark:bg-teal-400/10" />
          <div className="section-card rounded-[2rem] p-5 sm:p-7">
            <div className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
              <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-slate-900/70">
                <Image
                  src={assets.profile_img}
                  alt={basics.name}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-700 dark:text-teal-200">
                    Focus Areas
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                    Operational rigor backed by analytics execution
                  </h2>
                </div>
                <ul className="space-y-3 text-sm muted-copy sm:text-base">
                  <li>Full-cycle RCM operations across professional, home health, hospice, and ABA billing.</li>
                  <li>Data products built with Power BI, Microsoft Fabric, SQL, and Python.</li>
                  <li>Compliance-led workflow improvement with emphasis on AR reduction and claim quality.</li>
                </ul>
                <div className="rounded-3xl border border-teal-500/20 bg-teal-500/10 p-4 text-sm text-teal-900 dark:text-teal-100">
                  Open to leadership, analytics, and transformation roles across healthcare operations.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
