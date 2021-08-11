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

//Fisher-Yates (aka Knuth) Shuffle
const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
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
      setCoords([latitude, longitude]);
      fetchdata(latitude, longitude);
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const fetchdata = (latitude, longitude) => {
    setDisplay(0);
    console.log('fetching restaurant');
    let next = `&pagetoken=${next_page_token}`;
    fetch(
      `/place-api-nearby?location=${latitude},${longitude}&radius=5000&type=restaurant&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs${next}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(data => data.json())
      .then(data => {
        //shuffling 20 arrays of restaurants and storing them in restaurants state
        console.log(data);
        const shuffledRestaurants = shuffle(data.results);
        setRestaurants(shuffledRestaurants);
        //fetching using the photo reference
        fetchPhoto(shuffledRestaurants[display].photos[0].photo_reference);
        //storing next page token
        console.log('this is next token', data.next_page_token);
        data.next_page_token
          ? setNext_page_token(data.next_page_token)
          : setEndOfList(true);
      })
      .then()
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
  const [endOfList, setEndOfList] = React.useState(false);
  const [coords, setCoords] = React.useState([0, 0]);
  const [next_page_token, setNext_page_token] = React.useState('');

  const handleLikesClick = event => {
    console.log(endOfList, display);
    //when reaching end of array fetch new page
    display === 18 ? fetchdata(coords[0], coords[1]) : setDisplay(display + 1);
    //if clicking on right side of screen set likes to true
    if (event.clientX > window.innerWidth / 2) setLikes(true);

    try {
      fetchPhoto(restaurants[display + 1].photos[0].photo_reference);
    } catch (error) {
      console.log(restaurants, display, next_page_token);
      console.log('error fetching photo');
    }
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
