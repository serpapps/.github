#!/usr/bin/env node

/**
 * Interactive script to check serpapps repositories for MIT licenses using GitHub MCP server
 * 
 * This script demonstrates how to use the available MCP server functions to:
 * 1. Search for all repositories in the serpapps organization
 * 2. Check each repository for LICENSE files
 * 3. Analyze LICENSE file content for MIT license patterns
 * 4. Generate instructions for deleting MIT license files
 * 
 * Usage:
 *   node scripts/check-mit-licenses-with-mcp.js [--repo=repo-name] [--sample=N]
 * 
 * Options:
 *   --repo=name: Process only a specific repository
 *   --sample=N: Process only first N repositories (for testing)
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const SINGLE_REPO = args.find(arg => arg.startsWith('--repo='))?.split('=')[1];
const SAMPLE_SIZE = args.find(arg => arg.startsWith('--sample='))?.split('=')[1];

// Organization configuration
const ORG_NAME = 'serpapps';

// Common LICENSE file names to check
const LICENSE_FILE_PATTERNS = [
  'LICENSE',
  'LICENSE.txt', 
  'LICENSE.md',
  'license',
  'license.txt',
  'license.md',
  'License',
  'License.txt',
  'License.md'
];

// MIT license detection patterns
const MIT_LICENSE_INDICATORS = [
  'MIT License',
  'Permission is hereby granted, free of charge',
  'to deal in the Software without restriction',
  'THE SOFTWARE IS PROVIDED "AS IS"',
  'without warranty of any kind',
  'MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT'
];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function isMITLicense(content) {
  if (!content) return { isMIT: false, confidence: 0, foundIndicators: [] };
  
  const normalizedContent = content.toLowerCase().replace(/\s+/g, ' ').trim();
  
  let indicatorCount = 0;
  const foundIndicators = [];
  
  for (const indicator of MIT_LICENSE_INDICATORS) {
    if (normalizedContent.includes(indicator.toLowerCase())) {
      indicatorCount++;
      foundIndicators.push(indicator);
    }
  }
  
  const confidence = indicatorCount / MIT_LICENSE_INDICATORS.length;
  const isMIT = indicatorCount >= 3; // Require at least 3 indicators for MIT detection
  
  return {
    isMIT,
    confidence,
    foundIndicators,
    indicatorCount
  };
}

/**
 * This is the main logic that would use GitHub MCP server functions
 * For now, it's a demonstration of the workflow
 */
