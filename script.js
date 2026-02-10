// =============================================
// PREVENCIÓN DE EJECUCIÓN MÚLTIPLE
// =============================================

// Verificar si ya se ejecutó
if (window.libroEjecutado) {
    console.log("⚠️ El script ya se ejecutó anteriormente");
} else {
    window.libroEjecutado = true;
    console.log("📖 Iniciando libro para Tanya...");
}

// =============================================
// CONFIGURACIÓN
// =============================================

let currentPage = 0;
const pages = document.querySelectorAll(".page");
let textoEscrito = false;
let escrituraActiva = false;

// SOLO UNA COPIA DEL TEXTO
const mensajeAmor = "Hola amor… 💕. Desde que te conocí supe que eras alguien muy especial, mi osita y mi chatita hermosa 🐻💖. Gracias por hacer mis días más felices, por tu sonrisa, esos ojitos que me enamora y por ser tan linda conmigo. Quiero que sepas que te amoo mucho, más de lo que puedo explicar con palabras 💘. Este es solo el inicio de una historia muy bonita contigo, porque quiero que seas parte de mi vida siempre 💑✨. Te amooo hoy, mañana y siempre, mi amor 💕🌹"

// =============================================
// INICIALIZAR
// =============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado");
    iniciarTodo();
});

function iniciarTodo() {
    console.log("Iniciando todo...");
    
    // 1. LIMPIAR cualquier texto existente
    const elementoTexto = document.getElementById("typing");
    if (elementoTexto) {
        // Verificar si ya hay texto
        const textoExistente = elementoTexto.textContent || elementoTexto.innerText;
        console.log("Texto encontrado:", textoExistente);
        
        // Si hay texto diferente al nuestro, limpiarlo
        if (textoExistente && textoExistente !== mensajeAmor) {
            console.log("Limpiando texto existente...");
            elementoTexto.textContent = "";
            elementoTexto.innerHTML = "";
        }
        
        // Si ya tiene nuestro texto, marcar como escrito
        if (textoExistente === mensajeAmor) {
            console.log("El texto ya estaba escrito");
            textoEscrito = true;
            habilitarBotonSiguiente();
        }
    }
    
    // 2. Iniciar escritura solo si no está escrito
    if (!textoEscrito && !escrituraActiva) {
        console.log("Iniciando escritura...");
        escribirMensaje();
    }
    
    // 3. Iniciar contador
    iniciarContador();
    
    // 4. Habilitar botón visualmente
    const botones = document.querySelectorAll(".next-btn");
    botones.forEach(boton => {
        if (boton) {
            boton.style.opacity = "1";
            boton.style.visibility = "visible";
        }
    });
}

// =============================================
// ESCRIBIR MENSAJE - VERSIÓN SEGURA
// =============================================

function escribirMensaje() {
    if (escrituraActiva) return;
    
    const elemento = document.getElementById("typing");
    if (!elemento) return;
    
    escrituraActiva = true;
    let indice = 0;
    
    // Asegurarse de que esté vacío
    elemento.textContent = "";
    
    function escribir() {
        if (indice < mensajeAmor.length) {
            elemento.textContent += mensajeAmor.charAt(indice);
            indice++;
            setTimeout(escribir, 40);
        } else {
            // Terminado correctamente
            textoEscrito = true;
            escrituraActiva = false;
            console.log("✅ Mensaje escrito correctamente");
            habilitarBotonSiguiente();
        }
    }
    
    escribir();
}

// =============================================
// HABILITAR BOTÓN SIGUIENTE
// =============================================

function habilitarBotonSiguiente() {
    const boton = document.querySelector(".next-btn");
    if (boton) {
        boton.style.background = "linear-gradient(135deg, #ff2e63, #ff4e50)";
        boton.style.boxShadow = "0 0 15px #ff4e50";
        boton.style.animation = "pulse 1s infinite";
        boton.style.cursor = "pointer";
    }
}

// =============================================
// CAMBIAR PÁGINA
// =============================================

function nextPage() {
    console.log("Cambiando página de", currentPage, "a", currentPage + 1);
    
    
    // Ocultar página actual
    if (pages[currentPage]) {
        pages[currentPage].classList.remove("active");
    }
    
    // Avanzar
    currentPage++;
    
    // Mostrar nueva página
    if (currentPage < pages.length) {
        pages[currentPage].classList.add("active");
        
        // Configuraciones por página
        if (currentPage === 2) {
            setTimeout(configurarBotonNo, 300);
        }
        
        if (currentPage === 3) {
            iniciarCelebracion();
        }
    }
}

// =============================================
// BOTÓN NO IMPOSIBLE
// =============================================

