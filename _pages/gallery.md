---
title: "Lab Life"
layout: gallerylay
excerpt: "Atlas Analytics Lab at Concordia University."
sitemap: false
permalink: /gallery/
---
<!--
  Lab Life Gallery Page (gallery.md)
  
  Purpose:
    Photo gallery showcasing lab activities, conferences, talks, and social events.
    Masonry-style grid with automatic image loading and responsive layout.
  
  Layout: gallerylay (custom gallery layout)
  
  Images Source:
    - images/picpic/ directory (all .jpg, .jpeg, .png files auto-loaded)
  
  Features:
    - CSS Grid masonry layout with automatic image reordering
    - Responsive columns (1→2→3→4 based on screen size)
    - Automatic image loading from directory
    - Respects layout_wide config setting
    - Hover effects and shadow animations
    - Lazy loading for performance
  
  Customization:
    - Add new photos to images/picpic/ directory (no code changes needed)
    - Images are automatically sorted by filename in reverse order
-->

# Lab Life

A glimpse into our research group's activities, conferences, talks, and memorable moments.

{% assign image_files = site.static_files | where: "extname", ".jpg" %}
{% assign image_files2 = site.static_files | where: "extname", ".jpeg" %}
{% assign image_files3 = site.static_files | where: "extname", ".png" %}
{% assign all_images = image_files | concat: image_files2 | concat: image_files3 %}
{% assign gallery_images = all_images | where_exp: "item", "item.path contains 'images/picpic/'" | sort: "path" | reverse %}

<div class="gallery-container" markdown="0">
{% for image in gallery_images %}
  <div class="gallery-card">
    <img src="{{ site.url }}{{ site.baseurl }}{{ image.path }}" 
         class="gallery-img" 
         alt="Lab activity photo"
         loading="lazy">
  </div>
{% endfor %}
</div>
