import express from "express";
import Driver from "../controller/Driver.js";

const router = express.Router();
const {
    registerDriver,
    assignDriverToTruck,
    deleteDriver,
    getDriverByLicenseNumber,
    listDrivers,
    trackDriver,
    updateDriver
} = new Driver();

router.post("/register", registerDriver);
router.get("/license/:licenseNumber", getDriverByLicenseNumber);
router.put("/update/:id", updateDriver);
router.delete("/delete/:id", deleteDriver);
router.get("/list", listDrivers);
router.post("/assign", assignDriverToTruck);
router.get("/track/:driverId", trackDriver);

export default router;