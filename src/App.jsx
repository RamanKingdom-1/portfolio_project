import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import { Box } from "@mui/material";
import { WordlePage } from "./Wordle/WordlePage";
import { About } from "./About Me/About";

export default function App() {
  const title = [1, 2, 3, 4];
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div><h1>Welcome to My Portfolio</h1></div>} />
        <Route path="/about" element={<About />} />
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/nba" element={<div><h1>NBA Season Has Not Started Yet</h1></div>} />
      </Routes>
    </Router>
  );
}
