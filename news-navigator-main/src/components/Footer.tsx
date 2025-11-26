import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">NewsHub</h3>
            <p className="text-sm opacity-80">
              Your trusted source for the latest news and updates from around the world.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
              <Link to="/category/technology" className="text-sm hover:text-primary transition-colors">
                Technology
              </Link>
              <Link to="/category/sports" className="text-sm hover:text-primary transition-colors">
                Sports
              </Link>
              <Link to="/category/business" className="text-sm hover:text-primary transition-colors">
                Business
              </Link>
              <Link to="/category/health" className="text-sm hover:text-primary transition-colors">
                Health
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2025 NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
