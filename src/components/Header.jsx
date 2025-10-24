import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { PiBowlFoodBold } from "react-icons/pi";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#bc5f18ff" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
             F<PiBowlFoodBold /><PiBowlFoodBold />D  -  C<PiBowlFoodBold />URT
          </Link>
        </Typography>

        <Button color="inherit">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/menu" style={{ textDecoration: "none", color: "white" }}>
            Menu
          </Link>
        </Button>
        <Tooltip title="Learn more about us" arrow>
          <Button color="inherit">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
              About
            </Link>
          </Button>
        </Tooltip>
        <Button color="inherit">
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "white" }}
          >
            Contact
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            className="px-2 py-2 rounded"
            to="/cart"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "black",
            }}
          >
            🛒BASKET
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
            Admin
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
