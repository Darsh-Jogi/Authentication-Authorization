import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastlogin : {
        type: Date,
        default: Date.now
    },
    isverified : {
        type: Boolean,
        default: false
    },
    resetpasswordtoken : {
        type: String
    },
    resetpasswordexpires : {
        type: Date
    },
    verificationtoken : {
        type: String
    },
    verificationtokenexpires : {
        type: Date
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);