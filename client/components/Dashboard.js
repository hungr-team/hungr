import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DashboardCard from './DashboardCard.js';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

//Fisher-Yates (aka Knuth) Shuffle
const shuffle = (array) => {
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

    const success = (pos) => {
      const crd = pos.coords;
      latitude = crd.latitude;
      longitude = crd.longitude;
      setCoords([latitude, longitude]);
      fetchdata(latitude, longitude);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const fetchdata = (latitude, longitude) => {
    setDisplay(0);

    fetch(
      `/place-api-nearby?location=${latitude},${longitude}&radius=updateRadius &type=restaurant&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs&pagetoken=${next_page_token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        //shuffling 20 arrays of restaurants and storing them in restaurants state
        const shuffledRestaurants = shuffle(data.results);
        setRestaurants(shuffledRestaurants);
        //fetching using the photo reference
        fetchPhoto(shuffledRestaurants[display].photos[0].photo_reference);
        //storing next page token
        data.next_page_token
          ? setNext_page_token(data.next_page_token)
          : setEndOfList(true);
      })
      .then()
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchPhoto = (ref) => {
    fetch(
      `/place-api-photo?photoreference=${ref}&sensor=false&maxheight=1000&maxwidth=1000&key=AIzaSyASed7g1JyWUL7f61y8836gxCpPbolCSJs`
    )
      .then((data) => {
        setPhoto(data.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const classes = useStyles();

  const [blocks, setBlocks] = React.useState([]);
  const [liked, setLiked] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  const [photo, setPhoto] = React.useState('');
  const [endOfList, setEndOfList] = React.useState(false);
  const [coords, setCoords] = React.useState([0, 0]);
  const [next_page_token, setNext_page_token] = React.useState('');

  const handleLikesClick = (event) => {
    //when reaching end of array fetch new page
    display === 18 ? fetchdata(coords[0], coords[1]) : setDisplay(display + 1);
    //if clicking on right side of screen set likes to true
    if (event.clientX > window.innerWidth / 2) {
      const name = restaurants[display].name.replace(/'/, '&#39');
      const address = restaurants[display].vicinity.replace(/'/, '&#39');
      const likeFetchParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // change username to props.username after login
        body: JSON.stringify({
          username: 'jackie',
          restaurantName: name,
          address,
        }),
      };
      fetch('/addLike', likeFetchParams);
    }
    try {
      fetchPhoto(restaurants[display + 1].photos[0].photo_reference);
    } catch (error) {
      console.log('error fetching photo');
    }
  };

  useEffect(() => {
    const getBlockedRestaurantsParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'jackie' }),
    };
    fetch('/getBlocks', getBlockedRestaurantsParams)
      .then((res) => res.json())
      .then((blockedRestaurants) => {
        setBlocks(blockedRestaurants);
      })
      .catch((err) => console.error(err));
  }, [restaurants]);

  useEffect(() => {
    const getLikedRestaurantsParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'jackie' }),
    };
    fetch('/getLikes', getLikedRestaurantsParams)
      .then((res) => res.json())
      .then((likedRestaurants) => {
        setLiked(likedRestaurants);
      })
      .catch((err) => console.error(err));
  }, [restaurants]);

  const testArr = [];
  for (let i = 0; i < liked.length; i += 1) {
    testArr.push(<h1>{liked[i].address}</h1>);
  }
  // useEffect(() => {
  //   for (let i = 0; i < restaurants.length; i += 1) {
  //     const currRestaurant = restaurants[i].name.replace(/[^\w ]/g, '');
  //     if (blocks.includes(currRestaurant)) {
  //       console.log('We hit a blocked restaurant', currRestaurant);
  //       // restaurants.splice(i, 1);
  //     }
  //   }
  // }, [blocks]);

  useEffect(() => {
    if (restaurants[display]) {
      console.log(restaurants[display].name);
      const name = restaurants[display].name.replace(/'/, '&#39');
      if (blocks.includes(name)) {
        setDisplay(display + 1);
        try {
          fetchPhoto(restaurants[display + 1].photos[0].photo_reference);
        } catch (error) {
          console.log('error fetching photo');
        }
      }
    }
  }, [display]);

  return (
    <Paper className={classes.root} onClick={handleLikesClick}>
      <ThumbDownIcon fontSize='large' />
      <DashboardCard
        restaurants={restaurants}
        display={display}
        photo={photo}
      />
      <FavoriteIcon fontSize='large' />
    </Paper>
  );
}
