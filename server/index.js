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

app.post('/api/projects', async function(req, res) {
    try {
        const newProject = new Project({
            title: req.body.title,
            tech: req.body.tech,
            done: req.body.done || false,
        });
        
        const saved = await newProject.save();
        
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.get('/api/projects/:id', async function(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ error: 'Not found' });
        }
        
        res.json(project);
    } catch (err) {
       
        res.status(500).json({ error: 'Eroare la cautare: ' + err.message });
    }
});


app.delete('/api/projects/:id', async function(req, res) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        
        if (!deletedProject) {
            return res.status(404).json({ error: 'Not found' });
        }
        
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Eroare la stergere: ' + err.message });
    }
});

app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});