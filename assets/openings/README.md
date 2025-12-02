# Job Openings Documents

This directory contains PDF files for job postings and position announcements.

## File Naming Convention

Use descriptive, lowercase filenames with hyphens:
- ✅ `phd-position-pathology-mcgill-2026.pdf`
- ✅ `postdoc-computational-pathology-2026.pdf`
- ❌ Avoid spaces: `PhD Position 2026.pdf`

## Usage in Pages

Reference documents in markdown pages:

```markdown
[Download PDF]({{ site.url }}{{ site.baseurl }}/assets/openings/phd-position-pathology-mcgill-2026.pdf)
```

Or with HTML:
```html
<a href="{{ site.url }}{{ site.baseurl }}/assets/openings/phd-position-pathology-mcgill-2026.pdf" target="_blank">Download PDF</a>
```

## Note

All files in this directory are publicly accessible once deployed.
