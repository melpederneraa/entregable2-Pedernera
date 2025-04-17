// Obtener el formulario y la lista del carrito
const formPerfume = document.getElementById('form-perfume');
const carritoLista = document.getElementById('carrito-lista');
const total = document.getElementById('total');
const mensaje = document.getElementById('mensaje');

// Inicializar el carrito
let carrito = [];

// Función para actualizar el carrito
function actualizarCarrito() {
  carritoLista.innerHTML = ''; // Limpiar la lista
  let sumaTotal = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} (${item.cantidad}) - $${item.precio * item.cantidad}`;
    carritoLista.appendChild(li);
    sumaTotal += item.precio * item.cantidad;
  });

  total.textContent = `Total: $${sumaTotal.toFixed(2)}`;
}

// Función para agregar al carrito
formPerfume.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el comportamiento por defecto

  const tipo = document.getElementById('tipo').value.toLowerCase();  // Convertir a minúsculas
  const marca = document.getElementById('marca').value.toLowerCase();  // Convertir a minúsculas
  const nombre = document.getElementById('nombre').value.toLowerCase();  // Convertir a minúsculas
  const cantidad = parseInt(document.getElementById('cantidad').value, 10);

  if (!tipo || !marca || !nombre || isNaN(cantidad) || cantidad < 1) {
    mensaje.textContent = "Por favor, complete todos los campos correctamente.";
    mensaje.style.color = "red";
    return;
  }

  const precio = obtenerPrecioPerfume(tipo, nombre); // Obtener el precio

  if (!precio) {
    mensaje.textContent = "No se encontró el perfume.";
    mensaje.style.color = "red";
    return;
  }

  // Redondear el precio a dos decimales
  const precioFinal = Math.round(precio * 100) / 100;

  // Agregar el perfume al carrito
  const producto = { tipo, marca, nombre, cantidad, precio: precioFinal };
  carrito.push(producto);

  // Limpiar el formulario
  formPerfume.reset();
  mensaje.textContent = "Producto agregado al carrito";
  mensaje.style.color = "green";

  // Actualizar la lista del carrito
  actualizarCarrito();
});

// Función para obtener el precio del perfume basado en el tipo y nombre
function obtenerPrecioPerfume(tipo, nombre) {
  const perfumes = {
    mujer: {
      "very good girl": 75.99,
      "cher 18 glitter": 65.99,
      "miss dior": 89.99,
      "scandal": 79.99,
    },
    hombre: {
      "one million": 99.99,
      "212": 89.99,
      "chester ice": 59.99,
      "invictus": 109.99,
    },
    niño: {
      "paco": 29.99,
      "pibe's": 19.99,
      "mujercitas sunny": 24.99,
      "mujercitas funny": 24.99,
    },
    unisex: {
      "calvin klein one": 79.99,
      "tranforma": 69.99,
      "libertad": 59.99,
      "arakkat": 49.99,
    },
  };

  if (perfumes[tipo] && perfumes[tipo][nombre]) {
    return perfumes[tipo][nombre];
  } else {
    return null; // No se encuentra el perfume
  }
}
