let paginaActual = 1;
let tamañoSi = 22;

function siguientePagina() {
    document.getElementById("p" + paginaActual).classList.remove("activa");
    paginaActual++;
    document.getElementById("p" + paginaActual).classList.add("activa");
}

function rechazar() {
    tamañoSi += 10;
    document.getElementById("btnSi").style.fontSize = tamañoSi + "px";
}

function aceptar() {
    document.getElementById("p4").classList.remove("activa");
    document.getElementById("p5").classList.add("activa");
}
