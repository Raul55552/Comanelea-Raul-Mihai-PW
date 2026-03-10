const dataCurenta = new Date();
const ora = dataCurenta.getHours();
const elementSalut = document.querySelector('header p');
let mesaj = "";

if(ora >=6 && ora < 12){
    mesaj = "Buna dimineata! Bine ai venit pe pagina mea.";
}else if(ora >= 12 && ora < 18){
    mesaj = "Buna ziua! Bine ati venit pe pagina mea."
}else{
    mesaj = "Buna seara! Bine ai venit pe pagina mea.";
}
if (elementSalut) {
    elementSalut.textContent = mesaj;
}

    const form = document.querySelector('form');
const feedbackElement = document.getElementById('form-feedback');

form.addEventListener('submit', function(event){
    
    event.preventDefault();

    console.log("Butonul a fost apasat! incep validarea...");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(name.length < 2){
        feedbackElement.textContent = "Numele trebuie sa aiba cel putin 2 caractere!";
        feedbackElement.style.color = "red";

    } else if(!email.includes('@')){
        feedbackElement.textContent = "Te rugam sa introduci o adresa de email valida!";
        feedbackElement.style.color = "red";
    } else if(message.length < 10){
        feedbackElement.textContent = "Mesajul trebuie sa aiba cel putin 10 caractere!";
        feedbackElement.style.color = "red";
    } else{
        feedbackElement.textContent = "Multumim, " + name + "! Mesajul a fost trimis cu succes!";
        feedbackElement.style.color = "green"; 
    }
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function(){

    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        themeToggle.textContent = 'Light Mode';
    }else{
        themeToggle.textContent = 'Dark Mode';
    }
});


const titluri = document.querySelectorAll('main h2');

titluri.forEach(function(titlu) {
    
    titlu.addEventListener('click', function() {
        const continut = this.nextElementSibling;
        
        continut.classList.toggle('hidden');
    });
});


const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener('scroll', function() {

    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block"; 
    } else {
        backToTopBtn.style.display = "none";  
    }
});


backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const elementeHtml = document.querySelectorAll('#education ol li');

const listaEducatie = Array.from(elementeHtml).map(function(element){
    return element.textContent;
});

console.log("1. Lista mea de educatie este:", listaEducatie);

const filtruLiceu = listaEducatie.filter(function(text){
    return text.includes("Liceul");
});
console.log("2a. Rezultat filtru 'Liceul'", filtruLiceu);

const filtruAn = listaEducatie.filter(function(text){
    return text.includes("2026");
});
console.log("2b. Rezultat filtru'2026'", filtruAn);

const primeleCuvinte = listaEducatie.map(function(text){
    return text.split(' ')[0];
});
console.log("3. Primele cuvinte sunt: ", primeleCuvinte);

const totalAni = listaEducatie.reduce(function(total,text){
    const anii = text.trim().slice(-9);
    const bucati = anii.split('-');

    const anInceput = Number(bucati[0]);
    const anSfarsit = Number(bucati[1]);

    const durata = anSfarsit - anInceput;

    return total + durata;
},0);
console.log("4. Total ani de studiu: " + totalAni);


//json
async function incarcaProiecte() {
    try {
    
        const raspuns = await fetch('data/projects.json');
        const proiecte = await raspuns.json();

        const listaHTML = proiecte.map(function(p) {
            return `<li>${p.name} - ${p.tech}</li>`;
        }).join(''); 

        const finalizate = proiecte.filter(function(p) {
            return p.done === true;
        }).length;

        const container = document.getElementById("projects");
        container.innerHTML = `
            <ul>${listaHTML}</ul>
            <p>Finalizate: ${finalizate} din ${proiecte.length}</p>
        `;

    } catch (eroare) {
        console.log("Eroare la încărcare:", eroare);
    }
}

incarcaProiecte();