import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    license_number: {
        type: String,
        required: true,
        unique: true
    },
    assigned_truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: false
    },
    availability_status: {
        type: String,
        enum: ['Available', 'On Trip', 'Inactive'],
        default: 'Available'
    },
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;