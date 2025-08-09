let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===== POPUP NOTIFICACIÓN =====
function mostrarPopup(mensaje, colorFondo = "bg-green-500") {
  const popup = document.createElement("div");
  popup.textContent = mensaje;
  popup.className = `${colorFondo} text-white font-bold px-4 py-2 rounded-lg fixed top-[30px] left-[-300px] shadow-lg z-50 opacity-0 transition-all duration-300`;
  document.body.appendChild(popup);

  // Entrada animada (de izquierda a derecha)
  setTimeout(() => {
    popup.style.left = "20px";
    popup.style.opacity = "1";
  }, 10);

  // Salida animada
  setTimeout(() => {
    popup.style.left = "-300px";
    popup.style.opacity = "0";
  }, 2000);

  // Eliminar del DOM
  setTimeout(() => {
    popup.remove();
  }, 2500);
}

function actualizarContadores() {
  const contadores = {};
  carrito.forEach(item => {
    contadores[item.nombre] = (contadores[item.nombre] || 0) + 1;
  });

  document.querySelectorAll("[id^='contador-']").forEach(el => {
    const nombre = el.id.replace("contador-", "");
    const cantidad = contadores[nombre] || 0;
    if (cantidad > 0) {
      el.textContent = cantidad;
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadores();
  mostrarPopup(`Has agregado "${nombre}" al carrito!`, "bg-green-500");
}

function quitarDelCarrito(nombre) {
  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadores();
    mostrarPopup(`Has quitado "${nombre}" del carrito!`, "bg-red-500");
  }
}

function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalEl = document.getElementById("total");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    lista.innerHTML += `
      <div class="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>
        <button onclick="eliminarItem(${index})" class="text-red-500">❌</button>
      </div>
    `;
  });
  totalEl.textContent = `Total: $${total}`;
}

function eliminarItem(index) {
  const nombre = carrito[index].nombre;
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContadores();
  mostrarPopup(`Has quitado "${nombre}" del carrito!`, "bg-red-500");
}

function comprarPorWhatsapp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  let mensaje = "Hola! Quiero hacer el siguiente pedido:\n";
  let total = 0;
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} $${item.precio}\n`;
    total += item.precio;
  });
  mensaje += `Total: $${total}`;
  window.open(`https://wa.me/543482535194?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// Inicializa contadores
actualizarContadores();
mostrarCarrito();
