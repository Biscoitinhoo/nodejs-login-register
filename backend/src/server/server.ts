import "reflect-metadata";
import express from "express";

import routes from "../routes";

import "../database";

const app = express();

app.use(express.json());
/* Send to all routes */
app.use(routes);

app.listen(3333, () => {
  console.log("Back-end server just started.");
});
