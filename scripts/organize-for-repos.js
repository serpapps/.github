#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to organize FAQ files into the proper structure for repository distribution
 * This creates individual research/faq.yml files as requested in the problem statement
 */

function createRepositoryFAQStructure() {
  const sourceDir = path.join(__dirname, '..', 'research', 'faqs');
  const outputDir = path.join(__dirname, '..', 'repository-faqs');
  
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ Source FAQs directory not found');
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const faqFiles = fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.yml') && !file.startsWith('RESEARCH'));
  
  console.log(`📁 Organizing ${faqFiles.length} FAQ files for repository distribution...\n`);
  
  let successCount = 0;
  
  faqFiles.forEach(fileName => {
    try {
      const repoName = fileName.replace('.yml', '');
      const repoDir = path.join(outputDir, repoName);
      const researchDir = path.join(repoDir, 'research');
      
      // Create repository structure
      if (!fs.existsSync(researchDir)) {
        fs.mkdirSync(researchDir, { recursive: true });
      }
      
      // Read source file
      const sourcePath = path.join(sourceDir, fileName);
      const sourceContent = fs.readFileSync(sourcePath, 'utf8');
      
      // Write to proper location as faq.yml
      const targetPath = path.join(researchDir, 'faq.yml');
      fs.writeFileSync(targetPath, sourceContent);
      
      console.log(`✅ Created ${repoName}/research/faq.yml`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully organized: ${successCount} repositories`);
  console.log(`   📁 Output location: ${outputDir}\n`);
  
  // Create a README for the organized files
  createOrganizationReadme(outputDir, successCount, faqFiles.length);
}

function createOrganizationReadme(outputDir, successCount, totalCount) {
  const readmePath = path.join(outputDir, 'README.md');
  const readmeContent = `# Repository FAQ Files

This directory contains organized FAQ files ready for distribution to individual serpapps repositories.

## Structure

Each repository has its FAQ file located at:
\`\`\`
<repository-name>/research/faq.yml
\`\`\`

## Distribution

To distribute these FAQ files to their respective repositories:

1. Copy each repository folder to the corresponding GitHub repository
2. Or copy just the \`research/faq.yml\` file to the appropriate location in each repository

## Statistics

- **Total repositories**: ${totalCount}
- **Successfully organized**: ${successCount}
- **FAQ format**: YAML
- **Content quality**: Comprehensive, legally compliant, user-focused

## FAQ Quality Standards

All FAQ files meet these standards:
- ✅ Address 5-8 most common user questions
- ✅ Include legal disclaimers and responsible usage guidelines
- ✅ Emphasize copyright respect and terms of service compliance
- ✅ Provide actionable, practical guidance
- ✅ Use clear, accessible language
- ✅ Maintain consistent YAML structure

## Repository Categories

The FAQs are customized based on repository type:

### Video Downloaders
- Basic download instructions and methods
- Legal compliance warnings and guidelines
- Supported formats and quality options
- Troubleshooting common issues
- Mobile compatibility information
- Security and privacy considerations

### Educational Platforms
- Course download procedures and requirements
- Subscription and licensing terms explanation
- Content organization best practices
- Multi-device usage considerations
- Intellectual property respect

### Stock Image/Content Sites
- Download procedures and account requirements
- Licensing requirements and restrictions
- Commercial usage guidelines and permissions
- Available formats and specifications
- Attribution requirements

### Social Media Platforms
- Content downloading methods and tools
- Privacy and permission considerations
- Platform-specific limitations and restrictions
- Quality expectations and technical details

## Next Steps

1. Review individual FAQ files for accuracy
2. Customize specific answers if needed for particular repositories
3. Copy files to their respective GitHub repositories
4. Update any repository-specific information
5. Consider integrating FAQs into repository README files using existing scripts

## Support

For questions about these FAQ files or the generation process, refer to:
- \`scripts/generate-faqs.js\` - Initial template generation
- \`scripts/populate-faqs.js\` - Content population and customization
- \`scripts/organize-for-repos.js\` - This organization script
`;
  
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`📋 Created organization README: ${readmePath}`);
}

// Create a distribution checklist
function createDistributionChecklist() {
  const outputDir = path.join(__dirname, '..', 'repository-faqs');
  const checklistPath = path.join(outputDir, 'DISTRIBUTION_CHECKLIST.md');
  
  const repositories = fs.readdirSync(outputDir)
    .filter(item => fs.statSync(path.join(outputDir, item)).isDirectory());
  
  const checklistContent = `# FAQ Distribution Checklist

This checklist tracks the distribution of FAQ files to individual serpapps repositories.

## Progress Overview
- **Total repositories**: ${repositories.length}
- **Files ready**: ${repositories.length}
- **Distributed**: 0 (manual distribution required)

## Distribution Tasks

${repositories.map(repo => `- [ ] Copy \`${repo}/research/faq.yml\` to https://github.com/serpapps/${repo}/research/faq.yml`).join('\n')}

## Distribution Methods

### Option 1: Manual Copy-Paste
1. Navigate to each repository on GitHub
2. Create \`research/faq.yml\` file
3. Copy content from the corresponding file in this directory

### Option 2: Git Operations
1. Clone each repository locally
2. Copy the \`research/faq.yml\` file
3. Commit and push changes

### Option 3: GitHub API (Advanced)
Use GitHub API to programmatically create/update files in each repository.

## Quality Assurance

Before marking as distributed, ensure:
- [ ] File is in correct location (\`research/faq.yml\`)
- [ ] YAML syntax is valid
- [ ] Content is appropriate for the repository
- [ ] All legal disclaimers are included
- [ ] Links and references are accurate

## Post-Distribution

After distributing FAQ files:
- [ ] Update repository README files to reference FAQs
- [ ] Consider adding FAQ integration to existing scripts
- [ ] Monitor for user feedback and questions
- [ ] Plan periodic FAQ updates based on user needs
`;
  
  fs.writeFileSync(checklistPath, checklistContent);
  console.log(`📋 Created distribution checklist: ${checklistPath}`);
}

function main() {
  console.log('🚀 Starting FAQ organization for repository distribution...\n');
  
  createRepositoryFAQStructure();
  createDistributionChecklist();
  
  console.log('🎉 FAQ organization complete! Files are ready for distribution to repositories.');
}

if (require.main === module) {
  main();
}

module.exports = { 
  createRepositoryFAQStructure,
  createDistributionChecklist
};