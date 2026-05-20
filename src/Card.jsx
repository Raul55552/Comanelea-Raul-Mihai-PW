function Card({ title, description, done }) {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: done ? '#d4edda' : '#fff3cd', 
        marginBottom: '10px'
    };

    return (
        <div style={cardStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h4>
            <p style={{ margin: 0, color: '#555' }}><strong>Tehnologii:</strong> {description}</p>
        </div>
    );
}

export default Card;