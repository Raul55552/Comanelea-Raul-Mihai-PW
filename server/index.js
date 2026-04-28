const express = require('express');
const app = express();
const PORT = 3000;

// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

app.use(express.json()); 

// Ruta de bază
app.get('/', function(req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});

//Returnează toate proiectele
app.get('/api/projects', function(req, res) {
    res.json(projects);
});

//Statistici 
app.get('/api/stats', function(req, res) {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.done === true).length;
    const inProgressProjects = projects.filter(p => p.done === false).length;

    res.json({
        total: totalProjects,
        completed: completedProjects,
        inProgress: inProgressProjects
    });
});



// Returnează un singur proiect după ID
app.get('/api/projects/:id', function(req, res) {
    const cautatId = parseInt(req.params.id);
    const project = projects.find(p => p.id === cautatId);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});
// POST /api/projects - adauga un proiect nou 
app.post('/api/projects', function(req, res) {
    const newProject = {
        id: projects.length + 1,   
        title: req.body.title,        
        tech: req.body.tech,          
        done: req.body.done || false,  
    };

    projects.push(newProject);

    res.status(201).json(newProject);
});


//PORNIREA SERVERULUI 
app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});