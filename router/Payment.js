import express from "express";
import Payment from "../controller/Payment.js";

const router = express.Router();
const {
    create,
    getPaymentById,
    getPaymentByUser,
    getPaymentOfUserTruck,
    listOfPayments
} = new Payment();

router.post("/create", create);
router.get("/:id", getPaymentById);
router.get("/list", listOfPayments);
router.get("/user/:userId", getPaymentByUser);
router.get("/truck-owner/:userId", getPaymentOfUserTruck);

export default router;
