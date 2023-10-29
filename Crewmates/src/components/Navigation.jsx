import React from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      style={{
        position: "fixed", // Establecer la posición fija
        top: 0, // Colocarla en la parte superior de la página
        width: "100%", // Ancho completo de la página
        backgroundColor: "#eeeeee",
        color: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >

      <MenuList
        id="simple-menu"
        onClose={handleClose}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MenuItem>

        <MenuItem component={Link} to="/create" onClick={handleClose}>
          Create a Crewmate
        </MenuItem>
        <MenuItem component={Link} to="/gallery" onClick={handleClose}>
         Crewmate Gallery
        </MenuItem>
      </MenuList>
    </nav>
  );
}

export default Navigation;
