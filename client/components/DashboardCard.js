import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { ContactsOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '80vh',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    height: '50vh',
  },
});

export default function DashboardCard({ restaurants, display, photo }) {
  const classes = useStyles();

  const [superDislike, setSuperDislike] = React.useState(false);
  const [stars, setStars] = React.useState(1);

  const handleSuperDislikeClick = () => {
    const name = restaurants[display].name.replace(/'/, '&#39');
    const address = restaurants[display].vicinity.replace(/'/, '&#39');
    const blockFetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // change username to props.username after login
      body: JSON.stringify({
        username: 'jackie',
        restaurantName: name,
        address,
      }),
    };
    fetch('/block', blockFetchParams)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    setSuperDislike(!superDislike);
  };

  let name = '';
  let rating;
  let vicinity;

  if (restaurants[display]) {
    [name, rating, vicinity] = [
      restaurants[display].name,
      restaurants[display].rating,
      restaurants[display].vicinity,
    ];
    if (stars !== restaurants[display].rating)
      setStars(restaurants[display].rating);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardMedia
          className={classes.media}
          component='img'
          alt='Restaurant Photo'
          image={photo}
          title='Restaurant Photo'
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Box component='fieldset' mb={3} borderColor='transparent'>
            <Rating name='simple-controlled' value={stars} precision={0.25} />
          </Box>
          <Typography variant='body2' color='textSecondary' component='p'>
            {vicinity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' onClick={handleSuperDislikeClick}>
          SUPER DISLIKE
          <BlockIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
