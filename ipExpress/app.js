import express from "express";
import { readCSVfile, findLocation, ipReceiver, getIP } from "./IPaddresses.js";

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(findLocation(getIP(req), readCSVfile()));
//   next();
// });

app.get("/location", (req, res) => {
  ipReceiver().then((resp) => res.send(findLocation(resp, readCSVfile())));
});
app.get("/ip" , (req, res) => {
  res.send(findLocation(getIP(req), readCSVfile()))
})


export default app;
