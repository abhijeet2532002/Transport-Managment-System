import express from "express";
import Middleware from "../config/AuthMiddleware.js";
import Truck from "./Truck.js";
import User from "./User.js";

const router = express.Router();
const { Auth } = new Middleware();

router.use("/user", User);
router.use("/truck", Auth, Truck);

export default router;