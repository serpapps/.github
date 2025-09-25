# MIT License Scanner Implementation Guide

## Overview
This guide explains how to implement MIT license scanning for the serpapps organization.

## Step-by-Step Implementation

### 1. Search for All Repositories
```javascript
const repositories = await github_mcp_server_search_repositories({
  query: "org:serpapps",
  perPage: 100
});
console.log(`Found ${repositories.items.length} repositories`);
```

### 2. Check Each Repository for LICENSE Files
```javascript
for (const repo of repositories.items) {
  const contents = await github_mcp_server_get_file_contents({
    owner: "serpapps",
    repo: repo.name,
    path: "/"
  });
  
  const licenseFiles = contents.filter(file => 
    /^LICENSE/i.test(file.name) && file.type === 'file'
  );
  
  // Process each LICENSE file...
}
```

### 3. Download and Analyze LICENSE Content
```javascript
for (const licenseFile of licenseFiles) {
  const content = await github_mcp_server_get_file_contents({
    owner: "serpapps",
    repo: repo.name,
    path: licenseFile.name
  });
  
  const analysis = isMITLicense(content);
  
  if (analysis.isMIT) {
    console.log(`⚠️  MIT license found: ${repo.name}/${licenseFile.name}`);
    // Add to deletion list
  }
}
```

### 4. MIT License Detection Function
```javascript
function isMITLicense(content) {
  if (!content) return { isMIT: false, confidence: 0 };
  
  const indicators = [
    'MIT License',
    'Permission is hereby granted, free of charge',
    'to deal in the Software without restriction',
    'THE SOFTWARE IS PROVIDED "AS IS"',
    'without warranty of any kind',
    'MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT'
  ];
  
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  let count = 0;
  const found = [];
  
  for (const indicator of indicators) {
    if (normalized.includes(indicator.toLowerCase())) {
      count++;
      found.push(indicator);
    }
  }
  
  return {
    isMIT: count >= 3, // Require at least 3 indicators
    confidence: count / indicators.length,
    foundIndicators: found
  };
}
```

### 5. Generate Deletion Instructions
```javascript
function generateDeletionInstructions(mitFiles) {
  return mitFiles.map(file => ({
    repository: file.repository,
    fileName: file.fileName,
    sha: file.sha,
    manualUrl: `https://github.com/serpapps/${file.repository}/delete/main/${file.fileName}`,
    cliCommand: `gh api --method DELETE /repos/serpapps/${file.repository}/contents/${file.fileName} --field message="Remove MIT LICENSE" --field sha="${file.sha}"`
  }));
}
```

## Deletion Options

### Option 1: Manual Deletion
1. Visit the GitHub web interface URLs provided
2. Delete each file manually through the web UI

### Option 2: GitHub CLI
1. Ensure GitHub CLI is installed and authenticated
2. Run the provided CLI commands for each file

### Option 3: Automated API Deletion
1. Use the GitHub API directly with proper authentication
2. Loop through deletion instructions and execute API calls

## Safety Considerations

1. **Always test with a small subset first**
2. **Review each MIT license before deletion** - some may be intentional
3. **Consider backup/archiving** before deletion
4. **Check for dependent files** that might reference the license
5. **Verify organization policies** regarding license requirements

## Example Output

When MIT licenses are found, you'll get output like:
```
⚠️  Found MIT license files:
   1. example-repo/LICENSE (confidence: 85.0%)
      Manual delete: https://github.com/serpapps/example-repo/delete/main/LICENSE
      CLI command: gh api --method DELETE /repos/serpapps/example-repo/contents/LICENSE --field message="Remove MIT LICENSE" --field sha="abc123"
```

## Running the Scanner

To implement and run this scanner:

1. Set up an environment with access to GitHub MCP server functions
2. Copy the implementation code above into a script
3. Run the script with appropriate error handling and logging
4. Review the results before taking any deletion actions
5. Execute deletions using your preferred method

## Important Notes

- This scanner identifies MIT licenses with high confidence (3+ indicators required)
- False positives are possible, so manual review is recommended
- Some repositories may legitimately need MIT licenses
- Always follow your organization's policies and procedures
