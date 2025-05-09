const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Data = require('./models/Data'); // Ensure this model is correctly defined

const app = express();
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/rtrpd'; // Make sure this URL is correct

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process on connection failure
    });

app.use(bodyParser.json());
app.use(cors());

// API endpoint to get all data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to fetch data' });
    }
});

// API endpoint to post filtered data
app.post('/api/data', async (req, res) => {
    try {
        const filters = req.body;
        
        // Validate if filters object is empty or missing
        if (!filters || Object.keys(filters).length === 0) {
            return res.status(400).json({ error: 'Filters object is required' });
        }

        // Construct query to filter based on selected checkboxes
        const query = {};
        if (filters.topic) {
            query.Topic = filters.topic;
        }
        if (filters.difficulty) {
            query.Difficulty = filters.difficulty;
        }
        if (filters.skill) {
            query.Skill = filters.skill;
        }
        if (filters.platform) {
            query.Platform = filters.platform;
        }

        // Execute query and send response
        const data = await Data.find(query);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to fetch filtered data' });
    }
});

function buildQuery(filters) {
    const query = {};
    if (filters.topics && filters.topics.length > 0) {
        query.Topic = { $in: filters.topics }; // Corrected field name
    }
    if (filters.difficulties && filters.difficulties.length > 0) {
        query.Difficulty = { $in: filters.difficulties }; // Corrected field name
    }
    if (filters.skills && filters.skills.length > 0) {
        query.Skill = { $in: filters.skills }; // Corrected field name
    }
    if (filters.platforms && filters.platforms.length > 0) {
        query.Platform = { $in: filters.platforms }; // Corrected field name
    }
    return query;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
