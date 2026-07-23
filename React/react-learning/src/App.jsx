import {createRoot} from "react-dom/client"
import "./app.css"
import {Navbar} from "./components/Navbar"
import {Hero} from "./components/Hero"
import {Skills} from "./components/SkillsList"
import {Projects} from "./components/projects"
import Footer from "./components/footer"

const root=createRoot(document.getElementById("root"))
root.render(
  <>
  <Navbar />
  <Hero />
  <Skills />
  <Projects />
  <Footer />
 </>
)
