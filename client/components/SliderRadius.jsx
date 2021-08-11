import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  //update Radius Request

  const updateRadius = (val) => {
    const radius = val;
   
    fetch("http://localhost:3000/updateSettings", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username:"Theingi Deva", radius}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Radius In Miles
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={20}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => updateRadius(value)}
      />
    </div>
  );
}