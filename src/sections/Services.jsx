import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import FadeInView from '../components/animations/FadeInView'
import { services } from '../data/services'

function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <FadeInView delay={index * 0.1} direction="up">
      <Card hover className="flex flex-col gap-4 h-full group">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent">
          <Icon
            size={22}
            className="text-accent group-hover:text-black transition-colors duration-300"
          />
        </div>

        {/* Title + Description */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-text-primary font-bold text-base">
            {service.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed flex-1">
            {service.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
          {service.tags.map((tag) => (
            <Badge key={tag} variant="dark" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </FadeInView>
  )
}

function Services() {
  return (
    <SectionContainer id="services" className="bg-bg-secondary">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>What I Offer</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              Services I <span className="text-accent">Provide</span>
            </h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl mx-auto">
              From idea to deployed product — I cover the full development
              lifecycle for web and mobile.
            </p>
          </div>
        </FadeInView>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <FadeInView delay={0.3}>
          <div className="text-center p-8 rounded-card border border-accent/20 bg-accent/5">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Have a project in mind?
            </h3>
            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
              Let's talk about what you're building. I'm available for
              freelance work and full-time roles.
            </p>
            <Button as="a" href="#contact" size="md">
              Let's Work Together
            </Button>
          </div>
        </FadeInView>

      </div>
    </SectionContainer>
  )
}

export default Services