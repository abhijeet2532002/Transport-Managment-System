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

router.post("/create", create(req, res));
router.get("/:id", getPaymentById(req, res));
router.get("/list", listOfPayments(req, res));
router.get("/user/:userId", getPaymentByUser(req, res));
router.get("/truck-owner/:userId", getPaymentOfUserTruck(req, res));

export default router;
