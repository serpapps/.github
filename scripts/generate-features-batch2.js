#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Additional repositories for batch 2
const additionalRepositories = {
  // More Educational Platforms
  'skool-downloader': [
    "Download complete Skool courses and classroom content offline",
    "Extract video lessons, documents, and course materials",
    "Maintain course structure with organized folder hierarchy",
    "Automatic login and session management for enrolled courses",
    "Batch download multiple courses simultaneously",
    "Download community posts, discussions, and comments",
    "Extract course attachments and supplementary files",
    "Support for live stream recording and playback",
    "Progress tracking for large course downloads",
    "Automatic quality selection for optimal file sizes",
    "Resume interrupted downloads seamlessly",
    "Export course data in multiple formats (PDF, EPUB, etc.)",
    "Built-in search and filtering for specific content",
    "Backup and sync capabilities for course libraries",
    "Command-line tools for advanced automation",
    "Integration with popular note-taking applications",
    "Offline viewing with built-in media player",
    "Cross-platform desktop application support",
    "Regular updates to maintain Skool compatibility",
    "Privacy-focused with local storage only"
  ],

  'teachable-video-downloader': [
    "Download complete Teachable courses with all video content",
    "Extract course materials including worksheets and resources",
    "Maintain original course structure and lesson organization",
    "Support for drip-fed content and timed releases",
    "Automatic subtitle and transcript extraction",
    "Batch download multiple courses from instructors",
    "Resume interrupted downloads with progress tracking",
    "Command-line interface for automated course collection",
    "Cross-platform compatibility for students and educators",
    "Built-in video player with note-taking capabilities",
    "Integration with learning management systems",
    "Export completion certificates and progress reports",
    "Search functionality across course content",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain Teachable compatibility",
    "Custom folder organization by instructor or topic",
    "Backup and restore options for educational libraries",
    "Offline study mode with synchronized progress",
    "Support for quiz data and assignment materials",
    "Smart bandwidth management for large courses"
  ],

  'thinkific-downloader': [
    "Download complete Thinkific courses and learning paths",
    "Extract multimedia content including videos and documents",
    "Maintain course hierarchy and chapter organization",
    "Support for premium and membership-gated content",
    "Automatic transcription and subtitle downloading",
    "Batch processing for multiple course collections",
    "Resume interrupted transfers with smart recovery",
    "Command-line tools for educational automation",
    "Cross-platform desktop and mobile support",
    "Built-in media player with bookmarking features",
    "Integration with student information systems",
    "Export course analytics and completion data",
    "Search capabilities across educational content",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Thinkific compatibility",
    "Custom organization by subject and difficulty level",
    "Backup and sync options for course libraries",
    "Offline learning with progress synchronization",
    "Support for interactive elements and assignments",
    "Smart content organization and categorization"
  ],

  'kajabi-video-downloader': [
    "Download complete Kajabi courses and coaching content",
    "Extract video lessons, PDFs, and course materials",
    "Maintain program structure and module organization",
    "Support for community posts and member interactions",
    "Automatic subtitle extraction in multiple languages",
    "Batch download entire coaching programs",
    "Resume interrupted downloads seamlessly",
    "Command-line interface for bulk processing",
    "Cross-platform application support",
    "Built-in video player with coaching tools",
    "Integration with business coaching platforms",
    "Export student progress and engagement data",
    "Search functionality across program content",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Kajabi compatibility",
    "Custom folder organization by program type",
    "Backup and restore capabilities",
    "Offline coaching with synchronized progress",
    "Support for live session recordings",
    "Smart content delivery and organization"
  ],

  'podia-downloader': [
    "Download complete Podia courses and digital products",
    "Extract course videos, downloads, and bonus materials",
    "Maintain product structure and lesson organization",
    "Support for membership site content and updates",
    "Automatic transcript and subtitle downloading",
    "Batch process multiple products and courses",
    "Resume interrupted downloads with progress recovery",
    "Command-line tools for product collection automation",
    "Cross-platform desktop application support",
    "Built-in media player with learning features",
    "Integration with digital product management tools",
    "Export sales data and customer analytics",
    "Search capabilities across product libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Podia compatibility",
    "Custom organization by product type and category",
    "Backup and sync options for digital libraries",
    "Offline access with synchronized progress tracking",
    "Support for community features and discussions",
    "Smart content categorization and tagging"
  ],

  'learnworlds-downloader': [
    "Download complete LearnWorlds courses and academies",
    "Extract interactive videos and SCORM content",
    "Maintain academy structure and course hierarchy",
    "Support for social learning features and discussions",
    "Automatic subtitle downloading in multiple languages",
    "Batch download entire learning academies",
    "Resume interrupted transfers with smart recovery",
    "Command-line interface for educational automation",
    "Cross-platform compatibility for learners and admins",
    "Built-in video player with interactive elements",
    "Integration with enterprise learning systems",
    "Export certificates and learning analytics",
    "Search functionality across academy content",
    "Privacy protection with encrypted storage",
    "Regular updates to maintain LearnWorlds compatibility",
    "Custom organization by academy and subject",
    "Backup and restore capabilities for learning data",
    "Offline learning with progress synchronization",
    "Support for virtual classroom recordings",
    "Smart content recommendation and organization"
  ],

  'moodle-downloader': [
    "Download complete Moodle courses and resources",
    "Extract course materials including assignments and quizzes",
    "Maintain course structure and module organization",
    "Support for forum discussions and submissions",
    "Automatic grade book and progress extraction",
    "Batch download multiple courses from institutions",
    "Resume interrupted downloads with progress tracking",
    "Command-line tools for academic automation",
    "Cross-platform support for students and educators",
    "Built-in content viewer with academic tools",
    "Integration with student information systems",
    "Export transcripts and completion certificates",
    "Search functionality across course content",
    "Privacy protection designed for educational use",
    "Regular updates to maintain Moodle compatibility",
    "Custom organization by semester and subject",
    "Backup and restore options for academic records",
    "Offline study with synchronized progress",
    "Support for multimedia assignments and projects",
    "Smart academic calendar integration"
  ],

  // More Social Media Platforms  
  'snapchat-video-downloader': [
    "Download Snapchat stories and spotlight videos",
    "Support for public and friend's content",
    "Batch download user stories and highlights",
    "Automatic metadata extraction and organization",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform mobile and desktop applications",
    "Built-in media viewer with playback controls",
    "Command-line interface for automated collection",
    "Custom folder organization by user and date",
    "Duplicate detection and management system",
    "Integration with social media management tools",
    "Export story data and analytics",
    "Privacy protection with local storage only",
    "Regular updates to maintain Snapchat compatibility",
    "Search and filter capabilities for content",
    "Bandwidth management and download scheduling",
    "Backup and sync options for media libraries",
    "Support for Snapchat Map content",
    "Real-time story archiving before expiration",
    "Smart content categorization and tagging"
  ],

  'telegram-video-downloader': [
    "Download videos from Telegram channels and groups",
    "Support for private and public channel content",
    "Batch download entire channel histories",
    "Automatic file organization by channel and date",
    "Resume interrupted downloads seamlessly",
    "Cross-platform desktop and mobile support",
    "Built-in media player with telegram-style controls",
    "Command-line tools for automated monitoring",
    "Custom folder structures and naming schemes",
    "Duplicate detection across multiple channels",
    "Integration with messaging and communication tools",
    "Export channel statistics and engagement data",
    "Privacy-focused design with encrypted storage",
    "Regular updates to maintain Telegram compatibility",
    "Search functionality across downloaded content",
    "Bandwidth optimization for efficient downloads",
    "Backup and restore capabilities for media archives",
    "Support for voice messages and audio content",
    "Real-time monitoring of new channel posts",
    "Smart content filtering and categorization"
  ],

  'tumblr-video-downloader': [
    "Download Tumblr videos and GIFs in original quality",
    "Support for blog archives and tag-based content",
    "Batch download entire user blogs and reblogs",
    "Automatic metadata extraction including tags and notes",
    "Resume interrupted downloads with progress tracking",
    "Cross-platform desktop application support",
    "Built-in media viewer with tumblr-style interface",
    "Command-line interface for blog archiving automation",
    "Custom organization by blog, tag, or content type",
    "Duplicate detection and reblog management",
    "Integration with creative and artistic workflows",
    "Export blog data and social engagement metrics",
    "Privacy protection with local-only storage",
    "Regular updates to maintain Tumblr compatibility",
    "Search capabilities across downloaded media",
    "Bandwidth management for large media files",
    "Backup and sync options for creative libraries",
    "Support for audio posts and multimedia content",
    "Real-time monitoring of favorite blogs",
    "Smart content curation and discovery features"
  ],

  'vk-video-downloader': [
    "Download VK videos and social media content",
    "Support for public and private group videos",
    "Batch download user walls and community content",
    "Automatic subtitle extraction in multiple languages",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform compatibility for international users",
    "Built-in video player with VK-style controls",
    "Command-line tools for social media archiving",
    "Custom folder organization by user and community",
    "Duplicate detection across multiple sources",
    "Integration with social media management platforms",
    "Export user data and social network analytics",
    "Privacy-focused design with secure local storage",
    "Regular updates to maintain VK compatibility",
    "Search functionality across social media content",
    "Bandwidth optimization for international usage",
    "Backup and restore capabilities for social archives",
    "Support for live streams and video calls",
    "Real-time monitoring of social media activity",
    "Smart content recommendation and organization"
  ]
};

// Function to generate YAML content for a repository
function generateFeaturesYML(repoName, features) {
  let yaml = 'features:\n';
  features.forEach(feature => {
    yaml += `  - "${feature}"\n`;
  });
  return yaml;
}

// Create the research directory if it doesn't exist
const researchDir = path.join(__dirname, '..', 'research');
if (!fs.existsSync(researchDir)) {
  fs.mkdirSync(researchDir, { recursive: true });
}

// Generate features.yml files for additional repositories
let generatedCount = 0;
for (const [repoName, features] of Object.entries(additionalRepositories)) {
  const yamlContent = generateFeaturesYML(repoName, features);
  const filePath = path.join(researchDir, `${repoName}.yml`);
  
  try {
    fs.writeFileSync(filePath, yamlContent);
    console.log(`✅ Generated ${repoName}.yml`);
    generatedCount++;
  } catch (error) {
    console.error(`❌ Error generating ${repoName}.yml:`, error);
  }
}

console.log(`\n🎉 Successfully generated ${generatedCount} additional feature files!`);
console.log(`📁 Files saved in: ${researchDir}`);