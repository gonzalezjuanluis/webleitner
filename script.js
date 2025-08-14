document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            tarjeta.classList.toggle("volteada");
        });
    });
});
