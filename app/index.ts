import express, { Express, Request, Response } from "express";
import path from "path";
// import cron from "node-cron";
import "dotenv/config";
import { connectDb } from "./database/db-connect";
//  for the routes
import User from "./routes/user-route";

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/files", express.static(path.join(__dirname, "../files")));

//  for the routes
app.use("/user", User); // User intitial path;

app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json("Error Occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
  connectDb();
});

// // Schedule a cron job to log "hi" every 10 seconds
// cron.schedule("*/10 * * * * *", () => {
//   console.log("hi");
// });
