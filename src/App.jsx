import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import { Box } from "@mui/material";
import { WordlePage } from "./Wordle/WordlePage";
import { About } from "./About Me/About";
import { ProjectsPage } from "./Projects-Page/projects";

export default function App() {
  const title = [1, 2, 3, 4];
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/wordle" element={<WordlePage />} />
      </Routes>
    </Router>
  );
}
