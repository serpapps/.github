#!/usr/bin/env node

/**
 * Script to delete LICENSE files from all serpapps repositories
 * 
 * This script searches for and deletes common LICENSE file patterns from
 * all repositories in the serpapps organization.
 * 
 * Usage:
 *   node scripts/delete-license-files.js [--dry-run] [--repo=repo-name]
 * 
 * Options:
 *   --dry-run: Preview changes without actually making them
 *   --repo=name: Process only a specific repository
 * 
 * Requirements:
 *   - GitHub CLI (gh) installed and authenticated
 *   - Appropriate permissions to push to serpapps repositories
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SINGLE_REPO = args.find(arg => arg.startsWith('--repo='))?.split('=')[1];

// Common LICENSE file patterns to look for
const LICENSE_PATTERNS = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'LICENSE.rst',
  'LICENCE',
  'LICENCE.md',
  'LICENCE.txt',
  'license',
  'license.md',
  'license.txt',
  'License',
  'License.md',
  'License.txt'
];

/**
 * List of all serpapps repositories
 */
const REPOSITORIES = [
  'vimeo-video-downloader',
  'skool-downloader',
  'youporn-video-downloader',
  'onlyfans-downloader',
  'udemy-video-downloader',
  'loom-video-downloader',
  'ai-downloader',
  'pornhub-video-downloader',
  'coursera-downloader',
  'xvideos-video-downloader',
  'spankbang-video-downloader',
  'xnxx-video-downloader',
  'redtube-video-downloader',
  'redgifs-downloader',
  'beeg-video-downloader',
  'xhamster-video-downloader',
  'tnaflix-video-downloader',
  'podia-downloader',
  'learndash-downloader',
  'circle-downloader',
  'whop-video-downloader',
  'thinkific-downloader',
  'linkedin-learning-downloader',
  'kajabi-video-downloader',
  'pexels-video-downloader',
  '123movies-downloader',
  '123rf-downloader',
  'adobe-stock-downloader',
  'alamy-downloader',
  'amazon-video-downloader',
  'bilibili-downloader',
  'bongacams-downloader',
  'camsoda-downloader',
  'clientclub-downloader',
  'canva-downloader',
  'creative-market-downloader',
  'm3u8-downloader',
  'netflix-downloader',
  'moodle-downloader',
  'nicovideo-downloader',
  'pdf-downloader',
  'patreon-downloader',
  'pinterest-downloader',
  'pixabay-downloader',
  'shutterstock-downloader',
  'snapchat-video-downloader',
  'skillshare-downloader',
  'soundcloud-downloader',
  'youtube-downloader',
  'vectorstock-downloader',
  'unsplash-downloader',
  'tubi-downloader',
  'thumbnail-downloader',
  'terabox-downloader',
  'storyblocks-downloader',
  'stockvault-downloader',
  'stocksy-downloader',
  'sprout-video-downloader',
  'soundgasm-downloader',
  'scribd-downloader',
  'rawpixel-downloader',
  'myfreecams-downloader',
  'livejasmin-downloader',
  'learnworlds-downloader',
  'istock-downloader',
  'instagram-downloader',
  'hulu-downloader',
  'gokollab-downloader',
  'gohighlevel-downloader',
  'giphy-downloader',
  'freepik-downloader',
  'flickr-downloader',
  'erothots-downloader',
  'erome-downloader',
  'dreamstime-downloader',
  'deviantart-downloader',
  'dailymotion-downloader',
  'chaturbate-downloader',
  'eporner-downloader',
  'tiktok-video-downloader',
  'vk-video-downloader',
  'twitter-video-downloader',
  'twitch-video-downloader',
  'tumblr-video-downloader',
  'telegram-video-downloader',
  'teachable-video-downloader',
  'stripchat-video-downloader',
  'stream-downloader',
  'kick-clip-downloader',
  'khan-academy-downloader',
  'internet-archive-downloader',
  'getty-images-downloader',
  'facebook-video-downloader',
  'depositphotos-downloader',
  'wistia-video-downloader'
];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function executeCommand(command, options = {}) {
  const { cwd = process.cwd(), silent = false } = options;
  
  if (DRY_RUN) {
    log(`[DRY RUN] Would execute: ${command}`, 'info');
    return '';
  }
  
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      cwd,
      stdio: silent ? 'pipe' : 'inherit'
    });
    return result;
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
}

function checkPrerequisites() {
  log('🔍 Checking prerequisites...');
  
  try {
    executeCommand('gh --version', { silent: true });
    log('✅ GitHub CLI is installed');
  } catch (error) {
    throw new Error('GitHub CLI (gh) is not installed. Please install it first.');
  }
  
  try {
    executeCommand('gh auth status', { silent: true });
    log('✅ GitHub CLI is authenticated');
  } catch (error) {
    throw new Error('GitHub CLI is not authenticated. Please run "gh auth login" first.');
  }
}

