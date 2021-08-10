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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function DashboardCard() {
  const classes = useStyles();

  const [superDislike, setSuperDislike] = React.useState(false);

  const handleSuperDislikeClick = () => {
    setSuperDislike(!superDislike);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Restaurant
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ratings phone number miles away
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
