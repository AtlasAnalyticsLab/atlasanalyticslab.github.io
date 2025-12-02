---
title: "Atlas Analytics Lab - Home"
layout: homelay
excerpt: "Atlas Analytics Lab at Concordia University."
sitemap: false
permalink: /
---
<!--
  Home Page (home.md)
  
  Purpose:
    Main landing page with vision statement, hero carousel, and research highlights.
    Provides first impression of the lab's mission and visual identity.
  
  Layout: homelay (two-column with news sidebar)
  
  Sections:
    - Vision statement (top paragraph)
    - Hero carousel (auto-generated from /images/homepic/)
    - Research highlights (key areas)
    - Funding and partner logos
  
  Features:
    - Dynamic carousel loading all images from /images/homepic/
    - Bootstrap carousel with 4-second intervals
    - Responsive image sizing via CSS clamp()
  
  Customization:
    - Update vision statement in main paragraph
    - Add images to /images/homepic/ for carousel
    - Modify research highlights in markdown
    - Update partner logos at bottom
-->

The Atlas Analytics Lab conducts research across computer vision, deep learning, optimization, and natural language processing, with a strong application focus in digital and computational pathology.

<!-- Hero carousel cycling through lab imagery. -->
<div markdown="0" id="carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000" data-bs-pause="hover">
    {% assign homepic_files = site.static_files | where_exp: "file", "file.path contains '/images/homepic/'" | sort: "path" %}
    
    <div class="carousel-indicators">
        {% for image in homepic_files %}
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="{{ forloop.index0 }}" {% if forloop.first %}class="active" aria-current="true"{% endif %} aria-label="Slide {{ forloop.index }}"></button>
        {% endfor %}
    </div>

    <div class="carousel-inner" markdown="0">
        {% for image in homepic_files %}
        <div class="carousel-item {% if forloop.first %}active{% endif %}">
            <img src="{{ site.url }}{{ site.baseurl }}{{ image.path }}" class="d-block w-100" alt="Lab image {{ forloop.index }}" />
        </div>
        {% endfor %}
    </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


### Research
Our lab primarily develops new deep learning and computer vision methods, with computational pathology serving as a key domain for grounding, validation, and downstream impact. Our research focuses on:
  - **Deep Learning**: Representation Learning and Engineering, Efficient Training, Optimization
  - **Computer Vision**: Self-Supervised Learning (SSL), Hardware-Aware Architecture Design
  - **Computational Pathology (application domain)**: Foundation Modeling, Vision-Language Modeling (VLM), Diagnostic Pathology, Diffusion Generative Modeling, Cancer Biomarker Discovery


### About us
The Atlas Analytics Lab operates within [Concordia University](https://www.concordia.ca/)’s [Department of Computer Science and Software Engineering (CSSE)](https://www.concordia.ca/ginacody/computer-science-software-eng.html) and is directed by Dr. Mahdi S. Hosseini, [Gina Cody Research Chair](https://www.concordia.ca/faculty/mahdi-hosseini.html), Adjunct Professor in Pathology at [McGill University](https://www.mcgill.ca/pathology/dr-mahdi-hosseini), and Affiliate Member of [Mila – Quebec AI Institute](https://mila.quebec/en/directory/mahdi-hosseini).
We maintain strong collaborations with clinical partners such as [CHUM](https://www.chumontreal.qc.ca/) and [Sunnybrook Hospital](https://sunnybrook.ca/) to develop clinically driven AI solutions.

 **Opportunities are available for PhD students to join our expanding team.** [(more info)]({{ site.url }}{{ site.baseurl }}/openings) **!**


### Our support
Our work is supported by major federal, provincial, and institutional funding sources, including Concordia University, NSERC, the Fonds de recherche du Québec, the Canada Foundation for Innovation, IRICoR, the Digital Research Alliance of Canada, and the Amazon Research Award.

See our funding and ongoing projects at our [Funding page]({{ site.baseurl }}/funding/).
 
 
