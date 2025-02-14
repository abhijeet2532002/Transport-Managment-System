import express from "express";
import Order from "../controller/Order.js"; // Ensure correct path

const router = express.Router();
const {
    assignDriver,
    assignTruck,
    createOrder,
    getAllOrders,
    getOrderById,
    trackOrder,
    updateOrderStatus
} = new Order(); // Instantiate the class

router.post("/create", createOrder);
router.get("/:id", getOrderById);
router.put("/assign-truck/:id", assignTruck);
router.put("/assign-driver/:id", assignDriver);
router.put("/status/:id", updateOrderStatus);
router.get("/track/:id", trackOrder);
router.get("/", getAllOrders);

export default router;
