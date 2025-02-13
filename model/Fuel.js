import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
    truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    fuel_liters: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

const Fuel = mongoose.model('Fuel', fuelSchema);
export default Fuel;