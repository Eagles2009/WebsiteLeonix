let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    alert(name + " ajouté au panier !");
    console.log("Panier:", cart);
}
