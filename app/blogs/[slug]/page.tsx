import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { fetchBlogContent, fetchBlogPosts } from "@/lib/blog"
import { getPortfolioDataAsync } from "@/lib/data"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"

export const revalidate = 3600 // Revalidate every hour

// Generate static paths for all blogs
export async function generateStaticParams() {
    const blogs = await fetchBlogPosts()
    return blogs.map((blog) => ({
        slug: blog.slug,
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const portfolioData = await getPortfolioDataAsync()
    const blog = await fetchBlogContent(slug)

    if (!blog || !blog.content) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors duration-300 mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span>Back to all posts</span>
                    </Link>

                    {/* Blog Header */}
                    <header className="mb-12 animate-fade-in-up">
                        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {blog.title}
                        </h1>
                    </header>

                    {/* Blog Content */}
                    <div
                        className="neuro-card p-8 sm:p-12 animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <div className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
              prose-h1:text-4xl prose-h1:mt-0
              prose-h2:text-3xl prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-2
              prose-h3:text-2xl
              prose-h4:text-xl
              prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:decoration-primary/30 hover:prose-a:decoration-primary
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-foreground/90 prose-em:italic
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/40 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
              prose-pre>code:bg-transparent prose-pre>code:p-0 prose-pre>code:text-foreground/90
              prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground/70
              prose-ul:text-foreground/80 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:text-foreground/80 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-li:mb-2 prose-li:text-foreground/85
              prose-li::marker:text-primary
              prose-img:rounded-xl prose-img:border prose-img:border-border/40 prose-img:my-6 prose-img:shadow-lg
              prose-hr:border-border/40 prose-hr:my-8
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-th:border prose-th:border-border/40 prose-th:bg-secondary/30 prose-th:p-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-border/40 prose-td:p-3
              ">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                components={{
                                    // Custom rendering for code blocks
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                        return inline ? (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    // Handle images
                                    img: ({ node, ...props }: any) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            {...props}
                                            alt={props.alt || "Blog image"}
                                            loading="lazy"
                                            className="max-w-full h-auto"
                                        />
                                    ),
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/15 text-primary rounded-xl font-medium neuro-button group transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Back to All Posts</span>
                        </Link>
                    </div>
                </div>
            </article>

            <Footer data={portfolioData} />
        </main>
    )
}

