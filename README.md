# Atlas Analytics Lab Website

Official website for the **Atlas Analytics Lab** at Concordia University, Montreal. We focus on AI research in computational pathology, foundation models, and medical imaging.

**🌐 Live Site:** https://atlasanalyticslab.github.io  
**📧 Contact:** mahdi.hosseini@concordia.ca

---

## About

The Atlas Analytics Lab operates within Concordia University's Department of Computer Science and Software Engineering (CSSE). Dr. Mahdi S. Hosseini serves as Gina Cody Research Chair, Adjunct Professor in Pathology at McGill University, and Affiliate Member of Mila – Quebec AI Institute.

**Research Areas:**
- Computational Pathology & Digital Pathology
- Foundation Models & Vision-Language Models
- Self-Supervised Learning & Representation Learning
- Medical Image Analysis & Clinical AI

**Affiliations:**
- [Concordia University](https://www.concordia.ca/)
- [McGill University - Department of Pathology](https://www.mcgill.ca/pathology/)
- [Mila - Quebec AI Institute](https://mila.quebec/)
- [CHUM](https://www.chumontreal.qc.ca/) (Clinical collaborations)

---

## Quick Start

### Requirements

- **Ruby:** 3.4.7+ (latest stable version)
- **Bundler:** 2.7.2+ (`gem install bundler`)
- **Build Tools:** GCC/Clang, Make (for native gem compilation)

**Installation (macOS):**
```bash
brew install ruby
```

**Installation (Ubuntu/Debian):**
```bash
sudo apt install ruby-full build-essential zlib1g-dev
```

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io.git
   cd AtlasAnalyticsLab.github.io
   ```

2. **Install dependencies:**
   ```bash
   gem install bundler
   bundle install
   ```

3. **Start the development server:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Visit:** http://127.0.0.1:4000

Changes to files are automatically reloaded. Restart the server after editing `_config.yml` or plugin files.

### Useful Commands

```bash
# Production build
bundle exec jekyll build

# Clean cache and generated files
bundle exec jekyll clean

# Check configuration
bundle exec jekyll doctor
```

---

## Updating Content

### News & Announcements

**File:** `_data/news.yml`

Add new items to the **top** of the file. Supports Markdown formatting:

```yaml
- date: November 27, 2025
  headline: "🎓 **New achievement!** [Link to details](/path)"
```

### Team Members

**Files:** 
- `_data/principal_investigator.yml` - PI information
- `_data/postdocs.yml` - Postdoctoral fellows
- `_data/phd_students.yml` - PhD students
- `_data/masters.yml` - Master's students
- `_data/team_collaborators.yml` - External collaborators
- `_data/alumni_members.yml` - Former members

**Photos:** Place headshots in `images/teampic/` (use JPG or PNG)

### Publications

**File:** `_data/publications.yml`

Add new publications to the **top** of the file:

```yaml
- title: "Your Paper Title"
  authors: "Author1, Author2, Author3"
  venue: "Conference/Journal Name"
  year: 2025
  link:
    url: "https://arxiv.org/abs/..."
    display: "arXiv preprint"
  image: your-image.png  # Place in images/pubpic/
  highlight: 1  # Set to 1 to feature in "Group Highlights"
  description: "Brief description of the paper"
```

**Images:** Place publication thumbnails in `images/pubpic/`

### Job Openings

**File:** `_pages/openings.md`

Edit the markdown file directly. Add position announcement PDFs to `assets/openings/`.

### Homepage Carousel

**Directory:** `images/homepic/`

Simply add images to this directory - they automatically appear in the carousel. No configuration needed.

**Supported formats:** JPG, JPEG, PNG, GIF, WebP

### Lab Life Gallery

**Directory:** `images/picpic/`

Add photos of lab events, conferences, and activities. They automatically appear on the `/gallery/` page.

---

## Project Structure

```
├── _config.yml           # Site configuration (includes layout_wide setting)
├── _data/                # YAML data files (news, team, publications)
├── _includes/            # Reusable components (header, footer, etc.)
├── _layouts/             # Page templates
├── _pages/               # Website pages (home, team, publications, etc.)
├── _plugins/             # Custom Jekyll plugins
├── _sass/                # SCSS stylesheets
├── assets/               # Static files (PDFs, documents)
├── css/                  # Compiled stylesheets
├── images/               # All images organized by type
│   ├── homepic/         # Homepage carousel
│   ├── teampic/         # Team member photos
│   ├── pubpic/          # Publication thumbnails
│   ├── logopic/         # Organization logos
│   └── picpic/          # Lab activities gallery
├── js/                   # JavaScript files
└── _site/                # Generated site (auto-generated, don't edit)
```

### Layout Configuration

The website supports two layout modes configured in `_config.yml`:

- **`layout_wide: true`** - Full viewport width with responsive padding (default)
- **`layout_wide: false`** - Fixed 1000px max-width, centered layout

This setting affects the entire site including header, footer, and content areas.

---

## Page Navigation

| Page | URL | Edit |
|------|-----|------|
| Home | `/` | `_pages/home.md` |
| Team | `/team` | `_pages/team.md` + `_data/` files |
| Publications | `/publications` | `_data/publications.yml` |
| Openings | `/openings` | `_pages/openings.md` |
| Funding | `/funding` | `_pages/funding.md` |
| Contact | `/contact` | `_pages/contact.md` |
| All News | `/allnews` | `_data/news.yml` |
| Gallery | `/gallery` | `_pages/gallery.md` + `images/picpic/` |

---

## Deployment

The site automatically deploys via **GitHub Actions** when you push to the `main` branch.

**Deployment Workflow:**
1. Push changes to `main` branch
2. GitHub Actions runs `.github/workflows/deploy.yml`
3. Site builds with `JEKYLL_ENV=production` using official GitHub Pages actions
4. Build artifact uploaded and deployed to GitHub Pages
5. Site updates in 1-2 minutes

**GitHub Actions Workflow:**
- Uses `actions/configure-pages@v4` for Pages configuration
- Uses `actions/upload-pages-artifact@v3` for build artifact
- Uses `actions/deploy-pages@v4` for deployment
- Ruby 3.4.7 with bundler cache for faster builds

**Manual Deployment:**
```bash
bundle exec jekyll build
yes | bash bin/deploy --src main --deploy gh-pages
```

---

## Support & Maintenance

### Troubleshooting

**Problem:** Gem compilation fails  
**Solution:** Install missing OS libraries:
```bash
# macOS
brew install libffi zlib openssl

# Ubuntu/Debian
sudo apt install libffi-dev zlib1g-dev libssl-dev
```

**Problem:** Changes don't appear  
**Solution:** Clear cache and rebuild:
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

**Problem:** Broken links or configuration issues  
**Solution:** Run diagnostics:
```bash
bundle exec jekyll doctor
```

### Updates

Pull latest changes regularly:
```bash
git pull origin main
bundle install
```

---

## Security Features

- ✅ **Crawler Protection:** `robots.txt` controls search engine access
- ✅ **Custom 404 Page:** User-friendly error handling with navigation
- ✅ **DDoS Protection:** GitHub Pages + Cloudflare CDN
- ✅ **Security Headers:** Content security and XSS protection

---

## Technology Stack

- **Static Site Generator:** Jekyll 4.4.1
- **Hosting:** GitHub Pages
- **Frontend Framework:** Bootstrap 5 (Lumen theme via jsDelivr CDN)
- **Template Engine:** Liquid
- **Styling:** SCSS/SASS
- **Theme:** Light/Dark mode with auto-detection

---

## Contributing

For lab members and collaborators, see `DEVELOPMENT.md` for detailed development documentation including:
- Detailed file structure and design decisions
- Comment standardization guidelines
- Development history and changelog
- Cleanup reports and maintenance tasks
- URL management and configuration details

---

## License & Attribution

**License:** MIT License

**Original Design:** [Allan Lab](https://www.allanlab.org/)  
**Adapted From:** [Uppsala Security Lab & Cloud (USLC)](https://uslc-lab.github.io/)  
**Customized For:** Atlas Analytics Lab, Concordia University

**Development:** This website was developed with assistance from AI tools for code generation, documentation, and maintenance.

---

## Contact

**Dr. Mahdi S. Hosseini**  
Assistant Professor
Department of Computer Science and Software Engineering  
Concordia University, Montreal, QC, Canada

📧 **Email:** mahdi.hosseini@concordia.ca  
🔗 **Website:** https://atlasanalyticslab.github.io  
💻 **GitHub:** https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io

---

**Last Updated:** December 1, 2025
