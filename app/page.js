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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode}/>
      <About isDarkMode={isDarkMode}/>
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <ChatUi />
    </>
  );

  // return (
  //   <>
  //     <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
  //     <Header isDarkMode={isDarkMode} basics={resumeData.basics} />
  //     <About isDarkMode={isDarkMode} summary={sections.summary} />
  //     <Services isDarkMode={isDarkMode} skills={sections.skills} />
  //     <Work isDarkMode={isDarkMode} experience={sections.experience} />
  //     <Contact isDarkMode={isDarkMode} basics={resumeData.basics} />
  //     <Footer isDarkMode={isDarkMode} basics={resumeData.basics} />
  //   </>
  // );
}
