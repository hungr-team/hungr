import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '80vh',
    height: '15vh',
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
    // height: '10vh',
  },
});
export default function FavoriteCard({
  name,
  address,
  likes,
  setLikes,
  index,
}) {
  const classes = useStyles();

  const handleRemoveLike = () => {
    const replacedName = name.replace(/'/, '&#39');
    const removeLikeParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testingFavorites',
        restaurantName: replacedName,
      }),
    };
    fetch('/removeLike', removeLikeParams)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    const newLikes = [...likes];
    newLikes.splice(index, 1);
    setLikes(newLikes);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='body1'>{address}</Typography>
        <Button size='small' color='secondary' onClick={handleRemoveLike}>
          <Close />
          Remove From Favorites
        </Button>
      </CardContent>
    </Card>
  );
}
