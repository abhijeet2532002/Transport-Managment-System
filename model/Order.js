import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck",
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        default: null
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
        default: "pending"
    },
    estimatedDeliveryTime: {
        type: Date,
        default: null
    },
    totalCost: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
