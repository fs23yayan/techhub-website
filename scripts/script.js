// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Slider functionality
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const totalSlides = 4;

    function updateSlider() {
        if (sliderTrack) {
            const translateX = -currentSlide * 100;
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            sliderDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
                dot.setAttribute('aria-selected', index === currentSlide);
            });
        }
    }

    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });

        // Keyboard navigation
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentSlide = index;
                updateSlider();
            }
        });
    });

    // Auto-play slider
    const autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 4000);

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 4000);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic content loading simulation with fade-in animation
    const articles = document.querySelectorAll('article');
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            article.style.transition = 'all 0.6s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Read more functionality with dynamic content
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const article = this.closest('article');
            const content = article.querySelector('.article-content');
            
            if (this.textContent === 'Baca Selengkapnya') {
                // Simulate loading more content
                const moreContent = document.createElement('p');
                moreContent.textContent = 'Konten tambahan yang dimuat secara dinamis menggunakan JavaScript. Ini menunjukkan manipulasi DOM untuk menambahkan elemen baru ke halaman web dengan efek transisi yang smooth.';
                moreContent.style.marginTop = '1rem';
                moreContent.style.fontStyle = 'italic';
                moreContent.style.color = '#667eea';
                moreContent.style.opacity = '0';
                moreContent.style.transform = 'translateY(20px)';
                moreContent.style.transition = 'all 0.3s ease';
                
                content.appendChild(moreContent);
                
                // Trigger animation
                setTimeout(() => {
                    moreContent.style.opacity = '1';
                    moreContent.style.transform = 'translateY(0)';
                }, 10);
                
                this.textContent = 'Sembunyikan';
            } else {
                // Remove the last paragraph with animation
                const lastPara = content.querySelector('p:last-child');
                if (lastPara && lastPara.style.fontStyle === 'italic') {
                    lastPara.style.opacity = '0';
                    lastPara.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        lastPara.remove();
                    }, 300);
                }
                this.textContent = 'Baca Selengkapnya';
            }
        });
    });

    // Accessibility improvements
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        z-index: 1000;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id for skip link
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.id = 'main-content';
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            // Create fallback element
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: ${this.width || 150}px;
                height: ${this.height || 150}px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 3rem;
                margin: 0 auto 1rem;
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            `;
            fallback.textContent = '👨‍💻';
            fallback.setAttribute('aria-label', this.alt || 'Profile image not available');
            
            this.parentNode.insertBefore(fallback, this);
        });
    });

    console.log('TechHub Indonesia website loaded successfully! 🚀');
});