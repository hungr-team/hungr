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
import { FullscreenExit } from '@material-ui/icons';

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
});

export default function DashboardCard({ restaurants, display, photo }) {
  const classes = useStyles();

  const [superDislike, setSuperDislike] = React.useState(false);

  const handleSuperDislikeClick = () => {
    setSuperDislike(!superDislike);
  };

  let name = '';
  let ratings;
  let vicinity;

  if (restaurants[display]) {
    [name, ratings, vicinity] = [
      restaurants[display].name,
      restaurants[display].ratings,
      restaurants[display].vicinity,
    ];
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardMedia
          component="img"
          alt="Restaurant Photo"
          image={photo}
          title="Restaurant Photo"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ratings}
            {vicinity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleSuperDislikeClick}>
          SUPER DISLIKE
          <BlockIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
