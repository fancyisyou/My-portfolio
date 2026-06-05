import { LanguageProvider } from "@/components/gaming/LanguageProvider";
import Nav from "@/components/gaming/Nav";
import Hero from "@/components/gaming/Hero";
import About from "@/components/gaming/About";
import Roster from "@/components/gaming/Roster";
import Achievements from "@/components/gaming/Achievements";
import Footer from "@/components/gaming/Footer";

export default function GamingPage() {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  );
}

function Content() {
  return (
    <GamingShell>
      <Nav />
      <Hero />
      <About />
      <Roster />
      <Achievements />
      <Footer />
    </GamingShell>
  );
}

function GamingShell({ children }) {
  return (
    <div
      className="relative min-h-dvh bg-zinc-950 font-sans text-white selection:bg-cyan-500/30 selection:text-white"
    >
      <div className="scan-overlay" />
      {children}
    </div>
  );
}
