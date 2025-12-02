---
title: "News"
layout: textlay
excerpt: "Atlas Analytics Lab at Concordia University."
sitemap: false
permalink: /allnews.html
---
<!--
  All News Page (allnews.md)
  
  Purpose:
    Complete chronological list of all lab news entries.
    Archive page for all news items (homepage shows only 5 recent).
    Accessible via News tab in main navigation.
  
  Layout: textlay (full-width text layout)
  
  Data Source:
    - _data/news.yml
  
  Features:
    - Displays all news entries in compact format
    - Format: [Date] headline
    - Reverse chronological order (newest first)
    - Markdown support in headlines
    - Minimal spacing between entries
  
  Related:
    - Homepage sidebar shows 5 most recent via _includes/news.html
    - Linked from header navigation as "News"
  
  Customization:
    - Add new entries to _data/news.yml
    - Modify display format in loop
-->

# News

{% for article in site.data.news %}[{{ article.date }}] {% capture openings_url %}{{ site.baseurl }}/openings{% endcapture %}{% assign processed_headline = article.headline | replace: 'OPENINGS_LINK', openings_url %}{{ processed_headline | markdownify | strip | remove: '<p>' | remove: '</p>' }}<br>
{% endfor %}
