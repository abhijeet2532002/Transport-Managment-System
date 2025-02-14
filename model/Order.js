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
        ref: "User",
        default: null
    },
    pickupLocation: {
        address: {
            type:
                String,
            required: true
        },
        coordinates: {
            lat: {
                type:
                    Number,
                required: true
            },
            lng: {
                type:
                    Number,
                required: true
            }
        }
    },
    dropoffLocation: {
        address: {
            type:
                String,
            required: true
        },
        coordinates: {
            lat: {
                type:
                    Number,
                required: true
            },
            lng: {
                type:
                    Number,
                required: true
            }
        }
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