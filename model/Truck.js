import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    truckNumber: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    driver: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    capacity: { 
        type: Number, 
        required: true,
        min: 1,
        default: 1
    },
    truckType: { 
        type: String,
        enum: ["small", "medium", "heavy"], 
        required: true,
        lowercase: true
    },

    status: {
        type: String,
        enum: ["available", "on-delivery", "maintenance", "unavailable"],
        default: "available"
    },

    // NEW FIELD: To track truck assignment
    assignedOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null
    }
}, { timestamps: true });

const Truck = mongoose.model('Truck', truckSchema);
export default Truck;