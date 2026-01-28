import { motion } from 'framer-motion';
import { Github, Cloud, Container } from 'lucide-react';

const projects = [
  {
    title: 'Cloud Cost Optimization Engine',
    description: 'Automated Jenkins build log archival to Amazon S3 using Shell scripting and AWS CLI, achieving ~50% reduction in log storage costs by replacing expensive EBS storage with lifecycle-managed S3 buckets.',
    tech: ['Shell Scripting', 'AWS CLI', 'Amazon S3', 'Jenkins', 'Linux cron'],
    icon: Cloud,
    github: 'https://github.com/equaan/cloud-cost-optimization',
  },
  {
    title: 'MERN Stack Container Architecture',
    description: 'Containerized and deployed a three-tier MERN stack application (React, Node.js, MongoDB) using Docker and Docker Compose with custom Dockerfiles and shared bridge networking for inter-service communication.',
    tech: ['Docker', 'Docker Compose', 'Node.js', 'React', 'MongoDB'],
    icon: Container,
    github: 'https://github.com/equaan/The-Container-Architecture',
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
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
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
