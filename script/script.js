const productos = [
  { nombre: "Hamburguesa clásica", precio: 7.5 },
  { nombre: "Pizza Margarita", precio: 9.0 },
  { nombre: "Empanadas (3 unidades)", precio: 5.0 },
  { nombre: "Tacos de pollo", precio: 6.5 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosContainer = document.getElementById("productos");
const carritoContainer = document.getElementById("carrito");
const totalDisplay = document.getElementById("total");
const btnConfirmar = document.getElementById("confirmar");
const btnVaciar = document.getElementById("vaciar");

function renderProductos() {
  productosContainer.innerHTML = "";
  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        </div>
      </div>
    `;
    productosContainer.appendChild(card);
  });
}

function renderCarrito() {
  carritoContainer.innerHTML = "";
  carrito.forEach((producto, i) => {
    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    item.innerHTML = `
      ${producto.nombre} - $${producto.precio.toFixed(2)}
      <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${i})">X</button>
    `;
    carritoContainer.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  renderCarrito();
}

function eliminarDelCarrito(i) {
  carrito.splice(i, 1);
  renderCarrito();
}

btnConfirmar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("¡El carrito está vacío!");
    return;
  }

  if (confirm("¿Confirmar compra?")) {
    alert("¡Gracias por su compra! El total fue de $" + carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2));
    carrito = [];
    renderCarrito();
  }
});

btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0){
        alert("¡El carrito está vacío!");
        return;
    }

  if (confirm("¿Vaciar el carrito?")) {
    carrito = [];
    renderCarrito();
  }
});

renderProductos();
renderCarrito();


