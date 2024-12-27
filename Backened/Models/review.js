const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: [1, 'Score must be at least 1'],
        max: [5, 'Score must be at most 5']
    },
    comment: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Ensure a visitor cannot review the same attraction twice
reviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
