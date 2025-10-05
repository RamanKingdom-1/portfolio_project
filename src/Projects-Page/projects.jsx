import { Box, Typography, Chip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordlePage } from "../Wordle/WordlePage";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (project.type === "link") {
      // internal links (like /wordle)
      if (project.link.startsWith("/")) {
        navigate(project.link); // <-- this navigates inside the SPA
      } else {
        // external links open in new tab
        window.open(project.link, "_blank");
      }
    } else if (project.type === "video") {
      const videoWindow = window.open("", "_blank");
      videoWindow.document.write(
        `<video controls autoplay style="width:100%;height:100%">
        <source src="${project.video}" type="video/mp4">
      </video>`
      );
    } else if (project.type === "pdf") {
      const a = document.createElement("a");
      a.href = project.pdf;
      a.download = project.title;
      a.click();
    }
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      sx={{
        width: 300,
        minHeight: 350,
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: hover
          ? "0 10px 20px rgba(255,255,255,0.3)"
          : "0 3px 6px rgba(0,0,0,0.1)",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          border: "1px solid rgba(255,255,255,0.15)",
        },
      }}
    >
      <Box
        component="img"
        src={project.image}
        alt={project.title}
        sx={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      />

      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 1,
            overflowX: "auto",
          }}
        >
          {project.tags.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: "#e63946",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            flexGrow: 1,
            lineHeight: 1.5,
          }}
        >
          {project.description}
        </Typography>
      </Box>
    </Box>
  );
};

let projects = [
  {
    title: "Wordle",
    type: "link",
    link: "/wordle",
    image: "Screenshot 2025-10-03 at 9.58.22 PM.png",
    tags: ["React", "JavaScript", "Game"],
    description: "A clone of Wordle with custom features.",
  },

  {
    title: "Ropes Research Paper",
    type: "pdf",
    pdf: "/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Adithya_Raman.pdf",
    image: "Screenshot 2025-10-03 at 10.12.11 PM.png",
    tags: ["Java", "Research"],
    description:
      "Research Paper focusing on the Ropes Data Structure written with Java in mind with the hope of optimizing speed with memory efficiency",
  },
  {
    title: "SteelHacks Time To Talent",
    type: "link",
    link: "https://steel-hacks.vercel.app",
    image: "Screenshot 2025-10-03 at 10.07.59 PM.png",
    tags: ["React", "GeminiAPI", "JavaScript", "ICS Calendar Creation"],
    description: "AI Resume Builder for Reentry Support",
  },
  {
    title: "Ropes Research Results Paper",
    type: "pdf",
    pdf: "/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Results_Paper_Adithya_Raman.pdf",
    image: "Screenshot 2025-10-03 at 10.12.11 PM.png",
    tags: ["Java", "Research"],
    description:
      "Testing the hypothesis of the Ropes Research Paper focusing on the Ropes Data Structure written with Java in mind with the hope of optimizing speed with memory efficiency",
  },
  {
    title: "Gym Genius",
    type: "video",
    video: "MYMOVIE.mp4",
    image: "Screenshot 2025-10-04 at 2.09.46 PM.png",
    tags: [
      "Machine Learning",
      "AI integration",
      "Flutter",
      "Python",
      "OpenCV",
      "Gemini API",
    ],
    description:
      "Flutter app that uses a python based machine learning model to correct work out form and encourage consistent exercise.",
  },
  {
    title: "NBA Stats Predictor",
    type: "video",
    video: "My Movie 2.mp4",
    image: "Screenshot 2025-10-04 at 2.02.26 PM.png",
    tags: [
      "Python",
      "NumPy",
      "Linear Regression",
      "Machine Learning",
      "API Integration",
    ],
    description: "A clone of Wordle with custom features.",
  },
];

export const ProjectsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#e63946",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        My Projects
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </Box>
    </Box>
  );
};
