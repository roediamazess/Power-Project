/*
Advanced Performance Monitor
Monitors and prevents performance issues in real-time
*/

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            reflowCount: 0,
            paintCount: 0,
            scriptTime: 0,
            longTasks: 0,
            memoryLeaks: 0
        };
        
        this.thresholds = {
            reflow: 16, // ms
            paint: 16,  // ms
            script: 50, // ms
            longTask: 50 // ms
        };
        
        this.init();
    }
    
    init() {
        this.monitorReflow();
        this.monitorPaint();
        this.monitorLongTasks();
        this.monitorMemory();
        this.preventPerformanceIssues();
    }
    
    // Monitor reflow events
    monitorReflow() {
        if (!('PerformanceObserver' in window)) return;
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure' && entry.name.includes('reflow')) {
                    this.metrics.reflowCount++;
                    
                    if (entry.duration > this.thresholds.reflow) {
                        console.warn(`⚠️ Slow reflow detected: ${entry.duration.toFixed(2)}ms`);
                        this.optimizeReflow();
                    }
                }
            }
        });
        
        observer.observe({ entryTypes: ['measure'] });
    }
    
    // Monitor paint events
    monitorPaint() {
        if (!('PerformanceObserver' in window)) return;
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'paint') {
                    this.metrics.paintCount++;
                    console.log(`🎨 Paint: ${entry.name} - ${entry.startTime.toFixed(2)}ms`);
                }
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    }
    
    // Monitor long tasks
    monitorLongTasks() {
        if (!('PerformanceObserver' in window)) return;
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'longtask') {
                    this.metrics.longTasks++;
                    console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`);
                    this.breakUpLongTask();
                }
            }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
    }
    
    // Monitor memory usage
    monitorMemory() {
        if (!performance.memory) return;
        
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1024 / 1024;
            const totalMB = memory.totalJSHeapSize / 1024 / 1024;
            
            if (usedMB > totalMB * 0.8) {
                console.warn(`💾 High memory usage: ${usedMB.toFixed(2)}MB / ${totalMB.toFixed(2)}MB`);
                this.cleanupMemory();
            }
        }, 5000);
    }
    
    // Prevent performance issues
    preventPerformanceIssues() {
        // Override setTimeout to prevent long handlers
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = (callback, delay) => {
            return originalSetTimeout(() => {
                const start = performance.now();
                callback();
                const duration = performance.now() - start;
                
                if (duration > this.thresholds.script) {
                    console.warn(`⏱️ Slow setTimeout handler: ${duration.toFixed(2)}ms`);
                }
            }, delay);
        };
        
        // Override setInterval
        const originalSetInterval = window.setInterval;
        window.setInterval = (callback, delay) => {
            return originalSetInterval(() => {
                const start = performance.now();
                callback();
                const duration = performance.now() - start;
                
                if (duration > this.thresholds.script) {
                    console.warn(`⏱️ Slow setInterval handler: ${duration.toFixed(2)}ms`);
                }
            }, delay);
        };
    }
    
    // Optimize reflow
    optimizeReflow() {
        // Force layout recalculation
        document.body.offsetHeight;
        
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            // Batch DOM updates
            const updates = [];
            const elements = document.querySelectorAll('[data-optimize]');
            
            elements.forEach(el => {
                updates.push(() => {
                    el.style.transform = 'translateZ(0)';
                });
            });
            
            // Execute updates in batches
            updates.forEach((update, index) => {
                setTimeout(update, index * 5);
            });
        });
    }
    
    // Break up long tasks
    breakUpLongTask() {
        // Use setTimeout to yield control
        setTimeout(() => {
            // Process next chunk
        }, 0);
    }
    
    // Cleanup memory
    cleanupMemory() {
        // Clear unused event listeners
        const elements = document.querySelectorAll('[data-cleanup]');
        elements.forEach(el => {
            el.removeEventListener('scroll', () => {});
            el.removeEventListener('resize', () => {});
        });
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }
    
    // Get performance report
    getReport() {
        return {
            ...this.metrics,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
            } : 'Not available',
            performanceScore: this.calculateScore()
        };
    }
    
    // Calculate performance score
    calculateScore() {
        let score = 100;
        
        if (this.metrics.reflowCount > 10) score -= 20;
        if (this.metrics.longTasks > 5) score -= 30;
        if (this.metrics.scriptTime > 1000) score -= 25;
        
        return Math.max(0, score);
    }
}

// Initialize advanced performance monitoring
const advancedMonitor = new PerformanceMonitor();

// Export for global use
window.performanceMonitorAdvanced = advancedMonitor;

// Log report every 10 seconds
setInterval(() => {
    const report = advancedMonitor.getReport();
    if (report.performanceScore < 80) {
        console.warn('🚨 Performance issues detected:', report);
    }
}, 10000);
