/**
 * Portfolio Configuration
 * Update your information here
 */

export const config = {
  // GitHub Integration - Only for Projects
  github: {
    username: "jayashakthi28", // 👈 UPDATE THIS with your GitHub username
    fetchProjects: true,         // Fetch projects from GitHub
    fetchTechStack: false,       // Use manual tech stack (below)
    fetchProfile: false,         // Use manual profile data (below)
    usePinnedRepos: true,        // Show pinned repos from your profile
    featuredReposCount: 6,       // Fallback if no pinned repos
  },

  // Blog Configuration
  blog: {
    enabled: true,
    repoOwner: "jayashakthi28", // 👈 UPDATE THIS with your blog repo owner
    repoName: "jayashakthi28",            // 👈 UPDATE THIS with your blog repo name
    branch: "main",              // Branch where blog files are stored
    blogsPath: "",               // Path to blogs folder (empty for root)
  },

  // GitHub Personal Access Token (for pinned repos and blogs)
  // Get from environment variable for security
  githubToken: process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN,

  // Personal Information
  personal: {
    name: "Jayashakthi Vishnu P",
    titles: ["Full Stack Developer", "Teacher", "Video Editor"],
    description: "Passionate Full Stack Developer specializing in React, Node.js, and AI/ML integrations. Experienced in building scalable applications and delivering innovative solutions.",
    email: "vishnu28.js@gmail.com",
    location: "Bangalore, Karnataka, India",
    phone: "+91 9629212231",
  },

  // Social Links
  social: {
    github: "https://github.com/Jayashakthi28",
    linkedin: "https://linkedin.com/in/jayashakthi-vishnu",
    twitter: "https://x.com/JayashakthiV",
    instagram: "https://www.instagram.com/jayashakthivishnu/",
    leetcode: "https://leetcode.com/u/Jayashakthi28/",
    email: "vishnu28.js@gmail.com",
  },

  // Features
  features: {
    showGitHubStats: true,
    showBlogPosts: true,
    enableAnimations: true,
  },
}

export default config

