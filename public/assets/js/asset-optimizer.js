/*
Asset Optimizer
Removes heavy assets and optimizes loading
*/

class AssetOptimizer {
    constructor() {
        this.heavyAssets = [
            'remixicon.svg',
            'remixicon.symbol.svg', 
            'remixicon.eot',
            'remixicon.ttf',
            'icons.min.css',
            'bootstrap-rtl.min.css'
        ];
        
        this.init();
    }
    
    init() {
        this.removeHeavyAssets();
        this.optimizeExistingAssets();
        this.setupLazyLoading();
    }
    
    // Remove heavy assets
    removeHeavyAssets() {
        this.heavyAssets.forEach(asset => {
            // Remove CSS links
            const cssLinks = document.querySelectorAll(`link[href*="${asset}"]`);
            cssLinks.forEach(link => {
                console.log(`Removing heavy asset: ${asset}`);
                link.remove();
            });
            
            // Remove script references
            const scripts = document.querySelectorAll(`script[src*="${asset}"]`);
            scripts.forEach(script => {
                console.log(`Removing heavy script: ${asset}`);
                script.remove();
            });
        });
    }
    
    // Optimize existing assets
    optimizeExistingAssets() {
        // Add defer to non-critical scripts
        const scripts = document.querySelectorAll('script:not([defer]):not([async])');
        scripts.forEach(script => {
            if (!script.src.includes('ultra-performance') && 
                !script.src.includes('cleanup-scripts')) {
                script.defer = true;
            }
        });
        
        // Optimize CSS loading
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            if (link.href.includes('bootstrap') || link.href.includes('app')) {
                link.setAttribute('media', 'all');
            } else {
                link.setAttribute('media', 'print');
                link.onload = () => {
                    link.setAttribute('media', 'all');
                };
            }
        });
    }
    
    // Setup lazy loading for remaining assets
    setupLazyLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Load images
                    if (element.tagName === 'IMG' && element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    
                    // Load background images
                    if (element.dataset.bg) {
                        element.style.backgroundImage = `url(${element.dataset.bg})`;
                        element.removeAttribute('data-bg');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe lazy elements
        document.querySelectorAll('img[data-src], [data-bg]').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize asset optimizer
const assetOptimizer = new AssetOptimizer();

// Export for debugging
window.assetOptimizer = assetOptimizer;
