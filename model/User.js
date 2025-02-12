import mongoose from "mongoose";
import Validator from "../config/ValidatorMiddleware.js";
const { emailValidator, usernameValidator, validatePhone } = new Validator();

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, "Username is required..."],
        unique: true,
        validate: {
            validator: (value) => usernameValidator(value),
            message: "Username cannot be in email format"
        }
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required..."],
        unique: true,
        validate: {
            validator: (value) => emailValidator(value),
            message: "Invalid email Id format"
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    authToken: {
        type: String,
        trim: true
    },
    userRole: {
        type: String,
        required: true,
        enum: ["customer", "driver", "truckOwner", "admin"],
        default: 'customer'
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Phone number is required..."],
        unique: true,
        validate: {
            validator: (value) => validatePhone(value),
            message: "Invalid phone number format",
        }
    },
    address: {
        type: String,
        required: true
    },
    truckDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck",
        default: null
    }],
    assignedTruck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck",
        default: null
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;