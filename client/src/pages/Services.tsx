import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Custom Software Development",
    description:
      "We build bespoke software solutions tailored to your specific business requirements. From concept to deployment, we handle every aspect of development with precision and innovation.",
    features: [
      "Requirements Analysis",
      "Architecture Design",
      "Full-Stack Development",
      "Quality Assurance",
      "Deployment & Support",
    ],
    icon: "💻",
  },
  {
    title: "AI & Machine Learning Integration",
    description:
      "Harness the power of artificial intelligence to automate processes, gain insights, and enhance decision-making. We integrate cutting-edge AI models into your existing systems.",
    features: [
      "Model Development",
      "Data Analysis",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision Solutions",
    ],
    icon: "🧠",
  },
  {
    title: "System Architecture & Consulting",
    description:
      "Expert guidance on building scalable, secure, and efficient systems. We help you design architectures that grow with your business and adapt to changing needs.",
    features: [
      "System Design",
      "Technology Selection",
      "Performance Optimization",
      "Security Assessment",
      "Migration Planning",
    ],
    icon: "🏗️",
  },
  {
    title: "Data Analytics & Insights",
    description:
      "Transform raw data into actionable insights. Our analytics solutions help you understand your business better and make data-driven decisions.",
    features: [
      "Data Pipeline Development",
      "Business Intelligence",
      "Real-time Analytics",
      "Visualization & Reporting",
      "Predictive Modeling",
    ],
    icon: "📊",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 tech-grid">
          {/* Gradient Orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                Comprehensive AI-integrated software solutions designed to solve
                your unique business challenges
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <div className="space-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:grid-cols-2" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-foreground/70 mb-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact">
                      <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group">
                        Learn More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Link>
                  </div>

                  {/* Image Placeholder */}
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="glasmorph-card p-8 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{service.icon}</div>
                        <p className="text-foreground/60 font-medium">{service.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
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
                Our Process
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                A structured approach to delivering exceptional results
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "Understand your needs" },
                { step: "02", title: "Design", desc: "Create the solution" },
                { step: "03", title: "Develop", desc: "Build with excellence" },
                { step: "04", title: "Deploy", desc: "Launch and support" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="glasmorph-card p-6 text-center h-full">
                    <div className="text-4xl font-display font-bold gradient-text mb-3">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                Let's discuss which service is right for your business
              </p>
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group shadow-lg">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
