import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { fetchBlogPosts } from "@/lib/blog"
import { getPortfolioDataAsync } from "@/lib/data"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function BlogsPage() {
    const portfolioData = await getPortfolioDataAsync()
    const blogs = await fetchBlogPosts()

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 animate-fade-in-up">
                        <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
                            All Blog Posts
                        </h1>
                        <p className="text-xl text-foreground/65">
                            {blogs.length} {blogs.length === 1 ? "post" : "posts"} about development, tech, and more
                        </p>
                    </div>

                    {/* Blogs Grid */}
                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="neuro-card p-12 max-w-md mx-auto">
                                <div className="w-20 h-20 rounded-full neuro-inset bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-6">
                                    📝
                                </div>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">
                                    No Posts Yet
                                </h3>
                                <p className="text-foreground/60 text-lg mb-6">
                                    Exciting blog posts are on the way! Stay tuned for insights,
                                    tutorials, and more.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium neuro-button"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((post, idx) => (
                                <Link
                                    key={post.id}
                                    href={`/blogs/${post.slug}`}
                                    className="neuro-card neuro-card-hover p-7 group animate-scale-in block"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
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
                    )}
                </div>
            </section>

            <Footer data={portfolioData} />
        </main>
    )
}

