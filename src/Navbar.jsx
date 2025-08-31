import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "red" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} align="left">
            Adithya Raman
          </Typography>
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
          </Menu>
        </Toolbar>
      </AppBar>

      {}
      <Toolbar />
    </>
  );
};
