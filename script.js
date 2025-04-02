document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Variables de estado
    let currentIndex = 0;
    let slideInterval;
    const slideCount = slides.length;
    const intervalTime = 5000; // 5 segundos
    
    // Crear indicadores (dots) de navegación
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Ir a un slide específico
    function goToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
        resetInterval();
    }
    
    // Actualizar los dots activos
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(currentIndex);
    }
    
    // Siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }
    
    // Iniciar autoavance
    function startInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Reiniciar intervalo al interactuar manualmente
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Pausar al pasar el ratón
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
    
    // Manejo de touch para dispositivos móviles
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
        if (difference > 50) { // Deslizamiento a la izquierda
            nextSlide();
        } else if (difference < -50) { // Deslizamiento a la derecha
            prevSlide();
        }
    }
    
    // Inicialización
    createDots();
    startInterval();
    
    // Smooth scroll para navegación
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
    
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('formContacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulación de envío
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }
    
    // Ajuste responsivo del carrusel
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
    
    // Ejecutar al cargar y al redimensionar
    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
});