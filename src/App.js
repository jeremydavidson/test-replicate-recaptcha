import React from "react";
import "./App.css";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const classes = useStyles();
  return (
    <div>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          Hello
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Here is some content
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  card: {
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
  },
}));

export { App };
