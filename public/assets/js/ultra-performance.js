/*
Ultra Performance Optimizer
Aggressive performance optimizations for maximum speed
*/

class UltraPerformanceOptimizer {
    constructor() {
        this.initialized = false;
        this.criticalResources = new Set();
        this.deferredResources = new Set();
        this.init();
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        // Immediate optimizations
        this.optimizeCriticalPath();
        this.deferNonCriticalResources();
        this.optimizeImages();
        this.optimizeFonts();
        this.optimizeIcons();
        this.setupIntersectionObserver();
        this.optimizeScroll();
        this.optimizeResize();
    }

    // Optimize critical rendering path
    optimizeCriticalPath() {
        // Preload only critical CSS
        const criticalCSS = [
            'assets/css/bootstrap.min.css',
            'assets/css/app.min.css'
        ];

        criticalCSS.forEach(css => {
            if (!document.querySelector(`link[href="${css}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = css;
                link.as = 'style';
                link.onload = () => {
                    link.rel = 'stylesheet';
                    this.criticalResources.add(css);
                };
                document.head.appendChild(link);
            }
        });

        // Remove non-critical CSS
        this.removeNonCriticalCSS();
    }

    // Remove non-critical CSS
    removeNonCriticalCSS() {
        const nonCriticalSelectors = [
            'link[href*="remixicon"]',
            'link[href*="icons"]',
            'link[href*="bootstrap-rtl"]'
        ];

        nonCriticalSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.setAttribute('data-defer', 'true');
                el.remove();
            });
        });
    }

    // Defer non-critical resources
    deferNonCriticalResources() {
        // Defer large JavaScript files
        const largeJS = [
            'apexcharts-line.init.js',
            'advanced-form.init.js',
            'chat.init.js',
            'sweetalert.init.js',
            'chartjs.init.js',
            'apps-calendar.init.js',
            'echart.init.js',
            'gridjs.init.js'
        ];

        largeJS.forEach(js => {
            const scripts = document.querySelectorAll(`script[src*="${js}"]`);
            scripts.forEach(script => {
                script.setAttribute('data-defer', 'true');
                script.defer = true;
                this.deferredResources.add(js);
            });
        });
    }

    // Optimize images
    optimizeImages() {
        // Lazy load all images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add placeholder for better UX
            if (!img.src && !img.dataset.src) {
                img.style.background = '#f0f0f0';
                img.style.minHeight = '200px';
            }
        });
    }

    // Optimize fonts
    optimizeFonts() {
        // Preload critical fonts only
        const criticalFonts = [
            'assets/fonts/pe-icon-7-stroke.woff2'
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    // Optimize icons (defer large icon files)
    optimizeIcons() {
        // Defer large icon files
        const largeIcons = [
            'remixicon.svg',
            'remixicon.symbol.svg',
            'remixicon.eot',
            'remixicon.ttf'
        ];

        largeIcons.forEach(icon => {
            const links = document.querySelectorAll(`link[href*="${icon}"]`);
            links.forEach(link => {
                link.setAttribute('data-defer', 'true');
                link.remove();
            });
        });

        // Load icons on demand
        this.loadIconsOnDemand();
    }

    // Load icons on demand
    loadIconsOnDemand() {
        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.classList.contains('ri-icon') || element.classList.contains('icon')) {
                        this.loadIconFont();
                        iconObserver.unobserve(element);
                    }
                }
            });
        });

        // Observe icon elements
        document.querySelectorAll('.ri-icon, .icon, [class*="ri-"]').forEach(icon => {
            iconObserver.observe(icon);
        });
    }

    // Load icon font when needed
    loadIconFont() {
        if (document.querySelector('link[href*="remixicon"]')) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/css/icons.min.css';
        document.head.appendChild(link);
    }

    // Setup intersection observer for lazy loading
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Load deferred resources
                    if (element.dataset.defer) {
                        this.loadDeferredResource(element);
                    }
                    
                    // Load images
                    if (element.tagName === 'IMG' && element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe elements
        document.querySelectorAll('[data-defer], img[data-src]').forEach(el => {
            observer.observe(el);
        });
    }

    // Load deferred resource
    loadDeferredResource(element) {
        if (element.tagName === 'SCRIPT') {
            const script = document.createElement('script');
            script.src = element.src;
            script.async = true;
            script.defer = true;
            element.parentNode.replaceChild(script, element);
        } else if (element.tagName === 'LINK') {
            element.rel = 'stylesheet';
            document.head.appendChild(element);
        }
    }

    // Optimize scroll with passive listeners
    optimizeScroll() {
        let ticking = false;
        let lastScrollY = 0;

        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Only process if scroll changed significantly
                    if (Math.abs(currentScrollY - lastScrollY) > 10) {
                        this.handleScroll(currentScrollY);
                        lastScrollY = currentScrollY;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Handle scroll events
    handleScroll(scrollY) {
        const header = document.getElementById('appHeader');
        if (header) {
            const shouldStick = scrollY > 100;
            const isSticky = header.classList.contains('sticky-scroll');
            
            if (shouldStick !== isSticky) {
                header.classList.toggle('sticky-scroll', shouldStick);
            }
        }
    }

    // Optimize resize with debouncing
    optimizeResize() {
        let resizeTimeout;
        
        const resizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100);
        };

        window.addEventListener('resize', resizeHandler, { passive: true });
    }

    // Handle resize events
    handleResize() {
        // Recalculate layouts if needed
        const elements = document.querySelectorAll('[data-responsive]');
        elements.forEach(el => {
            // Trigger responsive updates
            el.dispatchEvent(new Event('resize'));
        });
    }

    // Get performance metrics
    getMetrics() {
        return {
            criticalResources: this.criticalResources.size,
            deferredResources: this.deferredResources.size,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
            } : null
        };
    }
}

// Initialize ultra performance optimizer
const ultraOptimizer = new UltraPerformanceOptimizer();

// Export for debugging
window.ultraOptimizer = ultraOptimizer;
