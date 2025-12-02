# Contributing to Atlas Analytics Lab Website

Thank you for your interest in contributing to the Atlas Analytics Lab website!

## For Lab Members

If you're a lab member looking to update content (news, publications, team info), please see:
- **Quick Guide:** [README.md](../README.md)
- **Detailed Instructions:** [DEVELOPMENT.md](../DEVELOPMENT.md) - Git Workflow section

## Reporting Issues

Found a bug, typo, or have a suggestion?

1. Check [existing issues](https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io/issues) first
2. If it's new, [create an issue](https://github.com/AtlasAnalyticsLab/AtlasAnalyticsLab.github.io/issues/new)
3. Provide as much detail as possible:
   - What page or section is affected?
   - What did you expect vs. what happened?
   - Screenshots if applicable

## Submitting Pull Requests

### Content Updates (News, Publications, Team)

1. **Create a feature branch** from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/add-news-YYYY-MM-DD
   ```

2. **Make your changes:**
   - Edit `_data/news.yml` for news
   - Edit `_data/publications.yml` for publications
   - Edit `_data/[role].yml` for team members
   - Add images to appropriate `images/` subdirectory

3. **Test locally:**
   ```bash
   bundle exec jekyll serve --livereload
   # Visit http://127.0.0.1:4000
   ```

4. **Commit with descriptive message:**
   ```bash
   git add .
   git commit -m "content: add news about [topic]"
   git push origin feature/add-news-YYYY-MM-DD
   ```

5. **Open a pull request** on GitHub

### Code/Layout Changes

1. **Follow the same branch workflow** above
2. **Test thoroughly** on different screen sizes and both themes (light/dark)
3. **Update documentation** if you change structure or add features
4. **Use semantic commit messages:**
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `style:` - CSS/styling changes
   - `refactor:` - Code restructuring
   - `docs:` - Documentation updates
   - `chore:` - Maintenance tasks

### Code Standards

- **Indentation:** 2 spaces (HTML, CSS, JavaScript)
- **Comments:** Follow standards in [DEVELOPMENT.md](../DEVELOPMENT.md)
- **File headers:** Add descriptive headers to new files
- **Test locally:** Always test before pushing

## Review Process

- All PRs require review before merging
- Content updates: Quick review by Dr. Hosseini or designated team member
- Code changes: More thorough review for functionality and style
- Address review comments promptly
- Squash commits if requested

## Questions?

For help:
- **Jekyll/Technical:** [Jekyll Documentation](https://jekyllrb.com/docs/) or [Jekyll Talk Forums](https://talk.jekyllrb.com/)
- **Lab Website:** Open an issue or contact Dr. Mahdi S. Hosseini at mahdi.hosseini@concordia.ca

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
