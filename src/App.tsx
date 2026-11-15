import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Expertise } from './sections/Expertise';
import { Projects } from './sections/Projects';
import { Insights } from './sections/Insights';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';

export default function App() {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={handleReady} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ivory focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Expertise />
        <Projects />
        <Insights />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
