// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
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

    // Slider functionality
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const totalSlides = 4;

    function updateSlider() {
        const translateX = -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-play slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 4000);

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

    // Dynamic content loading simulation
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
                moreContent.textContent = 'Konten tambahan yang dimuat secara dinamis menggunakan JavaScript. Ini menunjukkan manipulasi DOM untuk menambahkan elemen baru ke halaman.';
                moreContent.style.marginTop = '1rem';
                moreContent.style.fontStyle = 'italic';
                moreContent.style.color = '#667eea';
                content.appendChild(moreContent);
                
                this.textContent = 'Sembunyikan';
            } else {
                // Remove the last paragraph
                const lastPara = content.querySelector('p:last-child');
                if (lastPara && lastPara.style.fontStyle === 'italic') {
                    lastPara.remove();
                }
                this.textContent = 'Baca Selengkapnya';
            }
        });
    });
});