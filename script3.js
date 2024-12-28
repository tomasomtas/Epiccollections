const productos3 = [
    {
        id: 9,
        name: "Colonos de Catán",
        description: "Colonos de Catán es un fantástico juego de mesa de gestión de recursos para toda la familia y que tiene que estar presente en todas las ludotecas. El objetivo del juego es construir pueblos, ciudades y caminos sobre un tablero que es distinto cada vez, mientras se van acumulando varios tipos de cartas. Todos estos elementos proporcionan distintas puntuaciones, ganando la partida el primer jugador que llega a los diez puntos",
        amount: 67000,
        image: "images/99a.jpg" 
    },
    {
        id: 10,
        name: "Krieg",
        description: "Juego de estrategia, inteligencia y azar.El juego de la conquista del mundo, pon a prueba tu habilidad, podrás cumplir tu misión sin ser derrotado? Estás a punto de ingresar y conocer la verdadera sensación de lo que fue la segunda guerra mundial. Deberás desarrollar estrategias para atacar, defenderte, desplazar tropas a través de los continentes y de esa manera lograr exitosamente tu objetivo",
        amount: 73000,
        image: "images/88a.jpg"
    },
    {
        id: 11,
        name: "Los castillos de Borgoña (the castle of Burgundy)",
        description: "Los Castillos de Borgoña se encuentran en la región de Borgoña de la Alta Francia medieval. Cada jugador asume el papel de un aristócrata, controlando originalmente un pequeño principado. Mientras juegan, su objetivo es construir asentamientos y poderosos castillos, practicar el comercio a lo largo del río, explotar minas de plata y usar el conocimiento de los viajeros. El juego se trata de jugadores que toman fichas de asentamiento del tablero de juego y las colocan en su princedom, que está representado por el tablero de jugadores. Cada mosaico tiene una función que comienza cuando el mosaico se coloca en el princedom. El propio principado consta de varias regiones, cada una de las cuales exige su propio tipo de mosaico de asentamiento",
        amount: 73000,
        image: "images/77a.jpg"
    },
    {
        id: 12,
        name: "Civilization : Un nuevo amanecer",
        description: "Civilization es un juego de mesa diseñado por Francis Tresham, publicado en Reino Unido en 1980 por Hartland Trefoil y en Estados Unidos en 1981 por Avalon Hill. La marca Civilization ahora es propiedad de Hasbro. Estuvo agotado durante muchos años, antes de que Gibsons Games lo reeditara en 2018, y si te preguntas si tiene algo que ver con el famoso juego de estrategia para pc, la respuesta es si",
        amount: 93000,
        image: "images/66a.jpg"
    }
];

console.log("Productos en script3:",productos3);



function agregarDescripcion(id) {
    
    const productoc = productos3.find(p => p.id === id);
    
    if (productoc) {
        
        const juegItem = document.querySelector(`[data-id="${productoc.id}"]`);
        
        
        const descripcionParrafo = juegItem.querySelector('.descripcion-ampliada');
        
        
        if (descripcionParrafo && descripcionParrafo.classList.contains('hidden')) {
            
            descripcionParrafo.classList.remove('hidden');
            descripcionParrafo.classList.add('visible');
            
            
            const botonInfo = juegItem.querySelector('.info-btn');
            botonInfo.textContent = "Ocultar información";
        } else {
            
            if (descripcionParrafo) {
                descripcionParrafo.classList.remove('visible');
                descripcionParrafo.classList.add('hidden');
                
                
                const botonInfo = juegItem.querySelector('.info-btn');
                botonInfo.textContent = "Más información!";
            } else {
                
                const descripcionParrafo = document.createElement('p');
                descripcionParrafo.classList.add('descripcion-ampliada', 'visible');
                descripcionParrafo.textContent = productoc.description;
                
                
                const juegInfo = juegItem.querySelector('.juego-info');
                const juegFooter = juegItem.querySelector('.juego-footer');
                
                
                juegInfo.insertBefore(descripcionParrafo, juegFooter);
                
                
                const botonInfo = juegItem.querySelector('.info-btn');
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


function mostrarProductosC() {
    productos3.forEach(productoc => {
        console.log(`ID: ${productoc.id}`);
        console.log(`Nombre: ${productoc.name}`);
        console.log(`Descripción: ${productoc.description}`);
        console.log(`Precio: $${productoc.amount}`);
        console.log('-----------------------------');
    });
}

mostrarProductosC();



let carritoC = JSON.parse(localStorage.getItem('carrito')) || [];


const guardarCarritoC = () => {
    localStorage.setItem('carrito', JSON.stringify(carritoC));
    sessionStorage.setItem('carrito', JSON.stringify(carritoC));
};


const agregarProductoC = (id, nombre, precio) => {
    const productoExistente = carritoC.find(productoc => productoc.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoC.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarCarritoC();
    mostrarCarritoC();

    mostrarMensajeC(`${nombre} agregado al carrito.`);
};


const quitarProductoC = (id) => {
    const productoIndex = carrito.findIndex(productoc => productoc.id === id);
    if (productoIndex !== -1) {
        carritoC[productoIndex].cantidad--;
        if (carritoC[productoIndex].cantidad === 0) {
            carritoC.splice(productoIndex, 1);
        }
        guardarCarritoC();
        mostrarCarritoC();
    }
};


const vaciarCarritoC = () => {
    carritoC = [];
    guardarCarritoC();
    mostrarCarritoC();
};

const mostrarCarritoC = () => {
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

    
    if (carritoC.length === 0) {
        productosCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalCarrito.innerHTML = "<p>Total: $0</p><p>Total productos: 0</p>";
        return;
    }

    carritoC.forEach(productoc => {
        total += productoc.precio * productoc.cantidad;
        totalProductos += productoc.cantidad;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito');
        productoDiv.innerHTML = `
            <p>${productoc.nombre} - $${productoc.precio} x ${productoc.cantidad}</p>
            <button class="quitar-producto" data-id="${productoc.id}">Quitar uno</button>
            <button class="agregar-mas" data-id="${productoc.id}">Agregar más</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    totalCarrito.innerHTML = `<p>Total: $${total}</p><p>Total productos: ${totalProductos}</p>`;

    
    document.querySelectorAll('.quitar-producto').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            quitarProductoC(id);
        });
    });

    document.querySelectorAll('.agregar-mas').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const productoc = carritoC.find(p => p.id === id);
            agregarProductoC(productoc.id, productoc.nombre, productoc.precio);
        });
    });
};




const cargarProductosC = () => {
    
    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const productoc = productos3.find(p => p.id === id);
            agregarProductoC(productoc.id, productoc.name, productoc.amount);
        });
    });
};


document.addEventListener('DOMContentLoaded', () => {
    cargarProductosC();
    mostrarCarritoC();

    
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarritoC);
    }

    
    const comprarBtn = document.getElementById('comprar');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (carritoC.length > 0) {
                alert('Gracias por tu compra!');
                vaciarCarritoC();
            } else {
                alert('El carrito está vacío. Agrega productos para comprar.');
            }
        });
    }
});

const mostrarMensajeC = (mensaje) => {
    console.log('Mensaje: ', mensaje); 
    const mensajeElemento = document.getElementById('mensaje-notificacion');
    mensajeElemento.textContent = mensaje; 
    mensajeElemento.classList.add('show'); 

    
    setTimeout(() => {
        mensajeElemento.classList.remove('show');
    }, 3000); 
};

