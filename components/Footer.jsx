"use client";

const Footer = ({ basics }) => {
  return (
    <footer className="section-shell pb-8 pt-6 sm:pb-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.25)] dark:bg-slate-900 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-Ovo text-3xl">{basics.name}</p>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
              Healthcare RCM leadership, payer operations, analytics delivery, and data-driven process improvement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${basics.email}`} className="rounded-full border border-white/15 px-4 py-2 text-slate-200 transition hover:border-teal-300 hover:text-white">
              {basics.email}
            </a>
            <a href={basics.profiles.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-slate-200 transition hover:border-teal-300 hover:text-white">
              LinkedIn
            </a>
            <a href={basics.profiles.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-slate-200 transition hover:border-teal-300 hover:text-white">
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arun Gopi. All rights reserved.</p>
          <p>
            {basics.location.city}, {basics.location.state}, {basics.location.country}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
