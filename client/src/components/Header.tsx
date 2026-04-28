import { Link } from "wouter";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-accent/20"
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <img
            src="/manus-storage/logo_d721e238.png"
            alt="Synaptix Labs"
            className="h-20 w-auto md:h-24 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/services">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Services
            </span>
          </Link>
          <Link href="/blog">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Blog
            </span>
          </Link>
          <Link href="/mti26">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              MTI-26
            </span>
          </Link>
          <Link href="/tech-stack">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Tech Stack
            </span>
          </Link>
          <Link href="/trading-bot">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Trading Bot
            </span>
          </Link>
          <Link href="/synaps">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Synaps
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm cursor-pointer">
              Contact
            </span>
          </Link>
        </nav>

        {/* CTA Button */}
        <Link href="/contact">
          <span className="hidden md:inline-block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            Get Started
          </span>
        </Link>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}
