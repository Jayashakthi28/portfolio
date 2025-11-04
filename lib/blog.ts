import { config } from "./config"

export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  content?: string
  excerpt?: string
  sha: string
}

/**
 * Fetch all blog posts from GitHub repository
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!config.blog.enabled) {
    return []
  }

  const { repoOwner, repoName, branch, blogsPath } = config.blog
  const path = blogsPath ? `/${blogsPath}` : ""
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents${path}?ref=${branch}`

  try {
    const response = await fetch(apiUrl, {
      headers: config.githubToken
        ? { Authorization: `token ${config.githubToken}` }
        : {},
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error("Failed to fetch blog posts:", response.statusText)
      return []
    }

    const files = await response.json()

    // Filter README.md files and extract blog info
    const blogs: BlogPost[] = files
      .filter(
        (file: any) =>
          file.type === "file" &&
          (file.name.toLowerCase().endsWith(".md") ||
            file.name.toLowerCase().endsWith(".readme"))
      )
      .map((file: any) => {
        // Extract title from filename (remove .md or .README)
        const title = file.name
          .replace(/\.(md|README)$/i, "")
          .replace(/-/g, " ")
          .replace(/_/g, " ")
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")

        // Create slug from filename
        const slug = file.name.replace(/\.(md|README)$/i, "").toLowerCase()

        return {
          id: file.sha,
          title,
          slug,
          date: new Date().toISOString(), // GitHub doesn't provide file date via contents API
          sha: file.sha,
          excerpt: `Read more about ${title}...`,
        }
      })

    // Sort by title (you can modify this to sort by date when available)
    return blogs.sort((a, b) => b.title.localeCompare(a.title))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

/**
 * Fetch a single blog post content
 */
export async function fetchBlogContent(slug: string): Promise<BlogPost | null> {
  if (!config.blog.enabled) {
    console.log("Blog is disabled in config")
    return null
  }

  const { repoOwner, repoName, branch, blogsPath } = config.blog
  const path = blogsPath ? `/${blogsPath}` : ""
  
  console.log(`Fetching blog: ${slug}`)
  console.log(`Repo: ${repoOwner}/${repoName}, Branch: ${branch}, Path: ${path}`)
  
  // Try different file extensions and variations
  const fileVariations = [
    `${slug}.md`,
    `${slug}.README`,
    `${slug.toUpperCase()}.md`,
    `README.md`, // In case slug is "readme"
  ]
  
  for (const fileName of fileVariations) {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents${path}/${fileName}?ref=${branch}`
    console.log(`Trying: ${apiUrl}`)

    try {
      const response = await fetch(apiUrl, {
        headers: config.githubToken
          ? { Authorization: `token ${config.githubToken}` }
          : {},
        next: { revalidate: 3600 },
      })

      console.log(`Response for ${fileName}: ${response.status}`)

      if (response.ok) {
        const data = await response.json()
        
        // Decode base64 content
        const content = Buffer.from(data.content, "base64").toString("utf-8")

        // Extract title from filename or slug
        const title = slug
          .replace(/-/g, " ")
          .replace(/_/g, " ")
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")

        console.log(`Successfully fetched blog: ${title}`)

        return {
          id: data.sha,
          title,
          slug,
          date: new Date().toISOString(),
          content,
          sha: data.sha,
        }
      }
    } catch (error) {
      console.error(`Error fetching blog ${fileName}:`, error)
    }
  }

  console.log(`Blog not found: ${slug}`)
  return null
}

/**
 * Get latest N blog posts
 */
export async function getLatestBlogs(count: number = 3): Promise<BlogPost[]> {
  const allBlogs = await fetchBlogPosts()
  return allBlogs.slice(0, count)
}

