import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ username, sliderUpdate }) {
  const classes = useStyles();

  //update Radius Request

  // fetch('/updateSettings', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ username: username, radius }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });

  return (
    <div className={classes.root}>
      <Typography id='discrete-slider-small-steps' gutterBottom>
        Radius (mi)
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-small-steps'
        step={1}
        min={3}
        max={20}
        valueLabelDisplay='auto'
        getAriaValueText={(value) => sliderUpdate(value * 1609)}
      />
    </div>
  );
}
