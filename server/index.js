const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

const Project = require('./models/Project');

mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(function() {
        console.log('Conectat la MongoDB!');
    })
    .catch(function(err) {
        console.error('Eroare conectare MongoDB:', err);
    });

app.use(express.json());

app.get('/', function(req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function(req, res) {
    try {
    
        const projects = await Project.find(); 
        res.json(projects); 
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});