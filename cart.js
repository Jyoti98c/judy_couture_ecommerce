document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const closeCart = document.getElementById("close-cart");
    const cartModal = document.getElementById("cart-modal");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartItemsContainer.innerHTML += `
                    <li>
                        ${item.name} (x${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}
                        <button class="remove-btn" data-index="${index}">❌</button>
                    </li>
                `;
            });

            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function () {
                    removeFromCart(this.getAttribute("data-index"));
                });
            });
        }

        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2);
        }
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartUI();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart)); // Fix: Update localStorage after removing
        updateCartUI(); // Fix: Refresh the UI after removal
    }

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));
            addToCart(name, price);
        }
    });

    window.removeFromCart = removeFromCart;

    updateCartUI();
});





document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    function updateCartUI() {
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartUI();
    }

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));
            addToCart(name, price);
        }
    });

    updateCartUI();
});
