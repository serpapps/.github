#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * List of all serpapps repositories that need FAQs
 */
const REPOSITORIES = [
  'serpapps/vimeo-video-downloader',
  'serpapps/skool-downloader',
  'serpapps/youporn-video-downloader',
  'serpapps/onlyfans-downloader',
  'serpapps/udemy-video-downloader',
  'serpapps/loom-video-downloader',
  'serpapps/ai-downloader',
  'serpapps/pornhub-video-downloader',
  'serpapps/coursera-downloader',
  'serpapps/xvideos-video-downloader',
  'serpapps/spankbang-video-downloader',
  'serpapps/xnxx-video-downloader',
  'serpapps/redtube-video-downloader',
  'serpapps/redgifs-downloader',
  'serpapps/beeg-video-downloader',
  'serpapps/xhamster-video-downloader',
  'serpapps/tnaflix-video-downloader',
  'serpapps/podia-downloader',
  'serpapps/learndash-downloader',
  'serpapps/circle-downloader',
  'serpapps/whop-video-downloader',
  'serpapps/thinkific-downloader',
  'serpapps/linkedin-learning-downloader',
  'serpapps/kajabi-video-downloader',
  'serpapps/pexels-video-downloader',
  'serpapps/123movies-downloader',
  'serpapps/123rf-downloader',
  'serpapps/adobe-stock-downloader',
  'serpapps/alamy-downloader',
  'serpapps/amazon-video-downloader',
  'serpapps/bilibili-downloader',
  'serpapps/bongacams-downloader',
  'serpapps/camsoda-downloader',
  'serpapps/clientclub-downloader',
  'serpapps/canva-downloader',
  'serpapps/creative-market-downloader',
  'serpapps/m3u8-downloader',
  'serpapps/netflix-downloader',
  'serpapps/moodle-downloader',
  'serpapps/nicovideo-downloader',
  'serpapps/pdf-downloader',
  'serpapps/patreon-downloader',
  'serpapps/pinterest-downloader',
  'serpapps/pixabay-downloader',
  'serpapps/shutterstock-downloader',
  'serpapps/snapchat-video-downloader',
  'serpapps/skillshare-downloader',
  'serpapps/soundcloud-downloader',
  'serpapps/youtube-downloader',
  'serpapps/vectorstock-downloader',
  'serpapps/unsplash-downloader',
  'serpapps/tubi-downloader',
  'serpapps/thumbnail-downloader',
  'serpapps/terabox-downloader',
  'serpapps/storyblocks-downloader',
  'serpapps/stockvault-downloader',
  'serpapps/stocksy-downloader',
  'serpapps/sprout-video-downloader',
  'serpapps/soundgasm-downloader',
  'serpapps/scribd-downloader',
  'serpapps/rawpixel-downloader',
  'serpapps/myfreecams-downloader',
  'serpapps/livejasmin-downloader',
  'serpapps/learnworlds-downloader',
  'serpapps/istock-downloader',
  'serpapps/instagram-downloader',
  'serpapps/hulu-downloader',
  'serpapps/gokollab-downloader',
  'serpapps/gohighlevel-downloader',
  'serpapps/giphy-downloader',
  'serpapps/freepik-downloader',
  'serpapps/flickr-downloader',
  'serpapps/erothots-downloader',
  'serpapps/erome-downloader',
  'serpapps/dreamstime-downloader',
  'serpapps/deviantart-downloader',
  'serpapps/dailymotion-downloader',
  'serpapps/chaturbate-downloader',
  'serpapps/eporner-downloader',
  'serpapps/tiktok-video-downloader',
  'serpapps/vk-video-downloader',
  'serpapps/twitter-video-downloader',
  'serpapps/twitch-video-downloader',
  'serpapps/tumblr-video-downloader',
  'serpapps/telegram-video-downloader',
  'serpapps/teachable-video-downloader',
  'serpapps/stripchat-video-downloader',
  'serpapps/stream-downloader',
  'serpapps/kick-clip-downloader',
  'serpapps/khan-academy-downloader',
  'serpapps/internet-archive-downloader',
  'serpapps/getty-images-downloader',
  'serpapps/facebook-video-downloader',
  'serpapps/depositphotos-downloader',
  'serpapps/wistia-video-downloader'
];

/**
 * Generate search terms for each repository to use with Google
 */
function generateSearchTerms(repoName) {
  // Extract the main service name from the repository name
  const serviceName = repoName
    .replace('serpapps/', '')
    .replace('-downloader', '')
    .replace('-video', '')
    .replace(/-/g, ' ');
  
  return [
    `how to download ${serviceName} videos`,
    `${serviceName} downloader`,
    `download from ${serviceName}`,
    `${serviceName} video download`,
    `save ${serviceName} content`
  ];
}

/**
 * Create directory structure for storing FAQ research
 */
