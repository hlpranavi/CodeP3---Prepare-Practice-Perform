const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        next(err);
    }
});

// POST an item
router.post('/', async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        next(err);
    }
});

// Other CRUD operations (PUT, DELETE) can be similarly defined

module.exports = router;
