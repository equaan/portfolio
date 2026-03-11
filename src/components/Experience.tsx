import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const experiences = [
  {
    role: 'Intern — Cloud Services',
    company: 'Opt IT Technologies',
    location: 'India',
    startDate: 'Feb 2025',
    endDate: 'Present',
    description:
      'Building IDP tooling with Backstage.io — creating software templates to automate cloud infrastructure provisioning and streamline developer workflows.',
    highlights: [
      'Built Backstage templates that scaffold GitHub repos with Terraform (VPC, S3, RDS, EKS) and auto-trigger provisioning via GitHub Actions',
      'Developed a template to selectively fetch IaC, CI/CD & Ansible configs from a centralized repo and push to client repositories',
      'Learned Backstage service catalogue for internal service discovery and management',
    ],
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(175_80%_50%_/_0.03)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-card/50 mb-6"
          >
            <code className="text-sm text-muted-foreground">cat</code>
            <span className="text-accent font-mono">experience.log</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl mx-auto"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeInUp}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_hsl(175_80%_50%_/_0.5)]" />

              <div className="rounded-xl border border-border bg-card p-6 mb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-foreground">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-mono text-sm mt-1">
                      <Building2 className="w-4 h-4" aria-hidden="true" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-accent mt-0.5">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
