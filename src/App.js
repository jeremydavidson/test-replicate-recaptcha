import React, { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Tooltip } from "@material-ui/core";

const LENGTH_IMAGES = 9;
const URL_DOG = `https://loremflickr.com/200/200/dog`;
const URL_CAT = `https://loremflickr.com/200/200/cat`;

function App() {
  const classes = useStyles();

  const [imageCollection, setImageCollection] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize an array of random images
  // TODO: We should verify that at least 1 distractor was loaded
  // or else there will be a corner case where zero dogs are loaded
  useEffect(() => {
    const loadImages = async () => {
      const images = [];
      for (let i = 0; i < LENGTH_IMAGES; i++) {
        const isDog = Math.round(Math.random());
        const url = isDog ? URL_DOG : URL_CAT;
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
    imageCollection.forEach((image) => {
      if (image.isDog) {
        isSuccess = false;
      }
    });
    if (isSuccess) {
      setIsSuccess(true);
    }
  };

  return (
    <div className={classes.main}>
      {isSuccess ? (
        <h1>Thanks, you selected all dogs</h1>
      ) : (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10}>
              <h1 className={classes.heading}>Select all dogs</h1>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                onClick={handleSubmitPress}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
                    alt=""
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    width: 636,
  },
  heading: {
    margin: 0,
  },
}));

export { App };
