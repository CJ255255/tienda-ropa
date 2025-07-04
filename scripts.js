function seleccionarTalla(btn) {
  const botones = btn.parentElement.querySelectorAll("button");
  botones.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function cambiarCantidad(btn, cambio) {
  const input = btn.parentElement.querySelector("input");
  let valor = parseInt(input.value);
  valor += cambio;
  if (valor < 0) valor = 0;
  input.value = valor;
}

function agregarIndividual(btn) {
  const producto = btn.closest(".producto");
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);
  const tallaBtn = producto.querySelector(".tallas button.selected");
  const cantidad = parseInt(producto.querySelector(".cantidad input").value);

  if (!tallaBtn || cantidad <= 0) {
    alert("Selecciona una talla y cantidad válida.");
    return;
  }

  const talla = tallaBtn.textContent;
  let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

  const existente = pedido.find(p => p.nombre === nombre && p.talla === talla);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    pedido.push({ nombre, precio, talla, cantidad });
  }

  localStorage.setItem("pedido", JSON.stringify(pedido));

  tallaBtn.classList.remove("selected");
  producto.querySelector(".cantidad input").value = "0";

  const mensaje = producto.querySelector(".mensaje-agregado");
  mensaje.style.display = "block";
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
}

function guardarNombreYRedirigir() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  if (!nombre) {
    alert("Por favor, escribe tu nombre antes de continuar.");
    return;
  }
  localStorage.setItem("nombreCliente", nombre);
  window.location.href = "resumen.html";
}
