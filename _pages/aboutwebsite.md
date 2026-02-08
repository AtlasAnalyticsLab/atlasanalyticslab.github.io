---
title: "About the website"
layout: textlay
excerpt: "About the website."
permalink: /aboutwebsite.html
---
<!--
  About Website Page (aboutwebsite.md)
  
  Purpose:
    Documentation on how to use and customize this Jekyll website.
    Provides template usage guide for other research groups.
  
  Layout: textlay (full-width text layout)
  
  Sections:
    - Getting started with Jekyll
    - Customization instructions
    - File structure explanation
    - Attribution and licensing
  
  Features:
    - Links to Jekyll and Bootstrap resources
    - Step-by-step setup guide
    - Data file documentation
    - Local development instructions
  
  Attribution:
    - Original design: Allan Lab
    - Current adaptation: USLC Lab → Atlas Analytics Lab
    - Developed with AI assistance
  
  Note:
    This page helps other research groups adapt the template
-->

# Use this website as a template for your academic research group

This website is powered by [Jekyll](https://jekyllrb.com) and uses [Bootstrap 5](https://getbootstrap.com) with the [Lumen Bootswatch theme](https://bootswatch.com/lumen/). 

**Attribution:** This website was adapted from the [Uppsala Security Lab & Cloud (USLC) website](https://uslc-lab.github.io/), which itself was based on [Allan Lab's website](https://www.allanlab.org). The template has been customized for the Atlas Analytics Lab at Concordia University and developed with AI assistance.

### Getting started

**Prerequisites:**
- Ruby 3.4.7+ and Ruby development headers
- Bundler 2.7.2+ (`gem install bundler`)
- Build tools (Make, GCC/Clang) for native gem compilation
- Git for version control

**Quick Start:**
```bash
# Clone the repository
git clone https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io.git
cd AtlasAnalyticsLab.github.io

# Install dependencies
gem install bundler
bundle install

# Run locally with live reload
bundle exec jekyll serve --livereload
```

Visit `http://127.0.0.1:4000` to see your site. Changes to most files reload automatically, but restart the server after editing `_config.yml` or plugin files.

### Website Structure

All pages are written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for easy editing. [Jekyll](https://jekyllrb.com) uses the Liquid template language for data-driven pages.

**Key Directories:**
- `_pages/` – Markdown page content (home, team, research, publications, etc.)
- `_data/` – YAML data files for publications, news, team members
- `_layouts/` – HTML templates that wrap page content
- `_includes/` – Reusable HTML components (header, footer, news widget, team grid)
- `_sass/` – SCSS stylesheets compiled to CSS
- `images/` – Image assets organized by type (teampic, pubpic, logopic, homepic)
- `assets/` – Static files (papers, documents)

**Data-Driven Content:**
- `_data/publications.yml` – Publication list with metadata, thumbnails, and highlights
- `_data/news.yml` – News items (5 most recent shown on homepage, all on /allnews)
- `_data/principal_investigator.yml` – Lab director information
- `_data/phd_students.yml`, `postdocs.yml`, `masters.yml` – Team member profiles
- `_data/team_collaborators.yml`, `alumni_members.yml` – Collaborators and alumni

Update these YAML files to change content without touching HTML or Liquid templates. [Jekyll](https://jekyllrb.com) takes all markdown and data files and generates static HTML in the `_site/` folder.  

### Customization

**Step 1: Update Site Configuration**

Edit `_config.yml` to set your site's basic information:
```yaml
title: Your Lab Name
email: your.email@university.edu
description: Research group at University Name
baseurl: ""  # Leave empty for username.github.io, or "/repository-name" for project sites
url: "https://yourusername.github.io"
```

**Step 2: Add Your Content**

1. **Team Members:** Edit YAML files in `_data/`:
   - `principal_investigator.yml` – Lab director
   - `postdocs.yml`, `phd_students.yml`, `masters.yml` – Current members
   - `alumni_members.yml` – Former members
   - Add photos to `images/teampic/` (reference filename in YAML `photo:` field)

2. **Publications:** Update `_data/publications.yml`:
   - Add entries at the TOP (newest first)
   - Include title, authors, venue, year, links
   - Set `highlight: 1` for featured papers
   - Add thumbnails to `images/pubpic/` (reference in `list_image:` field)
   - Supports DOI links, PDFs, arXiv, GitHub repos, posters, and videos

3. **News:** Update `_data/news.yml`:
   - Add entries at the TOP (reverse chronological order)
   - Supports Markdown, HTML styling, and emojis
   - Homepage shows 5 most recent; `/allnews` shows all
   - See file header comments for emoji codes and styling examples

4. **Homepage Carousel:** Add images to `images/homepic/`
   - All images automatically load in carousel (no code changes needed)
   - Recommended size: 1200x600 pixels or similar aspect ratio

**Step 3: Customize Pages**

Edit markdown files in `_pages/`:
- `home.md` – Homepage content and welcome message
- `team.md` – Team page introduction
- `publications.md` – Publication page introduction
- `openings.md` – Job/student positions
- `funding.md` – Funding acknowledgments (logos in `images/logopic/`)
- `contact.md` – Contact information

**Step 4: Update Branding**

1. **Logo:** Replace `images/logopic/group_logo_medium.svg` and `.png` with your lab logo
2. **Favicon:** Replace `images/logopic/favicon.png` with your icon (32x32 or 64x64 px)
3. **Lab Color:** Edit `_sass/_variables.scss` to change the primary color (currently `#951D33`)
4. **Theme:** Modify `_sass/_themes.scss` for dark/light mode customization

**Step 5: Header and Footer**

- Edit `_includes/header.html` to change navigation menu items
- Edit `_includes/footer.html` to update footer links and social icons
- Update logo and lab name references

### Important Notes

⚠️ **YAML Formatting:** Jekyll is strict about YAML syntax. Watch for:
- Consistent indentation (use spaces, not tabs)
- Quotes around strings with special characters
- Proper list formatting with `-` prefix

✅ **Testing:** After each change:
```bash
bundle exec jekyll build  # Check for errors
bundle exec jekyll serve  # Preview locally
```

📝 **Documentation:** Each file has detailed header comments explaining:
- Purpose and usage
- Required vs optional fields
- Examples and templates
- Customization options

### Deployment

**GitHub Pages (Recommended):**

This site uses GitHub Actions for automatic deployment:

1. **Fork or clone** this repository to your GitHub account
2. **Rename** the repository to `yourusername.github.io` (for user/org site) or keep any name (for project site)
3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` (created automatically by GitHub Actions)
4. **Push changes** to the `main` branch
   - GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys
   - Site published at `https://yourusername.github.io` or `https://yourusername.github.io/repository-name`

**Custom Domain (Optional):**

1. Update `CNAME` file with your domain (e.g., `www.yourlab.edu`)
2. Configure DNS records at your domain provider:
   - Add CNAME record pointing to `yourusername.github.io`
3. Enable "Enforce HTTPS" in GitHub Pages settings

**Manual Deployment:**

```bash
# Build production site
bundle exec jekyll build

# Upload _site/ folder to your web server
rsync -avz _site/ user@yourserver.edu:/var/www/html/
```

### Features

✨ **Modern Design:**
- Bootstrap 5 with Lumen Bootswatch theme
- Responsive layout (mobile, tablet, desktop)
- Dark/light mode toggle (3-state: auto, dark, light)
- Custom CSS variables for easy theming

📚 **Content Management:**
- Publication list with highlighting and categorization
- News feed with Markdown, HTML styling, and emoji support
- Team member profiles with photos and social links
- Dynamic homepage carousel (auto-loads all images from folder)

🔧 **Technical Features:**
- Jekyll 4.x with Liquid templating
- SCSS preprocessing with custom variables
- Jekyll Scholar for BibTeX support
- GitHub Actions for CI/CD
- Local development with live reload
- SEO-friendly URLs and metadata

### Learning Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/) – Official Jekyll guide
- [Liquid Template Language](https://shopify.github.io/liquid/) – Templating syntax
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) – Markdown syntax guide
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/) – Component library
- [GitHub Pages Guide](https://docs.github.com/en/pages) – Hosting documentation

### Troubleshooting

**Build Errors:**
```bash
bundle exec jekyll doctor  # Check for configuration issues
bundle exec jekyll build --verbose  # Show detailed error messages
```

**Common Issues:**
- YAML syntax errors: Check indentation and quotes
- Missing images: Verify file paths and filenames match references
- Plugin errors: Ensure all gems are installed (`bundle install`)
- Deployment failures: Check GitHub Actions logs in repository

**Need Help?**
- Check file header comments for usage instructions
- See `README.md` for comprehensive documentation
- Review `PROJECT_REVIEW.md` for architectural overview
- Open an issue on GitHub for questions

### License & Credit

**Attribution Chain:**
- Original design: [Allan Lab](https://www.allanlab.org)
- Adapted from: [Uppsala Security Lab & Cloud (USLC)](https://uslc-lab.github.io/)
- Current version: Atlas Analytics Lab, Concordia University
- Development: AI-assisted customization and documentation

**License:** MIT License – You can use this template freely for your academic research group. Attribution to the original sources (Allan Lab, USLC Lab) is appreciated but not required.

**Code Repository:** [github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io](https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io) 



