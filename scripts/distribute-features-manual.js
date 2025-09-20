#!/usr/bin/env node

/**
 * Manual script to distribute feature files to their respective repositories
 * Usage: node distribute-features-manual.js
 * 
 * This script requires a GitHub token with repo permissions.
 * Set the GITHUB_TOKEN environment variable before running.
 */

const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function distributeFeaturesFiles() {
  const researchDir = './research';
  const files = fs.readdirSync(researchDir).filter(f => f.endsWith('.yml') && f !== 'README.md');
  
  console.log(`🚀 Starting distribution of ${files.length} feature files...`);
  console.log('');
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  for (const file of files) {
    const repoName = file.replace('.yml', '');
    const filePath = path.join(researchDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      console.log(`📁 Processing serpapps/${repoName}...`);
      
      // Check if repository exists
      let repoExists = false;
      try {
        await octokit.repos.get({
          owner: 'serpapps',
          repo: repoName
        });
        repoExists = true;
      } catch (error) {
        if (error.status === 404) {
          console.log(`   ⚠️  Repository not found, skipping...`);
          skipCount++;
          continue;
        }
        throw error;
      }

      if (!repoExists) continue;

      // Check if research directory exists, create if not
      let researchDirExists = true;
      try {
        await octokit.repos.getContent({
          owner: 'serpapps',
          repo: repoName,
          path: 'research'
        });
      } catch (error) {
        if (error.status === 404) {
          researchDirExists = false;
        } else {
          throw error;
        }
      }

      // Create research directory if it doesn't exist
      if (!researchDirExists) {
        await octokit.repos.createOrUpdateFileContents({
          owner: 'serpapps',
          repo: repoName,
          path: 'research/.gitkeep',
          message: 'Create research directory for features',
          content: Buffer.from('').toString('base64')
        });
        console.log(`   📂 Created research directory`);
      }

      // Check if features.yml already exists
      let existingFileSha = null;
      try {
        const existingFile = await octokit.repos.getContent({
          owner: 'serpapps',
          repo: repoName,
          path: 'research/features.yml'
        });
        existingFileSha = existingFile.data.sha;
        console.log(`   📝 Updating existing features.yml`);
      } catch (error) {
        if (error.status === 404) {
          console.log(`   🆕 Creating new features.yml`);
        } else {
          throw error;
        }
      }

      // Create or update the features.yml file
      const commitMessage = existingFileSha 
        ? `Update research/features.yml with latest features`
        : `Add research/features.yml with comprehensive feature list`;

      await octokit.repos.createOrUpdateFileContents({
        owner: 'serpapps',
        repo: repoName,
        path: 'research/features.yml',
        message: commitMessage,
        content: Buffer.from(content).toString('base64'),
        ...(existingFileSha && { sha: existingFileSha })
      });

      console.log(`   ✅ Successfully distributed features.yml`);
      successCount++;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      failCount++;
    }
    
    console.log('');
  }
  
  console.log('🎉 Distribution Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   ⚠️  Skipped: ${skipCount}`);
  console.log(`   📊 Total: ${files.length}`);
}

if (!process.env.GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  console.error('   Set it with: export GITHUB_TOKEN=your_token_here');
  process.exit(1);
}

distributeFeaturesFiles().catch(console.error);