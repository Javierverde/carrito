const productList = [
    { id: 1, name: "Teclado", price: 35000, img: "images/tecladoGamer.jpg" },
    { id: 2, name: "Mouse", price: 19000, img: "images/mouseGamer.jpeg" },
    { id: 3, name: "Auriculares", price: 70000, img: "images/auricularesGamer.png" },
    { id: 4, name: "Monitor", price: 249999, img: "images/monitorGarmer.jpeg" },
    { id: 5, name: "Placa de video", price: 445000, img: "images/placaDeVideo.jpg" },
    { id: 6, name: "Procesador", price: 699999, img: "images/procesador.jpg" },
    { id: 7, name: "Memora RAM 8GB", price: 42000, img: "images/memoria.jpg" },
    { id: 8, name: "Memoria RAM 16 GB", price: 76000, img: "images/memoria.jpg" },
    { id: 9, name: "SSD 500 GB", price: 39000, img: "images/SSD500.jpg" },
    { id: 10, name: "SSD 1 TB", price: 68000, img: "images/SSD1.jpg" }
  ];

  const body = document.body;
  // Crear contenedor principal

  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  // Crear título
  const title = document.createElement("h1");
  title.textContent = "Carrito de Compras";
  container.appendChild(title);

  // Crear la grilla de productos
  const productGrid = document.createElement("div");
  productGrid.classList.add("grid");

  productList.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <span>${product.name}</span>
      <button data-price="${product.price}">Agregar ($${product.price})</button>
    `;

    productGrid.appendChild(productDiv);
  });

  container.appendChild(productGrid);

  // Crear el carrito de compras
  const cart = document.createElement("div");
  cart.id = "cart";
  cart.innerHTML = `
    <h2>Carrito</h2>
    <div id="cart-items"></div>
    <div class="total">Total: $<span id="total-price">0</span></div>
    <button id="clear-cart">Vaciar Carrito</button>
    <button id="theme-toggle">Cambiar Tema</button>
  `;
  container.appendChild(cart);

  // Selección de elementos
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const clearCartButton = document.getElementById("clear-cart");
  const themeToggleButton = document.getElementById("theme-toggle");

  let totalPrice = 0;

  // Función para actualizar localStorage
  const updateLocalStorage = () => {
    const cartItemsArray = Array.from(cartItems.children).map(item => {
      const name = item.querySelector("span:first-child").textContent;
      const price = parseInt(item.querySelector("span:last-child").textContent.replace("$", ""));
      return { name, price };
    });

    localStorage.setItem("cart", JSON.stringify(cartItemsArray));
  };

  // Cargar productos desde localStorage
  const loadCartFromLocalStorage = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    savedCart.forEach(product => {
      addProductToCart(product.name, product.price);
    });
  };

  // Agregar producto al carrito
  const addProductToCart = (name, price) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `<span>${name}</span><span>$${price}</span>`;
    cartItems.appendChild(cartItem);

    // Actualizar total
    totalPrice += price;
    totalPriceElement.textContent = totalPrice;

    // Mostrar en consola
    console.log(`Producto agregado: ${name} - $${price}`);

    // Guardar en localStorage
    updateLocalStorage();
  };

  // Evento para agregar productos al carrito
  document.querySelectorAll(".product button").forEach(button => {
    button.addEventListener("click", () => {
      const price = parseInt(button.getAttribute("data-price"));
      const productName = button.parentElement.querySelector("span").textContent;
      addProductToCart(productName, price);
    });
  });

  // Vaciar carrito
  clearCartButton.addEventListener("click", () => {
    cartItems.innerHTML = "";
    totalPrice = 0;
    totalPriceElement.textContent = totalPrice;
    localStorage.removeItem("cart");
    console.log("Carrito vaciado");
  });

  // Cambio de tema claro/oscuro
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    console.log("Tema cambiado");
  });

  // Cargar productos guardados en localStorage
  loadCartFromLocalStorage();