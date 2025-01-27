// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     paymentStatus: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    paymentStatus: { type: Boolean, default: false },
    businessDetails: {
        name: { type: String, default: '' },
        type: { type: String, enum: ["Non-profit", "For-profit", "Startup"], default: 'Non-profit' },
        size: { type: String, default: '' },
        sector: { type: String, default: '' },
    },
    location: {
        country: { type: String, default: '' },
        state: { type: String, default: '' },
        city: { type: String, default: '' },
    },
    grantObjectives: {
        purpose: { type: String, default: '' },
        fundingAmount: { type: Number, default: 0 },
    },
    eligibilityDetails: {
        yearsInOperation: { type: Number, default: 0 },
        registrationStatus: { type: String, default: '' },
    },
    specialCriteria: {
        minorityOwnership: { type: Boolean, default: false },
        impactFocus: { type: Boolean, default: false },
        projectDeadline: { type: Date, default: null },
    },
});

module.exports = mongoose.model("User", userSchema);
