import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Interests from "@/components/Interests";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FooterTerminal from "@/components/FooterTerminal";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Interests />
      <Contact />
      <Footer />
      <FooterTerminal />
    </>
  );
}
