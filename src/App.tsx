import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeSection } from './components/ResumeSection';
import { BentoGrid } from './components/BentoGrid';
import { AboutBento } from './components/AboutBento';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0b0c0e] text-[#e8eaed] selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <ResumeSection />
          <BentoGrid />
          <AboutBento />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
