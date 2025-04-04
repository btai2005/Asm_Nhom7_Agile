document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to show previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add click event listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideShow();
    });

    // Add click event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideShow();
        });
    });

    // Function to start automatic slideshow
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Start the slideshow
    startSlideShow();
});

// Product Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const productSlides = document.querySelectorAll('.product-slide');
    const productPrevBtn = document.querySelector('.product-prev-btn');
    const productNextBtn = document.querySelector('.product-next-btn');
    const productDotsContainer = document.querySelector('.product-dots');
    let currentProductSlide = 0;
    let productSlideInterval;

    // Create dots
    productSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('product-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            clearInterval(productSlideInterval);
            showProductSlide(index);
            startProductSlideShow();
        });
        productDotsContainer.appendChild(dot);
    });

    const productDots = document.querySelectorAll('.product-dot');

    function showProductSlide(index) {
        productSlides.forEach(slide => slide.classList.remove('active'));
        productDots.forEach(dot => dot.classList.remove('active'));
        
        productSlides[index].classList.add('active');
        productDots[index].classList.add('active');
        currentProductSlide = index;
    }

    function nextProductSlide() {
        currentProductSlide = (currentProductSlide + 1) % productSlides.length;
        showProductSlide(currentProductSlide);
    }

    function prevProductSlide() {
        currentProductSlide = (currentProductSlide - 1 + productSlides.length) % productSlides.length;
        showProductSlide(currentProductSlide);
    }

    function startProductSlideShow() {
        productSlideInterval = setInterval(() => {
            nextProductSlide();
        }, 5000);
    }

    productPrevBtn.addEventListener('click', () => {
        clearInterval(productSlideInterval);
        prevProductSlide();
        startProductSlideShow();
    });

    productNextBtn.addEventListener('click', () => {
        clearInterval(productSlideInterval);
        nextProductSlide();
        startProductSlideShow();
    });

    // Start slideshow
    startProductSlideShow();

    // Pause slideshow on hover
    const productSlideshow = document.querySelector('.product-slideshow');
    productSlideshow.addEventListener('mouseenter', () => {
        clearInterval(productSlideInterval);
    });

    productSlideshow.addEventListener('mouseleave', () => {
        startProductSlideShow();
    });
}); 