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
      <AppBar position="fixed" sx={{ backgroundColor: "red" }}>
        <Toolbar sx={{ px: isMobile ? 1 : 4 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, font: "montserrat" }}
            align="left"
          >
            Adithya Raman
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: {
                    width: 200, // reduced from 250
                    ml: "auto", // ensures drawer stays on screen
                    px: 1, // add horizontal padding
                  },
                }}
              >
                <Box sx={{ width: "100%" }} role="presentation">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to="/about"
                        onClick={handleDrawerToggle}
                      >
                        <MuiListItemText primary="About" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to="/wordle"
                        onClick={handleDrawerToggle}
                      >
                        <MuiListItemText primary="Wordle" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to="/nba"
                        onClick={handleDrawerToggle}
                      >
                        <MuiListItemText primary="NBA Stats Predictor" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton>
                        <MuiListItemText primary="Ropes Research Paper" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pl: 2 }}>
                      <ListItemButton
                        component="a"
                        href="/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Adithya_Raman.pdf"
                        download
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <MuiListItemText primary="Research Paper" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pl: 2 }}>
                      <ListItemButton
                        component="a"
                        href="/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Results_Paper_Adithya_Raman.pdf"
                        download
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <MuiListItemText primary="Result Paper" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" onClick={handleClick}>
                Projects
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/wordle" onClick={handleClose}>
                  Wordle
                </MenuItem>
                <MenuItem component={Link} to="/nba" onClick={handleClose}>
                  NBA Stats Predictor
                </MenuItem>
                <MenuItem
                  onClick={handleResourcesClick}
                  aria-haspopup="true"
                  aria-controls="resources-menu"
                >
                  Ropes Research Paper
                </MenuItem>
              </Menu>
              <Menu
                id="resources-menu"
                anchorEl={resourcesAnchorEl}
                open={Boolean(resourcesAnchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem
                  component="a"
                  href="/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Adithya_Raman.pdf"
                  download
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <DownloadIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Ropes Research Paper</ListItemText>
                </MenuItem>
                <MenuItem
                  component="a"
                  href="/String_to_Ropes__Tying_the_Knots_for_Text_Optimization_Results_Paper_Adithya_Raman.pdf"
                  download
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <DownloadIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Ropes Research Result Paper</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
