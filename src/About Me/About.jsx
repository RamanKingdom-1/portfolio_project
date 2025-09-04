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
  { name: "Java", icon: <FaJava size={40} color="#f89820" /> },
  { name: "Python", icon: <FaPython size={40} color="#3776ab" /> },
  { name: "JavaScript", icon: <FaJs size={40} color="#f7df1e" /> },
  { name: "React", icon: <FaReact size={40} color="#61dafb" /> },
  { name: "HTML", icon: <FaHtml5 size={40} color="#101010ff" /> },
  { name: "CSS", icon: <FaCss3 size={40} color="#fa2205ff" /> },
];

export const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        px: 4,
        gap: 6,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h1" align="left" sx={{ maxWidth: "90%" }}>
          About Me
        </Typography>
        <Typography
          variant="h4"
          align="left"
          sx={{
            color: "#f9f9f9",
            maxWidth: "90%",
            wordWrap: "break-word",
          }}
        >
          Hello, I'm Adithya Raman. I am currently a Computer Science +
          Economics Major at The University of Illinois at Urbana-Champaign. I
          am interested in both the Software and Finance sectors.
        </Typography>

        <Box
          sx={{
            maxWidth: "90%",
            overflowX: "auto",
            display: "flex",
            gap: 3,
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
                minWidth: 100,
                px: 2,
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
              <Typography sx={{ mt: 1, fontWeight: 600 }}>
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          align="left"
          variant="h4"
          sx={{ color: "#f9f9f9", maxWidth: "90%" }}
        >
          Email: adithyaraman76@gmail.com
        </Typography>
        <Button
          variant="contained"
          href="/Resume-Adithya Raman.pdf"
          download
          sx={{
            mt: 2,
            fontSize: 20,
            fontWeight: 700,
            maxWidth: "90%",
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
        }}
      >
        <Box
          component="img"
          src="/D4B9B767-1916-40DB-ADB9-5C08FA0B5E8C_4_5005_c.jpeg"
          alt="Adithya Raman"
          sx={{
            width: { xs: 220, md: 340 },
            height: { xs: 240, md: 600 },
            borderRadius: 3,
            objectFit: "cover",
            boxShadow: 6,
            border: "4px solid #fa0202ff",
          }}
        />
      </Box>
    </Box>
  );
};
