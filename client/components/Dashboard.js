import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DashboardCard from './DashboardCard.js';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

export default function Dashboard() {
  useEffect(() => {
    let latitude;
    let longitude;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = pos => {
      const crd = pos.coords;
      latitude = crd.latitude;
      longitude = crd.longitude;

      fetch(
        `/place-api-nearby?location=${latitude},${longitude}&radius=1500&type=restaurant&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(data => data.json())
        .then(data => {
          //storing array of restaurants in state
          setRestaurants(data.results);
          //fetching using the photo reference
          fetchPhoto(data.results[display].photos[0].photo_reference);
        })
        .then()
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const fetchPhoto = ref => {
    fetch(
      `/place-api-photo?photoreference=${ref}&sensor=false&maxheight=1000&maxwidth=1000&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`
    )
      .then(data => {
        setPhoto(data.url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const classes = useStyles();

  const [likes, setLikes] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  const [photo, setPhoto] = React.useState('');

  const handleLikesClick = event => {
    console.log(event.clientX);
    if (event.clientX > window.innerWidth / 2) setLikes(true);
    fetchPhoto(restaurants[display + 1].photos[0].photo_reference);
    setDisplay(display + 1);
    console.log(display, photo);
  };

  return (
    <Paper className={classes.root} onClick={handleLikesClick}>
      <ThumbDownIcon />
      <DashboardCard
        restaurants={restaurants}
        display={display}
        photo={photo}
      />
      <FavoriteBorderIcon />
    </Paper>
  );
}
