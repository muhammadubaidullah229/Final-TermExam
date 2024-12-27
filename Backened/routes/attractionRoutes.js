const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/attractionController');

// Create a new attraction
router.post('/', AttractionController.createAttraction);

// Get all attractions
router.get('/', AttractionController.getAllAttractions);

// Get a single attraction by ID
router.get('/:id', AttractionController.getAttractionById);

// Update an attraction by ID
router.put('/:id', AttractionController.updateAttraction);

// Delete an attraction by ID
router.delete('/:id', AttractionController.deleteAttraction);

module.exports = router;
