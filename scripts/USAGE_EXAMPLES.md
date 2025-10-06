# Usage Examples for Repository Management Scripts

## LICENSE File Deletion

### Quick Start
```bash
# Preview what would be deleted (recommended first step)
node scripts/delete-license-files.js --dry-run

# Delete LICENSE files from all repositories
node scripts/delete-license-files.js

# Delete LICENSE files from a specific repository
node scripts/delete-license-files.js --repo=youtube-downloader
```

### Step-by-Step Process

1. **First, always run a dry-run to see what would be affected:**
   ```bash
   node scripts/delete-license-files.js --dry-run
   ```

2. **Review the output to understand which repositories have LICENSE files**

3. **If you want to test with a single repository first:**
   ```bash
   node scripts/delete-license-files.js --dry-run --repo=youtube-downloader
   node scripts/delete-license-files.js --repo=youtube-downloader
   ```

4. **Run the full deletion across all repositories:**
   ```bash
   node scripts/delete-license-files.js
   ```

### Prerequisites

Before running these scripts, ensure:

1. **GitHub CLI is installed and authenticated:**
   ```bash
   # Install GitHub CLI (if not already installed)
   # On macOS: brew install gh
   # On Ubuntu: sudo apt install gh
   # On Windows: winget install GitHub.cli

   # Authenticate with GitHub
   gh auth login
   
   # Verify authentication
   gh auth status
   ```

2. **You have appropriate permissions:**
   - Write access to serpapps repositories
   - Permission to delete files in those repositories

### Expected Output

The script provides detailed logging:
- ✅ Success messages for completed operations
- ⚠️ Warning messages for repositories that don't exist or aren't accessible
- ❌ Error messages for failed operations
- 📊 Summary statistics at the end

### Safety Features

- **Dry-run mode**: Always test first with `--dry-run`
- **Single repository testing**: Use `--repo=name` to test with one repository
- **Detailed logging**: See exactly what's happening
- **Error handling**: Script continues even if individual repositories fail
- **Backup recommendations**: Consider backing up important repositories before mass operations

### Common LICENSE File Patterns

The script searches for and deletes these common patterns:
- `LICENSE`, `LICENSE.md`, `LICENSE.txt`, `LICENSE.rst`
- `LICENCE`, `LICENCE.md`, `LICENCE.txt` (British spelling)
- `license`, `license.md`, `license.txt` (lowercase)
- `License`, `License.md`, `License.txt` (title case)

### Troubleshooting

**"GitHub CLI is not authenticated"**
```bash
gh auth login
```

**"Repository not found or not accessible"**
- The repository might not exist
- You might not have access permissions
- The repository might be private and you're not a collaborator

**"Command failed" errors**
- Check your internet connection
- Verify GitHub API is accessible
- Ensure you have write permissions to the repositories

### Recovery

If you need to restore LICENSE files:
1. The script doesn't create backups automatically
2. You can restore from git history in each repository
3. Consider using `git revert` on the deletion commits
4. Or manually recreate LICENSE files as needed