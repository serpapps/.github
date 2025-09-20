# Feature Distribution Tools

This directory contains tools to distribute the feature files from `/research/` to their respective repositories.

## Automated Distribution (GitHub Action)

The `distribute-features.yml` workflow automatically distributes feature files to their respective repositories when:
- Files in `/research/*.yml` are updated
- Manually triggered via GitHub Actions UI

### How it works:
1. Reads all `.yml` files from `/research/` directory
2. For each file, determines target repository (filename without `.yml`)
3. Creates `research/` directory in target repo if it doesn't exist
4. Creates or updates `research/features.yml` in the target repository
5. Handles repositories that don't exist gracefully

### To trigger manually:
1. Go to Actions tab in GitHub
2. Select "Distribute Features to Repositories" 
3. Click "Run workflow"

## Manual Distribution (Script)

For manual control or troubleshooting, use the `distribute-features-manual.js` script:

### Prerequisites:
```bash
npm install @octokit/rest
```

### Set up GitHub token:
```bash
export GITHUB_TOKEN=your_github_token_here
```

The token needs `repo` permissions to create/update files in the target repositories.

### Run the script:
```bash
node scripts/distribute-features-manual.js
```

### What the script does:
- Lists all feature files to be distributed
- Shows progress for each repository
- Creates research directories where needed
- Handles existing files by updating them
- Provides a summary of results
- Includes rate limiting to avoid API limits

## Repository Structure

After distribution, each repository will have:
```
serpapps/repository-name/
├── research/
│   ├── features.yml    # 15-20 feature bullet points
│   └── .gitkeep        # (if research dir was created)
└── ... other files
```

## Error Handling

Both tools handle common scenarios:
- Repository doesn't exist (skips gracefully)
- Research directory doesn't exist (creates it)
- Features file already exists (updates it)
- API rate limiting (includes delays)
- Network errors (logs and continues)

## Feature File Format

Each distributed `features.yml` follows this structure:
```yaml
features:
  - "Feature description 1"
  - "Feature description 2"
  - "Feature description 3"
  # ... up to 20 features
```

This format is compatible with the existing `generate-readme.js` script for automatic README generation.