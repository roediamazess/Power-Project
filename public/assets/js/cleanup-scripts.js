/*
Cleanup Scripts
Removes document.write() and other performance issues
*/

// Remove all document.write() calls
function removeDocumentWrite() {
    // Override document.write to prevent it from being called
    const originalWrite = document.write;
    document.write = function(content) {
        console.warn('document.write() is deprecated and blocked for performance reasons');
        // Instead of writing, append to a container
        const container = document.getElementById('dynamic-content') || document.body;
        if (container) {
            const div = document.createElement('div');
            div.innerHTML = content;
            container.appendChild(div);
        }
    };
    
    // Also override writeln
    document.writeln = function(content) {
        document.write(content + '\n');
    };
}

// Optimize script loading
function optimizeScriptLoading() {
    // Find all scripts that might cause issues
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        // Remove inline scripts with document.write
        if (script.innerHTML.includes('document.write')) {
            console.warn('Removed inline script with document.write:', script);
            script.remove();
        }
        
        // Add defer to non-critical scripts
        if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
            script.defer = true;
        }
    });
}

// Initialize cleanup
function initializeCleanup() {
    removeDocumentWrite();
    optimizeScriptLoading();
}

// Run immediately
initializeCleanup();

// Also run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCleanup);
}
