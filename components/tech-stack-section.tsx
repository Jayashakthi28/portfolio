import { portfolioData as fallbackData } from "@/lib/data"

interface TechStackSectionProps {
  data?: any
}

export function TechStackSection({ data = fallbackData }: TechStackSectionProps) {
  // Build categories dynamically, only showing ones with skills
  const allCategories = [
    { title: "Frontend", skills: data.techStack.frontend || [] },
    { title: "Backend", skills: data.techStack.backend || [] },
    { title: "Database", skills: data.techStack.database || [] },
    { title: "Mobile", skills: data.techStack.mobile || [] },
    { title: "DevOps", skills: data.techStack.devops || [] },
    { title: "Languages", skills: data.techStack.languages || [] },
  ]

  // Filter out categories with no skills
  const categories = allCategories.filter(category => category.skills.length > 0)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 animate-fade-in-up">Tech Stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div
              key={category.title}
              className="neuro-card neuro-card-hover p-8 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill: string) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/8 text-primary text-sm font-medium border border-primary/15 hover:bg-primary/15 hover:border-primary/25 transition-all duration-400 neuro-button group cursor-pointer"
                  >
                    {data.techIcons?.[skill] && (
                      <img
                        src={data.techIcons[skill] || "/placeholder.svg"}
                        alt={`${skill} icon`}
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-400"
                      />
                    )}
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
