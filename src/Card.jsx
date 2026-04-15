function Card(props) {
    let textStatus = "";

    if (props.done === true) {
        textStatus = "Gata";
    } else {
        textStatus = "În lucru";
    }

    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Status: <strong>{textStatus}</strong></p>
        </div>
    );
}

export default Card;