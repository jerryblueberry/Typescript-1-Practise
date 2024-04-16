"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
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
});
