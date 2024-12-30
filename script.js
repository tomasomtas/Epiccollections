let productos = [];


const cargarProductosDesdeJSON = async () => {
    try {
        const response = await fetch('https://tomasomtas.github.io/Epiccollections/productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        productos = await response.json();
        renderizarProductos();
        cargarProductos(); 
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
};

const renderizarProductos = () => {
    const listaProductos = document.getElementById('cds'); 
    if (!listaProductos) {
        console.error("No se encontró el contenedor de productos");
        return;
    }

    listaProductos.innerHTML = ''; 

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('cd-item');
        productoDiv.setAttribute('data-id', producto.id);

        productoDiv.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <button class="info-btn" data-id="${producto.id}">Más información!</button>
            <div class="cd-info">
                <h3>${producto.name}</h3>
                <p class="autor">${producto.description.slice(0, 100)}...</p>
                <div class="cd-footer">
                    <p class="precio">$${producto.amount}</p>
                    <button class="add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;

        listaProductos.appendChild(productoDiv);

        
        const botonInfo = productoDiv.querySelector('.info-btn');
        botonInfo.addEventListener('click', () => {
            agregarDescripcion(producto.id);
        });
    });
};


function agregarDescripcion(id) {
    const producto = productos.find(p => p.id === id);

    if (producto) {
        const cdItem = document.querySelector(`[data-id="${producto.id}"]`);
        let descripcionParrafo = cdItem.querySelector('.descripcion-ampliada');

        if (descripcionParrafo) {
            
            if (descripcionParrafo.classList.contains('visible')) {
                descripcionParrafo.classList.remove('visible');
                descripcionParrafo.classList.add('hidden');
                const botonInfo = cdItem.querySelector('.info-btn');
                botonInfo.textContent = "Más información!";
            } else {
                
                descripcionParrafo.classList.remove('hidden');
                descripcionParrafo.classList.add('visible');
                const botonInfo = cdItem.querySelector('.info-btn');
                botonInfo.textContent = "Ocultar información";
            }
        } else {
            
            descripcionParrafo = document.createElement('p');
            descripcionParrafo.classList.add('descripcion-ampliada', 'visible');
            descripcionParrafo.textContent = producto.description;
            const cdInfo = cdItem.querySelector('.cd-info');
            const cdFooter = cdItem.querySelector('.cd-footer');
            cdInfo.insertBefore(descripcionParrafo, cdFooter);
            const botonInfo = cdItem.querySelector('.info-btn');
            botonInfo.textContent = "Ocultar información";
        }
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
};

const agregarProducto = (id, nombre, precio) => {
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    mostrarCarrito();
    mostrarMensaje(`${nombre} agregado al carrito.`);
};

const quitarProducto = (id) => {
    const productoIndex = carrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        carrito[productoIndex].cantidad--;
        if (carrito[productoIndex].cantidad === 0) {
            carrito.splice(productoIndex, 1);
        }
        guardarCarrito();
        mostrarCarrito();
    }
};

const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
};

const mostrarCarrito = () => {
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

    if (carrito.length === 0) {
        productosCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalCarrito.innerHTML = "<p>Total: $0</p><p>Total productos: 0</p>";
        return;
    }

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        totalProductos += producto.cantidad;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            <button class="quitar-producto" data-id="${producto.id}">Quitar uno</button>
            <button class="agregar-mas" data-id="${producto.id}">Agregar más</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    totalCarrito.innerHTML = `<p>Total: $${total}</p><p>Total productos: ${totalProductos}</p>`;

    document.querySelectorAll('.quitar-producto').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            quitarProducto(id);
        });
    });

    document.querySelectorAll('.agregar-mas').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const producto = carrito.find(p => p.id === id);
            agregarProducto(producto.id, producto.nombre, producto.precio);
        });
    });
};

const cargarProductos = () => {
    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const producto = productos.find(p => p.id === id);
            agregarProducto(producto.id, producto.name, producto.amount);
        });
    });
};

const mostrarMensaje = (mensaje) => {
    console.log('Mensaje: ', mensaje);
    const mensajeElemento = document.getElementById('mensaje-notificacion');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.add('show');

    setTimeout(() => {
        mensajeElemento.classList.remove('show');
    }, 3000);
};


document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDesdeJSON();
    mostrarCarrito();

    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    const comprarBtn = document.getElementById('comprar');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert('Gracias por tu compra!');
                vaciarCarrito();
            } else {
                alert('El carrito está vacío. Agrega productos para comprar.');
            }
        });
    }
});
