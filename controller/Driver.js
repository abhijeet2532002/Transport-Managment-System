import DriverDB from '../model/Driver.js';
import TruckDB from '../model/Truck.js';
import UserDB from '../model/User.js';

export default class Driver {
    async registerDriver(req, res) {
        try {
            const user = await UserDB.findById(req.body.user_id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const driver = await DriverDB.create(req.body);
            user.driver = driver._id;
            await user.save();

            res.status(201).json({ message: "Driver registered successfully", driver });
        } catch (error) {
            res.status(500).json({ message: "Error registering driver", error: error.message });
        }
    }

    async getDriverByLicenseNumber(req, res) {
        try {
            const { licenseNumber } = req.params;
            const driver = await DriverDB.findOne({ license_number: licenseNumber });

            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            // Ensure driver.user_id exists before converting to string
            if (
                req.user.userRole !== "admin" &&
                req.user.userId.toString() !== driver.user_id.toString()
            ) {
                return res.status(403).json({ message: "Unauthorized user" });
            }

            res.status(200).json(driver);
        } catch (error) {
            res.status(500).json({ message: "Error fetching driver", error: error.message });
        }
    }

    async updateDriver(req, res) {
        try {
            if (req.user.userRole !== "admin") {
                return res.status(403).json({ message: "Unauthorized user" });
            }

            const { id } = req.params;
            const updatedDriver = await DriverDB.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedDriver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json({ message: "Driver updated successfully", updatedDriver });
        } catch (error) {
            res.status(500).json({ message: "Error updating driver", error: error.message });
        }
    }

    async deleteDriver(req, res) {
        try {
            const { id } = req.params;

            const deletedDriver = await DriverDB.findByIdAndDelete(id);

            if (!deletedDriver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            res.status(200).json({ message: "Driver deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting driver", error: error.message });
        }
    }


    async listDrivers(req, res) {
        try {
            const drivers = await DriverDB.find();
            res.status(200).json(drivers);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving drivers", error: error.message });
        }
    }

    async assignDriverToTruck(req, res) {
        try {
            if (req.user.userRole !== "admin") {
                return res.status(403).json({ message: "Unauthorized user" });
            }

            const { driverId, truckId } = req.body;
            const driver = await DriverDB.findById(driverId);
            const truck = await TruckDB.findById(truckId);

            if (!driver || !truck) {
                return res.status(404).json({ message: "Driver or Truck not found" });
            }

            if (driver.assigned_truck_id || truck.driver) {
                return res.status(400).json({ message: "Driver or Truck is already assigned" });
            }

            driver.assigned_truck_id = truckId;
            truck.driver = driverId;
            driver.availability_status = "On Trip";
            await driver.save();
            await truck.save();

            res.status(200).json({ message: "Driver assigned to truck successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error assigning driver to truck", error: error.message });
        }
    }

    async trackDriver(req, res) {
        try {
            const { driverId } = req.params;
            const driver = await DriverDB.findById(driverId);

            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json({ status: driver.availability_status });
        } catch (error) {
            res.status(500).json({ message: "Error tracking driver", error: error.message });
        }
    }
}