 // Update cart count
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            document.getElementById('cartCount').textContent = cart.length;
        }

        // Load and display saved designs
        function loadDesigns() {
            const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns')) || [];
            const container = document.getElementById('designsContainer');

            if (savedDesigns.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🎨</div>
                        <h2>No Saved Designs Yet</h2>
                        <p>Create your first AI-generated design to see it here</p>
                        <a href="index.html#products" class="btn-primary">Generate Design Now</a>
                    </div>
                `;
                return;
            }

            let html = '<div class="designs-grid">';
            
            savedDesigns.forEach((design, index) => {
                html += `
                    <div class="design-card" style="animation-delay: ${index * 0.1}s;">
                        <img src="${design.image}" alt="${design.product}" class="design-image">
                        <div class="design-info">
                            <div class="design-product">${design.product}</div>
                            <div class="design-prompt">"${design.prompt}"</div>
                            <div class="design-meta">
                                <span class="design-price">$${design.price}</span>
                                <span class="design-date">${design.createdAt}</span>
                            </div>
                            <div class="design-actions">
                                <button class="btn-action btn-add-cart" onclick="addToCart(${design.id})">
                                    🛒 Add to Cart
                                </button>
                                <button class="btn-action btn-delete" onclick="deleteDesign(${design.id})">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        }

        // Add design to cart
        function addToCart(designId) {
            const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns')) || [];
            const design = savedDesigns.find(d => d.id === designId);

            if (!design) return;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItem = {
                cartId: Date.now() + Math.random(),
                ...design
            };

            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            alert('✨ Design added to cart!');
        }

        // Delete design
        function deleteDesign(designId) {
            if (!confirm('Are you sure you want to delete this design?')) return;

            let savedDesigns = JSON.parse(localStorage.getItem('savedDesigns')) || [];
            savedDesigns = savedDesigns.filter(d => d.id !== designId);
            localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));

            loadDesigns();
        }

        // Scroll progress
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Initialize
        updateCartCount();
        loadDesigns();


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
