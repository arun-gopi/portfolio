"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Contact = ({ basics }) => {
  const [result, setResult] = useState("");
  const [mounted, setMounted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Enter your web3 froms access key below
    formData.append("access_key", "e5ef21e3-a8f0-4442-bf69-a133b2a70739");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" className="section-shell scroll-mt-24 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={mounted ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="section-card rounded-[2rem] p-6 sm:p-8">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title mt-3">Discuss healthcare operations, analytics delivery, or leadership opportunities</h2>
          <p className="mt-5 text-base muted-copy sm:text-lg">
            Reach out for RCM operations leadership, analytics transformation work, dashboard delivery, or healthcare data projects.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`mailto:${basics.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/55 p-4 dark:bg-slate-900/50">
              <Mail size={18} className="text-teal-700 dark:text-teal-300" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm muted-copy">{basics.email}</p>
              </div>
            </a>
            <a href={`tel:${basics.phone.replace(/\s+/g, "")}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/55 p-4 dark:bg-slate-900/50">
              <Phone size={18} className="text-teal-700 dark:text-teal-300" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm muted-copy">{basics.phone}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/55 p-4 dark:bg-slate-900/50">
              <MapPin size={18} className="text-teal-700 dark:text-teal-300" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm muted-copy">
                  {basics.location.city}, {basics.location.state}, {basics.location.country}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={basics.profiles.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href={basics.profiles.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium">
              <Github size={16} />
              GitHub
            </a>
            <a href={basics.profiles.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium">
              <Globe size={16} />
              Website
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="section-card rounded-[2rem] p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your name"
              required
              className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none transition focus:border-teal-500 dark:bg-slate-900/60"
              name="name"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none transition focus:border-teal-500 dark:bg-slate-900/60"
              name="email"
            />
          </div>

          <textarea
            rows="7"
            placeholder="Tell me about the role, project, or problem you want to discuss"
            required
            className="mt-4 w-full rounded-[1.5rem] border border-white/10 bg-white/70 p-4 outline-none transition focus:border-teal-500 dark:bg-slate-900/60"
            name="message"
          />

          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
            >
              Send message
              <ArrowRight size={16} />
            </button>
            <p className="text-sm muted-copy">{result}</p>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
