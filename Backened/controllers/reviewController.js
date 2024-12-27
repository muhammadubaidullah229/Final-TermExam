const Review = require('../Models/Review');
const Visitor = require('../Models/Visitor');
const Attraction = require('../Models/Attraction');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { attraction, visitor, score, comment } = req.body;

        // Check if the visitor and attraction exist
        const attractionDoc = await Attraction.findById(attraction);
        const visitorDoc = await Visitor.findById(visitor);

        if (!attractionDoc || !visitorDoc) {
            return res.status(400).send({ error: 'Invalid Attraction or Visitor ID' });
        }

        // Create the review
        const review = new Review({ attraction, visitor, score, comment });
        await review.save();

        res.status(201).send(review);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ error: 'Visitor has already reviewed this attraction' });
        }
        res.status(400).send(error);
    }
};

// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('attraction')  // Populate the attraction field
            .populate('visitor');    // Populate the visitor field
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('attraction')  // Populate the attraction field
            .populate('visitor');    // Populate the visitor field

        if (!review) return res.status(404).send({ error: 'Review not found' });
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('attraction')  // Populate the attraction field
            .populate('visitor');    // Populate the visitor field

        if (!review) return res.status(404).send({ error: 'Review not found' });
        res.send(review);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).send({ error: 'Review not found' });
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
};
