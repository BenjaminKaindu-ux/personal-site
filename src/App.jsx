import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Writing from "./components/Writing";
import Projects from "./components/Projects";
import Ideas from "./components/Ideas";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { backgroundImage } from "./config";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      {/* Full-screen nature background (picked from /public/images) */}
      <div
        className="site-bg"
        role="presentation"
        aria-hidden="true"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Writing />
        <Projects />
        <Ideas />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}