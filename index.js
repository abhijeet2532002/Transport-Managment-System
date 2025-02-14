import express from "express";
import dotenv from "dotenv";
import DB from "./config/DB_Config.js";
import Gateway from "./router/Gateway.js"; // Ensure this path is correct
import cors from 'cors';

dotenv.config();

const app = express(); // ✅ Define the express app
const port = process.env.port ;
app.use(cors())

app.use(express.json()); // ✅ Middleware to parse JSON requests
app.use("/api", Gateway); // ✅ Use `app` instead of `router`

app.listen(port, () => {
    console.log(`App is successfully running on port number ${port}`);
});
