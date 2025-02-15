import express from "express";
import Middleware from "../config/AuthMiddleware.js";
import Truck from "./Truck.js";
import User from "./User.js";
import Driver from "./Driver.js";
import Order from "./Order.js";
import Payment from "./Payment.js";
import Maintenance from "./Maintenance.js";
import Fuel from "./Fuel.js";

const router = express.Router();
const { Auth } = new Middleware();

router.use("/user", User);
router.use("/truck", Truck);
router.use("/order", Auth, Order);
router.use("/fuel", Auth, Fuel);
router.use("/payment", Auth, Payment);
router.use("/maintenance", Auth, Maintenance);
router.use("/driver", Auth, Driver);

export default router;