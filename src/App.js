import React, { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container, Grid, Tooltip, Typography
} from "@material-ui/core";

const LENGTH_IMAGES = 9;
export const DIMENSIONS = 142;
const DIMENSION_GRID_SPACING = 24;
const DIMENSION_GRID = (DIMENSIONS * 3) + (DIMENSION_GRID_SPACING * 3)
const URL_DOG = `https://loremflickr.com/${DIMENSIONS}/${DIMENSIONS}/dog`;
const URL_CAT = `https://loremflickr.com/${DIMENSIONS}/${DIMENSIONS}/cat`;

function App() {
  const classes = useStyles();

  const [imageCollection, setImageCollection] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize an array of random images
  // TODO: We should verify that at least 1 distractor was loaded
  // or else there will be a corner case where zero dogs are loaded
  useEffect(() => {
    console.log("useEffect...");
    const loadImages = async () => {
      const images = [];
      for (let i = 0; i < LENGTH_IMAGES; i++) {
        const isDog = Math.random() < 0.5;
        const url = isDog ? URL_DOG : URL_CAT;
        console.log("url: " + url);

        const response = await fetch(url);
        const imageSource = response.url;
        const isCorrectSelected = false;
        const representation = {
          imageSource,
          isDog,
          index: i,
          isCorrectSelected,
        };
        images.push(representation);
      }
      setImageCollection(images);
    };
    loadImages();
  }, []);

  // When user presses an image, reverse one category to the other
  const handleImagePress = async (index) => {
    const images = [...imageCollection];
    const pressed = images[index];
    const oldIsDog = pressed.isDog;
    const url = oldIsDog ? URL_CAT : URL_DOG;
    const response = await fetch(url);
    pressed.imageSource = response.url;
    pressed.isDog = !oldIsDog;
    setImageCollection(images);
  };

  // Evaluate if user succeeded
  const handleSubmitPress = () => {
    let isSuccess = true;
    console.log("Evaluate before: " + isSuccess);
    imageCollection.forEach((image) => {
      console.log("Evaluate image: " + image.index + "?" + image.isDog);
      if (image.isDog) {
        isSuccess = false;
      }
    });
    console.log("Evaluate after: " + isSuccess);
    if (isSuccess) {
      setIsSuccess(true);
    }
  };

  return (
    <Container className={classes.main}>
      {isSuccess
        ? (
          <Typography variant="h4" component="h1">Thanks, you selected all dogs</Typography>
        )
        : (
          <div>
            <Typography variant="h4" component="h1" className={classes.heading}>Select all dogs</Typography>
            <Grid container spacing={1}>
              {imageCollection.map((image) => (
                <Grid item xs={4} key={image.index}>
                  <Tooltip
                    title={
                      image.isDog
                        ? `Dog at ${image.index}`
                        : `Cat at ${image.index}`
                    }
                  >
                    <img
                      src={image.imageSource}
                      onClick={() => handleImagePress(image.index)}
                      alt={image.isDog ? "dog" : "cat"}
                    />
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
            <div className={classes.footer}>
              <div></div>
              <Button
                onClick={handleSubmitPress}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    color: theme.palette.text.primary,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    width: DIMENSION_GRID,
  },
  heading: {
    // margin: 0,
    paddingBottom: theme.spacing(3),
  },
  footer: {
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
}));

export { App };
