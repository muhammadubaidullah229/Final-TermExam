const Visitor = require('../Models/Visitor');
const mongoose = require('mongoose');

exports.createVisitor = async (req, res) => {
    try {
        const { name, email, visitedAttractions } = req.body;

        // Validate and convert visitedAttractions to ObjectId
        const attractionIds = visitedAttractions.map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid Attraction ID');
            }
            return new mongoose.Types.ObjectId(id);
        });

        const visitor = new Visitor({
            name,
            email,
            visitedAttractions: attractionIds
        });

        await visitor.save();
        res.status(201).send(visitor);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions');
        res.send(visitors);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id).populate('visitedAttractions');
        if (!visitor) return res.status(404).send({ error: 'Visitor not found' });
        res.send(visitor);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!visitor) return res.status(404).send({ error: 'Visitor not found' });
        res.send(visitor);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) return res.status(404).send({ error: 'Visitor not found' });
        res.send(visitor);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getVisitorActivity = async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            { $unwind: "$visitedAttractions" },
            { $group: { _id: "$_id", name: { $first: "$name" }, count: { $sum: 1 } } }
        ]);
        res.send(visitors);
    } catch (error) {
        res.status(500).send(error);
    }
};