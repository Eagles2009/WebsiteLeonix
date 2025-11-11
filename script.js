let cart = [];
let products = [];

// Charger les produits depuis JSON
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

// Afficher les produits
function displayProducts(list) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.salePrice && p.salePrice > 0 ? `<span class="sale">${p.salePrice}€</span> <span class="original">${p.price}€</span>` : p.price + '€'}</p>
      <p>${p.description}</p>
      <button onclick="addToCart('${p.name}', ${p.salePrice && p.salePrice>0 ? p.salePrice : p.price})">Ajouter au panier</button>
    `;
    grid.appendChild(card);
  });
}

// Recherche dynamique
document.getElementById('search').addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
});

// Tri
document.getElementById('sort').addEventListener('change', (e) => {
  let sorted = [...products];
  if (e.target.value === 'price-asc') sorted.sort((a,b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  if (e.target.value === 'price-desc') sorted.sort((a,b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  displayProducts(sorted);
});

// Panier
function addToCart(name, price) {
  cart.push({name, price});
  document.getElementById('cart-count').innerText = cart.length;
  alert(name + " ajouté au panier !");
  console.log("Panier :", cart);
}
