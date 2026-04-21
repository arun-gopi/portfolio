"use client";

import { motion } from "motion/react";
import { BriefcaseBusiness, Sparkles, Trophy } from "lucide-react";

const formatPeriod = (startDate, endDate) => {
  const format = (value) => {
    const [year, month] = value.split("-").map(Number);
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return `${format(startDate)} - ${format(endDate)}`;
};

const Work = ({ experience, projects, achievements, certifications }) => {
  return (
    <section id="work" className="section-shell scroll-mt-24 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <div className="max-w-3xl">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title mt-3">Recent leadership work, selected delivery outcomes, and current credentials</h2>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {experience.map((role) => (
              <div key={`${role.company}-${role.title}`} className="section-card rounded-[1.75rem] p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-teal-800 dark:text-teal-100">
                      <BriefcaseBusiness size={14} />
                      {formatPeriod(role.startDate, role.endDate)}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">{role.title}</h3>
                    <p className="mt-1 text-sm muted-copy sm:text-base">
                      {role.company} • {role.location}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {role.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-white/10 bg-white/55 p-4 text-sm leading-6 muted-copy dark:bg-slate-900/50">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="section-card rounded-[1.75rem] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-teal-700 dark:text-teal-300" />
                <h3 className="text-xl font-semibold">Featured Projects</h3>
              </div>
              <div className="mt-5 space-y-4">
                {projects.map((project) => (
                  <div key={project.name} className="rounded-2xl border border-white/10 bg-white/55 p-4 dark:bg-slate-900/50">
                    <p className="font-semibold">{project.name}</p>
                    <p className="mt-2 text-sm leading-6 muted-copy">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card rounded-[1.75rem] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-teal-700 dark:text-teal-300" />
                <h3 className="text-xl font-semibold">Impact Highlights</h3>
              </div>
              <div className="mt-5 space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement} className="rounded-2xl border border-white/10 bg-white/55 p-4 text-sm leading-6 muted-copy dark:bg-slate-900/50">
                    {achievement}
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card rounded-[1.75rem] p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Recent Certifications</h3>
              <div className="mt-5 space-y-4">
                {certifications.slice(0, 4).map((certification) => (
                  <div key={`${certification.name}-${certification.issueDate}`} className="rounded-2xl border border-white/10 bg-white/55 p-4 dark:bg-slate-900/50">
                    <p className="font-semibold">{certification.name}</p>
                    <p className="text-sm muted-copy">{certification.issuer}</p>
                    <p className="mt-1 text-sm muted-copy">
                      Issued {certification.issueDate}
                      {certification.expiryDate ? ` • Expires ${certification.expiryDate}` : ""}
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

export default Work;
