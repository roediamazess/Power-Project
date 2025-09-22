/*
Lazy Loading Optimization
Reduces initial page load time by loading images and scripts on demand
*/

// Intersection Observer for lazy loading
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Lazy load images
            if (element.tagName === 'IMG' && element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
                element.classList.add('loaded');
            }
            
            // Lazy load background images
            if (element.dataset.bg) {
                element.style.backgroundImage = `url(${element.dataset.bg})`;
                element.removeAttribute('data-bg');
                element.classList.add('loaded');
            }
            
            // Lazy load scripts
            if (element.dataset.src && element.tagName === 'SCRIPT') {
                const script = document.createElement('script');
                script.src = element.dataset.src;
                script.async = true;
                element.parentNode.replaceChild(script, element);
            }
            
            lazyLoadObserver.unobserve(element);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Initialize lazy loading
function initializeLazyLoading() {
    // Lazy load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
    });
    
    // Lazy load background images
    document.querySelectorAll('[data-bg]').forEach(element => {
        lazyLoadObserver.observe(element);
    });
    
    // Lazy load scripts
    document.querySelectorAll('script[data-src]').forEach(script => {
        lazyLoadObserver.observe(script);
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'assets/css/app.min.css',
        'assets/css/bootstrap.min.css',
        'assets/js/app.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        initializeLazyLoading();
    });
} else {
    preloadCriticalResources();
    initializeLazyLoading();
}
