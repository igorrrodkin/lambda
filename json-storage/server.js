import express from "express";
import { config } from "dotenv";
import DBconnect from "./dbConnection.js";
import { postRequest, getRequest } from "./index.js";
config({ path: "./.env" });

const port = process.env.PORT;
const app = express();
let collection;
app.use(express.json());

app.use((req, res, next) => {
  console.log("endpoint", req.originalUrl);
  next();
});

app.get("/*", async (req, res) => res.send(await getRequest(req, collection)));
app.post("/*", async (req, res) =>
  res.send(await postRequest(req, collection))
);

app.listen(port, async () => {
  console.log(`App is running on port ${port}`);
  collection = await DBconnect();
});
