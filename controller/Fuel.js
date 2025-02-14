import FuelDB from '../model/Fuel.js';
import Truck from '../model/Truck.js';
import Driver from '../model/Driver.js';

export default class FuelController {
    async create(req, res) {
        try {
            const { truck_id, driver_id, fuel_liters, cost, location } = req.body;

            const truck = await Truck.findById(truck_id);
            if (!truck) return res.status(404).json({ message: "Truck not found" });

            const driver = await Driver.findById(driver_id);
            if (!driver) return res.status(404).json({ message: "Driver not found" });

            const fuelEntry = await FuelDB.create({ ...req.body });

            res.status(201).json(fuelEntry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const fuelEntry = await FuelDB.findById(id);
            if (!fuelEntry) return res.status(404).json({ message: "Fuel entry not found" });

            res.status(200).json(fuelEntry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async listOfFuel(req, res) {
        try {
            const fuelEntries = await FuelDB.find().populate('truck_id driver_id');
            res.status(200).json(fuelEntries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByTruckNo(req, res) {
        try {
            const { truckNumber } = req.params;
            const truck = await Truck.findOne({ truckNumber });
            if (!truck) return res.status(404).json({ message: "Truck not found" });

            const fuelEntries = await FuelDB.find({ truck_id: truck._id });
            res.status(200).json(fuelEntries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateFuelEntry(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const fuelEntry = await FuelDB.findByIdAndUpdate(id, updatedData, { new: true });
            if (!fuelEntry) return res.status(404).json({ message: "Fuel entry not found" });

            res.status(200).json(fuelEntry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByDate(req, res) {
        try {
            const { date } = req.params;
            const fuelEntries = await FuelDB.find({ date: new Date(date) });
            res.status(200).json(fuelEntries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
