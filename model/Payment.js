import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Cash'],
        required: true
    }
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
