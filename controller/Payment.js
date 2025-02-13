import PaymentDB from "../model/Payment.js";
import Order from "../model/Order.js";

export default class PaymentController {
    // Create a new payment
    async create(req, res) {
        try {
            const { order_id} = req.body;

            const order = await Order.findById(order_id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Create new payment record
            const payment = await PaymentDB.create(req.body);

            res.status(201).json({ message: "Payment successful", payment });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get payment by ID
    async getPaymentById(req, res) {
        try {
            const { id } = req.params;
            const payment = await PaymentDB.findById(id).populate("order_id customer_id");

            if (!payment) {
                return res.status(404).json({ message: "Payment not found" });
            }

            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // List all payments
    async listOfPayments(req, res) {
        try {
            const payments = await PaymentDB.find().populate("order_id customer_id");
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get payments by user ID
    async getPaymentByUser(req, res) {
        try {
            const { userId } = req.params;
            const payments = await PaymentDB.find({ customer_id: userId }).populate("order_id customer_id");

            if (!payments.length) {
                return res.status(404).json({ message: "No payments found for this user" });
            }

            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get payments for a specific user's truck
    async getPaymentOfUserTruck(req, res) {
        try {
            const { userId } = req.params;

            // Find all orders that belong to the user's trucks
            const orders = await Order.find({ truckOwner: userId });
            const orderIds = orders.map(order => order._id);

            const payments = await PaymentDB.find({ order_id: { $in: orderIds } }).populate("order_id customer_id");

            if (!payments.length) {
                return res.status(404).json({ message: "No payments found for this truck owner" });
            }

            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}
