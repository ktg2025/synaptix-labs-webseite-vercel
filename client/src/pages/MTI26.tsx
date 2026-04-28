import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MTI26() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 tech-grid">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/30 mb-6">
                <span className="text-sm font-medium text-accent">
                  Featured Solution
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                MTI-26: Advanced Triage System
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl">
                Revolutionizing emergency medical care with AI-powered triage
                technology. MTI-26 enhances diagnostic accuracy and improves
                patient outcomes through intelligent analysis.
              </p>
            </motion.div>
          </div>
        </section>



        {/* Key Features */}
        <section className="py-20 bg-background border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Key Features
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                MTI-26 combines advanced AI with medical expertise to deliver
                superior triage outcomes
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Real-Time Analysis",
                  description:
                    "Instant patient assessment and prioritization for faster treatment decisions",
                },
                {
                  icon: Shield,
                  title: "High Accuracy",
                  description:
                    "AI-powered diagnostics with 95%+ accuracy in patient risk assessment",
                },
                {
                  icon: TrendingUp,
                  title: "Improved Outcomes",
                  description:
                    "30% improvement in doctor efficiency and 72-hour deployment period",
                },
                {
                  icon: CheckCircle2,
                  title: "Easy Integration",
                  description:
                    "Seamless integration with existing emergency department systems",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="glasmorph-card p-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 glow-cyan">
                      <feature.icon className="w-6 h-6 text-background" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Real-World Impact
              </h2>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { stat: "30%", label: "Doctor Efficiency Improvement" },
                { stat: "72H", label: "Deployment Period" },
                { stat: "95%+", label: "Accuracy Rate" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glasmorph-card p-8 text-center"
                >
                  <div className="text-5xl font-display font-bold gradient-text mb-3">
                    {item.stat}
                  </div>
                  <p className="text-foreground/60 font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-20 bg-background border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
                Technical Capabilities
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Capabilities */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                    What MTI-26 Analyzes
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Vital Signs Monitoring",
                      "Biometric Data Analysis",
                      "Medical History Integration",
                      "Symptom Pattern Recognition",
                      "Risk Stratification",
                      "Treatment Recommendations",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                    Benefits for Healthcare Providers
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Reduced Wait Times",
                      "Better Resource Allocation",
                      "Improved Patient Satisfaction",
                      "Enhanced Diagnostic Accuracy",
                      "Data-Driven Decision Making",
                      "Scalable Solution",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
                Interested in MTI-26?
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                Contact us to learn more about implementing MTI-26 in your
                healthcare facility
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group shadow-lg cursor-pointer">
                  Get in Touch
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
