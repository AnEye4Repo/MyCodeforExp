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
   