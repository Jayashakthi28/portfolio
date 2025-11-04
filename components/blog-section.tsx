import { getLatestBlogs, BlogPost } from "@/lib/blog"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

interface BlogSectionProps {
  blogs?: BlogPost[]
}

export async function BlogSection({ blogs: propBlogs }: BlogSectionProps) {
  // Fetch blogs if not provided
  const blogs = propBlogs || (await getLatestBlogs(3))

  if (blogs.length === 0) {
    return (
      <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-16 animate-fade-in-up">
            Latest Posts
          </h2>
          <div className="text-center py-16">
            <div className="neuro-card p-12 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full neuro-inset bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-6">
                📝
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Coming Soon
              </h3>
              <p className="text-foreground/60 text-lg">
                Exciting blog posts are on the way! Stay tuned for insights,
                tutorials, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Latest Posts
            </h2>
            <p className="text-foreground/65 text-lg">
              Thoughts, tutorials, and insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="neuro-card neuro-card-hover p-7 group animate-scale-in block"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl neuro-inset bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-400">
                    📄
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-400 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <p className="text-sm text-foreground/65 leading-relaxed group-hover:text-foreground/85 transition-colors duration-400 mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        <div
          className="flex justify-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/15 text-primary rounded-xl font-medium neuro-button group transition-all duration-300"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
