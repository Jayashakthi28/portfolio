import { portfolioData as fallbackData } from "@/lib/data"

interface AchievementsSectionProps {
  data?: any
}

export function AchievementsSection({ data = fallbackData }: AchievementsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 flex items-center gap-3 animate-fade-in-up">
          <span className="text-4xl">🏆</span>
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.achievements.map((achievement: string, idx: number) => (
            <div
              key={idx}
              className="neuro-card neuro-card-hover p-6 animate-scale-in group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-400">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
