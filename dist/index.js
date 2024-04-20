"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cron from "node-cron";
require("dotenv/config");
const db_connect_1 = require("./database/db-connect");
//  for the routes
const user_route_1 = __importDefault(require("./routes/user-route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//  for the routes
app.use("/user", user_route_1.default); // User intitial path;
app.get("/", (req, res) => {
    try {
        res.send("Hello World");
    }
    catch (error) {
        res.status(500).json("Error Occurred");
    }
});
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
    (0, db_connect_1.connectDb)();
});
// // Schedule a cron job to log "hi" every 10 seconds
// cron.schedule("*/10 * * * * *", () => {
//   console.log("hi");
// });
