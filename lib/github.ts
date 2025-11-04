/**
 * GitHub API Integration
 * Fetches user data, repositories, and languages from GitHub
 */

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  email: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  fork: boolean
  archived: boolean
}

export interface GitHubLanguages {
  [key: string]: number
}

/**
 * Fetch GitHub user profile
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch GitHub user: ${response.statusText}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return null
  }
}

/**
 * Fetch user's repositories
 */
export async function fetchGitHubRepos(
  username: string,
  options: {
    sort?: "created" | "updated" | "pushed" | "full_name"
    direction?: "asc" | "desc"
    per_page?: number
    page?: number
  } = {}
): Promise<GitHubRepo[]> {
  try {
    const { sort = "updated", direction = "desc", per_page = 100, page = 1 } = options

    const url = new URL(`https://api.github.com/users/${username}/repos`)
    url.searchParams.set("sort", sort)
    url.searchParams.set("direction", direction)
    url.searchParams.set("per_page", per_page.toString())
    url.searchParams.set("page", page.toString())

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch GitHub repos: ${response.statusText}`)
      return []
    }

    const repos: GitHubRepo[] = await response.json()
    
    // Filter out forks and archived repos by default
    return repos.filter((repo) => !repo.fork && !repo.archived)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

/**
 * Fetch languages for a specific repository
 */
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<GitHubLanguages> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return {}
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching languages for ${owner}/${repo}:`, error)
    return {}
  }
}

/**
 * Get all languages used across user's repositories
 */
export async function fetchUserLanguages(username: string): Promise<string[]> {
  try {
    const repos = await fetchGitHubRepos(username, { per_page: 100 })
    const languageMap: { [key: string]: number } = {}

    for (const repo of repos) {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1
      }
    }

    // Sort by frequency and return language names
    return Object.entries(languageMap)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang)
  } catch (error) {
    console.error("Error fetching user languages:", error)
    return []
  }
}

/**
 * Tech stack categorization mapping
 */
const techCategories = {
  frontend: [
    "JavaScript", "TypeScript", "HTML", "CSS", "SCSS", "SASS", "Less",
    "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby",
    "Tailwind CSS", "Bootstrap", "Material-UI", "Chakra UI",
    "Redux", "MobX", "Zustand", "Recoil", "Webpack", "Vite", "Parcel"
  ],
  backend: [
    "Node.js", "Express", "NestJS", "Fastify", "Koa",
    "Python", "Django", "Flask", "FastAPI",
    "Java", "Spring", "Spring Boot",
    "Go", "Gin", "Echo",
    "Ruby", "Rails", "Sinatra",
    "PHP", "Laravel", "Symfony",
    "C#", "ASP.NET", ".NET",
    "Rust", "Actix", "Rocket",
    "Elixir", "Phoenix"
  ],
  database: [
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite",
    "MariaDB", "Cassandra", "DynamoDB", "Firebase",
    "Elasticsearch", "Neo4j", "CouchDB", "InfluxDB"
  ],
  mobile: [
    "React Native", "Flutter", "Swift", "Kotlin",
    "Dart", "Objective-C", "Xamarin", "Ionic",
    "SwiftUI", "Jetpack Compose"
  ],
  devops: [
    "Docker", "Kubernetes", "AWS", "GCP", "Azure",
    "Terraform", "Ansible", "Jenkins", "GitLab CI", "GitHub Actions",
    "CircleCI", "Travis CI", "Heroku", "Vercel", "Netlify"
  ]
}

/**
 * Categorize tech stack from languages and topics
 */
export async function categorizeUserTechStack(username: string) {
  try {
    const repos = await fetchGitHubRepos(username, { per_page: 100 })
    
    const techSet = {
      frontend: new Set<string>(),
      backend: new Set<string>(),
      database: new Set<string>(),
      mobile: new Set<string>(),
      devops: new Set<string>(),
      languages: new Set<string>()
    }

    // Collect all languages and topics from repos
    for (const repo of repos) {
      // Add primary language
      if (repo.language) {
        techSet.languages.add(repo.language)
      }

      // Process topics
      for (const topic of repo.topics) {
        const topicLower = topic.toLowerCase()
        const topicFormatted = topic.split("-").map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(" ")

        // Categorize based on topic
        if (techCategories.frontend.some(t => topicLower.includes(t.toLowerCase()))) {
          techSet.frontend.add(topicFormatted)
        }
        if (techCategories.backend.some(t => topicLower.includes(t.toLowerCase()))) {
          techSet.backend.add(topicFormatted)
        }
        if (techCategories.database.some(t => topicLower.includes(t.toLowerCase()))) {
          techSet.database.add(topicFormatted)
        }
        if (techCategories.mobile.some(t => topicLower.includes(t.toLowerCase()))) {
          techSet.mobile.add(topicFormatted)
        }
        if (techCategories.devops.some(t => topicLower.includes(t.toLowerCase()))) {
          techSet.devops.add(topicFormatted)
        }
      }
    }

    // Auto-categorize languages
    for (const lang of techSet.languages) {
      const langLower = lang.toLowerCase()
      
      if (techCategories.frontend.some(t => langLower === t.toLowerCase())) {
        techSet.frontend.add(lang)
      }
      if (techCategories.backend.some(t => langLower === t.toLowerCase())) {
        techSet.backend.add(lang)
      }
      if (techCategories.mobile.some(t => langLower === t.toLowerCase())) {
        techSet.mobile.add(lang)
      }
    }

    // Add common frontend languages
    if (techSet.languages.has("JavaScript")) techSet.frontend.add("JavaScript")
    if (techSet.languages.has("TypeScript")) techSet.frontend.add("TypeScript")
    if (techSet.languages.has("HTML")) techSet.frontend.add("HTML")
    if (techSet.languages.has("CSS")) techSet.frontend.add("CSS")

    // Add common backend languages
    if (techSet.languages.has("Python")) techSet.backend.add("Python")
    if (techSet.languages.has("Java")) techSet.backend.add("Java")
    if (techSet.languages.has("Go")) techSet.backend.add("Go")
    if (techSet.languages.has("Ruby")) techSet.backend.add("Ruby")
    if (techSet.languages.has("PHP")) techSet.backend.add("PHP")
    if (techSet.languages.has("C#")) techSet.backend.add("C#")
    if (techSet.languages.has("Rust")) techSet.backend.add("Rust")
    if (techSet.languages.has("Elixir")) techSet.backend.add("Elixir")

    // Add common mobile languages
    if (techSet.languages.has("Swift")) techSet.mobile.add("Swift")
    if (techSet.languages.has("Kotlin")) techSet.mobile.add("Kotlin")
    if (techSet.languages.has("Dart")) techSet.mobile.add("Dart")
    if (techSet.languages.has("Objective-C")) techSet.mobile.add("Objective-C")

    return {
      frontend: Array.from(techSet.frontend).slice(0, 12),
      backend: Array.from(techSet.backend).slice(0, 12),
      database: Array.from(techSet.database).slice(0, 8),
      mobile: Array.from(techSet.mobile).slice(0, 8),
      devops: Array.from(techSet.devops).slice(0, 8),
      languages: Array.from(techSet.languages).slice(0, 12)
    }
  } catch (error) {
    console.error("Error categorizing tech stack:", error)
    return {
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
      devops: [],
      languages: []
    }
  }
}

