/**
 * JEFFY MAKES IT FUN - MAIN JAVASCRIPT
 * =====================================
 *
 * Purpose: Enhances user experience with form validation, smooth interactions,
 * and accessibility features. Keeps JavaScript minimal and progressive -
 * site works without JS, but is enhanced with it.
 *
 * Features:
 * - Form validation and submission handling
 * - Smooth scroll behavior
 * - Active navigation state management
 * - Accessibility improvements
 */

// ============================================
// INITIALIZATION
// ============================================
// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    initializeSubscriptionForm();
    initializeNavigation();
    initializeSmoothScroll();
    initializeAccessibility();
});

// ============================================
// SUBSCRIPTION FORM HANDLING
// ============================================
/**
 * Initializes the subscription form with validation and submission handling.
 * Prevents default form submission and shows success/error messages.
 *
 * NOTE: This is a client-side demo. In production, you'll need to:
 * 1. Replace the action URL with your actual form handler (Mailchimp, ConvertKit, etc.)
 * 2. Add server-side validation
 * 3. Implement proper email capture backend
 * 4. Add GDPR compliance features
 */
function initializeSubscriptionForm() {
    const form = document.getElementById('subscribeForm');
    const formMessage = document.getElementById('form-message');

    // Exit if form doesn't exist (on other pages)
    if (!form) return;

    // Prevent default form submission and handle it with JavaScript
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const consent = formData.get('consent');

        // Client-side validation (backup to HTML5 validation)
        if (!name || !email || !consent) {
            showMessage('error', 'Please fill in all required fields.');
            return;
        }

        // Email format validation
        if (!isValidEmail(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        // DEMO MODE: Simulate form submission
        // In production, replace this with actual API call
        try {
            // Simulated API call (replace with actual endpoint)
            // const response = await fetch('/api/subscribe', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, consent })
            // });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // DEMO: Always show success
            // In production, check response.ok
            showMessage('success', `Thanks for subscribing, ${name}! Check your inbox to confirm.`);
            form.reset();

            // Optional: Track subscription event (Google Analytics, etc.)
            trackSubscription(email);

        } catch (error) {
            console.error('Subscription error:', error);
            showMessage('error', 'Oops! Something went wrong. Please try again later.');
        } finally {
            // Restore button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    /**
     * Displays success or error message to user
     * @param {string} type - 'success' or 'error'
     * @param {string} message - Message to display
     */
    function showMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Announce message to screen readers
        formMessage.setAttribute('role', 'alert');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    /**
     * Validates email format using regex
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid
     */
    function isValidEmail(email) {
        // RFC 5322 compliant email regex (simplified)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Tracks subscription event (placeholder for analytics)
     * @param {string} email - Subscriber email
     */
    function trackSubscription(email) {
        // Google Analytics 4 example (if you have it installed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'method': 'landing_page_form'
            });
        }

        // Facebook Pixel example (if you have it installed)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }

        console.log('Subscription tracked:', email);
    }
}

// ============================================
// NAVIGATION MANAGEMENT
// ============================================
/**
 * Manages active state of bottom navigation based on current page.
 * Updates active link to help users know where they are.
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Remove existing active class
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Add active class to current page
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================
/**
 * Enhances smooth scrolling for anchor links.
 * Accounts for fixed bottom navigation height.
 */
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" without target
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            // If target exists, smooth scroll to it
            if (targetElement) {
                event.preventDefault();

                // Calculate offset for fixed bottom nav (80px height)
                const navHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                targetElement.focus({ preventScroll: true });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
/**
 * Adds additional accessibility features:
 * - Keyboard navigation improvements
 * - Focus management
 * - ARIA live region updates
 */
function initializeAccessibility() {
    // Trap focus in forms when necessary
    enhanceFormAccessibility();

    // Add keyboard shortcuts (optional)
    addKeyboardShortcuts();

    // Announce page changes to screen readers
    announcePageLoad();
}

/**
 * Enhances form keyboard navigation
 */
function enhanceFormAccessibility() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Allow Enter key to submit from any input
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' && input.type !== 'submit') {
                    event.preventDefault();
                    form.requestSubmit();
                }
            });
        });
    });
}

/**
 * Adds helpful keyboard shortcuts
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Skip if user is typing in an input
        if (event.target.matches('input, textarea, select')) return;

        // Alt+S: Jump to subscription form
        if (event.altKey && event.key === 's') {
            event.preventDefault();
            const subscribeSection = document.getElementById('subscribe');
            if (subscribeSection) {
                subscribeSection.scrollIntoView({ behavior: 'smooth' });
                subscribeSection.querySelector('input').focus();
            }
        }

        // Alt+T: Back to top
        if (event.altKey && event.key === 't') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById('main-content').focus();
        }
    });
}

/**
 * Announces page load to screen readers
 */
function announcePageLoad() {
    // Create live region if it doesn't exist
    let liveRegion = document.getElementById('page-announcer');

    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'page-announcer';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }

    // Announce page title after a brief delay
    setTimeout(() => {
        liveRegion.textContent = document.title + ' - Page loaded';
    }, 100);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function can run
 * Useful for scroll and resize event handlers
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
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

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ============================================
// PERFORMANCE MONITORING (Optional)
// ============================================
/**
 * Log page load performance metrics
 * Helps identify performance issues
 */
if ('performance' in window) {
    window.addEventListener('load', function() {
        // Wait a bit for all resources to finish
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;

            console.log('Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response Time: ${connectTime}ms`);

            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': pageLoadTime
                });
            }
        }, 0);
    });
}

// ============================================
// EXPORT FOR TESTING (if using modules)
// ============================================
// Uncomment if you're using ES6 modules and want to test functions
// export { isValidEmail, debounce, prefersReducedMotion };
