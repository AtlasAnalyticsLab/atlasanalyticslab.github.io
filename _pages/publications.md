---
title: "Atlas Analytics Lab - Publications"
layout: gridlay
excerpt: "Atlas Analytics Lab -- Publications."
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
    1. Published (status: "published", grouped by year, newest first)
    2. Under Review / Under Revision (status: "under_review")
    
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
## List of Publications

{% assign all_publications = site.data.publications | default: empty | compact %}
{% assign published_entries = all_publications | where: 'status', 'published' %}
{% assign under_review_entries = all_publications | where: 'status', 'under_review' %}

{% if published_entries.size > 0 %}
<!-- Published entries grouped by year for clarity -->
### Published
<div class="publication-list" markdown="0">
  {%- assign published_years = published_entries | map: 'year' | compact | uniq | sort | reverse -%}
  {%- for y in published_years -%}
    <h2 class="publication-year-heading">{{ y }}</h2>
    <div class="publication-year-group">
      {%- comment -%}
        Keep file order within each year so newer items stay on top.
      {%- endcomment -%}
      {%- assign items_for_year = published_entries | where: 'year', y -%}
      {%- for entry in items_for_year -%}
        {%- include publication-item.html entry=entry -%}
      {%- endfor -%}
    </div>
  {%- endfor -%}
</div>
{% endif %}

{% if under_review_entries.size > 0 %}
<!-- Under-review entries grouped separately but using the same compact layout -->
### Under Review / Under Revision
<div class="publication-list" markdown="0">
  {%- assign review_years = under_review_entries | map: 'year' | compact | uniq | sort | reverse -%}
  {%- for y in review_years -%}
    <h2 class="publication-year-heading">{{ y }}</h2>
    <div class="publication-year-group">
      {%- assign items_for_year = under_review_entries | where: 'year', y -%}
      {%- for entry in items_for_year -%}
        {%- include publication-item.html entry=entry -%}
      {%- endfor -%}
    </div>
  {%- endfor -%}
</div>
{% endif %}