function configurarBotonNo() {
    const botonNo = document.getElementById("noBtn");
    if (!botonNo) return;
    
    function moverBoton() {
        const contenedor = document.querySelector(".buttons-container");
        if (!contenedor) return;
        
        const anchoCont = contenedor.clientWidth;
        const altoCont = contenedor.clientHeight;
        const anchoBtn = botonNo.clientWidth;
        const altoBtn = botonNo.clientHeight;
        
        let x = Math.random() * (anchoCont - anchoBtn - 20) + 10;
        let y = Math.random() * (altoCont - altoBtn - 20) + 10;
        
        botonNo.style.position = "absolute";
        botonNo.style.left = x + "px";
        botonNo.style.top = y + "px";
        botonNo.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            botonNo.style.transform = "scale(1)";
        }, 200);
    }
    
    botonNo.addEventListener("mouseover", moverBoton);
    botonNo.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moverBoton();
    });
    
    botonNo.addEventListener("click", (e) => {
        e.preventDefault();
        moverBoton();
        mostrarMensaje("¡No puedes decir que no! 💕", 1500);
    });
    
    document.addEventListener("mousemove", (e) => {
        if (!botonNo) return;
        
        const rect = botonNo.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distX = mouseX - (rect.left + rect.width/2);
        const distY = mouseY - (rect.top + rect.height/2);
        const distancia = Math.sqrt(distX*distX + distY*distY);
        
        if (distancia < 100) {
            moverBoton();
        }
    });
    
    setTimeout(moverBoton, 500);
}

// =============================================
// ACEPTAR
// =============================================

function accept() {
    mostrarMensaje("¡Gracias por aceptar! 💖", 1500);
    setTimeout(nextPage, 1000);
}

// =============================================
// CONTADOR
// =============================================

function iniciarContador() {
    actualizarContador();
    setInterval(actualizarContador, 1000);
}

function actualizarContador() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    
    let fechaSanValentin = new Date(año, 1, 14);
    if (ahora > fechaSanValentin) {
        fechaSanValentin = new Date(año + 1, 1, 14);
    }
    
    const diferencia = fechaSanValentin - ahora;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    const elemDias = document.getElementById("days");
    const elemHoras = document.getElementById("hours");
    const elemMinutos = document.getElementById("minutes");
    
    if (elemDias) elemDias.textContent = dias.toString().padStart(2, '0');
    if (elemHoras) elemHoras.textContent = horas.toString().padStart(2, '0');
    if (elemMinutos) elemMinutos.textContent = minutos.toString().padStart(2, '0');
}

// =============================================
// CELEBRACIÓN
// =============================================

function iniciarCelebracion() {
    crearConfeti();
    mostrarMensaje("¡Feliz 14 de febrero mi amor! 💖", 2000);
}

function crearConfeti() {
    const contenedor = document.querySelector(".celebration");
    if (!contenedor) return;
    
    for (let i = 0; i < 20; i++) {
        const confeti = document.createElement("div");
        confeti.innerHTML = "🎉";
        confeti.style.cssText = `
            position: absolute;
            font-size: 20px;
            top: -30px;
            left: ${Math.random() * 100}%;
            animation: caer 3s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        contenedor.appendChild(confeti);
    }
    
    const style = document.createElement("style");
    style.textContent = `@keyframes caer { to { transform: translateY(100vh) rotate(360deg); } }`;
    document.head.appendChild(style);
}

// =============================================
// MOSTRAR MENSAJES
// =============================================

function mostrarMensaje(texto, tiempo) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = texto;
    mensajeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4e50;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        z-index: 1000;
        font-size: 14px;
        animation: aparecer 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.style.animation = "desaparecer 0.3s forwards";
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                document.body.removeChild(mensajeDiv);
            }
        }, 300);
    }, tiempo);
    
    if (!document.querySelector('#animMensajes')) {
        const style = document.createElement("style");
        style.id = "animMensajes";
        style.textContent = `
            @keyframes aparecer {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes desaparecer {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// =============================================
// NAVEGACIÓN TECLADO
// =============================================

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
        nextPage();
    } else if (e.key === "ArrowLeft" && currentPage > 0) {
        pages[currentPage].classList.remove("active");
        currentPage--;
        pages[currentPage].classList.add("active");
    }
});

// =============================================
// VERIFICACIÓN FINAL
// =============================================

setTimeout(() => {
    console.log("🔍 Verificación final:");
    
    const elemento = document.getElementById("typing");
    if (elemento) {
        const textoActual = elemento.textContent;
        console.log("Texto actual:", textoActual);
        
        // Si el texto está repetido, corregirlo
        if (textoActual.includes("Te amo 💖 amor Tanya")) {
            console.log("❌ Texto repetido detectado, corrigiendo...");
            elemento.textContent = mensajeAmor;
            textoEscrito = true;
            habilitarBotonSiguiente();
        }
    }
    
    
    console.log("✅ Verificación completada");
}, 1000);
