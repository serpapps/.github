# Testing Guide for Duplicate Issues Detection

This guide helps you test and verify that the duplicate issues detection is working correctly.

## Quick Test

To test if the duplicate detection is working:

### 1. Create a Test Issue
Create an issue in any serpapps repository with this content:

```
Title: Test duplicate detection feature
Body: This is a test issue to verify that the duplicate detection system is working properly. The app should detect if there are any similar issues and comment accordingly.
```

### 2. Create a Similar Issue
Wait a few minutes, then create another issue:

```
Title: Testing duplicate detection functionality  
Body: This is another test issue to check if the duplicate detection system works. It should find the previous similar issue and comment with a link.
```

### 3. Expected Result
The second issue should receive an automated comment like:

```
👋 @yourusername

Thanks for opening this issue! I've detected that this might be similar to existing issues:

- Test duplicate detection feature (#123)

Please check if any of these existing issues address your concern...
```

## Configuration Verification

### Check Files Exist
Verify these files exist in the `.github` directory:
- [x] `duplicate-issues.yml` - Main configuration
- [x] `duplicates.yml` - Alternative configuration  
- [x] `duplicate-detection.yml` - Minimal configuration
- [x] `labels.yml` - Label definitions
- [x] `DUPLICATE_DETECTION.md` - Documentation

### Check Workflows
Verify these workflows exist in `.github/workflows/`:
- [x] `duplicate-issue-support.yml` - Support workflow
- [x] `setup-duplicate-labels.yml` - Label creation

## Troubleshooting

### If Detection Isn't Working:

1. **Check App Installation**
   - Verify the "Duplicate Issues" app is installed organization-wide
   - Confirm it has read/write access to issues

2. **Check Configuration**
   - Ensure configuration files are valid YAML
   - Verify similarity threshold isn't too high (0.7 = 70%)

3. **Check Permissions**
   - App needs `issues:write` permission
   - App needs `repository:read` permission

4. **Check Labels** 
   - Run the "Setup Duplicate Detection Labels" workflow
   - Verify labels exist in the repository

### Common Issues:

- **No comments appearing**: App may not be triggered, check installation
- **Too many false positives**: Lower similarity threshold in config
- **Missing duplicates**: Increase search limit or lower threshold
- **Workflow errors**: Check GitHub Actions permissions

## Manual Testing Commands

```bash
# Check YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/duplicate-issues.yml'))"

# Validate all configs
for file in .github/duplicate*.yml .github/labels.yml; do
    echo "Checking $file..."
    python3 -c "import yaml; yaml.safe_load(open('$file'))"
done
```

## Support

If issues persist:
1. Check the app's status page/documentation
2. Review GitHub Actions logs for workflow errors
3. Create a support issue with details about what's not working