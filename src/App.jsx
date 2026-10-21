import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Essays from "./components/Essays";
import ArticlePage from "./components/Article";
import Ideas from "./components/Ideas";
import Projects from "./components/Projects";
import ProjectPage from "./components/ProjectPage";
import Notes from "./components/Notes";
import About from "./components/About";
import Contact from "./components/Contact";
import Studio from "./components/Studio";
import { useRoute } from "./router";
import "./App.css";

export default function App() {
  const { view, slug, query } = useRoute();
  const dev = import.meta.env.DEV;

  let page;
  switch (view) {
    case "essays":
      page = slug ? <ArticlePage kind="essays" slug={slug} backView="essays" backLabel="All essays" /> : <Essays />;
      break;
    case "ideas":
      page = <Ideas />;
      break;
    case "projects":
      page = slug ? <ProjectPage slug={slug} /> : <Projects />;
      break;
    case "notes":
      page = <Notes slug={slug} />;
      break;
    case "about":
      page = <About />;
      break;
    case "contact":
      page = <Contact subject={query.subject} />;
      break;
    case "studio":
      page = dev ? <Studio /> : <StudioOffline />;
      break;
    default:
      page = <Home />;
  }

  return (
    <div className="app">
      <Navbar view={view} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

function StudioOffline() {
  return (
    <section className="page">
      <div className="container narrow">
        <div className="prose-card">
          <h1 className="page-title">The Write studio is a local tool</h1>
          <p>
            The studio only saves files while the dev server is running on your machine — that’s what
            keeps this site 100% static with no backend.
          </p>
          <pre className="code-inline-step">npm run dev</pre>
          <p>…then open <code>#/studio</code> from that page and get writing.</p>
        </div>
      </div>
    </section>
  );
}