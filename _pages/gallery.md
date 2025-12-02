---
title: "Lab Life"
layout: textlay
excerpt: "Atlas Analytics Lab at Concordia University."
sitemap: false
permalink: /gallery/
---
<!--
  Lab Life Gallery Page (gallery.md)
  
  Purpose:
    Photo gallery showcasing lab activities, conferences, talks, and social events.
    Simple image grid with no descriptions - just visual highlights.
  
  Layout: textlay (full-width text layout)
  
  Images Source:
    - images/picpic/ directory (all photos auto-loaded)
  
  Features:
    - Responsive Bootstrap grid
    - Automatic image loading from directory
    - Hover effects
    - Lightbox-style viewing (optional)
  
  Customization:
    - Add new photos to images/picpic/ directory
    - Adjust grid columns by changing col-md-* classes
-->

# Lab Life

A glimpse into our research group's activities, conferences, talks, and memorable moments.

{% assign image_files = site.static_files | where: "extname", ".jpg" %}
{% assign image_files2 = site.static_files | where: "extname", ".jpeg" %}
{% assign image_files3 = site.static_files | where: "extname", ".png" %}
{% assign all_images = image_files | concat: image_files2 | concat: image_files3 %}

<div class="row g-4 mb-4" markdown="0">
{% for image in all_images %}
  {% if image.path contains 'images/picpic/' %}
  <div class="col-sm-6 col-lg-4 col-xl-3 d-flex">
    <div class="gallery-card w-100">
      <img src="{{ site.url }}{{ site.baseurl }}{{ image.path }}" 
           class="gallery-img" 
           alt="Lab activity photo">
    </div>
  </div>
  {% endif %}
{% endfor %}
</div>
