import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { WorkSection } from "@/components/work-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogSection } from "@/components/blog-section"
import { EducationSection } from "@/components/education-section"
import { AchievementsSection } from "@/components/achievements-section"
import { CertificationsSection } from "@/components/certifications-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { getPortfolioDataAsync } from "@/lib/data"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch portfolio data including GitHub data
  const portfolioData = await getPortfolioDataAsync()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection data={portfolioData} />
      <ServicesSection data={portfolioData} />
      <TechStackSection data={portfolioData} />
      <WorkSection data={portfolioData} />
      <ProjectsSection data={portfolioData} />
      {/* @ts-expect-error Server Component */}
      <BlogSection />
      <EducationSection data={portfolioData} />
      <AchievementsSection data={portfolioData} />
      <CertificationsSection data={portfolioData} />
      <TestimonialsSection data={portfolioData} />
      <Footer data={portfolioData} />
    </main>
  )
}
