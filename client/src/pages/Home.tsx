import { ArrowRight, Zap, Brain, Code, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 tech-grid">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl opacity-20" />

          <div className="container relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl"
            >
              {/* Logo Display */}
              <motion.div variants={itemVariants} className="mb-8">
                <img
                  src="/manus-storage/logo_d721e238.png"
                  alt="Synaptix Labs"
                  className="h-32 w-auto md:h-40 drop-shadow-glow-lg"
                />
              </motion.div>

              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-300">AI-Powered Innovation</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
              >
                From Thought to{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Algorithm
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl leading-relaxed"
              >
                Synaptix Labs develops intelligent, adaptive software solutions tailored to your specific business needs. We integrate cutting-edge AI technology to transform complex challenges into elegant solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <span className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/services">
                  <span className="inline-flex items-center justify-center px-8 py-3 border border-cyan-500/30 text-foreground font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                    Explore Services
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* AI Neural Network Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Our solutions leverage neural networks and machine learning algorithms to deliver unprecedented intelligence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-cyan-500/20 glow-cyan backdrop-blur-xl bg-background/40"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/ai-neural-network-mPa8zAxXZqU9YSzkV63QiG.webp"
                alt="AI Neural Network"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Comprehensive AI-powered solutions for modern businesses
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Custom Software",
                  description: "Tailored solutions for your unique business requirements",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/ai-brain-circuit-XsgKdd2nh5BvoEfwp447fu.webp",
                },
                {
                  icon: Zap,
                  title: "AI Integration",
                  description: "Seamless integration of cutting-edge AI technology",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/algorithm-flow-9HLkwNGHpFbasEbGz3iZ7A.webp",
                },
                {
                  icon: Code,
                  title: "System Architecture",
                  description: "Scalable and robust system design",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/data-stream-ddtm7pL7G4hgRAMwUHAYXQ.webp",
                },
                {
                  icon: Sparkles,
                  title: "Data Analytics",
                  description: "Transform data into actionable insights",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/ai-hologram-VnhcqQ28ELHBg4cwu3UKFm.webp",
                },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative h-full rounded-xl border border-cyan-500/20 bg-background/40 backdrop-blur-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-lg">
                    <div className="mb-4 h-32 rounded-lg overflow-hidden border border-cyan-500/10">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <service.icon className="w-8 h-8 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MTI-26 Teaser */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                  MTI-26: Advancing Triage in the UAE
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Our flagship AI solution revolutionizes emergency healthcare with intelligent triage systems. Deployed in leading UAE medical facilities, MTI-26 improves doctor efficiency by 30% and reduces deployment time to 72 hours.
                </p>
                <Link href="/mti26">
                  <span className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm cursor-pointer group">
                    Learn More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-cyan-500/20 glow-cyan backdrop-blur-xl bg-background/40"
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/ai-hologram-VnhcqQ28ELHBg4cwu3UKFm.webp"
                  alt="MTI-26"
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                See AI in Action
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Watch how Synaptix Labs transforms healthcare with AI-powered solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-accent/30 glow-cyan"
            >
              <video
                className="w-full h-auto bg-background"
                controls
                preload="metadata"
                poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663508866694/a5TFvGshL644EZK8n6dMiu/mti26-hero.png"
              >
                <source
                  src="/manus-storage/Synaptix__AI_in_Dubai_Health_20c8965a.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-background via-blue-950/20 to-background relative overflow-hidden border-t border-accent/10">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl opacity-30" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Let's discuss how Synaptix Labs can help you leverage AI to solve your most complex challenges.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
