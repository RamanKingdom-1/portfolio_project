import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText as MuiListItemText,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setResourcesAnchorEl(null);
  };

  const handleResourcesClick = (event) => {
    setResourcesAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position="fixed" // stays at the top
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)", // semi-transparent white
          backdropFilter: "blur(10px)", // frosted glass blur
          boxShadow: "none", // optional: remove shadow
        }}
      >
        <Toolbar sx={{ px: isMobile ? 1 : 4 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontFamily: "montserrat" }}
            align="left"
          >
            Adithya Raman
          </Typography>

          {!isMobile && (
            <>
              {/* About Button */}
              <Button
                component={Link}
                to="/"
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "white",
                  mx: 1,
                  textTransform: "none",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                About
              </Button>

              {/* Projects Button */}
              <Button
                component={Link}
                to="/projects"
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "white",
                  mx: 1,
                  textTransform: "none",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Projects
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
