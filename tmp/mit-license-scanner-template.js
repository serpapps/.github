/**
 * MIT License Scanner Template
 * 
 * This template shows how to implement MIT license scanning using
 * the GitHub MCP server functions in an environment where they are available.
 */

// Step 1: Get all repositories
async function getAllRepositories() {
  const result = await github_mcp_server_search_repositories({
    query: "org:serpapps",
    perPage: 50
  });
  
  return result.items;
}

// Step 2: Check a single repository for LICENSE files
async function checkRepository(repoName) {
  const repoResult = {
    repoName,
    licenseFiles: [],
    mitLicenseFiles: [],
    errors: []
  };
  
  try {
    // Get repository contents
    const contents = await github_mcp_server_get_file_contents({
      owner: "serpapps",
      repo: repoName,
      path: "/"
    });
    
    // Find LICENSE files
    const licenseFiles = contents.filter(file => 
      /^LICENSE/i.test(file.name) && file.type === 'file'
    );
    
    repoResult.licenseFiles = licenseFiles.map(f => f.name);
    
    // Check each LICENSE file
    for (const licenseFile of licenseFiles) {
      const licenseContent = await github_mcp_server_get_file_contents({
        owner: "serpapps",
        repo: repoName,
        path: licenseFile.name
      });
      
      const analysis = isMITLicense(licenseContent);
      
      if (analysis.isMIT) {
        repoResult.mitLicenseFiles.push({
          fileName: licenseFile.name,
          sha: licenseFile.sha,
          confidence: analysis.confidence,
          indicators: analysis.foundIndicators
        });
        
        console.log(`⚠️  Found MIT license: ${repoName}/${licenseFile.name}`);
      }
    }
    
  } catch (error) {
    repoResult.errors.push(error.message);
  }
  
  return repoResult;
}

// Step 3: MIT License detection function
function isMITLicense(content) {
  if (!content) return { isMIT: false, confidence: 0, foundIndicators: [] };
  
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  const indicators = [
    "MIT License",
    "Permission is hereby granted, free of charge",
    "to deal in the Software without restriction",
    "THE SOFTWARE IS PROVIDED \"AS IS\"",
    "without warranty of any kind",
    "MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT"
];
  
  let count = 0;
  const found = [];
  
  for (const indicator of indicators) {
    if (normalized.includes(indicator.toLowerCase())) {
      count++;
      found.push(indicator);
    }
  }
  
  return {
    isMIT: count >= 3,
    confidence: count / indicators.length,
    foundIndicators: found,
    indicatorCount: count
  };
}

// Step 4: Generate deletion instructions
function generateDeletionInstructions(mitLicenseFiles) {
  return mitLicenseFiles.map(file => ({
    repository: file.repository,
    fileName: file.fileName,
    sha: file.sha,
    manualDeleteUrl: `https://github.com/serpapps/${file.repository}/delete/main/${file.fileName}`,
    cliCommand: `gh api --method DELETE /repos/serpapps/${file.repository}/contents/${file.fileName} --field message="Remove MIT LICENSE file - automated cleanup" --field sha="${file.sha}"`
  }));
}

// Main execution function
async function main() {
  try {
    console.log('🚀 Starting MIT license scan...');
    
    const repositories = await getAllRepositories();
    console.log(`Found ${repositories.length} repositories`);
    
    const results = [];
    
    for (const repo of repositories) {
      console.log(`Checking ${repo.name}...`);
      const result = await checkRepository(repo.name);
      results.push(result);
      
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Collect all MIT license files
    const allMitFiles = [];
    for (const result of results) {
      for (const mitFile of result.mitLicenseFiles) {
        allMitFiles.push({
          ...mitFile,
          repository: result.repoName
        });
      }
    }
    
    if (allMitFiles.length > 0) {
      console.log(`\n🗑️  Found ${allMitFiles.length} MIT license files to delete:`);
      
      const deletionInstructions = generateDeletionInstructions(allMitFiles);
      
      deletionInstructions.forEach((instruction, index) => {
        console.log(`\n${index + 1}. ${instruction.repository}/${instruction.fileName}`);
        console.log(`   Manual delete: ${instruction.manualDeleteUrl}`);
        console.log(`   CLI command: ${instruction.cliCommand}`);
      });
      
      console.log(`\n⚠️  Manual action required to delete these files!`);
    } else {
      console.log('\n✅ No MIT license files found!');
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

// Run the script
main();
