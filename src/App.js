import React, { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";

const LENGTH_IMAGES = 9;
export const DIMENSION_IMAGE = 200;
const DIMENSION_GRID_SPACING = 26;
const DIMENSION_GRID = DIMENSION_IMAGE * 3 + DIMENSION_GRID_SPACING * 4;
const URL_KEY = `https://loremflickr.com/${DIMENSION_IMAGE}/${DIMENSION_IMAGE}/cat`;
const URL_DISTRACTOR = `https://loremflickr.com/${DIMENSION_IMAGE}/${DIMENSION_IMAGE}/newyork,snow`;
export const LABEL_KEY = "cats";

function App() {
  const classes = useStyles();

  const [imageCollection, setImageCollection] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  // Initialize an array of random images.
  // Track at lesat 1 key image is loaded.
  useEffect(() => {
    let isKeyLoaded = false;
    const loadImages = async () => {
      console.log("loadImages");
      const images = [];
      for (let i = 0; i < LENGTH_IMAGES; i++) {
        const random = Math.random();
        const isKey = random < 0.5;
        console.log("loadImages " + random + " ? " + isKey);
        if (isKey) {
          isKeyLoaded = true;
        }
        const url = isKey ? URL_KEY : URL_DISTRACTOR;

        //`${url}?random=${random}`
        const response = await fetch(url);
        const imageSource = response.url;
        const representation = {
          imageSource,
          isKey,
          index: i,
        };
        images.push(representation);
      }
      setImageCollection(images);
    };
    const load = async () => {
      // Load images until at least 1 key is loaded.
      while (!isKeyLoaded) {
        await loadImages();
      }
      setIsLoading(false);
    };
    load();
  }, []);

  // When user presses an image, reverse one category to the other
  const handleImagePress = async (index) => {
    const images = [...imageCollection];
    const pressed = images[index];
    const wasKey = pressed.isKey;
    const url = wasKey ? URL_DISTRACTOR : URL_KEY;
    const response = await fetch(url);
    pressed.imageSource = response.url;
    pressed.isKey = !wasKey;
    setImageCollection(images);
    evaluate(images);
  };

  // Evaluate if ready to submit
  const evaluate = (images) => {
    let isReady = true;
    images.forEach((image) => {
      if (image.isKey) {
        isReady = false;
      }
    });
    setIsReadyToSubmit(isReady);
  };

  // Submit and evaluate success
  const handleSubmitPress = () => {
    setIsSubmitAttempted(true);
    if (isReadyToSubmit) {
      setIsSuccess(true);
    }
  };

  return (
    <Container className={classes.main}>
      {isLoading && (
        <div className={classes.flexible}>
          <Typography variant="h4" component="h1" className={classes.heading}>
            Loading...
          </Typography>
          <CircularProgress />
        </div>
      )}
      {!isLoading && isSuccess && (
        <Typography variant="h4" component="h1" className={classes.heading}>
          Thanks, you selected all {LABEL_KEY}
        </Typography>
      )}
      {!isLoading && !isSuccess && (
        <Card className={classes.card}>
          <Typography variant="h4" component="h1" className={classes.heading}>
            Select all {LABEL_KEY}
          </Typography>
          <Grid container spacing={1}>
            {imageCollection.map((image) => (
              <Grid item xs={4} key={image.index}>
                <Tooltip
                  title={
                    image.isKey
                      ? `${LABEL_KEY} at ${image.index}`
                      : `distractor at ${image.index}`
                  }
                >
                  <img
                    src={image.imageSource}
                    onClick={() => handleImagePress(image.index)}
                    alt={image.isKey ? LABEL_KEY : "distractor"}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
          <div className={classes.flexible}>
            <div>
              {isSubmitAttempted && !isSuccess && !isReadyToSubmit && (
                <Typography>
                  You still have more {LABEL_KEY} to select...
                </Typography>
              )}
              {isReadyToSubmit && !isSuccess && (
                <Typography>You are ready to submit...</Typography>
              )}
            </div>
            <Button
              onClick={handleSubmitPress}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </Card>
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
  flexible: {
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    padding: theme.spacing(2),
  },
}));

export { App };
