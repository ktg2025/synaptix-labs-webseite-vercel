import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "MTI-26", href: "/mti26" },
    { label: "Tech Stack", href: "/tech-stack" },
    { label: "Trading Bot", href: "/trading-bot" },
    { label: "Synaps", href: "/synaps" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide-Out */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-xl border-r border-accent/20 z-50 md:hidden overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-accent/10">
              <span className="text-lg font-display font-bold text-foreground">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-6 px-4 space-y-2">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={item.href}>
                    <span
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-accent hover:bg-accent/10 transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="px-4 py-4 border-t border-accent/10">
              <Link href="/contact">
                <span
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 text-center cursor-pointer"
                >
                  Get Started
                </span>
              </Link>
            </div>

            {/* Branding */}
            <div className="px-4 py-6 border-t border-accent/10 mt-auto">
              <p className="text-xs text-foreground/50 text-center">
                Synaptix Labs
              </p>
              <p className="text-xs text-foreground/40 text-center mt-1">
                From Thought to Algorithm
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
