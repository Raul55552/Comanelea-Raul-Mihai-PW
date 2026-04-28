import { Link } from 'react-router';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>404 — Pagina nu există</h2>
            <p>Se pare că te-ai rătăcit. Adresa pe care o cauți nu există.</p>
            {/* Link-ul care îl duce înapoi la pagina principală */}
            <Link to="/">Întoarce-te la Home</Link>
        </div>
    );
}

export default NotFound;