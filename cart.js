  const SHIPPING_COST = 5.99;
        const TAX_RATE = 0.1;

        // Update cart count
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            document.getElementById('cartCount').textContent = cart.length;
        }

        // Load and display cart items
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const container = document.getElementById('cartItemsContainer');

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="cart-items">
                        <div class="empty-cart">
                            <div class="empty-icon">🛒</div>
                            <h2>Your Cart is Empty</h2>
                            <p>Add some designs from Saved Designs to get started</p>
                            <a href="saved-designs.html" class="btn-primary">View Saved Designs</a>
                        </div>
                    </div>
                `;
                document.getElementById('checkoutBtn').disabled = true;
                updateSummary(0);
                return;
            }

            let html = '<div class="cart-items">';

            cart.forEach(item => {
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.product}" class="item-image">
                        <div class="item-details">
                            <h3>${item.product}</h3>
                            <p title="${item.prompt}">"${item.prompt}"</p>
                            <div class="item-price">$${item.price}</div>
                        </div>
                        <button class="item-remove" onclick="removeFromCart('${item.cartId}')">Remove</button>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;

            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
            updateSummary(subtotal);
        }

        // Update order summary
        function updateSummary(subtotal) {
            const shipping = subtotal > 0 ? SHIPPING_COST : 0;
            const tax = (subtotal + shipping) * TAX_RATE;
            const total = subtotal + shipping + tax;

            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        }

        // Remove item from cart
        function removeFromCart(cartId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.cartId != cartId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            loadCart();
        }

        // Proceed to checkout
        function proceedToCheckout() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        }

        // Scroll progress
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Initialize
        updateCartCount();
        loadCart();


        // ================= MOBILE MENU (Hamburger) =================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}
