const productos = [
    {
        id: 1,
        name: "Tales from the Twilight World",
        description: "Tales from the Twilight World es el tercer disco del grupo alemán de power metal Blind Guardian. El disco está compuesto de 10 canciones y salió a la venta en 1990. Destacan los temas «Welcome to Dying», «Lost in the Twilight Hall» y «Lord of the Rings», destaca también la colaboración del ex Helloween y actual cantante de Gamma Ray, Kai Hansen.Disco fundamental en el entorno del power metal alemán. Muy recomendable. Juan Lincht (Baterísta de doble pedal)",
        amount: 27000,
        image: "images/111.jpg"
    },
    {
        id: 2,
        name: "Glory to the Brave",
        description: "Glory to the brave es el primer disco de la banda sueca de Heavy Metal HammerFall, editado en 1997. Fue su primer álbum a pesar del hecho de que la banda se formó en 1993 y hasta entonces interpretaban música en directo y covers.Altamente recomendado por ser uno de los mejores exponentes del power metal sueco de finales de los 90's .Pablo Soler (Guitarrista virtuoso)",
        amount: 23000,
        image: "images/222.jpg"
    },
    {
        id: 3,
        name: "The Fourth Legacy",
        description: "The Fourth Legacy es el cuarto álbum de estudio de la banda estadounidense de power metal Kamelot. Fue lanzado en 1999 por Noise Records/Modern Music, y para muchos, es reconocido como el mejor album de la banda, destacando la poderosa voz de Roy Khan y la colaboración de la cantante lírica Cinzia Rizzo. Altamente recomendado. Sandra O'Connor (cantante lírica)",
        amount: 30000,
        image: "images/333.jpg"
    },
    {
        id: 4,
        name: "The Damnation Game",
        description: "The Damnation Game es el segundo álbum del grupo Symphony X cuál surgió solamente ocho meses después de su primer álbum, Symphony X. Con Rusell Allen como nueva voz y la técnica llamativa del virtuoso Michael Romeo en guitarra, este disco supo cautivar el oído de los ya exigentes enamorados del género metal progresivo, cuyos exponentes sobresalientes de este género virtuoso, eran ni más ni menos que unos tales Dream Theater. Recomendado. Lucas Zamarbide (cantante de rock&blues)",
        amount: 21000,
        image: "images/444.jpg"
    }
];

console.log("Productos en script:",productos);




function agregarDescripcion(id){
    
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        
        const cdItem = document.querySelector(`[data-id="${producto.id}"]`);
        
        const descripcionParrafo = cdItem.querySelector('.descripcion-ampliada');
        
        if (descripcionParrafo && descripcionParrafo.classList.contains('hidden')) {
            
            descripcionParrafo.classList.remove('hidden');
            descripcionParrafo.classList.add('visible');
            
            const botonInfo = cdItem.querySelector('.info-btn');
            botonInfo.textContent = "Ocultar información";
        
        } else {
            
            if (descripcionParrafo) {
                descripcionParrafo.classList.remove('visible');
                descripcionParrafo.classList.add('hidden');
                
                const botonInfo = cdItem.querySelector('.info-btn');
                botonInfo.textContent = "Más información!";
            
        } else {
                
                const descripcionParrafo = document.createElement('p');
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


function mostrarProductos() {
    productos.forEach(producto => {
        console.log(`ID: ${producto.id}`);
        console.log(`Nombre: ${producto.name}`);
        console.log(`Descripción: ${producto.description}`);
        console.log(`Precio: $${producto.amount}`);
        console.log('-----------------------------');
    });
}

mostrarProductos();




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


document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
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

const mostrarMensaje = (mensaje) => {
    console.log('Mensaje: ', mensaje); 
    const mensajeElemento = document.getElementById('mensaje-notificacion');
    mensajeElemento.textContent = mensaje; 
    mensajeElemento.classList.add('show'); 


    setTimeout(() => {
        mensajeElemento.classList.remove('show');
    }, 3000); 
}; 


