import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from './SliderRadius';
import Link from '@material-ui/core/Link';
import PersistentDrawerLeft from './PerDrawer';
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

const NavBar = ({ sliderUpdate }) => {
  const [user, setUser] = useState('');
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [loggedIn, setLogIn] = useState(false);

  useEffect(() => {
    let cookie = document.cookie;
    if (cookie) {
      cookie = cookie.split('=');
      let name = cookie[1];
      //name = name.substring(1);
      setUser(name);
      setLogIn(true);
    }

    return;
  }, []);

  const menuItems = [
    user,
    <Link href='/dashboard'>Home</Link>,
    <Link href='/favorites'>Favorites</Link>,
    <Link href='/blocks'>Blocked Restaurants</Link>,
    <Slider username={user} sliderUpdate={sliderUpdate} />,
    loggedIn === true ? (
      <Link href='/logOut'>Log Out</Link>
    ) : (
      <Link href='/'>Sign In</Link>
    ),
  ];

  return (
    <div>
      <PersistentDrawerLeft menulist={menuItems} username={user} />
    </div>
  );
};

export default NavBar;
