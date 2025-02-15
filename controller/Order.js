import OrderDB from '../model/Order.js';
import UserDB from '../model/User.js';
import TruckDB from '../model/Truck.js';
import DriverDB from '../model/Driver.js'

export default class OrderController {
    async createOrder(req, res) {
        try {
            console.log(req.body);

            const { customer, truck, pickupLocation, dropoffLocation, totalCost } = req.body;

            if (!customer || !truck || !pickupLocation || !dropoffLocation || !totalCost) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const existingUser = await UserDB.findById(customer);
            if (!existingUser) {
                return res.status(404).json({ message: "Customer not found" });
            }

            const newOrder = await OrderDB.create({ customer, truck, pickupLocation, dropoffLocation, totalCost });
            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await OrderDB.findById(req.params.id).populate(['truck', 'customer', 'driver']);
            if (!order) return res.status(404).json({ message: "Order not found" });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: "Error fetching order", error: error.message });
        }
    }

    async assignTruck(req, res) {
        try {
            const { truck } = req.body;
            const { id: orderId } = req.params;

            const existingTruck = await TruckDB.findById(truck);
            if (!existingTruck || existingTruck.status !== "available") {
                return res.status(400).json({ message: "Truck not available" });
            }

            const updatedOrder = await OrderDB.findByIdAndUpdate(orderId, { truck }, { new: true });
            res.status(200).json({ message: "Truck assigned successfully", order: updatedOrder });
        } catch (error) {
            res.status(500).json({ message: "Error assigning truck", error: error.message });
        }
    }

    async assignDriver(req, res) {
        try {
            const { driver } = req.body;
            const { id: orderId } = req.params;

            const existingDriver = await UserDB.findById(driver);
            if (!existingDriver || existingDriver.userRole !== "driver" || existingDriver.driverStatus !== "available") {
                return res.status(400).json({ message: "Driver not available" });
            }

            const updatedOrder = await OrderDB.findByIdAndUpdate(orderId, { driver }, { new: true });
            await DriverDB.findByIdAndUpdate(driver, { availability_status: "On Trip" });
            res.status(200).json({ message: "Driver assigned successfully", order: updatedOrder });
        } catch (error) {
            res.status(500).json({ message: "Error assigning driver", error: error.message });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const order = await OrderDB.findByIdAndUpdate(req.params.id, { bookingStatus: req.body.status }, { new: true });
            res.status(200).json({ message: "Order status updated successfully", order });
        } catch (error) {
            res.status(500).json({ message: "Error updating order status", error: error.message });
        }
    }

    async trackOrder(req, res) {
        try {
            const order = await OrderDB.findById(req.params.id).populate('truck');
            if (!order) return res.status(404).json({ message: "Order not found" });
            res.status(200).json({ location: order.truck?.location || "Tracking data unavailable" });
        } catch (error) {
            res.status(500).json({ message: "Error tracking order", error: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await OrderDB.find().populate(['truck', 'customer', 'driver']);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    }
}