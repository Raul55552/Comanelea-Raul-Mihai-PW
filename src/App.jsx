
 import { useState } from 'react';
import Card from './Card'; 
import QuickNote from './QuickNote';

function App() {
    const projects = [
        { title: "Proiect 1", description: "Pagina personala" },
        { title: "Proiect 2", description: "Calculator buget" },
        { title: "Proiect 3", description: "Dashboard React" },
        
        { title: "Proiect 4", description: "Joc X și 0" },
        { title: "Proiect 5", description: "Aplicatie de Vreme" },
        {title: "Proiect 6", description: "Joc nu te supara frate"}
    ];
    const [count, setCount] = useState(0);

    function updateDownCount() {
        if (count == 0)
            return;
        setCount(count - 1);
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <QuickNote />

            <p>Ai apasat de {count} ori</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={updateDownCount}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>

           {projects.map(function(item, index) {
                return <Card key={index} title={item.title} description={item.description} />;
            })}   
        </div>
    );
}

export default App;