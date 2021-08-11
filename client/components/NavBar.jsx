import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "./ResDrawerMenu";
import Slider from "./SliderRadius";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";

const NavBar = () => {
  const [user, setUser] = useState("default user");
  const [menuCollapse, setMenuCollapse] = useState(false);

  // const [setting, setSetting] = useState("");
  // const [radius, setRadius] = useState("");
  // const [preference, setPreference] = useState("");
  // const [like, setLike] = useState("");
  // const [dislike, setDislike] = useState("");

  const classes = useStyles();
  useEffect(() => {
    console.log("inside useEffct");
    fetch("http://localhost:3000/loggedIn")
      .then((response) => response.json())
      .then((data) => console.log("DATAAA", data));
  }, []);

  const menuItems = ["Like", "Dislike", <Slider />, "Log Out"];

  return (
    <div>
      <ResponsiveDrawer menulist={menuItems} userName={user} />
    </div>
  );
};

export default NavBar;
