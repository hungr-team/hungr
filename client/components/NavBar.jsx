import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsList from './SettingMenu';
import HistoryList from './HistoryList';

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
  const [user, setUser] = useState('');
  const [setting, setSetting] = useState('');
  const [radius, setRadius] = useState('');
  const [foodtypes, setFoodTyes] = useState('');
  const [preference, setPreference] = useState('');
  const [like, setLike] = useState('');
  const [dislike, setDislike] = useState('');
  const [favorite, setFavorite] = useState('');
  const [bigNoNo, setBigNoNo] = useState('');

  const classes = useStyles();
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            USER NAME
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
