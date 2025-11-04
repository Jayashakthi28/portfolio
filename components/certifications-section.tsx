import { portfolioData as fallbackData } from "@/lib/data"

interface CertificationsSectionProps {
  data?: any
}

export function CertificationsSection({ data = fallbackData }: CertificationsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 flex items-center gap-3 animate-fade-in-up">
          <span className="text-4xl">📜</span>
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certifications.map((cert: any, idx: number) => (
            <div
              key={cert.id}
              className="neuro-card neuro-card-hover p-7 animate-scale-in group"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl neuro-inset bg-primary/8 flex items-center justify-center text-2xl mb-4">
                    📚
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-400 mb-2">
                    {cert.name}
                  </h3>
                </div>
                <div className="mt-auto">
                  <p className="text-primary/80 font-medium text-sm mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-foreground/60 text-sm">
                    {cert.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

