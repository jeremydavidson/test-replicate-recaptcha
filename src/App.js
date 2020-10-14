import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>
        <h1>Hello</h1>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    width: "50%",
  },
}));

export { App };
