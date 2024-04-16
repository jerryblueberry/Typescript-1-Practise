import express, { Express, Request, Response } from "express";
import cron from "node-cron";
import "dotenv/config";

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json("Error Occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

// Schedule a cron job to log "hi" every 10 seconds
cron.schedule("*/10 * * * * *", () => {
  console.log("hi");
});
