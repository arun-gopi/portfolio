"use client";

import { motion } from "motion/react";
import { BarChart3, DatabaseZap, Shield, Workflow } from "lucide-react";

const serviceGroups = [
    {
        title: "Revenue Cycle Operations",
        description:
            "Full-cycle billing execution, charge capture, claim submission, AR follow-up, and payer coordination.",
        icon: Workflow,
        match: ["Revenue Cycle Management (RCM)", "Professional Billing", "Home Health Billing", "Hospice Billing", "ABA Billing", "AR Follow-up"],
    },
    {
        title: "Coding and Denial Resolution",
        description:
            "Coding, denial analysis, underpayment identification, and first-pass claim improvement built on reimbursement logic.",
        icon: Shield,
        match: ["CPT Coding", "ICD-10", "HCPCS", "Denial Management (CARC/RARC)", "Revenue Integrity", "CMS Compliance", "HIPAA Compliance"],
    },
    {
        title: "Healthcare Analytics",
        description:
            "Leadership dashboards and KPI reporting for aging AR, collections, payer trends, denials, and operational performance.",
        icon: BarChart3,
        match: ["Healthcare Analytics", "Power BI", "DAX", "Microsoft Fabric"],
    },
    {
        title: "Data Engineering and Automation",
        description:
            "ETL design, SQL development, and Python-based reporting automation to reduce manual effort and improve data quality.",
        icon: DatabaseZap,
        match: ["SQL", "Python", "ETL Pipelines", "Process Improvement"],
    },
];

const Services = ({ skills }) => {
    return (
        <section id="services" className="section-shell scroll-mt-24 py-16 sm:py-24">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-7xl"
            >
                <div className="max-w-3xl">
                    <p className="section-eyebrow">Expertise</p>
                    <h2 className="section-title mt-3">Capabilities aligned to healthcare operations, analytics, and transformation work</h2>
                    <p className="mt-5 text-base muted-copy sm:text-lg">
                        The portfolio now reflects the actual resume data rather than generic service cards. These areas consolidate the strongest themes across the experience, skills, and certification profile.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    {serviceGroups.map(({ title, description, icon: Icon, match }) => (
                        <div key={title} className="section-card rounded-[1.75rem] p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-300">
                                    <Icon size={22} />
                                </span>
                                <h3 className="text-xl font-semibold">{title}</h3>
                            </div>
                            <p className="mt-4 text-sm leading-6 muted-copy sm:text-base">{description}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {skills
                                    .filter((skill) => match.includes(skill))
                                    .map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-800 dark:text-teal-100 sm:text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
