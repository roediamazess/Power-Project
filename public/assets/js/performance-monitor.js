/*
Performance Monitor
Monitors and reports performance issues
*/

// Performance monitoring
const performanceMonitor = {
    // Track performance metrics
    metrics: {
        reflowCount: 0,
        paintCount: 0,
        scriptTime: 0
    },
    
    // Monitor reflow events
    monitorReflow() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure' && entry.name.includes('reflow')) {
                    this.metrics.reflowCount++;
                    if (entry.duration > 16) { // More than one frame
                        console.warn(`Slow reflow detected: ${entry.duration}ms`);
                    }
                }
            }
        });
        
        observer.observe({ entryTypes: ['measure'] });
    },
    
    // Monitor paint events
    monitorPaint() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'paint') {
                    this.metrics.paintCount++;
                    console.log(`Paint: ${entry.name} - ${entry.startTime}ms`);
                }
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    },
    
    // Monitor script execution time
    monitorScriptTime() {
        const startTime = performance.now();
        
        // Monitor after page load
        window.addEventListener('load', () => {
            const endTime = performance.now();
            this.metrics.scriptTime = endTime - startTime;
            
            if (this.metrics.scriptTime > 1000) {
                console.warn(`Slow script execution: ${this.metrics.scriptTime}ms`);
            }
        });
    },
    
    // Get performance report
    getReport() {
        return {
            ...this.metrics,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB'
            } : 'Not available'
        };
    },
    
    // Initialize monitoring
    init() {
        if ('PerformanceObserver' in window) {
            this.monitorReflow();
            this.monitorPaint();
        }
        this.monitorScriptTime();
        
        // Log report after 5 seconds
        setTimeout(() => {
            console.log('Performance Report:', this.getReport());
        }, 5000);
    }
};

// Initialize performance monitoring
performanceMonitor.init();

// Export for global use
window.performanceMonitor = performanceMonitor;