/**
 * Fetch pinned repositories using GitHub GraphQL API
 * Requires authentication token for reasonable rate limits
 */
export async function fetchPinnedRepos(username: string, token?: string): Promise<GitHubRepo[]> {
  try {
    if (!token) {
      console.warn("No GitHub token provided. Pinned repos require authentication. Falling back to starred repos.")
      return fetchFeaturedRepos(username, 6)
    }

    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                createdAt
                updatedAt
                pushedAt
                isFork
                isArchived
              }
            }
          }
        }
      }
    `

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch pinned repos: ${response.statusText}`)
      // Fallback to fetching top starred repos
      return fetchFeaturedRepos(username, 6)
    }

    const data = await response.json()

    if (data.errors || !data.data?.user?.pinnedItems?.nodes) {
      console.error("GraphQL error or no pinned repos:", data.errors?.[0]?.message || "Unknown error")
      // Fallback to fetching top starred repos
      return fetchFeaturedRepos(username, 6)
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes

    if (pinnedRepos.length === 0) {
      console.warn("No pinned repos found. Falling back to starred repos.")
      return fetchFeaturedRepos(username, 6)
    }

    // Transform GraphQL response to match REST API format
    return pinnedRepos.map((repo: any) => ({
      id: parseInt(repo.id.replace(/\D/g, "")) || Math.random(),
      name: repo.name,
      full_name: `${username}/${repo.name}`,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      language: repo.primaryLanguage?.name || null,
      topics: repo.repositoryTopics.nodes.map((t: any) => t.topic.name),
      created_at: repo.createdAt,
      updated_at: repo.updatedAt,
      pushed_at: repo.pushedAt,
      fork: repo.isFork,
      archived: repo.isArchived,
    }))
  } catch (error) {
    console.error("Error fetching pinned repos:", error)
    // Fallback to fetching top starred repos
    return fetchFeaturedRepos(username, 6)
  }
}

/**
 * Fallback: Get featured repositories (most starred)
 * Used when pinned repos can't be fetched
 */
export async function fetchFeaturedRepos(
  username: string,
  limit: number = 6
): Promise<GitHubRepo[]> {
  try {
    const repos = await fetchGitHubRepos(username, { sort: "updated", per_page: 100 })
    
    // Sort by stars and get top N
    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
  } catch (error) {
    console.error("Error fetching featured repos:", error)
    return []
  }
}

/**
 * Transform GitHub repo to Portfolio project format
 */
export function transformRepoToProject(repo: GitHubRepo) {
  return {
    id: repo.id,
    title: repo.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: repo.description || "No description available",
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`, // GitHub's auto-generated OG image
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || null,
    tags: repo.topics.length > 0 ? repo.topics : repo.language ? [repo.language] : [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updatedAt: repo.updated_at,
  }
}

/**
 * Get complete GitHub data for portfolio
 */
export async function getGitHubPortfolioData(
  username: string, 
  usePinned: boolean = false,
  token?: string,
  featuredCount: number = 6
) {
  try {
    const [user, repos, techStack] = await Promise.all([
      fetchGitHubUser(username),
      usePinned ? fetchPinnedRepos(username, token) : fetchFeaturedRepos(username, featuredCount),
      categorizeUserTechStack(username),
    ])

    return {
      user,
      projects: repos.map(transformRepoToProject),
      techStack,
    }
  } catch (error) {
    console.error("Error fetching GitHub portfolio data:", error)
    return {
      user: null,
      projects: [],
      techStack: {
        frontend: [],
        backend: [],
        database: [],
        mobile: [],
        devops: [],
        languages: []
      },
    }
  }
}

