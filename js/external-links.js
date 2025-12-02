/**
 * External Links Handler
 * 
 * Automatically sets target="_blank" and rel="noopener noreferrer" for all external links.
 * Internal links (same domain) open in the same tab.
 * External links (different domain) open in a new tab.
 * 
 * Features:
 * - Automatically detects external vs internal links
 * - Adds security attributes (rel="noopener noreferrer") to prevent tabnabbing
 * - Preserves existing link behavior if already configured
 * - Runs on page load
 */

(function() {
  'use strict';

  /**
   * Initialize external link handling
   */
  function initExternalLinks() {
    // Get current site's hostname
    const currentHost = window.location.hostname;
    
    // Get all links on the page
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(function(link) {
      const href = link.getAttribute('href');
      
      // Skip if href is empty, a hash/anchor, mailto, tel, or javascript
      if (!href || 
          href.startsWith('#') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') ||
          href.startsWith('javascript:')) {
        return;
      }
      
      try {
        // Create URL object to parse the link
        let url;
        
        // Handle relative URLs
        if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
          // Internal relative link - don't open in new tab
          return;
        }
        
        // Handle absolute URLs
        if (href.startsWith('http://') || href.startsWith('https://')) {
          url = new URL(href);
          
          // Check if link is external (different hostname)
          if (url.hostname !== currentHost) {
            // External link - open in new tab
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }
        }
      } catch (e) {
        // If URL parsing fails, treat as internal link (do nothing)
        console.debug('Could not parse URL:', href);
      }
    });
    
    console.log('External links initialized: ' + document.querySelectorAll('a[target="_blank"]').length + ' external links found');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExternalLinks);
  } else {
    // DOM already loaded
    initExternalLinks();
  }
})();
