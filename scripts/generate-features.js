#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define all repositories and their specific features
const repositories = {
  // Video Platforms
  'vimeo-video-downloader': [
    "Download high-definition Vimeo videos in multiple quality options",
    "Batch download entire playlists and channels with one click",
    "Extract video metadata including title, description, and tags",
    "Support for password-protected and private Vimeo content",
    "Automatic subtitle and closed caption extraction",
    "Resume interrupted downloads with smart recovery",
    "Convert videos to popular formats (MP4, AVI, MOV, etc.)",
    "Download video thumbnails and preview images",
    "Command-line interface for automated workflows",
    "Cross-platform compatibility (Windows, Mac, Linux)",
    "Bypass geo-restrictions and regional blocks",
    "Extract audio-only tracks in high quality",
    "Organize downloads with custom folder structures",
    "Built-in video player for preview before download",
    "Scheduler for downloading videos at specific times",
    "Progress tracking with detailed download statistics",
    "Proxy support for enhanced privacy and access",
    "Duplicate detection to avoid redundant downloads",
    "Integration with cloud storage services",
    "Regular updates to maintain compatibility with Vimeo changes"
  ],

  'youtube-downloader': [
    "Download high-quality YouTube videos in up to 8K resolution",
    "Extract audio tracks in various formats (MP3, FLAC, WAV, etc.)",
    "Batch download entire playlists and channels efficiently",
    "Automatic subtitle and closed caption extraction",
    "Support for age-restricted and region-locked content",
    "Live stream recording and real-time downloading",
    "Video format conversion and quality optimization",
    "Thumbnail and channel art extraction",
    "Command-line tools for advanced automation",
    "Resume interrupted downloads with smart recovery",
    "Duplicate video detection and management",
    "Custom naming schemes and folder organization",
    "Integration with media players and libraries",
    "Proxy support for enhanced privacy and access",
    "Bandwidth throttling and download scheduling",
    "Cross-platform desktop and mobile support",
    "Built-in video player with advanced controls",
    "Metadata extraction including view counts and descriptions",
    "Regular updates to maintain YouTube compatibility",
    "Privacy-focused design with no data collection"
  ],

  'tiktok-video-downloader': [
    "Download TikTok videos without watermarks in HD quality",
    "Batch download user profiles and trending videos",
    "Extract audio tracks for music and sound effects",
    "Support for private and restricted TikTok content",
    "Automatic hashtag and description extraction",
    "Download user profile information and statistics",
    "Cross-platform mobile and desktop applications",
    "Resume interrupted downloads seamlessly",
    "Custom folder organization by user or category",
    "Built-in video player with playback controls",
    "Command-line interface for automation",
    "Duplicate detection and management system",
    "Integration with social media management tools",
    "Export metadata in various formats (JSON, CSV)",
    "Privacy protection with local storage only",
    "Regular updates to maintain TikTok compatibility",
    "Bandwidth management for efficient downloading",
    "Search and filter downloaded content",
    "Backup and sync capabilities",
    "Support for multiple video qualities and formats"
  ],

  'twitch-video-downloader': [
    "Download Twitch VODs and highlights in high quality",
    "Live stream recording with automatic archiving",
    "Batch download streamer's entire video library",
    "Extract chat logs and viewer interactions",
    "Support for subscriber-only and restricted content",
    "Automatic thumbnail and preview generation",
    "Resume interrupted downloads with progress tracking",
    "Command-line tools for automated workflows",
    "Cross-platform compatibility across all devices",
    "Custom naming schemes and folder organization",
    "Built-in video player with timestamp navigation",
    "Integration with streaming software and tools",
    "Duplicate detection to avoid redundant downloads",
    "Export stream metadata and statistics",
    "Privacy-focused design with secure storage",
    "Regular updates to maintain Twitch compatibility",
    "Bandwidth throttling and download scheduling",
    "Search functionality across downloaded streams",
    "Backup and restore capabilities",
    "Support for various video formats and qualities"
  ],

  'twitter-video-downloader': [
    "Download Twitter videos and GIFs in original quality",
    "Batch download from user timelines and threads",
    "Extract video metadata including tweet text and stats",
    "Support for private and protected Twitter accounts",
    "Automatic thumbnail and preview image extraction",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform desktop and mobile applications",
    "Command-line interface for automated collection",
    "Custom folder organization by user or date",
    "Built-in media viewer with slideshow mode",
    "Integration with social media analytics tools",
    "Duplicate detection and management system",
    "Export tweet data in multiple formats",
    "Privacy protection with local storage only",
    "Regular updates to maintain Twitter compatibility",
    "Search and filter capabilities for content",
    "Bandwidth management and scheduling options",
    "Backup and sync features for media libraries",
    "Support for Twitter Spaces audio content",
    "Real-time downloading of trending videos"
  ],

  'facebook-video-downloader': [
    "Download Facebook videos in high definition quality",
    "Support for public and private video content",
    "Batch download from pages, groups, and profiles",
    "Extract video metadata including descriptions and comments",
    "Automatic thumbnail and preview image extraction",
    "Resume interrupted downloads seamlessly",
    "Cross-platform desktop application support",
    "Command-line tools for automated workflows",
    "Custom folder organization and naming schemes",
    "Built-in video player with advanced controls",
    "Integration with social media management platforms",
    "Duplicate detection to avoid redundant downloads",
    "Export video data and statistics",
    "Privacy-focused design with secure local storage",
    "Regular updates to maintain Facebook compatibility",
    "Search functionality across downloaded videos",
    "Bandwidth throttling and download scheduling",
    "Backup and restore capabilities",
    "Support for Facebook Watch and IGTV content",
    "Live stream recording and archiving features"
  ],

  // Educational Platforms
  'udemy-video-downloader': [
    "Download complete Udemy courses with all video lectures",
    "Extract course materials including PDFs, quizzes, and assignments",
    "Maintain original course structure and section organization",
    "Support for encrypted and DRM-protected content",
    "Automatic subtitle downloading in multiple languages",
    "Batch processing for multiple course downloads",
    "Resume interrupted downloads with progress recovery",
    "Quality selection from 360p to 1080p and beyond",
    "Command-line interface for automated course archiving",
    "Integration with learning management systems",
    "Export course transcripts and notes",
    "Offline certificate generation and storage",
    "Cross-platform compatibility across all devices",
    "Smart bandwidth management for efficient downloading",
    "Course update detection and incremental downloads",
    "Built-in video player with speed control and bookmarks",
    "Search functionality across downloaded course content",
    "Backup and restore capabilities for course libraries",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Udemy platform compatibility"
  ],

  'coursera-downloader': [
    "Download complete Coursera specializations and courses",
    "Extract lecture videos, readings, and assignments",
    "Maintain course structure with module organization",
    "Support for peer-reviewed assignments and projects",
    "Automatic subtitle extraction in multiple languages",
    "Batch download multiple courses simultaneously",
    "Resume interrupted downloads with progress tracking",
    "Integration with academic calendars and schedules",
    "Command-line tools for educational automation",
    "Export course certificates and completion records",
    "Cross-platform desktop application support",
    "Built-in video player with note-taking features",
    "Search functionality across course materials",
    "Backup and sync capabilities for academic libraries",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain Coursera compatibility",
    "Support for discussion forums and peer interactions",
    "Offline study mode with progress synchronization",
    "Integration with popular note-taking applications",
    "Smart organization by university and subject matter"
  ],

  'skillshare-downloader': [
    "Download complete Skillshare classes with all video lessons",
    "Extract class projects and community feedback",
    "Maintain class structure with organized lesson folders",
    "Support for premium and exclusive content",
    "Automatic transcript and subtitle extraction",
    "Batch download classes by category or instructor",
    "Resume interrupted downloads seamlessly",
    "Command-line interface for automated learning workflows",
    "Cross-platform compatibility for all devices",
    "Built-in video player with speed control and bookmarks",
    "Integration with creative software and design tools",
    "Export class materials and project templates",
    "Search functionality across downloaded classes",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Skillshare compatibility",
    "Custom folder organization by skill or category",
    "Backup and restore capabilities for class libraries",
    "Progress tracking and completion statistics",
    "Support for live workshops and Q&A sessions",
    "Offline viewing with synchronized progress tracking"
  ],

  'linkedin-learning-downloader': [
    "Download complete LinkedIn Learning courses and paths",
    "Extract course materials including exercise files",
    "Maintain learning path structure and progression",
    "Support for skill assessments and certifications",
    "Automatic subtitle downloading in multiple languages",
    "Batch processing for professional development tracks",
    "Resume interrupted downloads with smart recovery",
    "Integration with LinkedIn profiles and portfolios",
    "Command-line tools for corporate training workflows",
    "Export certificates and skill badges",
    "Cross-platform desktop application support",
    "Built-in video player with bookmark and note features",
    "Search functionality across course libraries",
    "Privacy protection with encrypted storage",
    "Regular updates to maintain platform compatibility",
    "Custom organization by industry and skill level",
    "Backup and sync capabilities for training records",
    "Progress tracking with detailed analytics",
    "Integration with HR systems and LMS platforms",
    "Offline learning with progress synchronization"
  ],

  'khan-academy-downloader': [
    "Download complete Khan Academy courses and exercises",
    "Extract educational videos and interactive content",
    "Maintain subject hierarchy and lesson structure",
    "Support for practice problems and assessments",
    "Automatic subtitle extraction in multiple languages",
    "Batch download by grade level or subject area",
    "Resume interrupted downloads seamlessly",
    "Command-line interface for educational automation",
    "Cross-platform compatibility for students and teachers",
    "Built-in video player with educational controls",
    "Integration with classroom management systems",
    "Export progress reports and achievement data",
    "Search functionality across educational content",
    "Privacy protection designed for student use",
    "Regular updates to maintain Khan Academy compatibility",
    "Custom organization by curriculum standards",
    "Backup and restore capabilities for learning libraries",
    "Offline study mode with progress tracking",
    "Support for multiple user profiles and accounts",
    "Integration with popular learning management systems"
  ],

  // Adult Content Platforms
  'pornhub-video-downloader': [
    "Download videos in multiple quality options up to 1080p HD",
    "Batch download support for multiple videos simultaneously",
    "Automatic thumbnail and preview image extraction",
    "Resume interrupted downloads with progress recovery",
    "Cross-platform compatibility (Windows, Mac, Linux)",
    "Command-line interface for automated workflows",
    "Video format conversion and optimization tools",
    "Built-in proxy support for privacy and access",
    "Custom folder organization and naming schemes",
    "Duplicate detection to avoid redundant downloads",
    "Bandwidth management and download scheduling",
    "Metadata extraction including duration and file size",
    "Integration with popular media players",
    "Progress tracking with detailed download statistics",
    "Regular updates to maintain platform compatibility",
    "Privacy-focused design with local storage only",
    "Support for various video containers and codecs",
    "Intelligent retry mechanisms for failed downloads",
    "User-friendly graphical interface with dark mode",
    "Secure download verification and integrity checking"
  ],

  'youporn-video-downloader': [
    "Download high-quality videos in multiple resolutions",
    "Batch processing for efficient bulk downloads",
    "Automatic metadata extraction and organization",
    "Resume interrupted transfers with smart recovery",
    "Cross-platform desktop application support",
    "Command-line tools for advanced automation",
    "Built-in proxy configuration for enhanced privacy",
    "Custom naming schemes and folder structures",
    "Duplicate detection and management system",
    "Bandwidth throttling and download scheduling",
    "Progress monitoring with detailed statistics",
    "Integration with popular media management tools",
    "Regular updates to maintain platform compatibility",
    "Privacy-focused design with local storage only",
    "Support for various video formats and codecs",
    "Intelligent error handling and retry mechanisms",
    "User-friendly interface with customizable themes",
    "Secure download verification and file integrity",
    "Multi-threaded downloading for faster speeds",
    "Comprehensive logging and debugging features"
  ],

  // Stock Media Platforms
  'shutterstock-downloader': [
    "Download high-resolution stock images without watermarks",
    "Batch download search results and collections",
    "Support for various image formats (JPEG, PNG, TIFF, EPS)",
    "Metadata extraction including keywords and descriptions",
    "Integration with design software and workflows",
    "Custom folder organization by category or project",
    "Automatic image resizing and format conversion",
    "License information tracking and management",
    "Search functionality across downloaded assets",
    "Duplicate detection to avoid redundant downloads",
    "Resume interrupted downloads seamlessly",
    "Command-line tools for automated asset management",
    "Cross-platform desktop application support",
    "Built-in image viewer with zoom and preview",
    "Cloud storage integration for team collaboration",
    "Progress tracking for large batch operations",
    "Regular updates to maintain Shutterstock compatibility",
    "Privacy protection with secure local storage",
    "Export capabilities for asset catalogs and libraries",
    "Smart bandwidth management for efficient downloading"
  ],

  'getty-images-downloader': [
    "Download premium stock photos in full resolution",
    "Batch processing for editorial and commercial collections",
    "Support for RAW and professional image formats",
    "Advanced metadata extraction and rights management",
    "Integration with professional design workflows",
    "Custom folder organization by usage rights",
    "Automatic watermark removal for licensed content",
    "License tracking and compliance verification",
    "Search and filter capabilities for large libraries",
    "Duplicate detection and asset management",
    "Resume interrupted downloads with progress recovery",
    "Command-line interface for enterprise workflows",
    "Cross-platform professional application support",
    "Built-in image viewer with color profile support",
    "Cloud storage integration for team collaboration",
    "Progress monitoring for bulk operations",
    "Regular updates to maintain Getty Images compatibility",
    "Enterprise-grade privacy and security features",
    "Export capabilities for digital asset management",
    "Smart bandwidth optimization for large files"
  ],

  // Streaming Platforms
  'netflix-downloader': [
    "Download Netflix movies and series in high definition",
    "Support for multiple subtitle and audio tracks",
    "Batch download entire seasons and series",
    "Maintain episode structure and metadata",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform desktop application support",
    "Built-in video player with streaming controls",
    "Custom folder organization by genre or series",
    "Duplicate detection and library management",
    "Command-line interface for automated workflows",
    "Integration with media center applications",
    "Export viewing history and watchlist data",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain Netflix compatibility",
    "Support for various video qualities and formats",
    "Bandwidth management and download scheduling",
    "Search functionality across downloaded content",
    "Backup and restore capabilities for media libraries",
    "Offline viewing with synchronized progress",
    "Smart recommendations based on download history"
  ],

  'hulu-downloader': [
    "Download Hulu shows and movies in high quality",
    "Support for live TV recordings and DVR content",
    "Batch download series seasons and episodes",
    "Automatic commercial detection and removal",
    "Multiple subtitle and audio track support",
    "Resume interrupted downloads seamlessly",
    "Cross-platform compatibility for all devices",
    "Built-in media player with advanced controls",
    "Custom organization by network and genre",
    "Duplicate detection and content management",
    "Command-line tools for automated recording",
    "Integration with home theater systems",
    "Export show schedules and episode guides",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Hulu compatibility",
    "Support for various video formats and qualities",
    "Bandwidth optimization for efficient downloads",
    "Search capabilities across content libraries",
    "Backup and sync options for media collections",
    "Offline viewing with progress synchronization"
  ],

  // More Adult Content Platforms
  'xvideos-video-downloader': [
    "Download videos in HD quality with multiple resolution options",
    "Batch download capabilities for efficient processing",
    "Automatic thumbnail and preview extraction",
    "Resume interrupted downloads with smart recovery",
    "Cross-platform desktop application support",
    "Command-line interface for automation workflows",
    "Built-in privacy protection and secure downloading",
    "Custom folder organization and naming systems",
    "Duplicate detection and management features",
    "Bandwidth management and download scheduling",
    "Progress tracking with detailed statistics",
    "Integration with popular media players",
    "Regular updates to maintain platform compatibility",
    "Local storage with no cloud dependency",
    "Support for various video formats and codecs",
    "Intelligent error handling and retry mechanisms",
    "User-friendly interface with customizable settings",
    "Secure download verification and file integrity",
    "Multi-threaded downloading for optimal speeds",
    "Comprehensive logging and debugging capabilities"
  ],

  'xnxx-video-downloader': [
    "Download high-quality videos in multiple resolutions",
    "Efficient batch processing for bulk downloads",
    "Automatic metadata extraction and organization",
    "Resume interrupted transfers seamlessly",
    "Cross-platform compatibility across operating systems",
    "Command-line tools for advanced automation",
    "Built-in proxy support for enhanced privacy",
    "Custom naming schemes and folder structures",
    "Duplicate detection to prevent redundant downloads",
    "Bandwidth throttling and scheduling options",
    "Progress monitoring with real-time statistics",
    "Integration with media management applications",
    "Regular updates to maintain compatibility",
    "Privacy-focused design with local-only storage",
    "Support for various video containers and formats",
    "Robust error handling and recovery mechanisms",
    "Intuitive user interface with dark mode support",
    "Secure download verification and integrity checks",
    "Optimized multi-threading for faster downloads",
    "Detailed logging and troubleshooting features"
  ],

  // Specialized Tools
  'm3u8-downloader': [
    "Download HLS streams from M3U8 playlists efficiently",
    "Support for encrypted and DRM-protected streams",
    "Batch processing for multiple streams simultaneously",
    "Automatic quality selection and adaptive streaming",
    "Resume interrupted downloads with segment recovery",
    "Cross-platform command-line and GUI applications",
    "Built-in stream analysis and diagnostic tools",
    "Custom output formats and container options",
    "Concurrent segment downloading for faster speeds",
    "Progress tracking with bandwidth monitoring",
    "Integration with streaming software and tools",
    "Support for live stream recording and archiving",
    "Regular updates to handle protocol changes",
    "Privacy protection with secure local storage",
    "Advanced proxy configuration and routing",
    "Metadata extraction from stream headers",
    "Automatic retry mechanisms for failed segments",
    "User-friendly interface with stream preview",
    "Export capabilities for media servers",
    "Comprehensive logging and error reporting"
  ],

  'pdf-downloader': [
    "Download PDF documents from various sources",
    "Batch processing for document collections",
    "Automatic metadata extraction and indexing",
    "Resume interrupted downloads seamlessly",
    "Cross-platform desktop application support",
    "Command-line interface for automated workflows",
    "Built-in PDF viewer with annotation support",
    "Custom folder organization by category or source",
    "Duplicate detection and document management",
    "Search functionality across document libraries",
    "Integration with document management systems",
    "Export capabilities for different formats",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain source compatibility",
    "Support for password-protected documents",
    "Bandwidth management and download scheduling",
    "Progress tracking for large document collections",
    "Backup and sync options for document libraries",
    "Optical Character Recognition (OCR) integration",
    "Smart organization by document type and content"
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

// Generate features.yml files for all repositories
let generatedCount = 0;
for (const [repoName, features] of Object.entries(repositories)) {
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

console.log(`\n🎉 Successfully generated ${generatedCount} feature files!`);
console.log(`📁 Files saved in: ${researchDir}`);