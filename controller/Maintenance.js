import MaintenanceDB from "../model/Maintenance.js";
import Truck from "../model/Truck.js";

export default class MaintenanceController {
    // Create a new maintenance record
    async create(req, res) {
        try {
            const { truck_id, maintenance_type, cost, remarks } = req.body;

            const truck = await Truck.findById(truck_id);
            if (!truck) {
                return res.status(404).json({ message: "Truck not found" });
            }

            const maintenance = await MaintenanceDB.create({ truck_id, maintenance_type, cost, remarks, status: "maintenance" });

            res.status(201).json({ message: "Maintenance record created successfully", maintenance });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get maintenance records by truck number
    async getByTruckNo(req, res) {
        try {
            const { truckNo } = req.params;
            const truck = await Truck.findOne({ truckNumber: truckNo });
            if (!truck) {
                return res.status(404).json({ message: "Truck not found" });
            }

            const maintenanceRecords = await MaintenanceDB.find({ truck_id: truck._id });
            res.status(200).json(maintenanceRecords);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // List all maintenance records
    async listOfAllTrucks(req, res) {
        try {
            const records = await MaintenanceDB.find().populate("truck_id");
            res.status(200).json(records);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Update maintenance status
    async updateMaintenanceStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const maintenance = await MaintenanceDB.findById(id);
            if (!maintenance) {
                return res.status(404).json({ message: "Maintenance record not found" });
            }

            const truck = await Truck.findById(maintenance.truck_id);
            if (!truck) {
                return res.status(404).json({ message: "Truck not found" });
            }

            truck.status = status;
            await truck.save();

            res.status(200).json({ message: "Maintenance status updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}
