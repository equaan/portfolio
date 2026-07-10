import { motion } from 'framer-motion';
import { Cloud, Container, GitBranch, Server, Terminal, Workflow, Ship, Github, Code2 } from 'lucide-react';

const skills = [
  { name: 'AWS', icon: Cloud, category: 'Cloud' },
  { name: 'Docker', icon: Container, category: 'Containers' },
  { name: 'Kubernetes', icon: Ship, category: 'Orchestration' },
  { name: 'Terraform', icon: Server, category: 'IaC' },
  { name: 'GitHub Actions', icon: Workflow, category: 'CI/CD' },
  { name: 'Git', icon: GitBranch, category: 'Version Control' },
  { name: 'Linux', icon: Terminal, category: 'Systems' },
  { name: 'Python', icon: Code2, category: 'Scripting' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    }
  },
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(175_80%_50%_/_0.03)_0%,_transparent_50%)]" />
      
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
            <code className="text-sm text-muted-foreground">cat</code>
            <span className="text-primary font-mono">skills.yml</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to build robust, scalable infrastructure
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_hsl(175_80%_50%_/_0.1)] transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-500">
                  <skill.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-mono font-semibold text-foreground mb-1">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
