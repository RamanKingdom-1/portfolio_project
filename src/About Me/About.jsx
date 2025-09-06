import { Box, Typography, Button } from "@mui/material";
import {
  FaJava,
  FaPython,
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";

const skills = [
  { name: "Java", icon: <FaJava size={32} color="#f89820" /> },
  { name: "Python", icon: <FaPython size={32} color="#7137abff" /> },
  { name: "JavaScript", icon: <FaJs size={32} color="#f7df1e" /> },
  { name: "React", icon: <FaReact size={32} color="#61dafb" /> },
  { name: "HTML", icon: <FaHtml5 size={32} color="#e5ff00ff" /> },
  { name: "CSS", icon: <FaCss3 size={32} color="#0519faff" /> },
];

export const About = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 0 },
        gap: { xs: 4, md: 8 },
        background: "linear-gradient(90deg, #1a1a2e 0%, #0f3460 100%)",
        overflow: "auto",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          maxWidth: { xs: "100%", md: "600px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          align="left"
          sx={{
            fontSize: { xs: 28, sm: 32, md: 40 },
            maxWidth: "100%",
            mb: 2,
            color: "#fff",
          }}
        >
          About Me
        </Typography>
        <Typography
          variant="h5"
          align="left"
          sx={{
            color: "#f9f9f9",
            fontSize: { xs: 16, sm: 18, md: 22 },
            maxWidth: "100%",
            wordWrap: "break-word",
            mb: 2,
          }}
        >
          Hello, I'm Adithya Raman. I am currently a Computer Science +
          Economics Major at The University of Illinois at Urbana-Champaign. I
          am interested in both the Software and Finance sectors.
        </Typography>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "flex",
            gap: 2,
            py: 2,
            mb: 2,
            whiteSpace: "nowrap",
          }}
        >
          {skills.map((skill) => (
            <Box
              key={skill.name}
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 80,
                px: 1,
                py: 1,
                borderRadius: 2,
                backgroundColor: "#1e1e1e",
                color: "#fff",
                boxShadow: 2,
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.08)" },
              }}
            >
              {skill.icon}
              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  fontSize: { xs: 12, sm: 14, md: 16 },
                }}
              >
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          align="left"
          variant="h6"
          sx={{
            color: "#f9f9f9",
            fontSize: { xs: 14, sm: 16, md: 18 },
            maxWidth: "100%",
            mb: 2,
          }}
        >
          Email: adithyaraman76@gmail.com
        </Typography>
        <Button
          variant="contained"
          href="/Resume-Adithya Raman.pdf"
          download
          sx={{
            mt: 2,
            fontSize: { xs: 14, sm: 16, md: 18 },
            fontWeight: 700,
            width: { xs: "100%", md: "auto" },
            borderRadius: 2,
            background:
              "linear-gradient(90deg, #1a1a2e 0%, #ff0000 50%, #0f3460 100%)",
            color: "#fff",
            boxShadow: 3,
            textTransform: "none",
            "&:hover": {
              background:
                "linear-gradient(90deg, #0f3460 0%, #1a1a2e 50%, #ff0000 100%)",
              transform: "scale(1.05)",
            },
          }}
        >
          Download Resume
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
          width: "100%",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          component="img"
          src="1-75e91bd0.jpg"
          alt="Adithya Raman"
          sx={{
            width: { xs: "100%", sm: 280, md: 340 },
            height: { xs: 180, sm: 220, md: 600 },
            borderRadius: 3,
            objectFit: "cover",
            boxShadow: 6,
            border: "4px solid #fa0202ff",
            maxWidth: "100%",
            maxHeight: { xs: 180, sm: 220, md: 600 },
          }}
        />
      </Box>
    </Box>
  );
};
