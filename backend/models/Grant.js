const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema({
    grantName: { type: String, required: true },
    fundingAmount: { type: Number, required: true },
    applicationDeadline: { type: Date, required: true },
    eligibilityRequirements: {
        businessType: { type: String, enum: ["Non-profit", "For-profit", "Startup"], required: true },
        sector: { type: String, required: true },
        location: {
            country: { type: String, required: true },
            state: { type: String, required: true },
            city: { type: String, required: true },
        },
        fundingPurpose: { type: String, required: true },
        minYearsInOperation: { type: Number, required: true },
        registrationStatus: { type: String, required: true },
    },
    specialCriteria: {
        minorityOwned: { type: Boolean, required: true },
        environmentalFocus: { type: Boolean, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

const Grant = mongoose.model("Grant", grantSchema);

module.exports = Grant;
