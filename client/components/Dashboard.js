import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DashboardCard from './DashboardCard.js';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default function Dashboard() {
  useEffect(() => {
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition(success, error, options);
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(data => data.json())
      .then(data => {
        setRestaurants(data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const classes = useStyles();

  const [likes, setLikes] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  const [photo_ref, setPhoto_ref] = React.useState('');

  const handleLikesClick = event => {
    console.log(event.clientX);
    if (event.clientX > window.innerWidth / 2) setLikes(true);
    setPhoto_ref(restaurants[display].photos[0].photo_reference);
  };

  return (
    <Paper className={classes.root} onClick={handleLikesClick}>
      <ThumbDownIcon />
      <DashboardCard restaurants={restaurants} display={display} />
      <FavoriteBorderIcon />
    </Paper>
  );
}
