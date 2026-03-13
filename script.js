document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const closeCart = document.getElementById("close-cart");
    const cartModal = document.getElementById("cart-modal");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

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
                        <button onclick="removeFromCart(${index})">❌</button>
                    </li>
                `;
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
        updateCartUI();
    }

    // Fix: Ensure buttons are dynamically detected even if loaded after script runs
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));
            addToCart(name, price);
        }
    });

    if (cartButton) {
        cartButton.addEventListener("click", function () {
            if (cartModal) {
                cartModal.style.display = "flex";
            }
        });
    }

    if (closeCart) {
        closeCart.addEventListener("click", function () {
            if (cartModal) {
                cartModal.style.display = "none";
            }
        });
    }

    window.removeFromCart = removeFromCart;

    updateCartUI();
});
