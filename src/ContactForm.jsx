import { useState } from 'react';

function ContactForm() {
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

function handleSubmit() {
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            setFeedback('Completeaza toate campurile!');
        } else {
            setFeedback('Multumim, ' + name + '!');
        }
    }
    return(
        <div style={{border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <h3>Formular de contact</h3>
            <div>
        <input 
                    placeholder="Numele tau"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

             <div>
        <input 
                    placeholder="Adresa de email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>

             <div>
        <input 
                    placeholder="Scrie mesajul..."
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
            
            <p><strong>{feedback}</strong></p>
        </div>
    );
}

export default ContactForm;
    