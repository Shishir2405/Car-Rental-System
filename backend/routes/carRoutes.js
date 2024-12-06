const express = require('express');
const router = express.Router();
const Car = require('../models/Cars');

// Create a new car
router.post('/cars', async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all cars
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
});


// Update a car by ID
router.put('/cars/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a car by ID
router.delete('/cars/:id', async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
