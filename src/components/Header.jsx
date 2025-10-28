import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { PiBowlFoodBold } from "react-icons/pi";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Basket 🛒", path: "/cart", special: true },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#bc5f18ff" }}>
      <Toolbar>
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            F<PiBowlFoodBold />
            <PiBowlFoodBold />
            D - C<PiBowlFoodBold />
            URT
          </Link>
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box>
            {menuItems.map((item) => (
              <Tooltip
                key={item.name}
                title={item.name === "About" ? "Learn more about us" : ""}
                arrow
              >
                <Button color="inherit">
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: item.special ? "black" : "transparent",
                      padding: item.special ? "5px 10px" : "0px",
                      borderRadius: item.special ? "5px" : "0px",
                    }}
                  >
                    {item.name}
                  </Link>
                </Button>
              </Tooltip>
            ))}
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer for mobile navigation */}
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
              <Box
                sx={{ width: 250, p: 2, backgroundColor: "#bc5f18ff", height: "100%" }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", mb: 2, textAlign: "center" }}
                >
                  FOOD COURT 🍽️
                </Typography>
                <List>
                  {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                      <ListItemButton
                        onClick={() => setOpenDrawer(false)}
                        component={Link}
                        to={item.path}
                      >
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
