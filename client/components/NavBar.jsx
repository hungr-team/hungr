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

const NavBar = (props) => {
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
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {props.userName ? (
              props.userName
            ) : (
              <Link style={{ color: 'white' }} href='/signIn'>
                Sign In
              </Link>
            )}
          </Typography>
          <Typography variant='h4' className={classes.title}>
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

// export default function SimpleMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
// //username
//   return (
//     <div>
//       <Button
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         user
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>User Name</MenuItem>
//       </Menu>
//     </div>

// export default function SimpleMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
// //Settings
//   return (

//     <div>
//       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Settings
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Radius</MenuItem>
//         <MenuItem onClick={handleClose}>Food Types</MenuItem>

//       </Menu>
//     </div>

// // Preference

// export default function SimpleMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Preference
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Like</MenuItem>
//         <MenuItem onClick={handleClose}>Dislike</MenuItem>
//         <MenuItem onClick={handleClose}>Favorite</MenuItem>
//         <MenuItem onClick={handleClose}>Big No No!</MenuItem>
//       </Menu>
//     </div>
//   );
// }

//   );
// }

//   );
// }
