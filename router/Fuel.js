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

router.post("/create", create(req, res));
router.get("/getById/:id", getById(req, res));
router.get("/listOfFuel", listOfFuel(req, res));
router.get("/driver/:truckNumber", getByTruckNo(req, res));
router.put("/updateFuel/:id", updateFuelEntry(req, res));
router.get("/date/:date", getByDate(req, res));

export default router;
