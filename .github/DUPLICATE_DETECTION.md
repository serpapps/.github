# Duplicate Issues Detection Configuration

This repository is configured to automatically detect and comment on potential duplicate issues using the "Duplicate Issues" GitHub App.

## How it Works

When a user opens a new issue:

1. **Automatic Detection**: The app analyzes the issue title and body content
2. **Similarity Search**: It searches through existing open issues for similar content
3. **Threshold Matching**: Issues with 70% or higher similarity are considered potential duplicates
4. **Automatic Comments**: If duplicates are found, the app automatically comments with:
   - A mention of the issue author (`@username`)
   - Links to similar existing issues
   - Guidance on how to proceed

## Configuration Files

The following configuration files control the duplicate detection behavior:

- **`.github/duplicate-issues.yml`** - Main configuration with comprehensive settings
- **`.github/duplicates.yml`** - Alternative/fallback configuration
- **`.github/duplicate-detection.yml`** - Minimal configuration for simple setups

## Settings Overview

### Detection Parameters
- **Similarity Threshold**: 70% (0.7) - how similar issues need to be to be considered duplicates
- **Search Scope**: Last 100 issues (for performance)
- **Fields Compared**: Issue title, body, and labels
- **Target Issues**: Open issues only

### Automated Actions
- **Comment**: Automatically comments on potential duplicates
- **Labeling**: Adds `possible-duplicate` label
- **User Mentions**: Tags the issue author in the comment
- **Reference Links**: Provides direct links to similar issues

### Exclusions
Issues are **not** checked for duplicates if they have these labels:
- `not-duplicate`
- `confirmed-unique` 
- `enhancement`

## Expected Behavior

### When an Issue is Opened
```
👋 @username

Thanks for opening this issue! I've detected that this might be similar to existing issues:

- Issue Title (#123)
- Another Similar Issue (#456)

Please check if any of these existing issues address your concern...
```

### For Issue Authors
If you receive a duplicate detection comment:

1. **Review the linked issues** to see if they address your concern
2. **Add your specific details** to existing issues if they're truly duplicates
3. **Explain differences** in your issue if it's not actually a duplicate
4. **Use the `not-duplicate` label** if you're certain this is unique

## Troubleshooting

### App Not Working?
1. Verify the app is installed organization-wide
2. Check that configuration files exist in `.github/` directory
3. Ensure issue templates don't conflict with detection
4. Test with a sample issue

### False Positives?
- Adjust `similarity_threshold` in configuration files
- Add exclusion labels to specific issues
- Use `not-duplicate` label for confirmed unique issues

### Missing Duplicates?
- Lower the `similarity_threshold` (but expect more false positives)
- Increase `search_limit` to check more historical issues
- Verify `compare_fields` include the right content

## Support

For issues with duplicate detection:
1. Check if the issue has appropriate labels
2. Review the configuration files
3. Submit a support issue if the app isn't working as expected