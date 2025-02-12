import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    truckNumber: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    capacity: {
        type: Number,
        required: true
    }, 
    truckType: {
        type: String,
        enum: ["small", "medium", "heavy"],
        required: true
    },
    status: {
        type: String,
        enum: ["available", "in-transit", "maintenance"],
        default: "available"
    }
}, {
    timestamps: true
});

const Truck = mongoose.model('Truck', truckSchema);
export default Truck;