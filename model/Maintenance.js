import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
    truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
    maintenance_type: {
        type: String,
        enum: ['Routine Check', 'Repair', 'Major Overhaul'],
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    maintenance_date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String
    }
}, { timestamps: true }
);

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);
export default Maintenance;