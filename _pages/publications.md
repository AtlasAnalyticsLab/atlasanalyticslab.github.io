---
title: "Atlas Analytics Lab - Publications"
layout: gridlay
excerpt: "Atlas Analytics Lab -- Publications."
sitemap: false
permalink: /publications/
---
<!--
  Publications Page (publications.md)
  
  Purpose:
    Complete list of lab publications organized by status and year.
    Features highlight section for selected papers.
  
  Layout: gridlay (grid layout for publication cards)
  
  Data Source:
    - _data/publications.yml
  
  Sections:
    1. Group Highlights (featured publications with highlight: 1)
    2. Under Review / Under Revision (status: "under_review")
    3. Published (status: "published", grouped by year, newest first)
  
  Components:
    - publication-item.html (renders individual publication cards)
  
  Features:
    - Highlighted publications with custom images and descriptions
    - Automatic year grouping for published papers
    - Resource links (PDF, DOI, arXiv, GitHub)
    - Responsive card grid
  
  Customization:
    - Set highlight: 1 in publications.yml for featured papers
    - Add highlight_details for custom highlight display
    - Modify grouping logic in Liquid loops
-->

# Publications

<img src="{{ site.url }}{{ site.baseurl }}/images/logopic/group_logo_medium.png" class="img-responsive" width="15%" style="float: left"/>

Our research integrates computer vision, deep learning, optimization, and natural language processing, with a primary application focus on digital and computational pathology. Contributions such as 2DMamba, Tissue2Vec, Vim4Path, ADPv2, and AdaFisher collectively drive forward transparent, efficient, and clinically relevant machine learning for pathology and medical imaging.

<div style="clear: both;"></div>

---

(See also the personal webpage of our group members)

{% assign all_publications = site.data.publications | default: empty | compact %}
{% assign highlights = all_publications | where: 'highlight', 1 | sort: 'year' | reverse %}
{% assign under_review = all_publications | where: 'status', 'under_review' | sort: 'year' | reverse %}
{% assign published_entries = all_publications | where: 'status', 'published' | sort: 'year' | reverse %}

{% if highlights.size > 0 %}
<!-- Highlighted publications pulled from entries flagged with highlight: 1 -->
## Group Highlights

(For a full list of publications, see [below](#list-of-publications), and see also the personal webpage of our group members)
<div class="row g-4 publication-highlights" markdown="0">
{% for entry in highlights %}
  {% assign details = entry.highlight_details | default: empty %}
  {% assign layout = details.layout | default: 'standard' %}
  {% assign highlight_image = details.image | default: entry.list_image %}
  {% if highlight_image %}
    {% if highlight_image contains '/' %}
      {% assign highlight_image_path = highlight_image %}
    {% else %}
      {% assign highlight_image_path = 'images/pubpic/' | append: highlight_image %}
    {% endif %}
  {% endif %}
  {% assign width_percent = '40%' %}
  {% if layout == 'wide' %}
    {% assign width_percent = '20%' %}
  {% endif %}
  <div class="col-sm-12 clearfix">
    <div class="well">
      <pubtit>{{ entry.title }}</pubtit>
      {% if highlight_image_path %}
        <img src="{{ highlight_image_path | relative_url }}" class="img-responsive" width="{{ width_percent }}" style="float: left" alt="Illustration for {{ entry.title | escape }}" loading="lazy" />
      {% endif %}
      {% if details.description %}<p>{{ details.description }}</p>{% endif %}
      {% if entry.authors %}<p><em>{{ entry.authors }}</em></p>{% endif %}
      {% if details.link_url %}
        <p><strong><a href="{{ details.link_url }}">{{ details.link_label | default: details.link_url }}</a></strong></p>
      {% endif %}
      {% if details.news_primary %}
        <p class="text-danger"><strong>{{ details.news_primary }}</strong></p>
      {% endif %}
      {% if details.news_secondary %}
        <p>{{ details.news_secondary }}</p>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>
{% endif %}

<p>&nbsp;</p>

## List of Publications

{% if published_entries.size > 0 %}
<!-- Published list is grouped chronologically and omits the year label inside each card -->
### Published
<div class="publications" markdown="0">
  {%- comment -%}
    1) Start from the data file to preserve file order (newest first at top of file).
       Filter to the entries we want to display (status == "published").
  {%- endcomment -%}
  {%- assign entries_all = site.data.publications -%}
  {%- assign entries = entries_all | where: "status", "published" -%}

  {%- comment -%}
    2) Collect distinct years, sort descending.
  {%- endcomment -%}
  {%- assign years = entries | map: "year" | compact | uniq | sort | reverse -%}

  {%- for y in years -%}
    <h3 class="year">{{ y }}</h3>
    <ol class="bibliography">
      {%- comment -%}
        3) For this year, take entries in their original file order (newest first).
      {%- endcomment -%}
      {%- assign items_for_year = entries | where: "year", y -%}
      {%- for entry in items_for_year -%}
        {%- include publication-item.html entry=entry include_year=false -%}
      {%- endfor -%}
    </ol>
  {%- endfor -%}
</div>
{% endif %}

{% if under_review.size > 0 %}
<!-- Under review items remain grouped together and include publication year -->
### Under Review / Under Revision
<div class="publications" markdown="0">
  <ol class="bibliography">
    {% for entry in under_review %}
      {% include publication-item.html entry=entry include_year=true %}
    {% endfor %}
  </ol>
</div>
{% endif %}
