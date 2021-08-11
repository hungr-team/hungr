import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuItem, Menu } from "@material-ui/core";
import SettingsList from "./SettingMenu";
import HistoryList from "./HistoryList";

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
  // const [foodtypes, setFoodTyes] = useState("");
  // const [preference, setPreference] = useState("");
  // const [like, setLike] = useState("");
  // const [dislike, setDislike] = useState("");
  // const [favorite, setFavorite] = useState("");
  // const [bigNoNo, setBigNoNo] = useState("");

  const classes = useStyles();
  useEffect(() => {
    console.log("inside useEffct");
    fetch("http://localhost:8080/loggedin")
      .then((response) => response.json())
      .then((data) => console.log("DATAAA", data));
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {user}
          </Typography>
          <Typography variant="h4" className={classes.title}>
            HUNGR
          </Typography>
          <HistoryList />
          <SettingsList />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
