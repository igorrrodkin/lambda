import mongodb from "mongodb";
import { config } from "dotenv";
const { MongoClient } = mongodb;
config({ path: "./.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);
const client = new MongoClient(DB);

const DBconnect = async () => {
  try {
    await client.connect();
    const collection = client.db("lambdatest").collection("jsonstorage");
    console.log("Connected to DB");
    return collection
  } catch (e) {
    console.log(e);
  }
};

export default DBconnect;
