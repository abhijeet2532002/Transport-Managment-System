import TruckDB from '../model/Truck.js';
import UserDB from '../model/User.js';

export default class Truck {
    async registerTruck(req, res) {
        try {
            // Find user by ID
            const user = await UserDB.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Create new truck
            const registerTruck = await TruckDB.create({ ...req.body, owner: user._id });

            // Push truck reference to user's truckDetails array
            user.truckDetails.push(registerTruck._id);
            await user.save(); // Ensure data consistency

            return res.status(201).json({
                message: "Truck registered successfully",
                truck: registerTruck
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getTruckByNumber(req, res) {
        try {
            const { number } = req.params; // Extract truck number from params

            // Find the truck by number and populate owner details
            const truckDetails = await TruckDB.findOne({ truckNumber: number }).populate("owner", "-_id userName phone");

            if (!truckDetails) {
                return res.status(404).json({ message: "Truck not found" });
            }

            // Check if the user is an admin or owns the truck
            if (req.user.userRole === "admin" || truckDetails.owner._id.toString() === req.user.userId.toString()) {
                console.log("\n\nAbhijeet");
                return res.status(200).json({ message: "Truck Info", truckDetails });
            }

            // If unauthorized, send a 403 Forbidden response
            return res.status(403).json({ message: "Unauthorized User to find the truck details" });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllTrucks(req, res) {
        try {
            if (req.user.userRole !== "admin")
                return res.status(403).json({ message: "Invalid user" });

            const truckInfo = await TruckDB.find().populate("owner", "_id userName phone");

            return res.status(200).json(truckInfo.length ? truckInfo : { message: "No trucks found" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getTrucksDetailsByUser(req, res) {
        try {
            if (req.user.userRole === "admin" && req.params.id === req.user.UserId) {
                const truckInfo = await UserDB.findById(req.params.id).populate("truckDetails", "-_id");

                if (!truckInfo)
                    return res.status(404).json({ message: "User has no trucks" });

                return res.status(200).json({ message: "Truck Details", truckInfo });
            } else
                return res.status(401).json({ message: "Unauthorized user" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateTruck(req, res) {
        try {

        } catch (error) {

        }
    }

    async deleteTruck(req, res) {
        try {

            const removeTruck = await TruckDB.findOneAndDelete({ truckNumber: number });
            if (!removeTruck)
                return res.json({ message: "Truck not available with this number" });


        } catch (error) {

        }
    }
}