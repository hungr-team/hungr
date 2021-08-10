import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DashboardCard from './DashboardCard.js';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
}));

const fetchPhoto = ref => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${ref}&sensor=false&maxheight=1000&maxwidth=1000&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    }
  )
    .then(data => data.json())
    .then(data => {
      setPhoto(data);
    })
    .then()
    .catch(error => {
      console.error('Error:', error);
    });
};

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
        `/place-api?location=${latitude},${longitude}&radius=1500&type=restaurant&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(data => data.json())
        .then(data => {
          console.log(data)
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

  const classes = useStyles();

  const [likes, setLikes] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  const [photo, setPhoto] = React.useState('');

  const handleLikesClick = event => {
    console.log(event.clientX);
    if (event.clientX > window.innerWidth / 2) setLikes(true);
    fetchPhoto(restaurants[display].photos[0].photo_reference);
  };

  return (
    <Paper className={classes.root} onClick={handleLikesClick}>
      <ThumbDownIcon />
      <DashboardCard restaurants={restaurants} display={display} />
      <FavoriteBorderIcon />
    </Paper>
  );
}
