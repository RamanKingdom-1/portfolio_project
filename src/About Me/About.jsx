import { Box, Typography, Link } from "@mui/material";

export const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">About Me</Typography>
      <Typography variant="h4" sx={{ color: "#f9f9f9" }}>
        Hello, I'm Adithya Raman. I am a currently a Computer Science +
        Economics Major at The University of Illinois at Urbana-Champaign. I am
        interested in both the Software and Finance sectors.
      </Typography>
      <Typography variant="h4" sx={{ color: "#f9f9f9" }}>
        Skills: Java Python JavaScript React 
      </Typography>

      <Typography variant="h4" sx={{ color: "#f9f9f9" }}>
        Email: adithyaraman76@gmail.com
      </Typography>
      <Link
        href="/Resume-Adithya Raman.pdf"
        download
        underline="hover"
        sx={{ mt: 2, fontSize: 20 }}
      >
        Resume
      </Link>
    </Box>
  );
};
