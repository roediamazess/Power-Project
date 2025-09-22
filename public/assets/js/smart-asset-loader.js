/*
Smart Asset Loader
Restores original appearance by loading assets on demand
*/

class SmartAssetLoader {
    constructor() {
        this.loadedAssets = new Set();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIconLoader();
        this.setupCSSLoader();
        this.setupJSLoader();
        this.restoreOriginalAppearance();
    }

    // Setup icon loading
    setupIconLoader() {
        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadIcons();
                    iconObserver.unobserve(entry.target);
                }
            });
        });

        // Observe elements that might need icons
        document.querySelectorAll('.ri-icon, .icon, [class*="ri-"], .btn, .nav-link').forEach(el => {
            iconObserver.observe(el);
        });
    }

    // Load icons on demand
    loadIcons() {
        if (this.loadedAssets.has('icons')) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/css/icons.min.css';
        link.onload = () => {
            this.loadedAssets.add('icons');
            console.log('Icons loaded on demand');
        };
        document.head.appendChild(link);
    }

    // Setup CSS loading
    setupCSSLoader() {
        const cssObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadAdditionalCSS();
                    cssObserver.unobserve(entry.target);
                }
            });
        });

        // Observe elements that might need additional CSS
        document.querySelectorAll('.card, .table, .form-control, .btn').forEach(el => {
            cssObserver.observe(el);
        });
    }

    // Load additional CSS
    loadAdditionalCSS() {
        if (this.loadedAssets.has('additional-css')) return;

        // Load RTL CSS if needed
        if (document.dir === 'rtl') {
            const rtlLink = document.createElement('link');
            rtlLink.rel = 'stylesheet';
            rtlLink.href = 'assets/css/bootstrap-rtl.min.css';
            document.head.appendChild(rtlLink);
        }

        this.loadedAssets.add('additional-css');
        console.log('Additional CSS loaded on demand');
    }

    // Setup JavaScript loading
    setupJSLoader() {
        const jsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadJavaScript(entry.target);
                }
            });
        });

        // Observe elements that might need JavaScript
        document.querySelectorAll('.chart, .table, .form, .modal').forEach(el => {
            jsObserver.observe(el);
        });
    }

    // Load JavaScript based on element type
    loadJavaScript(element) {
        if (element.classList.contains('chart') && !this.loadedAssets.has('charts')) {
            this.loadScript('assets/js/chartjs.init.js');
            this.loadedAssets.add('charts');
        }

        if (element.classList.contains('table') && !this.loadedAssets.has('tables')) {
            this.loadScript('assets/js/table.init.js');
            this.loadedAssets.add('tables');
        }

        if (element.classList.contains('form') && !this.loadedAssets.has('forms')) {
            this.loadScript('assets/js/advanced-form.init.js');
            this.loadedAssets.add('forms');
        }
    }

    // Load script dynamically
    loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log(`Script loaded: ${src}`);
        };
        document.head.appendChild(script);
    }

    // Restore original appearance
    restoreOriginalAppearance() {
        // Add back essential styles that might be missing
        this.addEssentialStyles();
        
        // Ensure buttons and forms look correct
        this.ensureFormStyling();
        
        // Ensure navigation looks correct
        this.ensureNavigationStyling();
    }

    // Add essential styles
    addEssentialStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Essential icon styles */
            .ri-icon, .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                vertical-align: middle;
            }
            
            /* Ensure buttons look correct */
            .btn {
                display: inline-block;
                padding: 0.375rem 0.75rem;
                margin-bottom: 0;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                text-align: center;
                text-decoration: none;
                vertical-align: middle;
                cursor: pointer;
                border: 1px solid transparent;
                border-radius: 0.375rem;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
            
            .btn-primary {
                color: #fff;
                background-color: #0d6efd;
                border-color: #0d6efd;
            }
            
            .btn-primary:hover {
                color: #fff;
                background-color: #0b5ed7;
                border-color: #0a58ca;
            }
            
            /* Ensure forms look correct */
            .form-control {
                display: block;
                width: 100%;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: 0.375rem;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
            
            .form-control:focus {
                color: #212529;
                background-color: #fff;
                border-color: #86b7fe;
                outline: 0;
                box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
            }
            
            /* Ensure cards look correct */
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                min-width: 0;
                word-wrap: break-word;
                background-color: #fff;
                background-clip: border-box;
                border: 1px solid rgba(0, 0, 0, 0.125);
                border-radius: 0.375rem;
            }
            
            .card-body {
                flex: 1 1 auto;
                padding: 1rem;
            }
            
            /* Ensure tables look correct */
            .table {
                width: 100%;
                margin-bottom: 1rem;
                color: #212529;
                border-collapse: collapse;
            }
            
            .table th,
            .table td {
                padding: 0.75rem;
                vertical-align: top;
                border-top: 1px solid #dee2e6;
            }
            
            .table thead th {
                vertical-align: bottom;
                border-bottom: 2px solid #dee2e6;
            }
        `;
        document.head.appendChild(style);
    }

    // Ensure form styling
    ensureFormStyling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.classList.add('needs-validation');
        });
    }

    // Ensure navigation styling
    ensureNavigationStyling() {
        const navs = document.querySelectorAll('.navbar, .nav');
        navs.forEach(nav => {
            nav.classList.add('navbar-expand-lg');
        });
    }

    // Get loaded assets info
    getLoadedAssets() {
        return Array.from(this.loadedAssets);
    }
}

// Initialize smart asset loader
const smartLoader = new SmartAssetLoader();

// Export for debugging
window.smartLoader = smartLoader;
