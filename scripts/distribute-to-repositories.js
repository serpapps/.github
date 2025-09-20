#!/usr/bin/env node

/**
 * Script to distribute FAQ files to individual serpapps repositories
 * 
 * This script can be run with GitHub CLI authentication to automatically
 * distribute the FAQ files from repository-faqs/ to their respective repositories.
 * 
 * Usage:
 *   node scripts/distribute-to-repositories.js [--dry-run] [--repo=repo-name]
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

async function distributeFAQs() {
  log('🚀 Starting FAQ distribution process...');
  
  const baseDir = path.join(__dirname, '..', 'repository-faqs');
  
  if (!fs.existsSync(baseDir)) {
    throw new Error('repository-faqs directory not found');
  }
  
  let repositories = fs.readdirSync(baseDir)
    .filter(item => {
      const itemPath = path.join(baseDir, item);
      return fs.statSync(itemPath).isDirectory() && 
             fs.existsSync(path.join(itemPath, 'research', 'faq.yml'));
    });
  
  // Filter to single repo if specified
  if (SINGLE_REPO) {
    repositories = repositories.filter(repo => repo === SINGLE_REPO);
    if (repositories.length === 0) {
      throw new Error(`Repository '${SINGLE_REPO}' not found in repository-faqs/`);
    }
  }
  
  log(`📁 Found ${repositories.length} repositories to process`);
  
  if (DRY_RUN) {
    log('🔍 Running in dry-run mode - no actual changes will be made');
  }
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  for (const repoName of repositories) {
    try {
      log(`\n🔄 Processing ${repoName}...`);
      
      const repoFullName = `serpapps/${repoName}`;
      const faqFilePath = path.join(baseDir, repoName, 'research', 'faq.yml');
      const faqContent = fs.readFileSync(faqFilePath, 'utf8');
      
      // Check if repository exists and is accessible
      try {
        executeCommand(`gh repo view ${repoFullName} --json name`, { silent: true });
        log(`✅ Repository ${repoFullName} is accessible`);
      } catch (error) {
        throw new Error(`Repository ${repoFullName} not found or not accessible`);
      }
      
      if (!DRY_RUN) {
        // Create temporary directory
        const tempDir = `/tmp/faq-distribution-${repoName}-${Date.now()}`;
        
        try {
          // Clone repository
          log(`📥 Cloning ${repoFullName}...`);
          executeCommand(`gh repo clone ${repoFullName} ${tempDir}`, { silent: true });
          
          // Configure git identity for commits
          executeCommand(`git config user.email "actions@github.com"`, { cwd: tempDir });
          executeCommand(`git config user.name "GitHub Actions"`, { cwd: tempDir });
          
          // Create research directory and FAQ file
          const researchDir = path.join(tempDir, 'research');
          fs.mkdirSync(researchDir, { recursive: true });
          fs.writeFileSync(path.join(researchDir, 'faq.yml'), faqContent);
          
          log(`📝 Created research/faq.yml in ${repoName}`);
          
          // Check if there are changes to commit
          const gitStatus = executeCommand(`git status --porcelain`, { 
            cwd: tempDir, 
            silent: true 
          });
          
          if (gitStatus.trim()) {
            // Commit and push changes
            executeCommand(`git add research/faq.yml`, { cwd: tempDir });
            executeCommand(`git commit -m "Add comprehensive FAQ file with common user questions and answers"`, { 
              cwd: tempDir 
            });
            executeCommand(`git push`, { cwd: tempDir });
            
            log(`✅ Successfully distributed FAQ to ${repoFullName}`, 'success');
          } else {
            log(`ℹ️ No changes needed for ${repoFullName} (FAQ already exists and is up to date)`);
          }
          
          // Cleanup
          executeCommand(`rm -rf ${tempDir}`);
          
        } catch (error) {
          // Ensure cleanup even on error
          executeCommand(`rm -rf ${tempDir}`, { silent: true });
          throw error;
        }
      } else {
        log(`[DRY RUN] Would create research/faq.yml in ${repoFullName}`);
      }
      
      successCount++;
      
    } catch (error) {
      log(`Error processing ${repoName}: ${error.message}`, 'error');
      errors.push({ repo: repoName, error: error.message });
      errorCount++;
    }
  }
  
  // Summary
  log(`\n📊 Distribution Summary:`);
  log(`   ✅ Successful: ${successCount}`);
  log(`   ❌ Errors: ${errorCount}`);
  log(`   📁 Total processed: ${repositories.length}`);
  
  if (errors.length > 0) {
    log(`\n❌ Errors encountered:`);
    errors.forEach(({ repo, error }) => {
      log(`   ${repo}: ${error}`);
    });
  }
  
  if (DRY_RUN) {
    log(`\n🔍 This was a dry run. To execute actual distribution:`);
    log(`   node scripts/distribute-to-repositories.js`);
    if (SINGLE_REPO) {
      log(`   node scripts/distribute-to-repositories.js --repo=${SINGLE_REPO}`);
    }
  }
  
  return { successCount, errorCount, total: repositories.length };
}

async function main() {
  try {
    checkPrerequisites();
    const results = await distributeFAQs();
    
    if (results.errorCount > 0) {
      process.exit(1);
    } else {
      log(`\n🎉 FAQ distribution completed successfully!`, 'success');
    }
    
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { distributeFAQs };