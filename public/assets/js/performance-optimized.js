/*
Performance Optimized JavaScript
Optimized to reduce reflow and improve performance
*/

// Debounce function to limit function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function to limit function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler with requestAnimationFrame
function optimizedScrollHandler() {
    let ticking = false;
    
    function updateScrollPosition() {
        const stickyMenu = document.getElementById("appHeader");
        if (!stickyMenu) return;
        
        const stickyOffset = stickyMenu.offsetTop;
        
        if (window.scrollY > stickyOffset) {
            stickyMenu.classList.add("sticky-scroll");
        } else {
            stickyMenu.classList.remove("sticky-scroll");
        }
        
        ticking = false;
    }
    
    return function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    };
}

// Initialize app with performance optimizations
function initializeOptimizedApp() {
    // Use optimized scroll handler
    const scrollHandler = optimizedScrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    
    // Optimize tooltip and popover initialization
    const initializeBootstrapComponents = (selector, Component) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return [];
        
        return Array.from(elements).map((element) => {
            try {
                return new Component(element);
            } catch (error) {
                console.warn('Failed to initialize component:', error);
                return null;
            }
        }).filter(Boolean);
    };
    
    // Initialize components with error handling
    const tooltips = initializeBootstrapComponents(
        '[data-bs-toggle="tooltip"]',
        bootstrap.Tooltip
    );
    
    const popovers = initializeBootstrapComponents(
        '[data-bs-toggle="popover"]',
        bootstrap.Popover
    );
    
    // Optimize button loader with debouncing
    const debouncedButtonLoader = debounce((button) => {
        const indicatorLabel = button.querySelector(".indicator-label");
        if (!indicatorLabel) return;
        
        const originalText = indicatorLabel.textContent;
        const loadingText = button.getAttribute("data-loading-text");
        
        if (loadingText) {
            indicatorLabel.textContent = loadingText;
        }
        
        button.disabled = true;
        button.classList.add("btn-loading");
        
        // Reset after 3 seconds (adjust as needed)
        setTimeout(() => {
            button.disabled = false;
            button.classList.remove("btn-loading");
            indicatorLabel.textContent = originalText;
        }, 3000);
    }, 100);
    
    // Attach optimized click event listeners
    document.querySelectorAll(".btn-loader").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            debouncedButtonLoader(button);
        });
    });
}

// Optimized layout setup
function optimizedLayoutSetup() {
    const htmlElement = document.documentElement;
    
    // Batch DOM updates to reduce reflow
    const settings = [
        { attribute: "data-layout", defaultValue: "vertical" },
        { attribute: "data-bs-theme", defaultValue: "light" },
        { attribute: "data-content-width", defaultValue: "default" },
        { attribute: "dir", defaultValue: "ltr" },
        { attribute: "data-sidebar-size", defaultValue: "default" },
        { attribute: "data-sidebar-color", defaultValue: "default" },
        { attribute: "data-sidebar", defaultValue: "light" },
        { attribute: "data-theme-colors", defaultValue: "default" },
    ];
    
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
        settings.forEach((setting) => {
            const savedValue = localStorage.getItem(setting.attribute);
            const valueToApply = savedValue || setting.defaultValue;
            
            htmlElement.setAttribute(setting.attribute, valueToApply);
            
            if (setting.attribute === "dir") {
                updateLayoutDir(valueToApply);
            } else if (setting.attribute === "data-bs-theme") {
                setTheme(valueToApply);
            }
            
            const radioSelector = `input[name="${setting.attribute}"][value="${valueToApply}"]`;
            const radioElement = document.querySelector(radioSelector);
            if (radioElement) {
                radioElement.checked = true;
            }
        });
        
        updateSimpleBar(htmlElement.getAttribute("data-layout"));
        
        if (htmlElement.getAttribute("data-layout") === "horizontal") {
            removeHorizontalAttributes();
        }
    });
}

// Optimized theme setting
function setTheme(valueToApply) {
    let THEME_MODE = "";
    if (valueToApply === "auto") {
        THEME_MODE = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        document.documentElement.setAttribute("data-bs-theme", THEME_MODE);
    } else {
        THEME_MODE = valueToApply;
    }
}

// Optimized layout direction update
function updateLayoutDir(value) {
    const bootstrapCss = document.getElementById("bootstrap-style");
    const appCss = document.getElementById("app-style");
    
    if (!bootstrapCss || !appCss) return;
    
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
        if (value === "rtl") {
            bootstrapCss.href = bootstrapCss.href.replace(
                "bootstrap.min.css",
                "bootstrap-rtl.min.css"
            );
            appCss.href = appCss.href.replace("app.min.css", "app-rtl.min.css");
        } else {
            bootstrapCss.href = bootstrapCss.href.replace(
                "bootstrap-rtl.min.css",
                "bootstrap.min.css"
            );
            appCss.href = appCss.href.replace("app-rtl.min.css", "app.min.css");
        }
    });
}

// Optimized SimpleBar update
function updateSimpleBar(value) {
    // Use setTimeout to avoid blocking the main thread
    setTimeout(() => {
        const sidebarSimpleBarMenu = document.getElementById('sidebar-simplebar');
        if (!sidebarSimpleBarMenu) return;
        
        if ((value === "vertical" || value === "horizontal" || value === "semibox") && 
            document.documentElement.getAttribute("data-sidebar") !== "icon") {
            
            const allMenus = sidebarSimpleBarMenu.querySelector('ul.pe-main-menu');
            if (allMenus) {
                sidebarSimpleBarMenu.innerHTML = allMenus.parentElement.innerHTML;
            }
            
            sidebarSimpleBarMenu.setAttribute('data-simplebar', '');
            
            if (window.SimpleBar) {
                try {
                    new SimpleBar(sidebarSimpleBarMenu);
                } catch (error) {
                    console.warn('SimpleBar initialization failed:', error);
                }
            }
        }
    }, 0);
}

// Remove horizontal attributes
function removeHorizontalAttributes() {
    const attributes = ["data-sidebar", "data-sidebar-size", "data-sidebar-color"];
    attributes.forEach(attr => {
        document.documentElement.removeAttribute(attr);
    });
}

// Set current year without document.write
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Optimize resource loading
function optimizeResourceLoading() {
    // Remove unused preloads
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    preloadLinks.forEach(link => {
        const href = link.href;
        if (href.includes('app.js') && !document.querySelector(`script[src="${href}"]`)) {
            // Convert preload to actual script loading
            const script = document.createElement('script');
            script.src = href;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            link.remove();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeOptimizedApp();
        optimizedLayoutSetup();
        setCurrentYear();
        optimizeResourceLoading();
    });
} else {
    initializeOptimizedApp();
    optimizedLayoutSetup();
    setCurrentYear();
    optimizeResourceLoading();
}

// Export functions for global use
window.optimizedApp = {
    initializeOptimizedApp,
    optimizedLayoutSetup,
    setTheme,
    updateLayoutDir,
    updateSimpleBar,
    removeHorizontalAttributes
};
