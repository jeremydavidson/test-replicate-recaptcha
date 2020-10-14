const express = require("express");
const app = express();
const CONTENT_TYPE_HEADER = "Content-Type";
const CONTENT_TYPE = "application/json";

app.get("/api/hello", async (request, response) => {
  const config = {
    hello: "Hello!",
  };
  response.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE);
  response.send(config);
});
