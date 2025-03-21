document.addEventListener("DOMContentLoaded", function () {
    let cartCounter = 0;
    const cartItems = [];

const productos = {
    teclados: [
        {
            nombre: "Teclado Mecánico Ducky One 2 Mini",
            imagen: "dycky.png",
            descripcion: "Teclado 60% compacto con switches Cherry MX RGB, ideal para gaming y diseño. Cable desmontable tipo USB-C.",
            precio: "$120.00"
        },
        {
            nombre: "Teclado Corsair K95 RGB Platinum",
            imagen: "tedado.png",  // Usamos tedado.png (posible error tipográfico en el nombre del archivo)
            descripcion: "Teclado full-size con teclas macro dedicadas, iluminación RGB Chroma y construcción en aluminio anodizado.",
            precio: "$200.00"
        }
    ],
    ratones: [
        {
            nombre: "Ratón Logitech G502 HERO",
            imagen: "mouse.jpg",
            descripcion: "Sensor HERO 25K DPI, 11 botones programables, diseño ergonómico con ajuste de peso personalizado.",
            precio: "$80.00"
        },
        {
            nombre: "Ratón Razer DeathAdder V2",
            imagen: "razer.png",
            descripcion: "Sensor óptico 20K DPI, switches ópticos Razer™, agarre ergonómico para diestros, 8 botones programables.",
            precio: "$70.00"
        }
    ],
    auriculares: [
        {
            nombre: "Auriculares HyperX Cloud II",
            imagen: "herp.png",  // Asignamos herp.png basado en tus archivos
            descripcion: "Sonido surround 7.1 virtual, micrófono desmontable con cancelación de ruido y almohadillas de memoria viscoelástica.",
            precio: "$100.00"
        },
        {
            nombre: "Auriculares SteelSeries Arctis 7",
            imagen: "audifonos.jpg",
            descripcion: "Wireless 2.4G con 24h de autonomía, sonido DTS Headphone:X v2.0 y micrómetro retráctil ClearCast.",
            precio: "$150.00"
        }
    ],
    sillas: [
        {
            nombre: "Silla Gamer Secretlab Titan",
            imagen: "silla.png",
            descripcion: "Estructura de acero reforzado, soporte lumbar 4D, tapicería en cuero sintético premium, capacidad 180kg.",
            precio: "$400.00"
        },
        {
            nombre: "Silla Gamer DXRacer Master",
            imagen: "silla.webp",
            descripcion: "Diseño racing con ajuste reclinable 135°, reposacabezas y lumbar incluidos, base metálica clase 4.",
            precio: "$350.00"
        }
    ],
    monitores: [
        {
            nombre: "Monitor ASUS ROG Swift PG279Q",
            imagen: "monitor.jpg",
            descripcion: "Pantalla IPS de 27\" QHD (2560x1440), 165Hz, G-Sync, tiempo de respuesta 4ms y soporte VESA.",
            precio: "$700.00"
        },
        {
            nombre: "Monitor LG UltraGear 27GN950-B",
            imagen: "monitor.png",
            descripcion: "4K UHD Nano IPS, 144Hz, compatible con G-Sync y FreeSync, HDR600 y 98% DCI-P3.",
            precio: "$900.00"
        }
    ]
};
    // Mostrar productos por categoría
    const menuItems = document.querySelectorAll(".menu-item");
    const mainContent = document.getElementById("main-content");
    const productosCategoriaSection = document.getElementById("productos-categoria");
    const productContainer = document.getElementById("product-container");
    const categoriaNombre = document.getElementById("categoria-nombre");

    // Regresar al estado inicial al hacer clic en el logo
    const logo = document.querySelector(".logo h1");
    logo.addEventListener("click", () => {
        mainContent.style.display = "block"; // Mostrar contenido principal
        productosCategoriaSection.style.display = "none"; // Ocultar productos por categoría
    });

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const categoria = item.getAttribute("data-category");
            const productosCategoria = productos[categoria];

            // Ocultar el contenido principal
            mainContent.style.display = "none";

            // Mostrar la sección de productos por categoría
            productosCategoriaSection.style.display = "block";
            categoriaNombre.textContent = item.textContent;

            // Limpiar el contenedor de productos
            productContainer.innerHTML = "";

            // Mostrar los productos en tarjetas
            productosCategoria.forEach(producto => {
                const card = document.createElement("div");
                card.classList.add("product");

                card.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='placeholder.png';">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.descripcion}</p>
                    <p class="precio">${producto.precio}</p>
                    <button class="add-to-cart">Comprar</button>
                `;

                productContainer.appendChild(card);
            });

            // Agregar funcionalidad a los nuevos botones "Comprar"
            const newButtons = document.querySelectorAll(".add-to-cart");
            newButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const product = this.parentElement;
                    const productName = product.querySelector("h4").innerText;
                    const productImage = product.querySelector("img").src;
                    cartCounter++;
                    document.getElementById("cart-counter").textContent = cartCounter;

                    // Añadir producto al carrito
                    cartItems.push({ name: productName, image: productImage });
                    updateCartModal();

                    // Efecto de "Añadido"
                    this.innerText = "¡Añadido!";
                    this.style.backgroundColor = "#28a745";
                    this.style.transform = "scale(1.2)";

                    setTimeout(() => {
                        this.innerText = "Comprar";
                        this.style.backgroundColor = "";
                        this.style.transform = "";
                    }, 1000);
                });
            });
        });
    });

    // Funcionalidad del carrito (ya existente)
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const productName = product.querySelector("p").innerText;
            const productImage = product.querySelector("img").src;
            cartCounter++;
            document.getElementById("cart-counter").textContent = cartCounter;

            // Añadir producto al carrito
            cartItems.push({ name: productName, image: productImage });
            updateCartModal();

            // Efecto de "Añadido"
            this.innerText = "¡Añadido!";
            this.style.backgroundColor = "#28a745";
            this.style.transform = "scale(1.2)";

            setTimeout(() => {
                this.innerText = "Comprar";
                this.style.backgroundColor = "";
                this.style.transform = "";
            }, 1000);
        });
    });

    // Funcionalidad del modal (ya existente)
    const cart = document.getElementById("cart");
    const cartModal = document.getElementById("cart-modal");

    cart.addEventListener("click", (event) => {
        event.stopPropagation();
        cartModal.style.display = "block";
    });

    document.addEventListener("click", (event) => {
        if (!cartModal.contains(event.target) && event.target !== cart) {
            cartModal.style.display = "none";
        }
    });

    cartModal.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    function updateCartModal() {
        const cartItemsList = document.getElementById("cart-items");
        cartItemsList.innerHTML = "";

        cartItems.forEach((item, index) => {
            const li = document.createElement("li");

            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");

            const productImage = document.createElement("img");
            productImage.src = item.image;
            productImage.alt = item.name;

            const productName = document.createElement("span");
            productName.innerText = item.name;

            const removeButton = document.createElement("button");
            removeButton.innerText = "Eliminar";
            removeButton.addEventListener("click", () => {
                cartItems.splice(index, 1);
                cartCounter--;
                document.getElementById("cart-counter").textContent = cartCounter;
                updateCartModal();
            });

            productInfo.appendChild(productImage);
            productInfo.appendChild(productName);
            li.appendChild(productInfo);
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });
    }

    // Animación de carga de imágenes
    document.querySelectorAll('.product img').forEach(img => {
        img.onload = () => {
            img.classList.add('loaded');
            console.log(`Imagen cargada: ${img.src}`); // Depuración
        };
        img.onerror = () => {
            console.error(`Error al cargar la imagen: ${img.src}`); // Depuración
            img.src = "placeholder.png"; // Imagen de respaldo si no carga
        };
    });

    // Transición suave al cargar la página
    document.body.classList.add("loaded");
});