import express from "express";
import Fuel from "../controller/Fuel.js";

const router = express.Router();
const {
    create,
    getByDate,
    getById,
    getByTruckNo,
    listOfFuel,
    updateFuelEntry
} = new Fuel();

router.post("/create", create);
router.get("/getById/:id", getById);
router.get("/listOfFuel", listOfFuel);
router.get("/driver/:truckNumber", getByTruckNo);
router.put("/updateFuel/:id", updateFuelEntry);
router.get("/date/:date", getByDate);

export default router;