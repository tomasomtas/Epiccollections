const productos2 = [
    {
        id: 5,
        name: "El Silmarillion",
        description: "El Silmarillion es una obra de J. R. R. Tolkien, editada y publicada póstumamente por su hijo Christopher Tolkien en 1977. Se trata de una recopilación de historias y mitologías que narran los Días Antiguos, o la Primera Edad del Mundo, en el universo de la Tierra Media.Editorial Planeta, edición limitada de tapa dura",
        amount: 25000,
        image: "images/1.jpg" 
    },
    {
        id: 6,
        name: "El libro del sol nuevo (4 libros)",
        description: "The Book of the New Sun, traducido al español como El libro del sol nuevo es una novela de fantasía científica en cuatro volúmenes, del escritor estadounidense Gene Wolfe. Fue la novela que inauguró el «Ciclo Solar» del autor, que Wolfe continuó al situar otras obras en el mismo universo. Llévate los 4 libros de la saga a un precio único.Editorial Minotauro",
        amount: 80000,
        image: "images/2.jpg"
    },
    {
        id: 7,
        name: "La tierra moribunda",
        description: "Una obra clásica de fantasía con un mundo decadente y personajes intrigantes; influenció fuertemente a autores como Wolfe y es conocida por su prosa elaborada.Editorial Minotauro",
        amount: 30000,
        image: "images/3.jpg"
    },
    {
        id: 8,
        name: "Las crónicas de Ámbar",
        description: "Una serie que combina elementos de ciencia ficción y fantasía en un mundo de múltiples realidades, ideal para quienes disfrutan de la complejidad en la trama y el carácter introspectivo de los personajes.Las crónicas completas en un solo tomo, editorial Timun Mas, las 10 crónicas en 1260 páginas, tapa dura",
        amount: 70000,
        image: "images/4.jpg"
    }
];

console.log("Productos en script2:",productos2);


function agregarDescripcion(id) {
    
    const productoB = productos2.find(p => p.id === id);
    
    if (productoB) {
        
        const libItem = document.querySelector(`[data-id="${productoB.id}"]`);
        
        
        const descripcionParrafo = libItem.querySelector('.descripcion-ampliada');
        
        
        if (descripcionParrafo && descripcionParrafo.classList.contains('hidden')) {
            
            descripcionParrafo.classList.remove('hidden');
            descripcionParrafo.classList.add('visible');
            
            
            const botonInfo = libItem.querySelector('.info-btn');
            botonInfo.textContent = "Ocultar información";
        } else {
            
            if (descripcionParrafo) {
                descripcionParrafo.classList.remove('visible');
                descripcionParrafo.classList.add('hidden');
                
                
                const botonInfo = libItem.querySelector('.info-btn');
                botonInfo.textContent = "Más información!";
            } else {
                
                const descripcionParrafo = document.createElement('p');
                descripcionParrafo.classList.add('descripcion-ampliada', 'visible');
                descripcionParrafo.textContent = productoB.description;
                
                
                const libInfo = libItem.querySelector('.lib-info');
                const libFooter = libItem.querySelector('.lib-footer');
                
                
                libInfo.insertBefore(descripcionParrafo, libFooter);
                
                
                const botonInfo = libItem.querySelector('.info-btn');
                botonInfo.textContent = "Ocultar información";
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {

    const botonesInfo = document.querySelectorAll('.info-btn');
    botonesInfo.forEach(boton => {
        boton.addEventListener('click', (event) => {
            
            const idProducto = parseInt(event.target.getAttribute('data-id'));

            
            agregarDescripcion(idProducto);
        });
    });
});

function mostrarProductosB() {
        productos2.forEach(productoB => {
        console.log(`ID: ${productoB.id}`);
        console.log(`Nombre: ${productoB.name}`);
        console.log(`Descripción: ${productoB.description}`);
        console.log(`Precio: $${productoB.amount}`);
        console.log('-----------------------------');
    });
}

mostrarProductosB();


let carritoB = JSON.parse(localStorage.getItem('carrito')) || [];


const guardarCarritoB = () => {
    localStorage.setItem('carrito', JSON.stringify(carritoB));
    sessionStorage.setItem('carrito', JSON.stringify(carritoB));
};


const agregarProductoB = (id, nombre, precio) => {
    const productoExistente = carritoB.find(productoB => productoB.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoB.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarCarritoB();
    mostrarCarritoB();


    mostrarMensajeB(`${nombre} agregado al carrito.`);
};


const quitarProductoB = (id) => {
    const productoIndex = carritoB.findIndex(productoB => productoB.id === id);
    if (productoIndex !== -1) {
        carritoB[productoIndex].cantidad--;
        if (carritoB[productoIndex].cantidad === 0) {
            carritoB.splice(productoIndex, 1);
        }
        guardarCarritoB();
        mostrarCarritoB();
    }
};


const vaciarCarritoB = () => {
    carritoB = [];
    guardarCarritoB();
    mostrarCarritoB();
};

const mostrarCarritoB = () => {
    const productosCarrito = document.getElementById('productos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    
    if (!productosCarrito || !totalCarrito) {
        console.error("No se encontraron los elementos para mostrar el carrito");
        return;
    }

    
    productosCarrito.innerHTML = '';
    totalCarrito.innerHTML = '';

    let total = 0;
    let totalProductos = 0;

    
    if (carritoB.length === 0) {
        productosCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalCarrito.innerHTML = "<p>Total: $0</p><p>Total productos: 0</p>";
        return;
    }

    carritoB.forEach(productoB => {
        total += productoB.precio * productoB.cantidad;
        totalProductos += productoB.cantidad;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito');
        productoDiv.innerHTML = `
            <p>${productoB.nombre} - $${productoB.precio} x ${productoB.cantidad}</p>
            <button class="quitar-producto" data-id="${productoB.id}">Quitar uno</button>
            <button class="agregar-mas" data-id="${productoB.id}">Agregar más</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    totalCarrito.innerHTML = `<p>Total: $${total}</p><p>Total productos: ${totalProductos}</p>`;

    
    document.querySelectorAll('.quitar-producto').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            quitarProductoB(id);
        });
    });

    document.querySelectorAll('.agregar-mas').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const productoB = carritoB.find(p => p.id === id);
            agregarProductoB(productoB.id, productoB.nombre, productoB.precio);
        });
    });
};


const cargarProductosB = () => {
    
    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const productoB = productos2.find(p => p.id === id);
            agregarProductoB(productoB.id, productoB.name, productoB.amount);
        });
    });
};


document.addEventListener('DOMContentLoaded', () => {
    cargarProductosB();
    mostrarCarritoB();

    
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarritoB);
    }

    
    const comprarBtn = document.getElementById('comprar');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (carritoB.length > 0) {
                alert('Gracias por tu compra!');
                vaciarCarritoB();
            } else {
                alert('El carrito está vacío. Agrega productos para comprar.');
            }
        });
    }
});

const mostrarMensajeB = (mensaje) => {
    console.log('Mensaje: ', mensaje); 
    const mensajeElemento = document.getElementById('mensaje-notificacion');
    mensajeElemento.textContent = mensaje; 
    mensajeElemento.classList.add('show'); 

    
    setTimeout(() => {
        mensajeElemento.classList.remove('show');
    }, 3000); 
};
