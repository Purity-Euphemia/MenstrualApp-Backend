const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cycleSettings: {
        startDate: String,
        cycleLength: {type: Number, default: 28},
        periodLength: {type: Number, default: 5},
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);