import { portfolioData as fallbackData } from "@/lib/data"
import { Code, Smartphone, Palette, GraduationCap, Video, Database, Cloud, Blocks } from "lucide-react"

interface ServicesSectionProps {
    data?: any
}

const serviceIcons: Record<string, React.ReactNode> = {
    web: <Code className="w-8 h-8" />,
    mobile: <Smartphone className="w-8 h-8" />,
    uiux: <Palette className="w-8 h-8" />,
    teaching: <GraduationCap className="w-8 h-8" />,
    video: <Video className="w-8 h-8" />,
    database: <Database className="w-8 h-8" />,
    devops: <Cloud className="w-8 h-8" />,
    api: <Blocks className="w-8 h-8" />,
}

export function ServicesSection({ data = fallbackData }: ServicesSectionProps) {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Services I Provide</h2>
                    <p className="text-foreground/65 text-lg max-w-2xl mx-auto">
                        Comprehensive solutions tailored to bring your ideas to life
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {data.services?.map((service: any, idx: number) => (
                        <div
                            key={service.id}
                            className="neuro-card neuro-card-hover p-7 group animate-scale-in w-full max-w-sm"
                            style={{ animationDelay: `${idx * 0.08}s` }}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl neuro-inset bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-all duration-500 group-hover:scale-110">
                                    {serviceIcons[service.icon] || <Code className="w-8 h-8" />}
                                </div>
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-400">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-foreground/65 leading-relaxed group-hover:text-foreground/85 transition-colors duration-400">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