async function deleteLicenseFiles() {
  log('🚀 Starting LICENSE file deletion process...');
  
  let repositories = REPOSITORIES;
  
  // Filter to single repo if specified
  if (SINGLE_REPO) {
    repositories = repositories.filter(repo => repo === SINGLE_REPO);
    if (repositories.length === 0) {
      throw new Error(`Repository '${SINGLE_REPO}' not found in the repository list`);
    }
  }
  
  log(`📁 Processing ${repositories.length} repositories`);
  
  if (DRY_RUN) {
    log('🔍 Running in dry-run mode - no actual changes will be made');
  }
  
  let processedCount = 0;
  let deletedCount = 0;
  let errorCount = 0;
  let totalLicenseFilesDeleted = 0;
  const errors = [];
  
  for (const repoName of repositories) {
    try {
      log(`\n🔄 Processing serpapps/${repoName}...`);
      
      const repoFullName = `serpapps/${repoName}`;
      
      // Check if repository exists and is accessible
      try {
        executeCommand(`gh repo view ${repoFullName} --json name`, { silent: true });
        log(`✅ Repository ${repoFullName} is accessible`);
      } catch (error) {
        log(`⚠️ Repository ${repoFullName} not found or not accessible, skipping...`, 'warning');
        processedCount++;
        continue;
      }
      
      // Check for LICENSE files in the repository
      let licenseFilesFound = [];
      
      for (const pattern of LICENSE_PATTERNS) {
        try {
          const result = executeCommand(`gh api repos/${repoFullName}/contents/${pattern}`, { silent: true });
          if (result && result.trim()) {
            licenseFilesFound.push(pattern);
            log(`📄 Found LICENSE file: ${pattern}`);
          }
        } catch (error) {
          // File doesn't exist, which is expected for most patterns
        }
      }
      
      if (licenseFilesFound.length === 0) {
        log(`✅ No LICENSE files found in ${repoFullName}`);
        processedCount++;
        continue;
      }
      
      if (!DRY_RUN) {
        // Delete each LICENSE file found
        for (const licenseFile of licenseFilesFound) {
          try {
            // Get the file to get its SHA (required for deletion)
            const fileInfo = JSON.parse(executeCommand(`gh api repos/${repoFullName}/contents/${licenseFile}`, { silent: true }));
            
            // Delete the file using a temporary file for the payload
            const tempPayloadFile = `/tmp/delete_payload_${Date.now()}.json`;
            const deletePayload = {
              message: `Delete ${licenseFile} file`,
              sha: fileInfo.sha
            };
            
            fs.writeFileSync(tempPayloadFile, JSON.stringify(deletePayload));
            
            executeCommand(`gh api --method DELETE repos/${repoFullName}/contents/${licenseFile} --input ${tempPayloadFile}`, {
              silent: true
            });
            
            // Clean up temp file
            fs.unlinkSync(tempPayloadFile);
            
            log(`🗑️ Deleted ${licenseFile} from ${repoFullName}`, 'success');
            totalLicenseFilesDeleted++;
          } catch (error) {
            log(`❌ Failed to delete ${licenseFile} from ${repoFullName}: ${error.message}`, 'error');
            errors.push(`${repoFullName}/${licenseFile}: ${error.message}`);
          }
        }
        
        if (licenseFilesFound.length > 0) {
          deletedCount++;
        }
      } else {
        log(`🔍 [DRY RUN] Would delete ${licenseFilesFound.length} LICENSE file(s): ${licenseFilesFound.join(', ')}`);
        totalLicenseFilesDeleted += licenseFilesFound.length;
        deletedCount++;
      }
      
      processedCount++;
      
    } catch (error) {
      log(`❌ Error processing ${repoName}: ${error.message}`, 'error');
      errors.push(`${repoName}: ${error.message}`);
      errorCount++;
      processedCount++;
    }
  }
  
  // Summary
  log(`\n📊 Summary:`);
  log(`   Repositories processed: ${processedCount}`);
  log(`   Repositories with LICENSE files ${DRY_RUN ? 'that would be' : ''} deleted: ${deletedCount}`);
  log(`   Total LICENSE files ${DRY_RUN ? 'that would be' : ''} deleted: ${totalLicenseFilesDeleted}`);
  log(`   Errors: ${errorCount}`);
  
  if (errors.length > 0) {
    log(`\n❌ Errors encountered:`);
    errors.forEach(error => log(`   ${error}`));
  }
  
  return { processedCount, deletedCount, errorCount, totalFiles: totalLicenseFilesDeleted };
}

async function main() {
  try {
    checkPrerequisites();
    const results = await deleteLicenseFiles();
    
    if (results.errorCount === 0) {
      log(`\n🎉 LICENSE file deletion completed successfully!`);
    } else {
      log(`\n⚠️ LICENSE file deletion completed with ${results.errorCount} errors.`);
    }
    
    if (DRY_RUN) {
      log(`\n💡 This was a dry run. To actually delete the files, run without --dry-run flag.`);
    }
    
  } catch (error) {
    log(`❌ Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { deleteLicenseFiles };