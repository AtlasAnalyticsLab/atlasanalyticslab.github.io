# Instructions for Lab Members

**Quick reference guide for updating the Atlas Analytics Lab website**

For complete documentation, see [DEVELOPMENT.md](../DEVELOPMENT.md).

---

## How to Update News Items

**File:** `_data/news.yml`

1. Add new items to the **TOP** of the file
2. Use Markdown formatting for links and emphasis
3. All items will appear on homepage and `/allnews`

**Example:**
```yaml
- date: November 27, 2025
  headline: "🎉 **Exciting announcement!** [Read more](/link-to-details)"
```

---

## How to Update Publications

**File:** `_data/publications.yml`

1. Add new publications to the **TOP** of the file
2. Add thumbnail image (PNG/JPG) to `images/pubpic/`
3. Use arXiv or DOI links (no PDF uploads)

**Example:**
```yaml
- title: "Your Paper Title Here"
  authors: "Author1, Author2, Author3"
  venue: "Conference/Journal Name"
  year: 2025
  link:
    url: "https://arxiv.org/abs/..."
    display: "arXiv preprint"
  image: your-paper.png
  highlight: 1  # Set to 1 to feature on homepage
  description: "Brief description of the paper's contribution"
```

**Fields:**
- `highlight: 1` - Shows in "Group Highlights" section on homepage
- `image` - Thumbnail (30% width, saved in `images/pubpic/`)
- `link.url` - Full URL to paper (arXiv, DOI, publisher)
- `link.display` - Link text to show

---

## How to Update Team Members

**Files:** (edit the appropriate one)
- `_data/principal_investigator.yml` - PI information
- `_data/postdocs.yml` - Postdoctoral fellows
- `_data/phd_students.yml` - PhD students
- `_data/masters.yml` - Master's students
- `_data/team_collaborators.yml` - External collaborators
- `_data/alumni_members.yml` - Former members

**Steps:**
1. Add entry to appropriate YAML file
2. Add photo (JPG/PNG) to `images/teampic/`
3. Use `info: |` for multi-line descriptions

**Example:**
```yaml
- name: Jane Doe
  photo: jane-doe.jpg
  info: |
    PhD Student, started Fall 2025
    Research: Computer Vision and Medical Imaging
  email: jane.doe@example.com
  website: https://janedoe.github.io
  github: janedoe
  linkedin: janedoe
  twitter: janedoe
  scholar: scholar-id
  orcid: 0000-0000-0000-0000
```

**Photo requirements:**
- Square or portrait orientation
- Clear headshot
- Minimum 400x400 pixels
- Saved as `firstname-lastname.jpg` in `images/teampic/`

---

## How to Update Job Openings

**File:** `_pages/openings.md`

1. Edit the markdown file directly
2. Add position announcement PDFs to `assets/openings/`
3. Link to PDFs using `[Text]({{ site.url }}{{ site.baseurl }}/assets/openings/filename.pdf)`

---

## How to Update Homepage Carousel

**Directory:** `images/homepic/`

1. Simply add JPG/PNG images to this directory
2. Images automatically appear in carousel (no configuration needed)
3. Recommended size: 1200x600 pixels or similar aspect ratio

---

## How to Update Lab Life Gallery

**Directory:** `images/picpic/`

1. Add photos to this directory
2. They automatically appear on `/gallery/` page
3. Use descriptive filenames

---

## Git Workflow

### Option 1: Direct Edit on GitHub (Simple)

1. Navigate to the file on GitHub
2. Click the pencil icon (Edit)
3. Make changes
4. Scroll down, add commit message
5. Select "Create a new branch" and "Start a pull request"
6. Submit pull request

### Option 2: Local Development (Recommended)

```bash
# 1. Create feature branch
git checkout main
git pull origin main
git checkout -b feature/add-news-2025-11-27

# 2. Make your changes
# Edit files...

# 3. Test locally
bundle exec jekyll serve --livereload
# Visit http://127.0.0.1:4000

# 4. Commit and push
git add .
git commit -m "content: add news about [topic]"
git push origin feature/add-news-2025-11-27

# 5. Open pull request on GitHub
```

---

## Testing Your Changes

**Before submitting a pull request:**

1. ✅ Run local Jekyll server
2. ✅ Check your changes appear correctly
3. ✅ Test on different screen sizes (desktop, tablet, mobile)
4. ✅ Test both light and dark themes
5. ✅ Verify no broken links
6. ✅ Check for typos

---

## Common Issues

**Changes don't show up locally?**
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

**YAML parsing error?**
- Check for proper indentation (2 spaces)
- Ensure multi-line text uses `info: |`
- Verify all quotes match

**Image not showing?**
- Check filename matches exactly (case-sensitive)
- Verify image is in correct directory
- Try clearing cache and rebuilding

---

## Need Help?

- **Full Documentation:** See [DEVELOPMENT.md](../DEVELOPMENT.md)
- **Quick Start:** See [README.md](../README.md)
- **Questions:** Open an issue or contact Dr. Hosseini

---

**Last Updated:** November 27, 2025