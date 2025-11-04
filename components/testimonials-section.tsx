import { portfolioData as fallbackData } from "@/lib/data"
import Image from "next/image"

interface TestimonialsSectionProps {
  data?: any
}

export function TestimonialsSection({ data = fallbackData }: TestimonialsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-16 flex items-center gap-3 animate-fade-in-up">
          <span className="text-4xl">💬</span>
          What People Say About Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.testimonials.map((testimonial: any, idx: number) => (
            <div
              key={testimonial.id}
              className="neuro-card neuro-card-hover p-7 animate-scale-in group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden neuro-inset bg-primary/10">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-400">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-foreground/65">
                    {testimonial.role} at <span className="text-primary/80 font-medium">{testimonial.company}</span>
                  </p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm group-hover:text-foreground/85 transition-colors duration-400 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

