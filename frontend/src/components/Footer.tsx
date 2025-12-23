import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cancellation Policy", href: "/cancellation" },
  ];

  const destinations = [
    { name: "Dubai Tours", href: "/international-tours/dubai" },
    { name: "Singapore Tours", href: "/international-tours/singapore" },
    { name: "Thailand Tours", href: "/international-tours/thailand" },
    { name: "Europe Tours", href: "/international-tours/europe" },
    { name: "Kerala Tours", href: "/india-tours/kerala" },
    { name: "Rajasthan Tours", href: "/india-tours/rajasthan" },
  ];

  const packages = [
    { name: "Honeymoon Packages", href: "/honeymoon" },
    { name: "Family Packages", href: "/family-tours" },
    { name: "Group Tours", href: "/group-tours" },
    { name: "Adventure Tours", href: "/adventure-tours" },
    { name: "Luxury Tours", href: "/luxury-tours" },
    { name: "Budget Tours", href: "/budget-tours" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1BfXag65T4/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/ms__holidays?igsh=aXRsd3NrODdmcWZz", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@msholidays-b2i?si=-2TkkGNTfqG2CsF7", label: "Youtube" },
  ];

  return (
    <footer className="bg-gt-blue-dark text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/70">
                Get the latest travel deals and offers directly in your inbox
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full md:w-80"
              />
              <Button variant="accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/ggd.png"
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              MS Holidays is your trusted travel partner, offering exceptional
              tour packages for domestic and international destinations.
            </p>
            <div className="space-y-3">
              <a href="tel:+919894454717" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone size={18} />
                <span>+91 98944 54717</span>
              </a>
              <a href="mailto:contact@msholidays.net" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Mail size={18} />
                <span>contact@msholidays.net</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <div>
                  <span className="font-bold block mb-1">Head Office</span>
                  <span className="block text-sm opacity-80 leading-relaxed">
                    246, Uthukuli Rd, Nethaji Nagar<br />
                    Karumarpalayam, Tiruppur 641602
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <div>
                  <span className="font-bold block mb-1">Branch Office</span>
                  <span className="block text-sm opacity-80 leading-relaxed">
                    No 230A / 4, 1st floor, Shanmuga bakery building<br />
                    Muthaiya nagar, Saradha mill road<br />
                    Kuruchi, Sundrapuram, Coimbatore 641024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-bold mb-6">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-lg font-bold mb-6">Packages</h4>
            <ul className="space-y-3">
              {packages.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} MS Holidays. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:text-accent-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
