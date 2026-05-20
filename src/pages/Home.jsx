import { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(function() {
        fetch('http://localhost:3000/api/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => setError('Eroare la incarcarea statisticilor.'));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Bine ai venit pe pagina Acasă!</h2>
            <h3>Dashboard Statistici Live</h3>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!stats && !error && <p>Se încarcă statisticile...</p>}

        
            {stats && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4f8', border: '1px solid #bce8f1' }}>
                    <p>Total proiecte in baza de date: <strong>{stats.total}</strong></p>
                    <p>Proiecte finalizate: <strong>{stats.done}</strong></p>
                    <p>Proiecte in lucru: <strong>{stats.inProgress}</strong></p>
                </div>
            )}
        </div>
    );
}

export default Home;