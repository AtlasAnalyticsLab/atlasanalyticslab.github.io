# Development Documentation

**Internal documentation for Atlas Analytics Lab website developers**

**Last Updated:** February 6, 2026  
**Repository:** https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io  
**Status:** Actively maintained

---

## Table of Contents

1. [Git Workflow & Branching Strategy](#git-workflow--branching-strategy)
2. [Architecture & Design](#architecture--design)
3. [File Structure](#file-structure)
4. [Comment Standardization](#comment-standardization)
5. [Website URL Management](#website-url-management)
6. [Development History](#development-history)
7. [Cleanup Report](#cleanup-report)
8. [Maintenance Tasks](#maintenance-tasks)
9. [Verification Commands](#verification-commands)

---

## Git Workflow & Branching Strategy

### Repository Setup

**Repository:** `AtlasAnalyticsLab/AtlasAnalyticsLab.github.io`  
**Hosting:** GitHub Pages  
**Build Method:** GitHub Pages' built-in Jekyll (builds from `main` branch, root directory)  
**Deployment:** Automatic on push to `main`

### Branch Structure

#### `main` Branch
- **Purpose:** Single source of truth - what the public sees
- **Protection:** Protected branch (requires pull request, no direct push)
- **Status:** Production-ready code only
- **Auto-deployment:** Every merge triggers GitHub Pages rebuild

#### Feature Branches
- **Lifecycle:** Short-lived, deleted after merge
- **Naming Convention:**
  - `feature/add-news-YYYY-MM-DD` - Adding news items
  - `feature/update-publications-[topic]` - Publication updates
  - `feature/[component]-[description]` - Feature work
  
**Examples:**
```
feature/add-news-2025-11-30
feature/update-publications-rose-paper
feature/footer-redesign
feature/team-member-anh-nguyen
```

### Development Workflow

#### 1. Starting New Work

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-news-2025-11-30
```

#### 2. Making Changes

**For content updates:**
- Edit `_data/news.yml` for news items
- Edit `_data/publications.yml` for publications
- Edit `_data/[team-file].yml` for team members
- Edit `_pages/[page].md` for page content
- Add images to appropriate `images/` subdirectories

**For code/layout changes:**
- Edit files in `_includes/`, `_layouts/`, `_sass/`, `css/`, or `js/`
- Follow comment standardization guidelines
- Update documentation if needed

#### 3. Local Testing

```bash
# Start Jekyll development server
bundle exec jekyll serve --livereload

# Visit http://127.0.0.1:4000
# Verify all changes look correct
# Test on different screen sizes
# Check both light and dark themes
```

#### 4. Committing Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "content: add news about CFI JELF award"
# or
git commit -m "feat: improve footer layout in fixed-width mode"
# or
git commit -m "fix: correct team member photo path"

# Push feature branch
git push origin feature/add-news-2025-11-30
```

**Commit Message Prefixes:**
- `content:` - Content updates (news, publications, team)
- `feat:` - New features or enhancements
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - CSS/styling changes
- `refactor:` - Code restructuring
- `chore:` - Maintenance tasks (dependency updates, cleanup)

#### 5. Opening Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request" button
3. Fill in PR details:
   - **Title:** Brief description (e.g., "Add news about CFI JELF award")
   - **Description:** What changed and why
   - **Reviewers:** Optional - assign Dr. Hosseini or team member
4. Click "Create pull request"

**PR Review Process:**
- Optional review by Dr. Hosseini or designated team member
- Check for formatting issues, broken links, typos
- Verify changes in preview (if available)
- Approve or request changes

#### 6. Merging to Main

```bash
# Option 1: Merge via GitHub UI (recommended)
# Click "Merge pull request" → "Confirm merge" → "Delete branch"

# Option 2: Merge via command line
git checkout main
git pull origin main
git merge feature/add-news-2025-11-30
git push origin main
git branch -d feature/add-news-2025-11-30
git push origin --delete feature/add-news-2025-11-30
```

#### 7. Verify Deployment

```bash
# GitHub Pages automatically rebuilds (takes 1-2 minutes)
# Visit: https://atlasanalyticslab.github.io
# Verify changes are live
```

### Quick Reference: Common Tasks

#### Adding News
```bash
git checkout -b feature/add-news-2025-11-30
# Edit _data/news.yml (add to TOP)
bundle exec jekyll serve  # Test locally
git add _data/news.yml
git commit -m "content: add news about [topic]"
git push origin feature/add-news-2025-11-30
# Open PR on GitHub
```

#### Adding Publication
```bash
git checkout -b feature/update-publications-new-paper
# Edit _data/publications.yml (add to TOP)
# Add thumbnail to images/pubpic/
bundle exec jekyll serve  # Test locally
git add _data/publications.yml images/pubpic/
git commit -m "content: add publication [title]"
git push origin feature/update-publications-new-paper
# Open PR on GitHub
```

#### Adding Team Member
```bash
git checkout -b feature/team-member-[name]
# Edit appropriate _data/[role].yml file
# Add photo to images/teampic/
bundle exec jekyll serve  # Test locally
git add _data/ images/teampic/
git commit -m "content: add team member [name]"
git push origin feature/team-member-[name]
# Open PR on GitHub
```

#### Adding Gallery Photos
```bash
git checkout -b feature/add-gallery-photos-2025-12-02
# Add photos to images/picpic/
bundle exec jekyll serve  # Test locally
git add images/picpic/
git commit -m "content: add lab photos from [event]"
git push origin feature/add-gallery-photos-2025-12-02
# Open PR on GitHub
```

#### Layout/Design Changes
```bash
git checkout -b feature/[component]-redesign
# Edit files in _includes/, _layouts/, _sass/, css/
bundle exec jekyll serve  # Test extensively
git add .
git commit -m "feat: improve [component] [description]"
git push origin feature/[component]-redesign
# Open PR on GitHub with detailed description
```

### Branch Protection Rules (Recommended)

Configure in GitHub Settings → Branches → Branch protection rules for `main`:

- ✅ Require pull request before merging
- ✅ Require approvals: 1 (for multi-person teams)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging (if CI configured)
- ✅ Require branches to be up to date before merging
- ✅ Include administrators (enforce for everyone)

### Emergency Hotfixes

For critical fixes that need immediate deployment:

```bash
git checkout -b hotfix/critical-issue
# Make minimal fix
bundle exec jekyll serve  # Quick test
git add .
git commit -m "fix: [critical issue description]"
git push origin hotfix/critical-issue
# Open PR, get quick review, merge immediately
```

### Best Practices

1. **Always work on feature branches** - Never commit directly to `main`
2. **Keep branches short-lived** - Merge within days, not weeks
3. **Test locally before pushing** - Use `bundle exec jekyll serve`
4. **Write descriptive commit messages** - Future you will thank you
5. **Delete merged branches** - Keep repository clean
6. **Pull main regularly** - Stay up to date with latest changes
7. **Review your own PR** - Check the diff before requesting review
8. **One feature per branch** - Easier to review and rollback if needed

---

## Architecture & Design

### Technology Stack

**Core Technologies:**
- **Jekyll 4.4.1** - Static site generator
- **Liquid** - Template engine
- **Bootstrap 5** - Frontend framework (Lumen theme via jsDelivr CDN)
- **SCSS/SASS** - Stylesheet preprocessing
- **Ruby 3.4.7+** - Runtime environment

**Hosting & Deployment:**
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline
- **Cloudflare CDN** - DDoS protection and caching

### Design Patterns

**Data-Driven Content:**
- All dynamic content (news, team, publications) stored in YAML files in `_data/`
- Liquid templates iterate over data arrays to generate HTML
- No manual HTML editing required for content updates

**Component Architecture:**
- Reusable components in `_includes/` (header, footer, team grids, etc.)
- Layout templates in `_layouts/` define page structure
- SCSS partials in `_sass/` for modular styling

**Layout System:**
- Two-mode responsive layout controlled by `_config.yml`:
  - `layout_wide: true` → Full viewport width with responsive padding
  - `layout_wide: false` → 1000px max-width, centered container
- Body class (`.layout-wide` or `.layout-fixed`) applied by `default.html`
- Container classes:
  - `.container-fluid` - Full width for wide mode
  - `.container-fixed` - 1000px centered for fixed mode
- Header and footer use conditional containers via Liquid
- CSS adjustments for fixed mode (alignment, spacing, responsive breakpoints)

**Theme System:**
- Three-state theme controller (light/dark/auto)
- CSS custom properties for theme tokens in `_sass/_themes.scss`
- JavaScript theme toggle with localStorage persistence

### Layout Hierarchy

```
default.html (base template)
├── homelay.html (homepage with carousel + news)
├── textlay.html (simple text pages)
├── gallerylay.html (gallery with masonry layout)
├── team.html (team member grids)
├── publications.html (publication list wrapper)
├── gridlay.html (publications grid)
└── bib.html (individual bibliography items)
```

---

## File Structure

### Complete File Inventory (75+ files)

#### Configuration Files (15 files)
- `_config.yml` - Main Jekyll configuration (site URL, title, email, etc.)
- `Gemfile` / `Gemfile.lock` - Ruby gem dependencies
- `CNAME` - Custom domain configuration
- `robots.txt` - Crawler access control (blocks aggressive bots, allows search engines)
- `.htaccess` - Apache security configuration (compatibility for non-GitHub hosting)
- `.gitignore` - Git ignore rules
- `.gitattributes` - Git file attributes
- `.editorconfig` - Editor coding style
- `.ruby-version` - Ruby version specification
- `.nojekyll` - Disables GitHub's automatic Jekyll processing
- `.github/workflows/deploy.yml` - GitHub Actions deployment
- `.github/FUNDING.yml` - GitHub Sponsors config
- `.github/ISSUE_TEMPLATE/` - Issue templates
- `bin/deploy` - Manual deployment script

#### Layouts (8 files)
1. **default.html** - Base template with `<html>`, header, footer
2. **homelay.html** - Homepage two-column layout (main content + news sidebar)
3. **textlay.html** - Full-width text layout for simple pages
4. **gallerylay.html** - Gallery layout with CSS Grid masonry and optimized spacing
5. **team.html** - Team page with member grids
6. **publications.html** - Publications page wrapper
7. **gridlay.html** - Grid layout for publications
8. **bib.html** - Individual bibliography item rendering

#### Includes (10 files)
1. **head.html** - HTML `<head>` section with metadata, stylesheets, CDN links
2. **header.html** - Navigation bar with menu items
3. **footer.html** - Three-column footer (copyright, affiliations, contact)
4. **news.html** - News sidebar component
5. **publication-item.html** - Single publication card
6. **team-grid.html** - Team member grid display (photo + name + info + links)
7. **team-link.html** - Icon-only social links (uses Liquid comments to avoid nesting errors)
8. **alumni-list.html** - Alumni table display
9. **analytics.html** - Google Analytics tracking code
10. **video-player.html** - Responsive video embed helper

#### Data Files (8 YAML files)
1. **news.yml** - Lab news and announcements (add newest at TOP)
2. **publications.yml** - Publication list with metadata (add newest at TOP)
3. **principal_investigator.yml** - PI information
4. **postdocs.yml** - Postdoctoral fellows
5. **phd_students.yml** - PhD students
6. **masters.yml** - Master's students
7. **team_collaborators.yml** - External collaborators
8. **alumni_members.yml** - Former lab members

#### Markdown Pages (10 files)
1. **home.md** - Homepage with vision statement and carousel
2. **team.md** - Team member directory
3. **publications.md** - Complete publication list
4. **openings.md** - Job postings (PhD, postdoc positions)
5. **funding.md** - Funding acknowledgements
6. **contact.md** - Contact information and directions
7. **allnews.md** - Complete news archive
8. **gallery.md** - Lab life photo gallery with CSS Grid masonry layout
9. **aboutwebsite.md** - Template usage guide
10. **404.md** - Custom error page with navigation buttons

#### Stylesheets (7 files)
1. **css/main.scss** - Main stylesheet entry point (630 lines, cleaned and organized Nov 2025)
   - Imports all SASS partials
   - Defines layout system (layout-wide vs layout-fixed)
   - Header/footer adjustments for fixed-width mode
   - Responsive breakpoints and media queries
2. **css/video-embed.css** - Responsive video container styles
3. **_sass/_variables.scss** - SCSS variables (colors, fonts, spacing)
4. **_sass/_components.scss** - Custom components (buttons, panels, cards)
5. **_sass/_publications.scss** - Publication card styles (30% image width, top-aligned)
6. **_sass/_themes.scss** - Light/dark theme CSS custom properties
7. **_sass/_gallery.scss** - Gallery masonry layout styles (CSS Grid with responsive columns)

#### JavaScript (3 files)
1. **js/theme-toggle.js** - Three-state theme controller (light/dark/auto)
2. **js/gallery-masonry.js** - Gallery masonry fallback for browsers without CSS Grid masonry support
3. **js/external-links.js** - Automatically opens external links in new tabs

#### Ruby Plugins (1 file)
1. **_plugins/hideCustomBibtex.rb** - BibTeX keyword filter for bibliography entries

#### Image Directories (5 directories, 52+ files)
1. **images/homepic/** - Homepage carousel (auto-loaded, 4 images)
2. **images/teampic/** - Team member photos (14 photos)
3. **images/pubpic/** - Publication thumbnails (15+ images)
4. **images/logopic/** - Organization and funding logos (9 logos)
5. **images/picpic/** - Lab activities gallery (auto-loaded, 4 photos)

#### Assets (1 directory)
1. **assets/openings/** - Job posting PDFs

#### Other Directories
- **_site/** - Generated site (auto-generated, never edit manually)
- **_bibliography/** - DELETED (legacy BibTeX sources)
- **fonts/** - DELETED (unused glyphicon fonts)

---

## Comment Standardization

All files follow consistent comment/docstring formats for maintainability.

### HTML/Liquid Files

```html
<!--
  Component Name (filename.html)
  
  Purpose:
    Brief description of what this file does
  
  Usage:
    Example: {% include filename.html param="value" %}
  
  Parameters:
    - param1: Description
    - param2: Description
  
  Features:
    - Feature 1
    - Feature 2
  
  Dependencies:
    - Dependency 1
    - Dependency 2
  
  Note:
    Additional notes or warnings
-->
```

**Exception:** Files included recursively (like `team-link.html`) use Liquid comments:
```liquid
{%- comment -%}
  Component documentation here
{%- endcomment -%}
```

### YAML Files

```yaml
#==============================================================================
# File Title (_data/filename.yml or _config.yml)
#
# Purpose:
#   Brief description of what this data file stores
#
# Usage:
#   How this file is used and by which components
#
# Required Fields:
#   - field1: Description (required)
#   - field2: Description (required)
#
# Optional Fields:
#   - field3: Description
#   - field4: Description
#
# Template:
#   Example entry structure
#
# Note:
#   Additional information or warnings
#==============================================================================
```

### Markdown Pages

```markdown
---
front matter...
---
<!--
  Page Name (filename.md)
  
  Purpose:
    Brief description of page purpose
  
  Layout: layout_name
  
  Data Sources:
    - _data/file.yml
  
  Sections:
    - Section 1 description
    - Section 2 description
  
  Features:
    - Feature 1
    - Feature 2
-->
```

### SCSS/CSS Files

```scss
/*******************************************************************************
 * Module Name (filename.scss)
 *
 * Purpose:
 *   Description of what this stylesheet does
 *
 * Features:
 *   - Feature 1
 *   - Feature 2
 ******************************************************************************/
```

### JavaScript Files

```javascript
/**
 * Script Name and purpose
 *
 * Description of functionality
 *
 * Key features or states explained here
 */
```

### Indentation Standards

- **HTML/Liquid:** 2 spaces per indent level
- **CSS/SCSS:** 2 spaces per indent level
- **JavaScript:** 2 spaces per indent level
- **Comments:** Aligned with surrounding code
- **Nested elements:** Properly indented relative to parent

---

## Website URL Management

**Current Website URL:** `https://atlasanalyticslab.github.io`

### Files Containing Website URLs

#### Critical Configuration Files (MUST UPDATE)

1. **`_config.yml`** (line 29)
   ```yaml
   url: "https://atlasanalyticslab.github.io"
   ```
   - **Purpose:** Main Jekyll configuration - affects all `{{ site.url }}` references
   - **Impact:** Site-wide - all generated URLs depend on this
   - **Priority:** 🔴 CRITICAL

2. **`robots.txt`** (line 1)
   ```
   Sitemap: {{ site.url }}{{ site.baseurl }}/sitemap.xml
   ```
   - **Purpose:** Tells search engines where to find the sitemap
   - **Impact:** SEO - affects how search engines crawl the site
   - **Note:** `/sitemap.xml` is generated automatically by the `jekyll-sitemap` plugin (configured in `_config.yml`). Do not maintain a manual `sitemap.xml` file.
   - **Priority:** 🔴 CRITICAL

3. **`CNAME`** (line 19)
   ```
   https://uslc-lab.github.io
   ```
   - **Purpose:** Custom domain configuration (currently contains old URL)
   - **Impact:** Domain routing - critical if using custom domain
   - **Priority:** 🟡 MEDIUM - Update if/when using custom domain
   - **Note:** Contains legacy USLC URL, update or remove

#### Documentation Files (SHOULD UPDATE)

4. **`README.md`**
   - Lines 47-48: Git clone URLs
   - Line 352: Repository URL
   - **Priority:** 🟢 LOW - Documentation only

5. **`DEVELOPMENT.md`** (this file)
   - Header: Repository URL
   - **Priority:** �� LOW - Documentation only

6. **`_pages/aboutwebsite.md`**
   - Lines 55-56: Git clone URLs
   - Line 263: Repository URL
   - **Priority:** 🟡 MEDIUM - Visible to site visitors

#### External URLs (DO NOT CHANGE)

7. **Team member personal websites** (in `_data/` files):
   - `_data/phd_students.yml`: `https://anhtienng.github.io/`
   - `_data/team_collaborators.yml`: `https://rdehbozorgi.github.io/`
   - **Action:** ❌ DO NOT CHANGE - external personal sites

8. **Original template sources**:
   - Multiple files: `https://uslc-lab.github.io/` (attribution)
   - **Action:** ❌ DO NOT CHANGE - attribution to original authors

### URL Change Checklist

If you need to change the website URL:

#### Step 1: Update Critical Configuration
- [ ] Update `_config.yml` → `url:` field
- [ ] Verify `robots.txt` → `Sitemap:` line (generated from `{{ site.url }}{{ site.baseurl }}`)
- [ ] Verify `/sitemap.xml` is generated (jekyll-sitemap) and includes key pages
- [ ] Update or remove `CNAME` file if using custom domain

#### Step 2: Test Locally
```bash
bundle exec jekyll serve
# Verify all pages load correctly
# Check that internal links work
```

#### Step 3: Update Documentation
- [ ] Update `README.md` → clone and repository URLs
- [ ] Update `DEVELOPMENT.md` → repository URL
- [ ] Update `_pages/aboutwebsite.md` → clone and repository URLs

#### Step 4: Deploy and Verify
```bash
git add -A
git commit -m "config: update website URL to [new URL]"
git push origin main
```

#### Step 5: Update Search Engines
- [ ] Submit new sitemap to Google Search Console
- [ ] Update sitemap in Bing Webmaster Tools
- [ ] Set up 301 redirects from old URL (if applicable)

### Custom Domain Setup

To use a custom domain (e.g., `atlas-analytics.ca`):

1. **Update `CNAME` file:**
   ```
   atlas-analytics.ca
   ```

2. **Update `_config.yml`:**
   ```yaml
   url: "https://atlas-analytics.ca"
   baseurl: ""
   ```

3. **Update DNS settings** (at your domain registrar):
   - Add CNAME record pointing to `atlasanalyticslab.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

4. **Enable HTTPS** in GitHub repository settings

5. **Update all documentation files** with new custom domain

### Liquid Variables for URLs

**Best Practices (Updated November 27, 2025):**

All internal links should use Liquid variables instead of hardcoded URLs for flexibility:

**Navigation Links (in `_includes/header.html`, `_pages/404.md`):**
```liquid
{{ site.url }}{{ site.baseurl }}/team/
{{ site.url }}{{ site.baseurl }}/publications/
```
- Use full URL pattern for navigation elements
- Always include trailing slash for consistency

**Content Links (in `_pages/*.md` content):**
```markdown
[Publications page]({{ site.baseurl }}/publications/)
[Funding page]({{ site.baseurl }}/funding/)
```
- Use relative pattern (baseurl only) in markdown content
- Include trailing slash for directory-style URLs

**YAML Data Files (in `_data/*.yml`):**
```yaml
# YAML files don't process Liquid tags, so use placeholders:
headline: "Text with [link](OPENINGS_LINK)"
```
```liquid
# Process in Liquid templates:
{% capture openings_url %}{{ site.baseurl }}/openings{% endcapture %}
{% assign processed_headline = article.headline | replace: 'OPENINGS_LINK', openings_url %}
{{ processed_headline | markdownify }}
```
- YAML data files cannot process `{{ site.* }}` variables
- Use placeholder strings (e.g., `OPENINGS_LINK`)
- Replace placeholders in Liquid templates using `capture` tag

**Why This Matters:**
- Site URL may change (e.g., custom domain, repo rename)
- Liquid variables automatically update all URLs site-wide
- No need to search-and-replace URLs throughout codebase
- Consistent with Jekyll best practices

### Notes

- All page content now uses `{{ site.url }}{{ site.baseurl }}/path` or `{{ site.baseurl }}/path` patterns
- No hardcoded *internal* URLs exist in templates, includes, or page content (as of November 27, 2025)
- External links (e.g., project websites) may use full `https://...` URLs as needed
- Hardcoded URLs should otherwise be limited to configuration files (`_config.yml`, `robots.txt`) and documentation
- Repository URL structure follows GitHub Pages naming conventions

---

## Development History

### November 2025 - Major Updates

**Deployment Infrastructure:**
- ✅ Modernized GitHub Actions workflow (`.github/workflows/deploy.yml`):
  - Migrated from custom `bin/deploy` script to official GitHub Pages actions
  - Uses `actions/configure-pages@v4` for automatic Pages configuration
  - Uses `actions/upload-pages-artifact@v3` for build artifact handling
  - Uses `actions/deploy-pages@v4` for deployment
  - Ruby 3.4.7 with bundler cache for faster builds
  - Added `.nojekyll` file to disable GitHub's automatic Jekyll processing
- ✅ Deleted `.travis.yml` - Legacy Travis CI configuration (no longer needed)
- ✅ Fixed internal links to use Liquid variables for URL flexibility:
  - All navigation links use `{{ site.url }}{{ site.baseurl }}/path` pattern
  - Content links use `{{ site.baseurl }}/path` for relative URLs
  - Standardized trailing slashes across all navigation links
  - News data file uses `OPENINGS_LINK` placeholder processed via Liquid `capture` tag
  - Ensures site remains flexible when URL changes (no hardcoded paths)
- ✅ Enhanced funding page logo visibility:
  - Increased logo size from 180px to full column width
  - Changed grid layout from 6 logos per row to 3 logos per row (desktop)
  - Responsive: 1 logo per row (mobile), 2 per row (tablet), 3 per row (desktop)
  - Logos now approximately 4x larger and more prominent

**Layout System Improvements:**
- ✅ Fixed header and footer to respect `layout_wide` setting in `_config.yml`
- ✅ Created `.container-fixed` class (1000px max-width, centered)
- ✅ Made header/footer containers conditional (fluid vs fixed)
- ✅ Fixed header alignment in fixed-width mode:
  - Logo flush to left edge (with negative margin)
  - Navigation and theme toggle flush to right edge
  - Compact sizing for better fit
  - Responsive hamburger menu at < 1200px
- ✅ Fixed footer layout in fixed-width mode:
  - Institutional links display as 2x2 grid
  - Contact text left-aligned for readability
  - Contact column width increased (col-lg-3 → col-lg-4)
- ✅ Cleaned up `css/main.scss`:
  - Removed duplicate rules and empty selectors
  - Consolidated all `.layout-fixed` rules into organized sections
  - Added comprehensive documentation headers
  - Reduced from 659 to 630 lines with better organization

**Security & Protection:**
- ✅ Enhanced 404 page with navigation buttons and Bootstrap icons
- ✅ Comprehensive `robots.txt` with crawler access control
  - Allows: Googlebot, Bingbot, Slurp with 10-second crawl delay
  - Blocks: MJ12bot, AhrefsBot, SemrushBot, DotBot, PetalBot, DataForSeoBot
  - Restricts: `/images/`, `/assets/`, `/css/`, `/js/` directories
- ✅ Apache security configuration (`.htaccess`)
  - Directory browsing disabled
  - Security headers (X-Frame-Options, X-XSS-Protection, etc.)
  - Rate limiting configuration
- ✅ GitHub Pages built-in security documented

**Assets Reorganization:**
- ✅ Deleted 26 unused PDFs (22 papers + 4 vacancies)
- ✅ Removed `assets/papers/` directory (all publications via arXiv/DOI)
- ✅ Simplified to single folder: `assets/openings/`
- ✅ Removed PDF support from publication system

**Content Updates:**
- ✅ Added 7 news items (CFI JELF, Amazon Award, NSERC, FRQNT, LBMamba, Barlow Twins, PhD hiring)
- ✅ Updated openings page with PhD position details
- ✅ Changed "Master students" to "Direct PhD students" in hiring announcements
- ✅ Removed all USLC/Uppsala references
- ✅ Updated email to mahdi.hosseini@concordia.ca
- ✅ Updated repository URLs to correct GitHub Pages URL

**Team Data Standardization:**
- ✅ Standardized YAML formatting for co-supervised students
- ✅ Used multi-line `info: |` format consistently
- ✅ Fixed 4 student entries (Yousef Kotp, Christopher Leclerc, Rose Rostami, Anh Nguyen)

**Publication Display Optimization:**
- ✅ Increased image width from 20% → 30%
- ✅ Changed object-position from center to top (better cropping)
- ✅ Removed PDF link support (arXiv/DOI only)

**Documentation Reorganization:**
- ✅ Created streamlined `README.md` for public
- ✅ Created comprehensive `DEVELOPMENT.md` for developers
- ✅ Merged content from `PROJECT_STATUS.md` and `CLEANUP_REPORT.md`

### October 2025

**Dynamic Features:**
- ✅ Homepage carousel auto-loads images from `/images/homepic/`
- ✅ Lab Life gallery auto-loads photos from `/images/picpic/`
- ✅ Responsive carousel height using CSS `clamp()`
  - Desktop: 300-600px
  - Tablet: 250-400px
  - Mobile: 200-350px

**Footer & Branding:**
- ✅ Three-column footer layout (left-center-right alignment)
- ✅ Logo and lab name use color `#951D33` with Georgia/Palatino fonts
- ✅ Institutional links with Bootstrap Icons

**Content & Links:**
- ✅ Added funding links to openings page (FRQNT, NSERC, Mitacs, IVADO)

**Repository Cleanup:**
- ✅ Git history cleaned (starts from October 1, 2025)
- ✅ Deleted Bootstrap 3 files (~1-2MB freed)
- ✅ Removed bibliography directory
- ✅ Removed fonts directory
- ✅ Deleted research page and related files

**Comment Standardization:**
- ✅ Standardized all 75+ files with consistent comment formats
- ✅ Added ~2,000+ lines of documentation
- ✅ Created comprehensive file headers for YAML data files

**Project Documentation:**
- ✅ Complete file inventory and purpose documentation
- ✅ Cleanup recommendations and unused file identification
- ✅ Verification commands and maintenance procedures

---

## Cleanup Report

### Completed Deletions (23 items)

**Layout Files (3 deleted):**
- ✅ `_layouts/page.html` - Generic page layout (unused)
- ✅ `_layouts/post.html` - Blog post layout (no blog)
- ✅ `_layouts/research.html` - Research page removed

**Data Files (2 deleted):**
- ✅ `_data/research_themes.yml` - Research themes
- ✅ `_data/project.yml` - Lab projects data

**Page Files (3 deleted):**
- ✅ `_pages/research.md` - Research overview
- ✅ `_pages/research_results.md` - Research results
- ✅ `_pages/allprojects.md` - Projects catalogue

**Directories (3 deleted):**
- ✅ `_sass/bootstrap/` - Bootstrap 3 legacy files
- ✅ `images/themepic/` - Research theme images
- ✅ `fonts/` - Unused glyphicon fonts

**Other Files (2 deleted):**
- ✅ `_sass/_bootstrap.scss` - Bootstrap 3 import
- ✅ `_layouts/bib_backup.html` - Backup layout
- ✅ `_data/pictures_Uppsala.yml` - Uppsala-specific data

**Images (10+ deleted):**
- ✅ Various unused logos and photos
- ✅ Duplicate image formats (kept PNG versions)

**Assets (26 deleted):**
- ✅ 22 PDFs from `assets/papers/`
- ✅ 4 PDFs from `assets/vacancies/`

**Total Deleted:** 28+ items (~3MB freed)

### Files to Keep

**Essential Layouts (8 files):**
- All active layouts: default, homelay, textlay, gallerylay, team, publications, gridlay, bib

**Active Data Files (8 files):**
- All team and content data files in `_data/`

**Active Includes (10 files):**
- All component files in `_includes/`

**Active Image Directories (5 directories):**
- homepic, teampic, pubpic, logopic, picpic

**Critical SCSS Files (4 files):**
- _variables.scss, _components.scss, _publications.scss, _themes.scss

**Security & Configuration (3 files):**
- robots.txt, .htaccess, _pages/404.md

---

## Maintenance Tasks

### Regular Maintenance (Monthly)

1. **Update Dependencies:**
   ```bash
   bundle update
   git add Gemfile.lock
   git commit -m "chore: update gem dependencies"
   ```

2. **Check for Broken Links:**
   ```bash
   bundle exec jekyll doctor
   ```

3. **Review News Items:**
   - Archive old news (move to bottom of `_data/news.yml`)
   - Keep recent 10-15 items at top

4. **Review Team Photos:**
   - Check for missing photos in `images/teampic/`
   - Verify all team members have photos

### Quarterly Maintenance (Every 3 Months)

1. **Image Audit:**
   ```bash
   # Check for unused images
   for img in $(find images/ -type f); do
     filename=$(basename "$img")
     count=$(grep -r "$filename" --include="*.md" --include="*.html" --include="*.yml" . 2>/dev/null | wc -l)
     if [ $count -eq 0 ]; then
       echo "Unused: $img"
     fi
   done
   ```

2. **Layout Audit:**
   ```bash
   # Check for unused layouts
   for layout in _layouts/*.html; do
     layout_name=$(basename "$layout" .html)
     grep -r "layout: $layout_name" _pages/ || echo "Unused: $layout"
   done
   ```

3. **Review Documentation:**
   - Update README.md if major changes
   - Update DEVELOPMENT.md with new patterns
   - Archive old cleanup reports

### Annual Maintenance (Yearly)

1. **Ruby/Jekyll Updates:**
   - Check for new Ruby version
   - Update `Gemfile` with new Jekyll version
   - Test thoroughly before deploying

2. **Bootstrap Updates:**
   - Check for new Bootstrap version in CDN
   - Update CDN links in `_includes/head.html`
   - Test theme compatibility

3. **Security Review:**
   - Review `robots.txt` blocked crawlers
   - Update `.htaccess` security headers
   - Check GitHub Pages security settings

4. **Performance Audit:**
   - Optimize large images
   - Check for slow-loading pages
   - Review CDN performance

---

## Verification Commands

### Check for Unused Layouts
```bash
grep -r "^layout:" _pages/ _posts/ 2>/dev/null | sort | uniq
ls _layouts/
```

### Check for Unused Includes
```bash
grep -rh "{% include" _layouts/ _includes/ _pages/ 2>/dev/null | \
  sed 's/.*{% include \([^ ]*\).*/\1/' | sort | uniq
ls _includes/
```

### Check for Unused Data Files
```bash
grep -rh "site.data\." _layouts/ _includes/ _pages/ 2>/dev/null | \
  sed 's/.*site\.data\.\([^ .}]*\).*/\1/' | sort | uniq
ls _data/
```

### Check for Unused JavaScript
```bash
grep -rh "src=.*\.js" _layouts/ _includes/ _pages/ 2>/dev/null
ls js/
```

### Verify Image Usage
```bash
# Count references for all images
for img in $(find images/ -type f); do
  filename=$(basename "$img")
  count=$(grep -r "$filename" --include="*.md" --include="*.html" --include="*.yml" . 2>/dev/null | wc -l)
  echo "$count references: $img"
done | sort -n
```

### Check for Broken References
```bash
# Check for missing team photos
grep -rh "photo:" _data/*.yml | sed 's/.*photo: //' | while read photo; do
  if [ ! -f "images/teampic/$photo" ]; then
    echo "Missing: $photo"
  fi
done

# Check for missing publication images
grep -rh "image:" _data/publications.yml | sed 's/.*image: //' | while read img; do
  if [ ! -f "images/pubpic/$img" ]; then
    echo "Missing: $img"
  fi
done
```

### Check Comment Consistency
```bash
# Check HTML comments in layouts
grep -n "<!--" _layouts/*.html

# Check Liquid comments in includes
grep -n "{%- comment -%}" _includes/*.html

# Check CSS comments
grep -n "/\*" _sass/*.scss css/*.scss

# Check JavaScript comments
grep -n "/\*\*" js/*.js

# Check YAML comments
grep -n "^#" _config.yml _data/*.yml
```

### Build and Deploy Tests
```bash
# Clean build
bundle exec jekyll clean
bundle exec jekyll build

# Check for build errors
echo $?  # Should be 0

# Serve locally
bundle exec jekyll serve --livereload

# Check generated site
ls -lh _site/
```

---

## Known Issues

### Current Issues

None currently identified.

### Fixed Issues

1. ✅ **404 page showing raw HTML** - Fixed with `markdown="0"` attribute
2. ✅ **Directory browsing accessible** - Added robots.txt and .htaccess
3. ✅ **USLC references throughout** - Updated all active files
4. ✅ **26 unused PDFs in assets** - Deleted all
5. ✅ **Inconsistent team YAML formatting** - Standardized all entries
6. ✅ **Publication images cropped too much** - Adjusted width and positioning
7. ✅ **Openings page format messy** - Completely reorganized

---

## Contributing Guidelines

### For Lab Members

1. **Adding News:**
   - Edit `_data/news.yml`
   - Add new items at TOP
   - Use emojis for visual interest
   - Include Markdown links where appropriate

2. **Adding Publications:**
   - Edit `_data/publications.yml`
   - Add new items at TOP
   - Include thumbnail image (30% width recommended)
   - Set `highlight: 1` for featured papers
   - Use arXiv/DOI links (no PDF uploads)

3. **Updating Team:**
   - Edit appropriate YAML file in `_data/`
   - Add photo to `images/teampic/`
   - Use `info: |` for multi-line entries
   - Include social media links

4. **Testing Changes:**
   ```bash
   bundle exec jekyll serve --livereload
   # Visit http://127.0.0.1:4000
   # Verify your changes
   ```

5. **Committing Changes:**
   ```bash
   git add .
   git commit -m "content: describe your changes"
   git push
   ```

### For Developers

1. **Follow Comment Standards** - Use appropriate format for file type
2. **Test Locally** - Always test before pushing
3. **Update Documentation** - Update this file if making structural changes
4. **Use Semantic Commits** - Prefix commits with type (feat:, fix:, docs:, chore:)
5. **Review Changes** - Use `git diff` before committing

---

## Additional Resources

### Jekyll Documentation
- [Jekyll Official Docs](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

### Bootstrap Documentation
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Lumen Bootswatch Theme](https://bootswatch.com/lumen/)

### Development Tools
- [Jekyll Doctor](https://jekyllrb.com/docs/troubleshooting/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Git Documentation](https://git-scm.com/doc)

---

## Project Statistics

**Total Files:** 75+  
**Fully Documented:** 100%  
**Comment Lines Added:** ~2,000+  
**Files Deleted:** 23+  
**Space Saved:** ~2-3MB  
**Repository Health:** ✅ Excellent

---

**Status:** ✅ Complete and current  
**Last Verified:** November 27, 2025  
**Next Review:** December 2025

---

## Contact for Development Issues

For technical issues or questions about development:

**Dr. Mahdi S. Hosseini**  
📧 mahdi.hosseini@concordia.ca

For urgent website issues, contact repository maintainers via GitHub Issues.
