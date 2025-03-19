// Agregar efecto de "Añadir al Carrito"
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        button.innerText = "¡Añadido!";
        button.style.backgroundColor = "#28a745";
        button.style.transform = "scale(1.2)";

        setTimeout(() => {
            button.innerText = "Comprar";
            button.style.backgroundColor = "";
            button.style.transform = "";
        }, 1000);
    });
});

// Animación de carga de imágenes
document.querySelectorAll('.product img').forEach(img => {
    img.onload = () => {
        img.classList.add('loaded');
    };
});

// Transición suave al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", function () {
    let cartCounter = 0;

    // Selecciona todos los botones de "Comprar"
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            cartCounter++;
            document.getElementById("cart-counter").textContent = cartCounter;
        });
    });
});
