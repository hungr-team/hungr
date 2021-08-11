import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import BlockCard from './blockCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    alignItems: 'center',
    gap: '40px',
  },
}));
export default function Blocks() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [user, setUser] = useState('default user');
  const [loggedIn, setLogIn] = useState(false);

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

  useEffect(() => {
    const getBlockedRestaurantsParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user }),
    };
    fetch('/getBlocks', getBlockedRestaurantsParams)
      .then((res) => res.json())
      .then((blockedRestaurants) => {
        console.log(blockedRestaurants);
        setBlocks(blockedRestaurants);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const blockList = blocks.map((restaurant, i) => {
    const restaurantName = restaurant.name.replace('&#39', `'`);
    const address = restaurant.address.replace('&#39', `'`);

    return (
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <BlockCard
          key={i}
          index={i}
          name={restaurantName}
          address={address}
          className={classes.favoriteCard}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      </Grid>
    );
  });
  // elevation for a shadow
  return (
    <center>
      <Grid container spacing={3}>
        {blockList}
      </Grid>
    </center>
  );
}
