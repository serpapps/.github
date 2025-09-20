# FAQ Distribution Guide

This guide explains how to distribute the generated FAQ files to their respective serpapps repositories.

## Overview

The FAQ generation system has created comprehensive FAQ content for all 95 serpapps repositories. Each repository's FAQ file is ready at:

```
repository-faqs/<repo-name>/research/faq.yml
```

## Distribution Methods

### Method 1: Automated Distribution (Recommended)

Use the provided script to automatically distribute FAQ files to all repositories:

#### Prerequisites

1. **GitHub CLI**: Install and authenticate GitHub CLI
   ```bash
   # Install GitHub CLI
   # macOS: brew install gh
   # Ubuntu: sudo apt install gh
   # Windows: winget install GitHub.cli
   
   # Authenticate
   gh auth login
   ```

2. **Repository Access**: Ensure you have push access to all serpapps repositories

#### Usage

```bash
# Dry run (preview changes without making them)
node scripts/distribute-to-repositories.js --dry-run

# Distribute to all repositories
node scripts/distribute-to-repositories.js

# Distribute to a specific repository only
node scripts/distribute-to-repositories.js --repo=vimeo-video-downloader
```

### Method 2: GitHub Actions Workflow

Use the provided workflow for automated distribution:

1. Go to the Actions tab in this repository
2. Select "Distribute FAQ Files to Repositories" workflow
3. Click "Run workflow"
4. Choose dry-run mode for testing or false for actual distribution
5. Monitor the workflow execution

### Method 3: Manual Distribution

For manual distribution or if you prefer more control:

#### Single Repository Example

```bash
# 1. Navigate to the target repository
cd /path/to/vimeo-video-downloader

# 2. Create research directory
mkdir -p research

# 3. Copy FAQ file
cp /path/to/.github/repository-faqs/vimeo-video-downloader/research/faq.yml research/

# 4. Commit and push
git add research/faq.yml
git commit -m "Add comprehensive FAQ file with common user questions and answers"
git push
```

#### Bulk Manual Distribution Script

```bash
#!/bin/bash
# Save this as distribute-manual.sh and run with bash distribute-manual.sh

BASE_DIR="/path/to/.github/repository-faqs"

for repo_dir in "$BASE_DIR"/*; do
  if [ -d "$repo_dir" ] && [ -f "$repo_dir/research/faq.yml" ]; then
    repo_name=$(basename "$repo_dir")
    echo "Processing $repo_name..."
    
    # Clone or update repository
    if [ ! -d "../$repo_name" ]; then
      gh repo clone "serpapps/$repo_name" "../$repo_name"
    fi
    
    # Copy FAQ file
    mkdir -p "../$repo_name/research"
    cp "$repo_dir/research/faq.yml" "../$repo_name/research/"
    
    # Commit and push
    cd "../$repo_name"
    git add research/faq.yml
    git commit -m "Add comprehensive FAQ file with common user questions and answers"
    git push
    cd - > /dev/null
    
    echo "✅ Completed $repo_name"
  fi
done
```

## FAQ File Structure

Each FAQ file contains:

```yaml
# FAQ for serpapps/<repository-name>
repository: "serpapps/<repository-name>"
service_name: "<Service Name>"
research_status: "completed"

faqs:
  - question: "Question text"
    answer: "Comprehensive answer with legal disclaimers"
    source: "expert_knowledge_base"
    confidence: "high|medium|low"

last_updated: "2025-09-20T09:33:28.984Z"
notes:
  - "FAQ generation notes and guidelines"
```

## Quality Assurance

All FAQ files include:

- ✅ 5-8 relevant questions per repository
- ✅ Comprehensive, actionable answers
- ✅ Legal disclaimers and copyright warnings
- ✅ Emphasis on respecting terms of service
- ✅ Professional, accessible language
- ✅ Consistent YAML structure

## Distribution Checklist

Track your progress using the checklist:

- [ ] All 95 repositories processed
- [ ] FAQ files properly placed at `research/faq.yml`
- [ ] Commit messages consistent across repositories
- [ ] No errors in YAML structure
- [ ] Content appropriate for each repository type

## Repository Categories

The FAQ content is customized for different repository types:

### Video Downloaders (73 repositories)
- Basic download instructions and methods
- Legal compliance warnings and guidelines
- Supported formats and quality options
- Troubleshooting common issues
- Mobile compatibility information
- Security and privacy considerations

### Educational Platforms (13 repositories)
- Course download procedures and requirements
- Subscription and licensing terms explanation
- Content organization best practices
- Multi-device usage considerations
- Intellectual property respect

### Stock Image/Content Sites (16 repositories)
- Download procedures and account requirements
- Licensing requirements and restrictions
- Commercial usage guidelines and permissions
- Available formats and specifications
- Attribution requirements

### Social Media Platforms (8 repositories)
- Content downloading methods and tools
- Privacy and permission considerations
- Platform-specific limitations and restrictions
- Quality expectations and technical details

## Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   gh auth status
   gh auth login
   ```

2. **Repository Access Error**
   - Ensure you have push access to serpapps repositories
   - Check if repository exists and is public/accessible

3. **File Already Exists**
   - The script will update existing FAQ files
   - Use dry-run mode to preview changes

4. **Network/Connection Issues**
   - Check internet connection
   - Retry after a few moments
   - Use single repository mode for testing

### Getting Help

- Check the GitHub Actions logs for detailed error information
- Use dry-run mode to test before actual distribution
- Process repositories individually if bulk operation fails

## Post-Distribution

After distributing FAQ files:

1. **Verify Integration**: Ensure FAQ files are properly integrated with existing repository documentation
2. **Update README Files**: Consider updating repository README files to reference the FAQ
3. **Monitor Feedback**: Watch for user feedback and questions to improve FAQ content
4. **Periodic Updates**: Plan to update FAQ content based on platform changes and user needs

## Files Generated

This distribution process creates:
- 95 × `research/faq.yml` files across serpapps repositories
- Consistent commit messages for tracking
- Proper YAML structure for easy parsing
- Comprehensive legal and usage guidance