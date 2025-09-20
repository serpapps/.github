#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Batch 6: Final repositories to complete the list
const batch6Repositories = {
  // Entertainment and Media
  '123movies-downloader': [
    "Download movies and TV shows from streaming sites",
    "Support for multiple video qualities and formats",
    "Batch download movie collections and series",
    "Automatic subtitle and audio track extraction",
    "Custom organization by genre and release year",
    "Resume interrupted downloads seamlessly",
    "Cross-platform desktop application support",
    "Built-in media player with streaming controls",
    "Command-line tools for automated movie collection",
    "Integration with media center applications",
    "Export movie data and viewing statistics",
    "Search functionality across movie libraries",
    "Privacy protection with local-only storage",
    "Regular updates to maintain site compatibility",
    "Support for various video containers and codecs",
    "Bandwidth optimization for large movie files",
    "Backup and restore options for movie collections",
    "Smart categorization by IMDB ratings and genres",
    "Offline viewing with progress synchronization",
    "Advanced filtering by actors and directors"
  ],

  '123rf-downloader': [
    "Download royalty-free stock images and vectors",
    "Batch processing for creative project collections",
    "Support for various image formats and resolutions",
    "Automatic metadata extraction and keyword tagging",
    "Custom organization by project and usage rights",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for graphic designers",
    "Built-in image viewer with zoom and preview",
    "Command-line tools for design workflow automation",
    "Integration with creative software applications",
    "Export image data and license information",
    "Search capabilities across stock image libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain 123RF compatibility",
    "Support for high-resolution downloads",
    "Bandwidth management for large image collections",
    "Backup and sync options for creative assets",
    "Smart categorization by style and theme",
    "License compliance tracking and management",
    "Professional workflow integration features"
  ],

  'alamy-downloader': [
    "Download premium stock photography from Alamy",
    "Support for editorial and commercial licenses",
    "Batch download photographer collections and searches",
    "Automatic rights management and license tracking",
    "Custom organization by photographer and subject",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for photo professionals",
    "Built-in photo viewer with metadata display",
    "Command-line tools for stock photo automation",
    "Integration with professional photography workflows",
    "Export photo data and licensing information",
    "Advanced search across photo libraries",
    "Privacy protection with secure storage",
    "Regular updates to maintain Alamy compatibility",
    "Support for various image formats and sizes",
    "Bandwidth optimization for large photo files",
    "Backup and restore for photo archives",
    "Smart categorization by subject and location",
    "Professional license management features",
    "Quality control and image verification tools"
  ],

  'canva-downloader': [
    "Download Canva designs and creative projects",
    "Support for templates and custom designs",
    "Batch download design collections and folders",
    "Automatic export in various formats (PNG, PDF, etc.)",
    "Custom organization by project and design type",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for designers",
    "Built-in design viewer with Canva-style interface",
    "Command-line tools for design workflow automation",
    "Integration with design and marketing platforms",
    "Export design data and usage analytics",
    "Search functionality across design libraries",
    "Privacy protection with local design storage",
    "Regular updates to maintain Canva compatibility",
    "Support for various design formats and resolutions",
    "Bandwidth management for large design files",
    "Backup and sync options for design projects",
    "Smart categorization by brand and campaign",
    "Team collaboration and sharing features",
    "Design version control and history tracking"
  ],

  'creative-market-downloader': [
    "Download Creative Market fonts, graphics, and templates",
    "Support for premium and free goods collections",
    "Batch download designer portfolios and bundles",
    "Automatic license tracking and usage rights",
    "Custom organization by product type and designer",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for creative professionals",
    "Built-in asset browser with preview capabilities",
    "Command-line tools for creative asset automation",
    "Integration with design software and workflows",
    "Export product data and purchase history",
    "Search capabilities across creative asset libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain Creative Market compatibility",
    "Support for various creative file formats",
    "Bandwidth optimization for large design bundles",
    "Backup and restore for creative asset collections",
    "Smart categorization by design style and use case",
    "License compliance and usage tracking",
    "Designer discovery and recommendation features"
  ],

  // Specialized Archive and Document Tools
  'terabox-downloader': [
    "Download files from TeraBox cloud storage",
    "Support for large file transfers and folders",
    "Batch download shared links and collections",
    "Automatic folder structure preservation",
    "Custom organization by file type and date",
    "Resume interrupted downloads with recovery",
    "Cross-platform desktop application support",
    "Built-in file manager with preview capabilities",
    "Command-line tools for cloud storage automation",
    "Integration with backup and sync applications",
    "Export file metadata and sharing information",
    "Search functionality across downloaded files",
    "Privacy protection with encrypted local storage",
    "Regular updates to maintain TeraBox compatibility",
    "Support for various file types and formats",
    "Bandwidth optimization for large file transfers",
    "Backup verification and integrity checking",
    "Smart categorization by file type and size",
    "Cloud storage migration tools",
    "Advanced file organization and management"
  ],

  'thumbnail-downloader': [
    "Download video thumbnails from various platforms",
    "Support for high-resolution thumbnail extraction",
    "Batch download thumbnails from playlists and channels",
    "Automatic metadata extraction and organization",
    "Custom folder structures by platform and source",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for content creators",
    "Built-in thumbnail viewer with preview mode",
    "Command-line tools for thumbnail automation",
    "Integration with video editing and design software",
    "Export thumbnail data and source information",
    "Search capabilities across thumbnail libraries",
    "Privacy protection with local-only storage",
    "Regular updates to maintain platform compatibility",
    "Support for various image formats and resolutions",
    "Bandwidth optimization for thumbnail collections",
    "Backup and sync options for design assets",
    "Smart categorization by content type and quality",
    "Creative workflow integration features",
    "Thumbnail analysis and recommendation tools"
  ],

  'scribd-downloader': [
    "Download documents and books from Scribd",
    "Support for PDFs, audiobooks, and text documents",
    "Batch download user libraries and collections",
    "Automatic document conversion and formatting",
    "Custom organization by author and category",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for researchers and students",
    "Built-in document reader with annotation support",
    "Command-line tools for academic workflow automation",
    "Integration with reference management systems",
    "Export document metadata and citations",
    "Search functionality across document libraries",
    "Privacy protection designed for academic use",
    "Regular updates to maintain Scribd compatibility",
    "Support for various document formats",
    "Bandwidth management for large document collections",
    "Backup and restore for research libraries",
    "Smart categorization by subject and publication date",
    "Academic workflow integration features",
    "Citation generation and bibliography tools"
  ],

  'internet-archive-downloader': [
    "Download content from Internet Archive collections",
    "Support for books, videos, audio, and software",
    "Batch download entire collections and series",
    "Automatic metadata preservation and organization",
    "Custom folder structures by collection type",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for archivists and researchers",
    "Built-in content viewer with archive-style interface",
    "Command-line tools for digital preservation workflows",
    "Integration with digital library systems",
    "Export collection data and historical metadata",
    "Search capabilities across archived content",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Archive.org compatibility",
    "Support for historical and rare content formats",
    "Bandwidth optimization for large archive collections",
    "Backup and preservation verification tools",
    "Smart categorization by era and content type",
    "Digital preservation workflow integration",
    "Historical research and discovery features"
  ],

  // More Stock Media and Creative Platforms
  'storyblocks-downloader': [
    "Download Storyblocks video, audio, and image assets",
    "Support for unlimited subscription content",
    "Batch download creative project collections",
    "Automatic license management and tracking",
    "Custom organization by project and asset type",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for video creators",
    "Built-in media browser with preview capabilities",
    "Command-line tools for video production automation",
    "Integration with video editing software",
    "Export asset data and usage analytics",
    "Search functionality across media libraries",
    "Privacy protection with local asset storage",
    "Regular updates to maintain Storyblocks compatibility",
    "Support for 4K video and high-quality audio",
    "Bandwidth management for large media files",
    "Backup and sync options for production assets",
    "Smart categorization by mood and style",
    "Video production workflow integration",
    "Asset discovery and recommendation system"
  ],

  'stockvault-downloader': [
    "Download free stock graphics and design resources",
    "Support for vectors, photos, and design elements",
    "Batch download category collections and searches",
    "Automatic metadata extraction and tagging",
    "Custom organization by design type and style",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for graphic designers",
    "Built-in asset viewer with design preview",
    "Command-line tools for design resource automation",
    "Integration with graphic design applications",
    "Export resource data and usage information",
    "Search capabilities across design libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain StockVault compatibility",
    "Support for various design formats and resolutions",
    "Bandwidth optimization for design collections",
    "Backup and restore for creative asset libraries",
    "Smart categorization by design category",
    "Free resource discovery and recommendation",
    "Creative workflow integration features"
  ],

  'stocksy-downloader': [
    "Download premium stock photos from Stocksy",
    "Support for authentic and diverse photography",
    "Batch download photographer collections and searches",
    "Automatic rights management and license tracking",
    "Custom organization by photographer and theme",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for creative professionals",
    "Built-in photo viewer with metadata display",
    "Command-line tools for creative workflow automation",
    "Integration with professional design applications",
    "Export photo data and licensing information",
    "Advanced search across photo libraries",
    "Privacy protection with secure local storage",
    "Regular updates to maintain Stocksy compatibility",
    "Support for high-resolution photography",
    "Bandwidth management for large photo files",
    "Backup and restore for photo archives",
    "Smart categorization by authenticity and diversity",
    "Creative project workflow integration",
    "Photographer discovery and curation features"
  ],

  'rawpixel-downloader': [
    "Download design resources from RawPixel",
    "Support for free and premium design assets",
    "Batch download collections and curated sets",
    "Automatic license tracking and usage management",
    "Custom organization by asset type and style",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for designers",
    "Built-in asset browser with design preview",
    "Command-line tools for design automation",
    "Integration with creative design workflows",
    "Export asset data and design information",
    "Search functionality across design libraries",
    "Privacy-focused design with local storage",
    "Regular updates to maintain RawPixel compatibility",
    "Support for various design formats and sizes",
    "Bandwidth optimization for design collections",
    "Backup and sync options for creative assets",
    "Smart categorization by design trend",
    "Creative workflow integration features",
    "Design inspiration and discovery tools"
  ],

  'vectorstock-downloader': [
    "Download vector graphics and illustrations",
    "Support for scalable vector formats (SVG, EPS, AI)",
    "Batch download artist portfolios and collections",
    "Automatic license management and tracking",
    "Custom organization by style and category",
    "Resume interrupted downloads with recovery",
    "Cross-platform application for vector artists",
    "Built-in vector viewer with scalable preview",
    "Command-line tools for design automation",
    "Integration with vector graphics software",
    "Export vector data and licensing information",
    "Search capabilities across vector libraries",
    "Privacy protection with local storage",
    "Regular updates to maintain VectorStock compatibility",
    "Support for various vector formats and resolutions",
    "Bandwidth optimization for vector collections",
    "Backup and restore for design asset libraries",
    "Smart categorization by illustration style",
    "Vector design workflow integration",
    "Artist discovery and portfolio browsing"
  ],

  // More Specialized Tools
  'kick-clip-downloader': [
    "Download Kick.com stream clips and highlights",
    "Support for live stream recordings and VODs",
    "Batch download streamer clip collections",
    "Automatic metadata extraction and organization",
    "Custom folder structures by streamer and date",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for gaming content",
    "Built-in video player with gaming-focused controls",
    "Command-line tools for streaming automation",
    "Integration with gaming and streaming platforms",
    "Export clip data and engagement metrics",
    "Search functionality across clip libraries",
    "Privacy protection with local storage",
    "Regular updates to maintain Kick compatibility",
    "Support for various video qualities and formats",
    "Bandwidth optimization for gaming clips",
    "Backup and sync options for content libraries",
    "Smart categorization by game and highlight type",
    "Gaming content discovery features",
    "Streamer following and notification system"
  ],

  'stream-downloader': [
    "Download live streams from various platforms",
    "Support for multiple streaming protocols and formats",
    "Batch recording from multiple sources simultaneously",
    "Automatic stream detection and quality selection",
    "Custom organization by platform and streamer",
    "Resume interrupted recordings with recovery",
    "Cross-platform application for stream archiving",
    "Built-in stream player with recording controls",
    "Command-line tools for streaming automation",
    "Integration with streaming and media platforms",
    "Export stream data and recording statistics",
    "Search capabilities across recorded streams",
    "Privacy protection with encrypted storage",
    "Regular updates to maintain platform compatibility",
    "Support for various streaming formats and qualities",
    "Bandwidth management for live recording",
    "Backup and restore for stream archives",
    "Smart categorization by content type",
    "Live stream monitoring and alerts",
    "Advanced recording scheduling and automation"
  ],

  'nicovideo-downloader': [
    "Download videos from NicoNico Douga platform",
    "Support for comments overlay and subtitles",
    "Batch download user uploads and playlists",
    "Automatic metadata extraction including tags",
    "Custom organization by uploader and category",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application for Japanese content",
    "Built-in video player with comment display",
    "Command-line tools for content automation",
    "Integration with anime and Japanese media tools",
    "Export video data and engagement statistics",
    "Search functionality across video libraries",
    "Privacy protection with local storage",
    "Regular updates to maintain NicoVideo compatibility",
    "Support for various video qualities and formats",
    "Bandwidth optimization for international access",
    "Backup and restore for video collections",
    "Smart categorization by genre and popularity",
    "Japanese content discovery features",
    "Comment archiving and analysis tools"
  ],

  // Final missing repositories
  'erothots-downloader': [
    "Download content from Erothots platform",
    "Support for various media types and formats",
    "Batch download user profiles and collections",
    "Automatic metadata extraction and organization",
    "Custom folder structures by creator and content type",
    "Resume interrupted downloads with recovery",
    "Cross-platform desktop application support",
    "Built-in media viewer with privacy controls",
    "Command-line interface for automated collection",
    "Integration with content management systems",
    "Export creator data and content analytics",
    "Search functionality across content libraries",
    "Privacy-focused design with encrypted storage",
    "Regular updates to maintain platform compatibility",
    "Support for high-quality media downloads",
    "Bandwidth management for large media files",
    "Backup and restore capabilities",
    "Smart content categorization and filtering",
    "Secure local storage with no cloud dependency",
    "Advanced privacy and security features"
  ],

  'erome-downloader': [
    "Download multimedia content from Erome platform",
    "Support for photos, videos, and galleries",
    "Batch download user profiles and albums",
    "Automatic content organization and metadata",
    "Custom folder structures by user and upload date",
    "Resume interrupted downloads seamlessly",
    "Cross-platform application with privacy focus",
    "Built-in media viewer with gallery features",
    "Command-line tools for automated content collection",
    "Integration with media organization tools",
    "Export user data and content statistics",
    "Search capabilities across media libraries",
    "Privacy protection with secure local storage",
    "Regular updates to maintain platform compatibility",
    "Support for various media formats and qualities",
    "Bandwidth optimization for media collections",
    "Backup and sync options for content archives",
    "Smart categorization by content type",
    "Advanced privacy controls and encryption",
    "Secure content verification and integrity"
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

// Generate features.yml files for batch 6 repositories
let generatedCount = 0;
for (const [repoName, features] of Object.entries(batch6Repositories)) {
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

console.log(`\n🎉 Successfully generated ${generatedCount} batch 6 feature files!`);
console.log(`📁 Files saved in: ${researchDir}`);

// Count total files
try {
  const files = fs.readdirSync(researchDir).filter(f => f.endsWith('.yml'));
  console.log(`\n📊 Total feature files: ${files.length}`);
} catch (error) {
  console.error('Error counting files:', error);
}