import {createRoot} from "react-dom/client"
import "./App.css"
import {Navbar} from "./components/Navbar"
import {Hero} from "./components/Hero"
import {Skills} from "./components/SkillsList"
import {Projects} from "./components/Projects"
import Footer from "./components/Footer"

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
