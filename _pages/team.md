---
title: "Atlas Analytics Lab - Team"
layout: team
excerpt: "Team members"
permalink: /team/
---
<!--
  Team Page (team.md)
  
  Purpose:
    Displays all lab members organized by role with responsive cards.
    Shows PI, postdocs, PhD students, Master's students, collaborators, and alumni.
  
  Layout: team (extends default)
  
  Data Sources:
    - _data/principal_investigator.yml
    - _data/postdocs.yml
    - _data/phd_students.yml
    - _data/masters.yml
    - _data/team_collaborators.yml
    - _data/alumni_members.yml
  
  Components:
    - team-grid.html (displays current members with cards)
    - alumni-list.html (displays former members in table)
  
  Features:
    - Responsive card grid with photos
    - Social media icon links
    - Hiring call-to-action
    - Alumni tracking with current positions
  
  Customization:
    - Update team data in _data/*.yml files
    - Modify team categories by adding/removing sections
    - Adjust grid display via team-grid.html parameters
-->

# Group Members
<div class="team-intro text-center mb-4">
  <p class="lead">We are looking for new PhD students, and Direct-Entry PhD students to join our team. See our <a href="{{ site.url }}{{ site.baseurl }}/openings">openings page</a> for current opportunities.</p>
</div>

### PI
<div markdown="0">
{% include team-grid.html members=site.data.principal_investigator show_role=true %}
</div>

### Post-Doctoral Fellows
<div markdown="0">
{% include team-grid.html members=site.data.postdocs show_role=true %}
</div>

### PhD Students
<div markdown="0">
{% include team-grid.html members=site.data.phd_students show_role=true %}
</div>

### MSc Students
<div markdown="0">
{% include team-grid.html members=site.data.masters show_role=true %}
</div>

### Collaborators
<div markdown="0">
{% include team-grid.html members=site.data.team_collaborators show_role=true %}
</div>

### Alumni
{% include alumni-list.html members=site.data.alumni_members %}
