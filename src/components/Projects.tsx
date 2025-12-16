import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Cloud, Container, Server } from 'lucide-react';

const projects = [
  {
    title: 'Cloud Infrastructure Platform',
    description: 'Designed and implemented a multi-region AWS infrastructure using Terraform, supporting 99.99% uptime for production workloads.',
    tech: ['Terraform', 'AWS', 'CloudWatch', 'Lambda'],
    icon: Cloud,
    link: '#',
    github: '#',
  },
  {
    title: 'Kubernetes Cluster Management',
    description: 'Built and maintained production-grade Kubernetes clusters with automated scaling, monitoring, and self-healing capabilities.',
    tech: ['Kubernetes', 'Helm', 'Prometheus', 'ArgoCD'],
    icon: Container,
    link: '#',
    github: '#',
  },
  {
    title: 'CI/CD Pipeline Automation',
    description: 'Implemented GitOps-based deployment pipelines reducing deployment time by 80% and enabling 50+ daily deployments.',
    tech: ['GitHub Actions', 'Jenkins', 'Docker', 'SonarQube'],
    icon: GitBranch,
    link: '#',
    github: '#',
  },
  {
    title: 'Infrastructure Monitoring Suite',
    description: 'Created comprehensive monitoring and alerting system with custom dashboards for real-time infrastructure visibility.',
    tech: ['Grafana', 'Prometheus', 'ELK Stack', 'PagerDuty'],
    icon: Server,
    link: '#',
    github: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    }
  },
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(175_80%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 mb-6"
          >
            <code className="text-sm text-muted-foreground">ls -la</code>
            <span className="text-primary font-mono">./projects</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of infrastructure and automation projects I've worked on
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="group relative"
            >
              <div className="h-full rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_hsl(175_80%_50%_/_0.1)] transition-all duration-500">
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow/60" />
                  <div className="w-3 h-3 rounded-full bg-terminal-green/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">project-{index + 1}.md</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <project.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        <GitBranch className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-mono mb-3 text-foreground group-hover:text-gradient transition-all duration-500">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * techIndex, duration: 0.3 }}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
