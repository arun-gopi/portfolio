"use client";
import { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Work from "../components/Work";
import ChatUi from '../components/ChatUI';
import { useClientOnly } from '../hooks/useClientOnly';
import resumeData from "../assets/resumedata.json";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mounted = useClientOnly();

  useEffect(() => {
    if (!mounted) return;
    
    // Check for saved theme or system preference
    if (typeof window !== 'undefined') {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "";
      }
    }
  }, [isDarkMode, mounted]);


  // Don't render client-side dependent components until mounted
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar
        basics={resumeData.basics}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <main>
        <Header
          basics={resumeData.basics}
          summary={resumeData.summary}
          experience={resumeData.experience}
          achievements={resumeData.achievements}
        />
        <About
          basics={resumeData.basics}
          summary={resumeData.summary}
          education={resumeData.education}
          certifications={resumeData.certifications}
          languages={resumeData.languages}
          previousExperience={resumeData.previous_experience}
        />
        <Services skills={resumeData.skills} />
        <Work
          experience={resumeData.experience}
          projects={resumeData.projects}
          achievements={resumeData.achievements}
          certifications={resumeData.certifications}
        />
        <Contact basics={resumeData.basics} />
      </main>
      <Footer basics={resumeData.basics} />
      <ChatUi />
    </>
  );
}
