import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteCard from './favoriteCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    alignItems: 'center',
    gap: '40px',
  },
}));
export default function Favorites() {
  const classes = useStyles();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getLikedRestaurantsParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testingFavorites' }),
    };
    fetch('/getLikes', getLikedRestaurantsParams)
      .then((res) => res.json())
      .then((likedRestaurants) => {
        setLikes(likedRestaurants);
      })
      .catch((err) => console.error(err));
  }, []);

  const favoriteList = likes.map((restaurant, i) => {
    const restaurantName = restaurant.name.replace('&#39', `'`);
    const address = restaurant.address.replace('&#39', `'`);
    return (
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <FavoriteCard
          key={i}
          index={i}
          name={restaurantName}
          address={address}
          className={classes.favoriteCard}
          likes={likes}
          setLikes={setLikes}
        />
      </Grid>
    );
  });
  // elevation for a shadow
  return (
    <center>
      <Grid container spacing={3}>
        {favoriteList}
      </Grid>
    </center>
  );
}
