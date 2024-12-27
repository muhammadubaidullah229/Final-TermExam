const Attraction = require('../Models/Attraction');

// Create a new attraction
exports.createAttraction = async (req, res) => {
    try {
        const { name, location, entryFee, rating } = req.body;

        const attraction = new Attraction({
            name,
            location,
            entryFee,
            rating
        });

        await attraction.save();
        res.status(201).send(attraction);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all attractions
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.send(attractions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single attraction by ID
exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) return res.status(404).send({ error: 'Attraction not found' });
        res.send(attraction);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an attraction by ID
exports.updateAttraction = async (req, res) => {
    try {
        const { name, location, entryFee, rating } = req.body;

        const attraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            { name, location, entryFee, rating },
            { new: true, runValidators: true }
        );

        if (!attraction) return res.status(404).send({ error: 'Attraction not found' });

        res.send(attraction);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an attraction by ID
exports.deleteAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) return res.status(404).send({ error: 'Attraction not found' });
        res.send(attraction);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTopRatedAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.send(attractions);
    } catch (error) {
        res.status(500).send(error);
    }
};