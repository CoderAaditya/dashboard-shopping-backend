// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const domainRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://aadityathakurcs:fyFZ1SnLf6wcLyAy@cluster0.jdwt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

mongoose.connect(mongoURI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/domains', domainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});