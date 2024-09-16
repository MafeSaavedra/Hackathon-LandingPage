const productTracker = {}; // Objeto para rastrear la cantidad de cada producto
let totalQuantity = 0; // Total de cantidad de productos
let totalPrice = 0; // Total de precio de productos

function addProduct(title, imageSrc, price) {
  // Verifica si el producto ya ha sido añadido más de una vez
  if (productTracker[title]) {
    alert('Este artículo ya ha sido añadido.');
    return;
  }

  // Crea un nuevo contenedor de producto
  const productGrid = document.getElementById('product-grid');

  const productDiv = document.createElement('div');
  productDiv.className = 'col-md-4 mb-4'; // Grid de 3 columnas

  productDiv.innerHTML = `
    <div class="card" style="width: 18rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2);">
        <img src="${imageSrc}" class="card-img-top" alt="${title}">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-text">Precio: $${price}</h6>
            <button class="btn btn-secondary decrease-quantity">-1</button>
            <span class="quantity">0</span>
            <button class="btn btn-secondary increase-quantity">+1</button>
        </div>
    </div>
  `;

  // Agrega el nuevo producto al grid
  productGrid.appendChild(productDiv);

  // Actualiza el rastreador de productos
  productTracker[title] = { quantity: 0, price };

  // Actualiza el total
  updateCartSummary();
}

function updateCartSummary() {
  const summaryContainer = document.getElementById('cart-summary');
  summaryContainer.innerHTML = ''; // Limpiar resumen actual

  let productDetails = ''; // Cadena para almacenar los detalles de productos

  // Recorre el rastreador de productos y genera el resumen
  for (const [title, { quantity, price }] of Object.entries(productTracker)) {
    if (quantity > 0) {
      productDetails += `<li>${title} x ${quantity} = $${(quantity * price).toFixed(2)}</li>`;
    }
  }

  // Añadir los detalles al resumen
  summaryContainer.innerHTML = `
  <div class="content-resumen">
    <h3 class="carousel-title">Resumen del carrito</h3>
    <ul>${productDetails}</ul>
    <h6>Total Cantidad: ${totalQuantity}</h6>
    <h6>Total Precio: $${totalPrice.toFixed(2)}</h6>
  </div>
  `;
}

// Event listeners para los botones de cantidad
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('increase-quantity')) {
    const card = e.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.card-text').textContent.replace('Precio: $', ''));
    const quantitySpan = e.target.previousElementSibling;

    // Actualiza la cantidad del producto
    let quantity = parseInt(quantitySpan.textContent) + 1;
    quantitySpan.textContent = quantity;

    // Actualiza el rastreador de productos
    if (productTracker[title]) {
      productTracker[title].quantity = quantity;
    } else {
      productTracker[title] = { quantity, price };
    }

    // Actualiza el total
    totalQuantity++;
    totalPrice += price;
    updateCartSummary();
  } else if (e.target && e.target.classList.contains('decrease-quantity')) {
    const card = e.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.card-text').textContent.replace('Precio: $', ''));
    const quantitySpan = e.target.nextElementSibling;

    // Actualiza la cantidad del producto
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 0) {
      quantity--;
      quantitySpan.textContent = quantity;

      // Actualiza el rastreador de productos
      if (productTracker[title]) {
        productTracker[title].quantity = quantity;
      }

      // Actualiza el total
      totalQuantity--;
      totalPrice -= price;
      updateCartSummary();
    }
  }
});


// Navbar-------------------------------------------------

document.getElementById("scroll").addEventListener('click',function()

{
    let seccionObjeto = document.getElementById('segundaParte');

    seccionObjeto.scrollIntoView({behavior:"smooth"})
});

document.getElementById("scroll-car").addEventListener('click',function()

{
    let seccionObjeto = document.getElementById('carritoCompras');

    seccionObjeto.scrollIntoView({behavior:"smooth"})
});

document.getElementById("scroll-galeria").addEventListener('click',function()

{
    let seccionObjeto = document.getElementById('seccion-galeria');

    seccionObjeto.scrollIntoView({behavior:"smooth"})
});