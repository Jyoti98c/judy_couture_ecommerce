document.addEventListener("DOMContentLoaded", function () {
    const checkoutCartItems = document.getElementById("checkout-cart-items");
    const checkoutTotal = document.getElementById("checkout-total");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCheckoutUI() {
        checkoutCartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            checkoutCartItems.innerHTML += `
                <li>${item.name} - £${item.price.toFixed(2)}
                <button onclick="removeFromCart(${index})">❌</button></li>
            `;
        });

        checkoutTotal.textContent = total.toFixed(2);
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCheckoutUI();
    };

    window.placeOrder = function () {
        alert("Thank you for your order!");
        localStorage.removeItem("cart");
        updateCheckoutUI();
    };

    updateCheckoutUI();
});
