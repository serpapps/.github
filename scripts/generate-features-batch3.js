#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Batch 3: Stock Media, Streaming, and Specialized Tools
const batch3Repositories = {
  // More Stock Media Platforms
  'pixabay-downloader': [
    "Download high-quality royalty-free images and videos",
    "Batch processing for search results and collections",
    "Support for various media formats (JPEG, PNG, MP4, etc.)",
    "Automatic metadata extraction including tags and descriptions",
    "Custom folder organization by category and usage rights",
    "Resume interrupted downloads with progress tracking",
    "Cross-platform desktop application support",
    "Built-in media viewer with zoom and preview capabilities",
    "Command-line interface for automated asset collection",
    "Integration with design software and creative workflows",
    "Search functionality across downloaded media libraries",
    "Duplicate detection to avoid redundant downloads",
    "Privacy protection with local-only storage",
    "Regular updates to maintain Pixabay compatibility",
    "Export capabilities for asset catalogs and portfolios",
    "Bandwidth management for efficient downloading",
    "Support for different image sizes and resolutions",
    "Smart content categorization and tagging system",
    "Backup and sync options for creative libraries",
    "Free usage tracking and license compliance"
  ],

  'unsplash-downloader': [
    "Download high-resolution professional photography",
    "Batch download photographer portfolios and collections",
    "Support for RAW and edited photo formats",
    "Automatic photographer attribution and credit tracking",
    "Custom organization by photographer, style, or theme",
    "Resume interrupted downloads seamlessly",
    "Cross-platform compatibility for designers and creators",
    "Built-in photo viewer with EXIF data display",
    "Command-line tools for automated photo collection",
    "Integration with professional design applications",
    "Advanced search and filtering capabilities",
    "Duplicate detection across photo libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Unsplash compatibility",
    "Export options for photo management systems",
    "Smart bandwidth optimization for large files",
    "Support for various image qualities and formats",
    "Intelligent content curation and recommendation",
    "Backup and restore capabilities for photo archives",
    "Creative Commons license management and tracking"
  ],

  'pexels-video-downloader': [
    "Download high-quality stock videos and footage",
    "Batch processing for video collections and searches",
    "Support for various video formats and resolutions",
    "Automatic metadata extraction and organization",
    "Custom folder structures by category and usage",
    "Resume interrupted video downloads with recovery",
    "Cross-platform desktop application for creators",
    "Built-in video player with preview capabilities",
    "Command-line interface for automated workflows",
    "Integration with video editing and production tools",
    "Search functionality across video libraries",
    "Duplicate detection for efficient storage management",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Pexels compatibility",
    "Export capabilities for media asset management",
    "Bandwidth management for large video files",
    "Support for HD, 4K, and various aspect ratios",
    "Smart content categorization and tagging",
    "Backup and sync options for video archives",
    "Free usage compliance and attribution tracking"
  ],

  'freepik-downloader': [
    "Download premium vectors, photos, and design assets",
    "Batch processing for design collections and searches",
    "Support for vector formats (SVG, EPS, AI) and raster images",
    "Automatic license tracking and usage rights management",
    "Custom organization by design style and category",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform support for designers and agencies",
    "Built-in asset viewer with layer and vector support",
    "Command-line tools for design workflow automation",
    "Integration with professional design software",
    "Advanced search and filtering by style and format",
    "Duplicate detection across design asset libraries",
    "Privacy-focused design with local-only storage",
    "Regular updates to maintain Freepik compatibility",
    "Export options for design management systems",
    "Bandwidth optimization for complex vector files",
    "Support for various file formats and resolutions",
    "Smart asset recommendation and discovery",
    "Backup and restore capabilities for design archives",
    "Premium subscription integration and tracking"
  ],

  'adobe-stock-downloader': [
    "Download premium Adobe Stock photos, vectors, and videos",
    "Batch processing for creative project collections",
    "Support for high-resolution and vector formats",
    "Advanced license management and usage tracking",
    "Custom organization by project and creative brief",
    "Resume interrupted downloads with progress recovery",
    "Cross-platform integration with Creative Cloud",
    "Built-in asset browser with advanced preview",
    "Command-line tools for enterprise creative workflows",
    "Seamless integration with Adobe Creative Suite",
    "Professional search and filtering capabilities",
    "Duplicate detection across creative libraries",
    "Enterprise-grade privacy and security features",
    "Regular updates to maintain Adobe Stock compatibility",
    "Export capabilities for digital asset management",
    "Smart bandwidth management for large creative files",
    "Support for Editorial and Standard license types",
    "AI-powered content recommendation and curation",
    "Backup and sync for creative team collaboration",
    "Advanced metadata and keyword management"
  ],

  // More Streaming Platforms
  'amazon-video-downloader': [
    "Download Amazon Prime Video movies and series",
    "Support for multiple audio tracks and subtitles",
    "Batch download entire seasons and collections",
    "Maintain show metadata and episode information",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform desktop application support",
    "Built-in video player with Prime Video controls",
    "Custom folder organization by genre and series",
    "Duplicate detection and library management",
    "Command-line interface for automated recording",
    "Integration with home media center systems",
    "Export watchlist and viewing history data",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain Prime Video compatibility",
    "Support for various video qualities and formats",
    "Bandwidth management and download scheduling",
    "Search capabilities across downloaded content",
    "Backup and restore options for media collections",
    "Offline viewing with synchronized progress",
    "Smart content recommendation based on preferences"
  ],

  'bilibili-downloader': [
    "Download Bilibili videos and anime content",
    "Support for danmaku comments and subtitles",
    "Batch download series and channel content",
    "Automatic quality selection and format conversion",
    "Resume interrupted downloads seamlessly",
    "Cross-platform compatibility for international users",
    "Built-in video player with danmaku display",
    "Command-line tools for automated content collection",
    "Custom organization by uploader and series",
    "Duplicate detection across video libraries",
    "Integration with anime tracking and management tools",
    "Export video data and engagement statistics",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Bilibili compatibility",
    "Search functionality across downloaded anime",
    "Bandwidth optimization for international access",
    "Support for live streams and premiere content",
    "Smart content discovery and recommendation",
    "Backup and sync options for anime collections",
    "Multi-language subtitle support and extraction"
  ],

  'dailymotion-downloader': [
    "Download Dailymotion videos in high quality",
    "Batch processing for channel and playlist content",
    "Support for various video formats and resolutions",
    "Automatic metadata extraction and organization",
    "Resume interrupted downloads with progress recovery",
    "Cross-platform desktop application support",
    "Built-in video player with Dailymotion-style controls",
    "Command-line interface for automated workflows",
    "Custom folder organization by channel and category",
    "Duplicate detection and content management",
    "Integration with video management and editing tools",
    "Export channel data and video analytics",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Dailymotion compatibility",
    "Search capabilities across video libraries",
    "Bandwidth management for efficient downloading",
    "Support for live streams and premieres",
    "Smart content curation and recommendation",
    "Backup and restore options for video archives",
    "Multi-language support and subtitle extraction"
  ],

  'tubi-downloader': [
    "Download free movies and TV shows from Tubi",
    "Support for commercial-free offline viewing",
    "Batch download movie collections and series",
    "Automatic commercial detection and removal",
    "Multiple subtitle and audio track support",
    "Resume interrupted downloads seamlessly",
    "Cross-platform compatibility for cord-cutters",
    "Built-in media player with advanced controls",
    "Custom organization by genre and release year",
    "Duplicate detection and library management",
    "Command-line tools for automated recording",
    "Integration with home theater and media systems",
    "Export movie schedules and availability data",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Tubi compatibility",
    "Support for various video formats and qualities",
    "Bandwidth optimization for streaming quality",
    "Search functionality across downloaded content",
    "Backup and sync options for movie libraries",
    "Smart recommendations for free content discovery"
  ],

  // Specialized Adult Content Platforms
  'onlyfans-downloader': [
    "Download subscriber content and media files",
    "Support for photos, videos, and story content",
    "Batch download creator profiles and posts",
    "Automatic content organization by creator and date",
    "Resume interrupted downloads with recovery",
    "Cross-platform desktop application support",
    "Built-in media viewer with privacy controls",
    "Command-line interface for automated collection",
    "Custom folder structures and naming schemes",
    "Duplicate detection and content management",
    "Integration with content management systems",
    "Export creator data and engagement metrics",
    "Privacy-focused design with encrypted storage",
    "Regular updates to maintain platform compatibility",
    "Search functionality across content libraries",
    "Bandwidth management for large media files",
    "Support for live stream recordings",
    "Smart content categorization and filtering",
    "Backup and restore capabilities",
    "Secure local storage with no cloud dependency"
  ],

  'redgifs-downloader': [
    "Download high-quality GIFs and short videos",
    "Batch processing for tag-based content collections",
    "Support for various media formats and qualities",
    "Automatic metadata extraction and tagging",
    "Resume interrupted downloads with progress tracking",
    "Cross-platform desktop application support",
    "Built-in media viewer with playback controls",
    "Command-line tools for automated content collection",
    "Custom organization by tags and categories",
    "Duplicate detection across media libraries",
    "Integration with media players and browsers",
    "Export content data and usage statistics",
    "Privacy protection with local-only storage",
    "Regular updates to maintain RedGIFs compatibility",
    "Search capabilities across downloaded media",
    "Bandwidth optimization for efficient downloads",
    "Support for both GIF and video formats",
    "Smart content filtering and recommendation",
    "Backup and sync options for media collections",
    "User-friendly interface with customizable settings"
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

// Generate features.yml files for batch 3 repositories
let generatedCount = 0;
for (const [repoName, features] of Object.entries(batch3Repositories)) {
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

console.log(`\n🎉 Successfully generated ${generatedCount} batch 3 feature files!`);
console.log(`📁 Files saved in: ${researchDir}`);