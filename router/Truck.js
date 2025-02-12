import express from "express";
import Truck from "../controller/Truck.js";

const router = express.Router();
const { registerTruck, getTruckByNumber, getAllTrucks, getTrucksDetailsByUser, deleteTruck, updateTruck } = new Truck();

router.post("/register", registerTruck);
router.get("/getByNumber/:number", getTruckByNumber);
router.get("/getAll", getAllTrucks);
router.get("/getDetailsByUser/:id", getTrucksDetailsByUser);
router.delete("/delete/:number", deleteTruck);
router.put("/update", updateTruck);

export default router;