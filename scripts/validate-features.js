#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Original list from problem statement
const originalRepositories = [
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

// Get generated files
const researchDir = path.join(__dirname, '..', 'research');
const generatedFiles = fs.readdirSync(researchDir)
  .filter(f => f.endsWith('.yml'))
  .map(f => f.replace('.yml', ''));

// Extract repo names from original list
const originalRepoNames = originalRepositories.map(repo => repo.replace('serpapps/', ''));

console.log('🔍 Comparing original list with generated files...\n');

console.log(`📊 Original repositories: ${originalRepoNames.length}`);
console.log(`📊 Generated files: ${generatedFiles.length}\n`);

// Find missing repositories
const missing = originalRepoNames.filter(repo => !generatedFiles.includes(repo));
console.log(`❌ Missing repositories (${missing.length}):`);
missing.forEach(repo => console.log(`   - ${repo}`));

// Find extra repositories (not in original list)
const extra = generatedFiles.filter(file => !originalRepoNames.includes(file));
console.log(`\n✨ Additional repositories generated (${extra.length}):`);
extra.forEach(repo => console.log(`   + ${repo}`));

console.log(`\n✅ Successfully generated: ${generatedFiles.length - missing.length}/${originalRepoNames.length} from original list`);

// Validate a few YAML files
console.log('\n🔧 Validating YAML structure...');
const samplesToValidate = generatedFiles.slice(0, 5);
let validCount = 0;

samplesToValidate.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(researchDir, `${file}.yml`), 'utf8');
    const lines = content.split('\n');
    
    // Basic validation
    if (lines[0] === 'features:' && lines[1].startsWith('  - "') && lines[1].endsWith('"')) {
      validCount++;
      console.log(`   ✅ ${file}.yml - Valid structure`);
    } else {
      console.log(`   ⚠️  ${file}.yml - Structure issue`);
    }
  } catch (error) {
    console.log(`   ❌ ${file}.yml - Error: ${error.message}`);
  }
});

console.log(`\n📈 YAML validation: ${validCount}/${samplesToValidate.length} files have valid structure`);