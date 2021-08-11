import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
export default function BlockCard({ name, address, blocks, setBlocks, index }) {
  const classes = useStyles();

  const handleRemoveBlock = () => {
    const replacedName = name.replace(/'/, '&#39');
    const removeBlockParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testingFavorites',
        restaurantName: replacedName,
      }),
    };
    fetch('/removeBlock', removeBlockParams)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='body1'>{address}</Typography>
        <Button size='small' color='secondary' onClick={handleRemoveBlock}>
          <Close />
          Remove From Blocked
        </Button>
      </CardContent>
    </Card>
  );
}
