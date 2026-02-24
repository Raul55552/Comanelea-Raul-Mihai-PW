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

function submitForm() {
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;


    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    console.warn("Goodbye World!");
}