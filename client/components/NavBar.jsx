import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from './ResDrawerMenu';
import Slider from './SliderRadius';
import Link from '@material-ui/core/Link';

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
  const [user, setUser] = useState('default user');
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [loggedIn, setLogIn] = useState(false);

  // const [setting, setSetting] = useState("");
  // const [radius, setRadius] = useState("");
  // const [preference, setPreference] = useState("");
  // const [like, setLike] = useState("");
  // const [dislike, setDislike] = useState("");

  useEffect(() => {
    let cookie = document.cookie;
    if (cookie) {
      cookie = cookie.split('=');
      let name = cookie[1];
      //name = name.substring(1);
      console.log(user, name);
      setUser(name);
      setLogIn(true);
    }

    return;
  }, []);

  const classes = useStyles();
  useEffect(() => {
    console.log('inside useEffct');
    fetch('http://localhost:3000/loggedIn')
      .then((response) => response.json())
      .then((data) => console.log('DATAAA', data));
  }, []);

  const menuItems = [
    'Like',
    'Dislike',
    <Slider />,
    loggedIn === true ? (
      <Link href='/logOut'>Log Out</Link>
    ) : (
      <Link href='/'>Sign In</Link>
    ),
  ];

  return (
    <div>
      <ResponsiveDrawer menulist={menuItems} userName={user} />
    </div>
  );
};

export default NavBar;
