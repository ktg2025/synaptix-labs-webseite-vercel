import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function TechStack() {
  const aiModels = [
    {
      name: "Google Gemini",
      description: "Advanced multimodal AI model for complex reasoning",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-gemini-EvmhSL4h3Gkf98MDZwQNye.webp",
    },
    {
      name: "Anthropic Claude",
      description: "Powerful AI assistant for natural conversations and analysis",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-anthropic-R8amTDNPwf4DD3fW3fQxvC.webp",
    },
  ];

  const deployment = [
    {
      name: "Vercel",
      description: "Modern deployment platform for web applications",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-vercel-AWdd4ZPmWr58pRc3ZJwKx5.webp",
    },
  ];

  const development = [
    {
      name: "Python",
      description: "Versatile programming language for backend development",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-python-Ex9YERVHjehhhy73aWae2r.webp",
    },
    {
      name: "GitHub",
      description: "Version control and collaborative development platform",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-github-7M3cPCC7FMxyQFoZpW7Hs9.webp",
    },
  ];

  const blockchain = [
    {
      name: "Bitcoin",
      description: "Leading cryptocurrency and blockchain network",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-bitcoin-bTiMj8fSGeX6afCDcMk2BF.webp",
    },
    {
      name: "Ethereum",
      description: "Smart contract platform for decentralized applications",
      logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/logo-ethereum-42n98ZsrcjRuC3wZuFBMxQ.webp",
    },
  ];

  const renderTechSection = (title: string, items: typeof aiModels) => (
    <section className="py-20 border-t border-accent/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full rounded-xl border border-cyan-500/20 bg-background/40 backdrop-blur-xl p-8 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-lg flex flex-col items-center text-center">
                  <div className="mb-6 h-24 w-24 flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 tech-grid">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/30 mb-6">
                <span className="text-sm font-medium text-accent">
                  Technology Stack
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Our Technology Stack
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl">
                Synaptix Labs leverages cutting-edge technologies and platforms
                to build intelligent, scalable solutions. Our carefully selected
                tech stack ensures reliability, performance, and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* AI Models */}
        {renderTechSection("AI & Machine Learning", aiModels)}

        {/* Deployment */}
        {renderTechSection("Deployment & Infrastructure", deployment)}

        {/* Development */}
        {renderTechSection("Development & Version Control", development)}

        {/* Blockchain */}
        {renderTechSection("Blockchain & Cryptocurrency", blockchain)}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-background via-blue-950/20 to-background relative overflow-hidden border-t border-accent/10">
          <div className="absolute inset-0 opacity-20 tech-grid" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-foreground"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Build with Us?
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                We combine these powerful technologies with our expertise to
                create solutions tailored to your needs.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group shadow-lg cursor-pointer"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
