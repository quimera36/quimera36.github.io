document.addEventListener('DOMContentLoaded', function() {
    /* ===== Slider Principal ===== */
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    let slideInterval;
    const slideCount = slides.length;
    const intervalTime = 5000; // 5 segundos
    
    function createDots() {
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    
    function updateDots() {
      document.querySelectorAll('.dots .dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots();
      resetInterval();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      goToSlide(currentIndex);
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }
    
    function startInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startInterval();
    }, {passive: true});
    
    function handleSwipe() {
      const difference = touchStartX - touchEndX;
      if (difference > 50) {
        nextSlide();
      } else if (difference < -50) {
        prevSlide();
      }
    }
    
    createDots();
    startInterval();
    
    /* ===== Smooth Scroll para Navegación ===== */
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      });
    });
    
    /* ===== Manejo del Formulario de Contacto ===== */
    const contactForm = document.getElementById('formContacto');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
      });
    }
    
    /* ===== Ajuste Responsivo del Slider Principal ===== */
    function adjustSliderHeight() {
      const sliderContainer = document.querySelector('.slider-container');
      if (!sliderContainer) return;
      
      if (window.innerWidth <= 576) {
        sliderContainer.style.height = '50vh';
      } else if (window.innerWidth <= 768) {
        sliderContainer.style.height = '60vh';
      } else if (window.innerWidth <= 1024) {
        sliderContainer.style.height = '70vh';
      } else {
        sliderContainer.style.height = '80vh';
      }
    }
    
    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
    
    /* ===== Carrusel de Productos Mejorado ===== */
    const productSlider = document.querySelector('.carousel-slider');
    const productSlides = document.querySelectorAll('.product-slide');
    const prevProductBtn = document.querySelector('.carousel-prev');
    const nextProductBtn = document.querySelector('.carousel-next');
    const productDotsContainer = document.querySelector('.product-dots');
    
    let currentProductIndex = 0;
    const productSlideCount = productSlides.length;
    const productIntervalTime = 5000; // 5 segundos
    let productSlideInterval;
    
    function createProductDots() {
      productSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentProductIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToProductSlide(index));
        productDotsContainer.appendChild(dot);
      });
    }
    
    function updateProductDots() {
      productDotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentProductIndex);
      });
    }
    
    function goToProductSlide(index) {
      productSlider.style.transform = `translateX(-${index * 100}%)`;
      currentProductIndex = index;
      updateProductDots();
      resetProductInterval();
    }
    
    function prevProductSlide() {
      currentProductIndex = (currentProductIndex - 1 + productSlideCount) % productSlideCount;
      goToProductSlide(currentProductIndex);
    }
    
    function nextProductSlide() {
      currentProductIndex = (currentProductIndex + 1) % productSlideCount;
      goToProductSlide(currentProductIndex);
    }
    
    function startProductInterval() {
      productSlideInterval = setInterval(nextProductSlide, productIntervalTime);
    }
    
    function resetProductInterval() {
      clearInterval(productSlideInterval);
      startProductInterval();
    }
    
    if (prevProductBtn) {
      prevProductBtn.addEventListener('click', prevProductSlide);
    }
    
    if (nextProductBtn) {
      nextProductBtn.addEventListener('click', nextProductSlide);
    }
    
    const productCarousel = document.querySelector('.product-carousel');
    if (productCarousel) {
      productCarousel.addEventListener('mouseenter', () => clearInterval(productSlideInterval));
      productCarousel.addEventListener('mouseleave', startProductInterval);
    }
    
    createProductDots();
    startProductInterval();
    
    /* ===== Menú Móvil Desplegable ===== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('active');
    });
  });
  
