 function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            document.getElementById('cartCount').textContent = cart.length;
        }

        // Call on page load
        updateCartCount();

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        gsap.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3
        });

        // Word by word animation
        gsap.to('.word', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power3.out'
        });

        gsap.to('.hero p', {
            opacity: 1,
            duration: 0.8,
            delay: 1.5
        });

        // Floating shapes animation
        gsap.to('.shape-1', {
            y: -30,
            x: 20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        gsap.to('.shape-2', {
            y: 40,
            x: -30,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        gsap.to('.shape-3', {
            y: -25,
            x: 15,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // Product cards animation
        gsap.utils.toArray('.product-card').forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                }
            });
        });

        // About section animation
        gsap.from('.about-card', {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%'
            }
        });

        gsap.from('.about-content', {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%'
            }
        });

        // Scroll Progress
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
            gsap.to(cursorFollower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3
            });
        });

        // Button hover effects
        document.querySelectorAll('.product-generate-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2, duration: 0.3 });
                gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: 'power2.inOut'
                    });
                }
            });
        });

        // Modal functionality
        const modal = document.getElementById('generationModal');
        const closeModal = document.getElementById('closeModal');
        const generationForm = document.getElementById('generationForm');
        const promptInput = document.getElementById('promptInput');
        const generateBtn = document.getElementById('generateBtn');
        const productName = document.getElementById('productName');
        const generationResult = document.getElementById('generationResult');

        let currentProduct = '';
        let currentPrice = '';

        // Open modal when generate button is clicked
        document.querySelectorAll('.product-generate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentProduct = btn.getAttribute('data-product');
                currentPrice = btn.getAttribute('data-price');
                productName.textContent = currentProduct;
                promptInput.value = '';
                generationResult.innerHTML = '';
                modal.classList.add('active');
                promptInput.focus();
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Generate image on form submit
        generationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const prompt = promptInput.value.trim();
            if (!prompt) return;

            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';
            generationResult.innerHTML = '<div class="loading-spinner"></div><p style="color: var(--gray); margin-top: 1rem;">Creating your masterpiece...</p>';

            try {
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');
                
                // Create a gradient background
                const gradient = ctx.createLinearGradient(0, 0, 400, 400);
                gradient.addColorStop(0, '#6366f1');
                gradient.addColorStop(1, '#ec4899');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 400, 400);
                
                // Add text
                ctx.fillStyle = '#f8fafc';
                ctx.font = 'bold 24px Poppins';
                ctx.textAlign = 'center';
                ctx.fillText('Generated Design', 200, 150);
                ctx.font = '16px Poppins';
                ctx.fillText(prompt.substring(0, 40), 200, 200);
                ctx.fillText(currentProduct, 200, 250);
                
                const imageUrl = canvas.toDataURL('image/png');
                
                // Show generated image with save button
                generationResult.innerHTML = `
                    <div class="generated-image-container">
                        <img src="${imageUrl}" alt="Generated image" class="generated-image" id="generatedImg">
                        <p style="color: var(--gray); font-size: 0.9rem;">✨ Your AI-generated design is ready!</p>
                        <button type="button" class="save-design-btn" id="saveDesignBtn">💾 Save Design</button>
                    </div>
                `;

                // Save design button functionality
                document.getElementById('saveDesignBtn').addEventListener('click', () => {
                    const design = {
                        id: Date.now(),
                        product: currentProduct,
                        prompt: prompt,
                        image: imageUrl,
                        price: currentPrice,
                        createdAt: new Date().toLocaleDateString()
                    };

                    // Save to localStorage
                    let savedDesigns = JSON.parse(localStorage.getItem('savedDesigns')) || [];
                    savedDesigns.push(design);
                    localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));

                    alert('✨ Design saved successfully! Go to Saved Designs to view or add to cart.');
                    modal.classList.remove('active');
                });

            } catch (error) {
                console.error('Error:', error);
                generationResult.innerHTML = `
                    <p style="color: #ef4444; margin-top: 1rem;">Failed to generate image. Please try again with a different prompt.</p>
                `;
            } finally {
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generate Image ✨';
            }
        });

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
