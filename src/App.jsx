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
      page = <Studio />;
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