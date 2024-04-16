/* eslint-disable max-len */
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const catData = {
    persian: {
        name: 'Persian',
        hair: 'Long-haired',
        image: 'https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        lifespan: '15 to 20 years',
    },
    japaneseBobtail: {
        name: 'Japanese Bobtail',
        hair: 'Short to medium-haired',
        image: 'https://example.com/japanese_bobtail.jpg',
    },
    ragdoll: {
        name: 'Ragdoll',
        hair: 'Semi-longhaired',
        image: 'https://example.com/ragdoll.jpg',
    },
    maineCoon: {
        name: 'Maine Coon',
        hair: 'Long-haired',
        image: 'https://example.com/maine_coon.jpg',
    },
    sphynx: {
        name: 'Sphynx',
        hair: 'Hairless (with a fine down)',
        image: 'https://example.com/sphynx.jpg',
    },
    devonRex: {
        name: 'Devon Rex',
        hair: 'Short-haired',
        image: 'https://example.com/devon_rex.jpg',
    },
};

// Define a route to get information about a specific cat breed
app.get('/api/cat/:breed?', (req, res) => {
    const { breed } = req.params;

    if (breed) {
        // Handle request for a specific breed
        if (catData[breed]) {
            res.json(catData[breed]);
        } else {
            res.status(404).json({ error: 'Breed not found' });
        }
    } else {
        // Handle request for all cat breeds
        res.json(catData);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
