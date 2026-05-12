import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [search, setSearch] = useState('');
 
 const [title, setTitle] = useState('');
 const [tech, setTech] = useState('');

 useEffect(function() {
 fetch('http://localhost:3000/api/projects')
 .then(function(response) {
 return response.json();
 })
 .then(function(data) {
 setProjects(data);
 setLoading(false);
 })
 .catch(function() {
    setError('Eroare la incarcarea datelor'); 
    setLoading(false);
});
 }, []);

 async function handleSubmit(e) {
     e.preventDefault();
     try {
         const response = await fetch('http://localhost:3000/api/projects', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ title: title, tech: tech })
         });
         const newProject = await response.json();
         
         setProjects([...projects, newProject]);
         setTitle(''); 
         setTech('');
     } catch (err) {
         console.error('Eroare:', err);
     }
 }

 async function handleDelete(id) {
     try {
         await fetch('http://localhost:3000/api/projects/' + id, {
             method: 'DELETE'
         });
         setProjects(projects.filter((p) => p._id !== id));
     } catch (err) {
         console.error('Eroare la stergere:', err);
     }
 }

 if (loading) {
 return <p>Se incarca...</p>;
 }

 if (error !== null) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;
}

 return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h3>Proiecte</h3>
         
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Titlu..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Tehnologii..." 
                value={tech} 
                onChange={(e) => setTech(e.target.value)} 
            />
            <button type="submit">Adauga</button>
        </form>
        <br />

        <input 
            type="text"
            placeholder="Cauta un proiect..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: '15px' }}
            />
            {projects
                .filter(function(p) {
                    return p.title.toLowerCase().includes(search.toLowerCase());
                })
                .map(function(project) {
                 return (
                    <div key={project._id} style={{ marginBottom: '15px' }}>
                        <Card 
                            title={project.title} 
                            description={project.tech} 
                            done={project.done}
                        />
                        <button onClick={() => handleDelete(project._id)}>Sterge</button>
                    </div>
            );
          })}
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#eee' }}>
             <h4>Statistici Proiecte:</h4>
             <p>
                   Total proiecte: <strong>{projects.length}</strong>
             </p>
            <p>
                    Proiecte finalizate: <strong>{projects.filter(p => p.done).length}</strong>
                </p>
                <p>
                    Proiecte in lucru: <strong>{projects.filter(p => !p.done).length}</strong>
                </p>
            </div>

     </div>
    );
}

export default ProjectList;