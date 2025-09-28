import Link from 'next/link';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg text-foreground">WheelsOnRent</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The trusted platform for vehicle rentals and sharing. Connect with verified owners and renters in your community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/browse" className="hover:text-primary transition-colors">Rent a Vehicle</Link>
              <Link href="/owner/add" className="hover:text-primary transition-colors">List Your Vehicle</Link>
              <Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
              <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              <Link href="/faq" className="hover:text-primary transition-colors">Help Center</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms & Privacy</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p>📧 support@wheelsonrent.com</p>
              <p>📞 +1 (234) 567-890</p>
              <p>📍 123 Business District<br />Tech City, TC 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} WheelsOnRent. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs">
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
