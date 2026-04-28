import { Link } from 'react-router';

function Navbar() {
    return (
        // Am adăugat atributul "style" pentru a face meniul să arate bine
        <nav style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            padding: '15px', 
            backgroundColor: '#f0f0f0', 
            marginBottom: '20px',
            borderRadius: '5px'
        }}>
            <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
            <Link to="/projects" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Proiecte</Link>
            <Link to="/contact" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </nav>
    );
}

export default Navbar;