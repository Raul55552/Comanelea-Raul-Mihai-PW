import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [search, setSearch] = useState('');
 
 const [title, setTitle] = useState('');
 const [tech, setTech] = useState('');

 const [editingId, setEditingId] = useState(null);
 const [editTitle, setEditTitle] = useState('');
 const [editTech, setEditTech] = useState('');

 useEffect(function() {
     fetch('http://localhost:3000/api/projects')
     .then(res => res.json())
     .then(data => { setProjects(data); setLoading(false); })
     .catch(() => { setError('Eroare la incarcarea datelor'); setLoading(false); });
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
     } catch (err) { console.error('Eroare:', err); }
 }

 async function handleDelete(id) {
     if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
         try {
             await fetch('http://localhost:3000/api/projects/' + id, { method: 'DELETE' });
             setProjects(projects.filter((p) => p._id !== id));
         } catch (err) { console.error('Eroare la stergere:', err); }
     }
 }

 async function handleToggle(id, currentDone) {
     try {
         const response = await fetch('http://localhost:3000/api/projects/' + id, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ done: !currentDone }) 
         });
         const updatedProject = await response.json();
         setProjects(projects.map(p => p._id === id ? updatedProject : p));
     } catch (err) { console.error('Eroare la actualizare:', err); }
 }

 async function handleSaveEdit(id) {
     try {
         const response = await fetch('http://localhost:3000/api/projects/' + id, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ title: editTitle, tech: editTech })
         });
         const updatedProject = await response.json();
         setProjects(projects.map(p => p._id === id ? updatedProject : p));
         setEditingId(null); 
     } catch (err) { console.error('Eroare la editare:', err); }
 }

 if (loading) return <p>Se incarca...</p>;
 if (error !== null) return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;

 return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Proiectele mele</h2>
         
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Adaugă un proiect nou</h4>
            <input 
                type="text" placeholder="Titlu..." required
                value={title} onChange={(e) => setTitle(e.target.value)} 
                style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
            <input 
                type="text" placeholder="Tehnologii..." required
                value={tech} onChange={(e) => setTech(e.target.value)} 
                style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Adauga Proiect
            </button>
        </form>

        <input 
            type="text" placeholder="Cauta un proiect..." 
            value={search} onChange={(e) => setSearch(e.target.value)} 
            style={{ padding: '8px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
        />
        
        {projects
            .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
            .map(function(project) {
                if (editingId === project._id) {
                    return (
                        <div key={project._id} style={{ marginBottom: '20px', padding: '15px', border: '2px dashed #0d6efd', borderRadius: '8px' }}>
                            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ padding: '5px', marginRight: '5px' }} />
                            <input type="text" value={editTech} onChange={(e) => setEditTech(e.target.value)} style={{ padding: '5px', marginRight: '5px' }} />
                            <button onClick={() => handleSaveEdit(project._id)} style={{ padding: '6px 12px', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Salvează</button>
                            <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Anulează</button>
                        </div>
                    );
                }

                return (
                    <div key={project._id} style={{ marginBottom: '20px' }}>
                        <Card title={project.title} description={project.tech} done={project.done} />
                        
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => handleToggle(project._id, project.done)} style={{ padding: '6px 12px', backgroundColor: project.done ? '#ffc107' : '#198754', color: project.done ? '#000' : '#fff', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}>
                                {project.done ? 'Marchează "În lucru"' : 'Marchează "Finalizat"'}
                            </button>
                        
                            <button onClick={() => {
                                setEditingId(project._id);
                                setEditTitle(project.title);
                                setEditTech(project.tech);
                            }} style={{ padding: '6px 12px', backgroundColor: '#0dcaf0', color: '#000', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}>
                                Editează
                            </button>

                            {/* BUTON STERGE - ROSU */}
                            <button onClick={() => handleDelete(project._id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Sterge
                            </button>
                        </div>
                    </div>
                );
        })}
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px', borderLeft: '5px solid #6c757d' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Statistici Proiecte:</h4>
            <p style={{ margin: '5px 0' }}>Total proiecte: <strong>{projects.length}</strong></p>
            <p style={{ margin: '5px 0', color: '#198754' }}>Proiecte finalizate: <strong>{projects.filter(p => p.done).length}</strong></p>
            <p style={{ margin: '5px 0', color: '#fd7e14' }}>Proiecte în lucru: <strong>{projects.filter(p => !p.done).length}</strong></p>
        </div>
     </div>
    );
}

export default ProjectList;