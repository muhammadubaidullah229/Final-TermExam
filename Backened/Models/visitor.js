const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    visitedAttractions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
