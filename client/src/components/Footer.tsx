import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-xl border-t border-accent/10 text-foreground/80 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img
              src="/manus-storage/logo_d721e238.png"
              alt="Synaptix Labs"
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm text-foreground/60">From Thought to Algorithm</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services">
                  <span className="text-foreground/60 hover:text-accent transition-colors cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/mti26">
                  <span className="text-foreground/60 hover:text-accent transition-colors cursor-pointer">MTI-26</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-foreground/60 hover:text-accent transition-colors cursor-pointer">About</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-foreground/60 hover:text-accent transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@synaptixlabs.ch" className="text-foreground/60 hover:text-accent transition-colors">
                  info@synaptixlabs.ch
                </a>
              </li>
              <li className="text-foreground/60">Switzerland</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Synaptix Labs. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
