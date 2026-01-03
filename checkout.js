 const SHIPPING_COST = 5.99;
        const TAX_RATE = 0.1;

        // Load order summary
        function loadOrderSummary() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                alert('Your cart is empty!');
                window.location.href = 'cart.html';
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
            const shipping = SHIPPING_COST;
            const tax = (subtotal + shipping) * TAX_RATE;
            const total = subtotal + shipping + tax;

            let html = '';
            cart.forEach(item => {
                html += `
                    <div class="summary-item">
                        <span>${item.product}</span>
                        <span>$${item.price}</span>
                    </div>
                `;
            });

            html += `
                <div class="summary-item">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Shipping</span>
                    <span>$${shipping.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Tax</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            `;

            document.getElementById('orderSummary').innerHTML = html;

            // Store total for submission
            window.orderTotal = total.toFixed(2);
        }

        // Format card number with spaces
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formatted;
        });

        // Format expiry date
        document.getElementById('expiry').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // Handle payment method change
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.getElementById('cardDetails').style.display = 
                    this.value === 'credit' || this.value === 'debit' ? 'block' : 'none';
            });
        });


        // Handle checkout form submission
        function handleCheckout(e) {
            e.preventDefault();

            // Validate form
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;

            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const form = document.getElementById('checkoutForm');
            const successMessage = document.getElementById('successMessage');

            // Simulate order processing
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing Order...';

            setTimeout(() => {
                // Clear cart
                localStorage.setItem('cart', JSON.stringify([]));

                // Show success message
                form.style.display = 'none';
                successMessage.classList.add('show');

                // Scroll to success message
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);
            }, 2000);
        }

        // Scroll progress
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Initialize
        loadOrderSummary();

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
