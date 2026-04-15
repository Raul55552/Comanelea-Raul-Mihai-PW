import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [search, setSearch] = useState('');

 useEffect(function() {
 fetch('/data/projects.json')
 .then(function(response) {
 return response.json();
 })
 .then(function(data) {
 setProjects(data.projects);
 setLoading(false);
 })
 .catch(function() {
    setError('Eroare la incarcarea datelor'); 
    setLoading(false);
});
 }, []);
 if (loading) {
 return <p>Se incarca...</p>;
 }
 if (error !== null) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;
}
 return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h3>Proiecte</h3>
         
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
                    <Card 
                        key={project.id} 
                        title={project.title} 
                        description={project.tech} 
                        done={project.done}
                    />
            );
          })}
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#eee' }}>
             <h4>Statistici Proiecte:</h4>
             <p>
                   Total proiecte: <strong>{projects.length}</strong>
             </p>
            <p>
                     Finalizate: <strong>{projects.filter(p => p.done).length}</strong>
                </p>
                <p>
                    In lucru: <strong>{projects.filter(p => !p.done).length}</strong>
                </p>
            </div>

     </div>
    );
}

export default ProjectList;