# Release Standard Operating Procedure (SOP)

This document outlines the standard process for creating releases across all serpapps repositories.

## Prerequisites

- Ensure all changes are committed and pushed to main branch
- Ensure the project has been tested thoroughly
- Have GitHub repository access with release permissions

## Release Steps

### 1. Update CHANGELOG

Update the CHANGELOG.md file in the repository:

```markdown
# Changelog

All notable changes to this project will be documented in this file. For detailed release notes, see [GitHub Releases](https://github.com/serpapps/[repository-name]/releases).

## Version History

- [vX.X.X](https://github.com/serpapps/[repository-name]/releases/tag/vX.X.X)
- [previous versions...]
```

Commit the changelog:
```bash
git add CHANGELOG.md
git commit -m "docs: update changelog for vX.X.X"
git push origin main
```

### 2. Create Annotated Tag

```bash
git tag -a vX.X.X -m "Release vX.X.X"
```

### 3. Push Tag to GitHub

```bash
git push origin vX.X.X
```

### 4. Package Release Assets

**For Chrome Extensions:**
```bash
cd src/[extension-folder]
zip -r ../../[extension-name]-vX.X.X.zip . -x "*.DS_Store"
cd ../..
```

**For other projects:**
Follow the project-specific build/packaging process.

### 5. Create GitHub Release

1. Go to `https://github.com/serpapps/[repository-name]/releases/new`
2. Select the tag you just created (vX.X.X)
3. Set release title as "vX.X.X" or "vX.X.X - [Brief Description]"
4. Add release notes (see template below)
5. Upload any release assets (zip files, binaries, etc.)
6. Publish the release


## Release Notes Template

```markdown
## vX.X.X

[Brief description of the release]

### What's New
- Feature 1
- Feature 2

### Improvements
- Improvement 1
- Improvement 2

### Bug Fixes
- Fix 1
- Fix 2

### Breaking Changes (if any)
- Change 1
- Change 2

### Installation/Usage

[Project-specific installation instructions]

### Compatibility

[List supported versions/platforms]
```

## Project-Specific Guidelines

### Chrome Extensions
- Test in Chrome, Edge, and other Chromium browsers
- Verify manifest version compatibility
- Include installation instructions for manual installation
- Consider Chrome Web Store deployment timeline

### Vimeo Video Downloader
- Include compatibility matrix for different video types
- Test across multiple browsers
- Note any Vimeo API changes

### Skool Downloader
- Test on various Skool page types (classroom, community posts)
- Verify video detection methods
- Test download commands on Mac/Windows

## Post-Release Checklist

- [ ] Verify release appears correctly on GitHub
- [ ] Test downloading release assets
- [ ] Verify installation/deployment works
- [ ] Update any external documentation
- [ ] Monitor for immediate user feedback/issues
- [ ] Update Chrome Web Store listing (if applicable)

## Versioning Guidelines

Follow Semantic Versioning (SemVer):
- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features, backwards compatible
- **PATCH** (0.0.X): Bug fixes, backwards compatible

## Emergency Procedures

If critical issues are discovered post-release:

1. **Assess severity** - Determine if immediate action needed
2. **Create hotfix** - Branch from the tag, not main
3. **Fast-track testing** - Focus on the specific issue
4. **Release patch version** - Follow expedited release process
5. **Communicate** - Notify users of the issue and fix
6. **Post-mortem** - Document what went wrong and how to prevent it