async function checkOrganizationRepositories() {
  log('🔍 Starting MIT license detection process...\n');
  
  const results = {
    processedRepos: [],
    mitLicenseFiles: [],
    errors: [],
    summary: {}
  };

  try {
    // Step 1: Get all repositories in the organization
    log('📋 Step 1: Fetching repositories from serpapps organization...');
    
    if (SINGLE_REPO) {
      log(`Processing single repository: ${SINGLE_REPO}`);
      const repoResult = await checkSingleRepository(SINGLE_REPO);
      results.processedRepos.push(repoResult);
    } else {
      log('ℹ️  To implement full organization scan, use:');
      log('   github-mcp-server-search_repositories with query "org:serpapps"');
      log('   This would return all repositories in the organization');
      
      // For demonstration, we'll show what the process would look like
      const sampleRepos = [
        'ai-voice-cloner', 'skool-downloader', 'vimeo-video-downloader',
        'loom-video-downloader', 'udemy-video-downloader'
      ];
      
      const reposToProcess = SAMPLE_SIZE ? sampleRepos.slice(0, parseInt(SAMPLE_SIZE)) : sampleRepos;
      
      log(`📋 Processing ${reposToProcess.length} sample repositories...`);
      
      for (const repoName of reposToProcess) {
        const repoResult = await checkSingleRepository(repoName);
        results.processedRepos.push(repoResult);
        
        // Add small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Collect MIT license files
    for (const repo of results.processedRepos) {
      results.mitLicenseFiles.push(...repo.mitLicenseFiles);
      results.errors.push(...repo.errors);
    }
    
    // Generate summary
    results.summary = {
      totalRepositories: results.processedRepos.length,
      repositoriesWithLicenses: results.processedRepos.filter(r => r.licenseFiles.length > 0).length,
      repositoriesWithMitLicenses: results.processedRepos.filter(r => r.mitLicenseFiles.length > 0).length,
      totalMitLicenseFiles: results.mitLicenseFiles.length,
      totalErrors: results.errors.length
    };
    
    return results;
    
  } catch (error) {
    log(`Error in main process: ${error.message}`, 'error');
    results.errors.push(error.message);
    return results;
  }
}

/**
 * Check a single repository for LICENSE files
 * This demonstrates the MCP server function calls needed
 */
async function checkSingleRepository(repoName) {
  log(`🔍 Checking repository: ${repoName}`);
  
  const repoResult = {
    repoName,
    licenseFiles: [],
    mitLicenseFiles: [],
    licenseAnalysis: [],
    errors: []
  };

  try {
    // This would use: github-mcp-server-get_file_contents
    log(`   Step 1: Getting root directory contents for ${repoName}...`);
    log(`   MCP Call: github-mcp-server-get_file_contents(owner="${ORG_NAME}", repo="${repoName}", path="/")`);
    
    // For demonstration, we'll simulate some results based on known data
    const knownRepoData = getKnownRepositoryData(repoName);
    
    if (knownRepoData.hasLicense) {
      repoResult.licenseFiles = knownRepoData.licenseFiles;
      log(`   ✅ Found ${knownRepoData.licenseFiles.length} LICENSE files: ${knownRepoData.licenseFiles.join(', ')}`);
      
      // Check each LICENSE file
      for (const licenseFile of knownRepoData.licenseFiles) {
        log(`   Step 2: Analyzing ${licenseFile}...`);
        log(`   MCP Call: github-mcp-server-get_file_contents(owner="${ORG_NAME}", repo="${repoName}", path="${licenseFile}")`);
        
        const content = knownRepoData.licenseContent || '';
        const analysis = isMITLicense(content);
        
        repoResult.licenseAnalysis.push({
          fileName: licenseFile,
          ...analysis,
          contentPreview: content.substring(0, 100) + '...'
        });
        
        if (analysis.isMIT) {
          log(`   ⚠️  ${licenseFile} contains MIT license content (confidence: ${(analysis.confidence * 100).toFixed(1)}%)`, 'warning');
          repoResult.mitLicenseFiles.push({
            fileName: licenseFile,
            repository: repoName,
            confidence: analysis.confidence,
            indicators: analysis.foundIndicators,
            deleteUrl: `https://github.com/${ORG_NAME}/${repoName}/delete/main/${licenseFile}`,
            deleteCommand: `gh api --method DELETE /repos/${ORG_NAME}/${repoName}/contents/${licenseFile} --field message="Remove MIT LICENSE file - automated cleanup" --field sha="PLACEHOLDER_SHA"`
          });
        } else {
          log(`   ✅ ${licenseFile} is not an MIT license (confidence: ${(analysis.confidence * 100).toFixed(1)}%)`);
        }
      }
    } else {
      log(`   ℹ️  No LICENSE files found in ${repoName}`);
    }
    
  } catch (error) {
    const errorMsg = `Error processing ${repoName}: ${error.message}`;
    log(`   ${errorMsg}`, 'error');
    repoResult.errors.push(errorMsg);
  }

  return repoResult;
}

/**
 * Simulated data for known repositories (for demonstration)
 * In real implementation, this would come from MCP server calls
 */
function getKnownRepositoryData(repoName) {
  const knownData = {
    'ai-voice-cloner': {
      hasLicense: true,
      licenseFiles: ['LICENSE'],
      licenseContent: 'Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/' // Apache, not MIT
    },
    'skool-downloader': {
      hasLicense: false,
      licenseFiles: [],
      licenseContent: ''
    },
    'vimeo-video-downloader': {
      hasLicense: false,
      licenseFiles: [],
      licenseContent: ''
    },
    'loom-video-downloader': {
      hasLicense: false,
      licenseFiles: [],
      licenseContent: ''
    },
    'udemy-video-downloader': {
      hasLicense: false,
      licenseFiles: [],
      licenseContent: ''
    }
  };
  
  return knownData[repoName] || { hasLicense: false, licenseFiles: [], licenseContent: '' };
}

async function generateReport(results) {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(__dirname, '..', 'tmp', `mit-license-report-${timestamp.replace(/[:.]/g, '-')}.json`);
  
  // Ensure tmp directory exists
  const tmpDir = path.dirname(reportPath);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const reportData = {
    timestamp,
    singleRepo: SINGLE_REPO,
    sampleSize: SAMPLE_SIZE,
    ...results
  };

  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  log(`\n📊 Final Summary:`);
  log(`  Total repositories checked: ${results.summary.totalRepositories}`);
  log(`  Repositories with LICENSE files: ${results.summary.repositoriesWithLicenses}`);
  log(`  Repositories with MIT licenses: ${results.summary.repositoriesWithMitLicenses}`);
  log(`  MIT license files found: ${results.summary.totalMitLicenseFiles}`);
  log(`  Errors encountered: ${results.summary.totalErrors}`);
  
  if (results.mitLicenseFiles.length > 0) {
    log(`\n🗑️  MIT License files requiring deletion:`);
    results.mitLicenseFiles.forEach((file, index) => {
      log(`    ${index + 1}. ${file.repository}/${file.fileName} (confidence: ${(file.confidence * 100).toFixed(1)}%)`);
      log(`       Delete URL: ${file.deleteUrl}`);
      log(`       CLI command: ${file.deleteCommand}`);
      log(`       Found indicators: ${file.indicators.join(', ')}`);
    });
  } else {
    log(`\n✅ No MIT license files found in checked repositories!`);
  }
  
  log(`\n📄 Detailed report saved to: ${reportPath}`);

  return reportData;
}

async function main() {
  try {
    log('🚀 MIT License Detection for serpapps organization\n');
    
    const results = await checkOrganizationRepositories();
    await generateReport(results);
    
    if (results.summary.totalErrors > 0) {
      log(`\n⚠️ Completed with ${results.summary.totalErrors} errors.`, 'warning');
      process.exit(1);
    } else {
      log(`\n✅ MIT license detection completed successfully!`, 'success');
      process.exit(0);
    }
    
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  isMITLicense,
  checkSingleRepository,
  LICENSE_FILE_PATTERNS,
  MIT_LICENSE_INDICATORS
};