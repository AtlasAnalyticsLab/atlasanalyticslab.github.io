/**
 * Gallery Masonry Layout Script
 * 
 * Purpose:
 *   Provides masonry-style layout for gallery images by calculating
 *   proper grid row spans based on image heights.
 * 
 * Features:
 *   - Calculates row spans dynamically after images load
 *   - Works as fallback for browsers without CSS Grid masonry support
 *   - Adjusts on window resize
 */

(function() {
  'use strict';
  
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
  
  function resizeAllGridItems() {
    const allItems = document.querySelectorAll('.gallery-card');
    allItems.forEach(item => resizeGridItem(item));
  }
  
  function initMasonry() {
    // Check if browser supports CSS Grid masonry
    if (CSS.supports && CSS.supports('grid-template-rows', 'masonry')) {
      // Native masonry support, no JS needed
      return;
    }
    
    // Wait for all images to load, then calculate spans
    const images = document.querySelectorAll('.gallery-img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) return;
    
    images.forEach(img => {
      const checkLoaded = () => {
        loadedCount++;
        resizeGridItem(img.closest('.gallery-card'));
        
        // Once all images loaded, do a final adjustment
        if (loadedCount === totalImages) {
          setTimeout(resizeAllGridItems, 100);
        }
      };
      
      if (img.complete) {
        checkLoaded();
      } else {
        img.addEventListener('load', checkLoaded);
        img.addEventListener('error', checkLoaded); // Handle errors too
      }
    });
    
    // Adjust on window resize with debouncing
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
