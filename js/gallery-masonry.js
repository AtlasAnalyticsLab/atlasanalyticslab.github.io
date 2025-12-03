/**
 * Gallery Masonry Layout Script (gallery-masonry.js)
 * 
 * Purpose:
 *   Provides masonry-style layout fallback for browsers that don't yet support
 *   CSS Grid masonry. Calculates optimal row spans for each image based on its
 *   height to pack images tightly without gaps.
 * 
 * How it works:
 *   1. Checks if browser supports CSS Grid masonry (currently only Firefox)
 *   2. If not supported, waits for all images to load
 *   3. Calculates row span for each image based on its height
 *   4. Applies grid-row-end style to position images correctly
 *   5. Recalculates on window resize (debounced for performance)
 * 
 * Browser support:
 *   - Native masonry: Firefox with layout.css.grid-template-masonry-value.enabled
 *   - Fallback: All browsers with CSS Grid support (Chrome, Safari, Edge, etc.)
 * 
 * Dependencies:
 *   - _sass/_gallery.scss: defines grid-auto-rows: 5px for precise calculations
 *   - gallerylay.html: includes this script
 */

(function() {
  'use strict';
  
  /**
   * Calculate and set row span for a single gallery item
   * @param {HTMLElement} item - Gallery card element containing an image
   */
  function resizeGridItem(item) {
    const grid = document.querySelector('.gallery-container');
    if (!grid) return;
    
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
    const img = item.querySelector('.gallery-img');
    if (!img) return;
    
    const contentHeight = img.getBoundingClientRect().height;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    
    item.style.gridRowEnd = 'span ' + rowSpan;
  }
  
  /**
   * Recalculate row spans for all gallery items
   * Called on window resize events
   */
  function resizeAllGridItems() {
    const allItems = document.querySelectorAll('.gallery-card');
    allItems.forEach(item => resizeGridItem(item));
  }
  
  /**
   * Initialize masonry layout
   * Detects browser support and applies fallback if needed
   */
  function initMasonry() {
    // Check if browser supports CSS Grid masonry
    if (CSS.supports && CSS.supports('grid-template-rows', 'masonry')) {
      // Native masonry support, no JavaScript needed
      return;
    }
    
    // Fallback: calculate row spans with JavaScript
    const images = document.querySelectorAll('.gallery-img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) return;
    
    // Wait for each image to load before calculating its row span
    images.forEach(img => {
      const checkLoaded = () => {
        loadedCount++;
        resizeGridItem(img.closest('.gallery-card'));
        
        // Once all images loaded, do final adjustment
        if (loadedCount === totalImages) {
          setTimeout(resizeAllGridItems, 100);
        }
      };
      
      if (img.complete) {
        checkLoaded();
      } else {
        img.addEventListener('load', checkLoaded);
        img.addEventListener('error', checkLoaded); // Handle failed loads
      }
    });
    
    // Recalculate on window resize (debounced to avoid performance issues)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeAllGridItems, 250);
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMasonry);
  } else {
    initMasonry();
  }
})();