function createDirectoryStructure() {
  const researchDir = path.join(__dirname, '..', 'research');
  const faqsDir = path.join(researchDir, 'faqs');
  
  if (!fs.existsSync(researchDir)) {
    fs.mkdirSync(researchDir, { recursive: true });
  }
  
  if (!fs.existsSync(faqsDir)) {
    fs.mkdirSync(faqsDir, { recursive: true });
  }
  
  return { researchDir, faqsDir };
}

/**
 * Generate a template FAQ structure for a repository
 */
function generateFAQTemplate(repoName) {
  const serviceName = repoName
    .replace('serpapps/', '')
    .replace('-downloader', '')
    .replace('-video', '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  const searchTerms = generateSearchTerms(repoName);
  
  return {
    repository: repoName,
    service_name: serviceName,
    search_terms: searchTerms,
    research_status: 'pending',
    faqs: [
      {
        question: `How do I download ${serviceName} videos?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'high'
      },
      {
        question: `Is it legal to download from ${serviceName}?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'high'
      },
      {
        question: `What formats are supported for ${serviceName} downloads?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'medium'
      },
      {
        question: `Can I download ${serviceName} videos on mobile?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'medium'
      },
      {
        question: `How to fix ${serviceName} download errors?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'medium'
      },
      {
        question: `What quality options are available for ${serviceName} downloads?`,
        answer: 'TO_BE_RESEARCHED',
        source: 'google_people_also_ask',
        confidence: 'low'
      }
    ],
    last_updated: new Date().toISOString(),
    notes: [
      'This is a template file. Research needs to be conducted using Google People Also Ask data.',
      'Priority should be given to questions with high confidence ratings.',
      'Answers should be comprehensive but concise.',
      'Always include legal disclaimers where appropriate.'
    ]
  };
}

/**
 * Main function to generate FAQ templates
 */
function main() {
  console.log('🔍 Generating FAQ research templates for serpapps repositories...\n');
  
  const { faqsDir } = createDirectoryStructure();
  let successCount = 0;
  let errorCount = 0;
  
  REPOSITORIES.forEach(repo => {
    try {
      const repoFileName = repo.replace('serpapps/', '') + '.yml';
      const filePath = path.join(faqsDir, repoFileName);
      
      // Skip if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${repo} (file already exists)`);
        return;
      }
      
      const faqTemplate = generateFAQTemplate(repo);
      const yamlContent = `# FAQ Research Template for ${repo}
# Generated on: ${new Date().toISOString()}
# Status: ${faqTemplate.research_status}

repository: "${faqTemplate.repository}"
service_name: "${faqTemplate.service_name}"
search_terms:
${faqTemplate.search_terms.map(term => `  - "${term}"`).join('\n')}

research_status: "${faqTemplate.research_status}"

faqs:
${faqTemplate.faqs.map(faq => `  - question: "${faq.question}"
    answer: "${faq.answer}"
    source: "${faq.source}"
    confidence: "${faq.confidence}"`).join('\n\n')}

last_updated: "${faqTemplate.last_updated}"

notes:
${faqTemplate.notes.map(note => `  - "${note}"`).join('\n')}
`;
      
      fs.writeFileSync(filePath, yamlContent);
      console.log(`✅ Generated FAQ template for ${repo}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error generating FAQ template for ${repo}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully generated: ${successCount} templates`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📁 Location: ${faqsDir}\n`);
  
  // Generate a research checklist
  const checklistPath = path.join(faqsDir, 'RESEARCH_CHECKLIST.md');
  const checklistContent = `# FAQ Research Checklist

This checklist tracks the progress of FAQ research for all serpapps repositories.

## Progress Overview
- **Total repositories**: ${REPOSITORIES.length}
- **Templates generated**: ${successCount}
- **Remaining**: ${REPOSITORIES.length - successCount}

## Research Process

For each repository, follow these steps:
1. Use the search terms in the YAML file to research on Google
2. Look for "People also ask" questions related to the service
3. Research 6-10 most common/relevant questions
4. Write comprehensive but concise answers
5. Update the YAML file with researched content
6. Change research_status from "pending" to "completed"

## Repository Checklist

${REPOSITORIES.map(repo => `- [ ] ${repo}`).join('\n')}

## Notes for Researchers

- Focus on the most common user questions
- Include legal disclaimers where appropriate
- Keep answers factual and helpful
- Prioritize questions with "high" confidence ratings
- Use authoritative sources for answers
- Test search terms and adjust if needed

## Quality Assurance

Before marking as complete, ensure:
- [ ] All questions are relevant to the service
- [ ] Answers are accurate and up-to-date
- [ ] Legal disclaimers are included where needed
- [ ] Grammar and spelling are correct
- [ ] YAML syntax is valid
`;
  
  fs.writeFileSync(checklistPath, checklistContent);
  console.log(`📋 Generated research checklist: ${checklistPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { 
  generateSearchTerms, 
  generateFAQTemplate, 
  REPOSITORIES 
};