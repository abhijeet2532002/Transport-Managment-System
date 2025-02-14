import express from "express";
import Maintenance from "../controller/Maintenance.js";

const router = express.Router();
const {
    create,
    getByTruckNo,
    listOfAllTrucks,
    updateMaintenanceStatus
} = new Maintenance();

router.post("/create", create);
router.get("/truck/:truckNo", getByTruckNo);
router.get("/list", listOfAllTrucks)

export default router;