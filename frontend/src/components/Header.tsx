import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from '@/utils/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay to allow moving to the menu
  };

  const getDynamicDropdown = (placement: string) => {
    const dynamic = categories
      .filter(cat => cat.menuPlacement === placement)
      .map(cat => ({ name: cat.name, href: `/${placement === 'packages' ? 'international-tours' : placement}/${cat.slug}` }));
    return dynamic;
  };

  // Base navigation
  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Company",
      href: "/about",
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Reviews", href: "/#reviews" },
      ]
    },
    {
      name: "International",
      href: "/international-tours",
      megaMenu: true,
      sections: [
        {
          title: "Africa",
          items: [
            "Kenya", "Morocco", "Seychelles", "South Africa", "Zimbabwe", "Tanzania"
          ]
        },
        {
          title: "America",
          items: [
            "Alaska", "Canada", "Central America", "North America", "South America", "USA"
          ]
        },
        {
          title: "Pacific",
          items: [
            "Australia", "Fiji", "New Zealand"
          ]
        },
        {
          title: "Asia",
          items: [
            "Bali", "Cambodia", "China", "Hong Kong", "Japan", "Indonesia", "Kazakhstan", "Russia", "South Korea", "Malaysia", "Singapore", "Philippines", "Taiwan", "Thailand", "Vietnam", "Uzbekistan"
          ]
        },
        {
          title: "Europe",
          items: [
            "Austria", "Belgium", "Bulgaria", "Croatia", "Czech Republic", "Denmark Republic", "Finland Republic", "France", "Germany", "Greece", "Greenland", "Hungary", "Iceland", "Ireland", "Italy", "London", "Netherlands", "Norway", "Portugal", "Romania", "Russia", "Slovakia", "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom"
          ]
        },
        {
          title: "Island",
          items: [
            "Madagascar", "Maldives", "Mauritius", "Reunion", "Sri Lanka"
          ]
        },
        {
          title: "Middle East",
          items: [
            "Israel", "Jordan", "Oman", "Qatar", "UAE", "Dubai", "Egypt"
          ]
        }
      ]
    },
    {
      name: "India",
      href: "/india-tours",
      megaMenu: true,
      sections: [
        {
          title: "North India",
          items: ["Agra", "Delhi", "Jaipur", "Jammu and Kashmir", "Ladakh", "Manali", "Shimla", "Uttarakhand"]
        },
        {
          title: "South India",
          items: ["Bangalore", "Hyderabad", "Karnataka", "Kerala", "Kochi", "Mysore", "Ooty", "Tamil Nadu"]
        },
        {
          title: "North East",
          items: ["Arunachal Pradesh", "Gangtok", "Pelling", "Sikkim"]
        },
        {
          title: "East India",
          items: ["Bihar", "Darjeeling", "Kolkata", "West Bengal"]
        },
        {
          title: "West India",
          items: ["Ahmedabad", "Goa", "Maharashtra", "Mumbai", "Pune", "Rajasthan"]
        },
        {
          title: "Spiritual",
          items: ["Ayodhya", "Tirupati"]
        },
        {
          title: "Honeymoon",
          items: ["Andaman", "Coorg", "Darjeeling", "Goa", "Himachal", "Kashmir", "Kerala", "Kodaikanal", "Manali", "Munnar", "Ooty", "Shimla"]
        },
        {
          title: "Educational",
          items: ["Bangalore", "Darjeeling", "Goa", "Kochi", "Manali", "Mysore"]
        }
      ]
    },
    {
      name: "Honeymoon",
      href: "/honeymoon",
      megaMenu: true,
      sections: [
        {
          title: "India",
          items: [
            "Goa", "Kerala", "Shimla", "Manali", "Andaman", "Himachal", "Munnar",
            "Kodaikanal", "Coorg", "Ooty", "Kashmir", "Darjeeling"
          ]
        },
        {
          title: "International",
          items: [
            "Maldives", "Bali", "Mauritius", "Phuket", "Switzerland", "Seychelles",
            "Langkawi", "Paris", "Italy", "Krabi", "Greece", "Thailand", "Dubai",
            "Sri Lanka", "Singapore", "Malaysia", "Croatia", "South Africa",
            "Koh Samui", "Australia", "Spain", "Europe"
          ]
        }
      ]
    },
    {
      name: "Wedding",
      href: "/wedding",
      megaMenu: true,
      sections: [
        {
          title: "India",
          items: ["Agra", "Andaman", "Goa", "Jaipur", "Jaisalmer", "Jodhpur", "Kerala", "Udaipur"]
        },
        {
          title: "International",
          items: ["Bali", "Dubai", "Malaysia", "Sri Lanka", "Thailand"]
        }
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  const headerClass = isHome
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background shadow-card py-2' : 'bg-transparent py-4'}`
    : 'sticky top-0 z-50 bg-background shadow-card py-2';

  const navTextClass = isHome && !scrolled
    ? 'text-white hover:text-white/80'
    : 'text-foreground hover:bg-[#4169E1] hover:text-black';

  const activeMegaMenu = navItems.find(item => item.name === activeDropdown && item.megaMenu);

  return (
    <header className="w-full relative z-50">
      {/* Top Bar - Hidden on Home unless scrolled (optional, but reference image implies no top bar) */}
      {!isHome && (
        <div className="bg-gt-blue-dark text-primary-foreground py-2">
          <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+919894454717" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} />
                <span>+91 98944 54717</span>
              </a>
              <a href="mailto:contact@msholidays.net" className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} />
                <span>contact@msholidays.net</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin size={14} />
              <span>coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className={headerClass}>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between w-full">

            {/* Logo - Left Aligned */}
            <Link to="/" className="flex items-center">
              <img
                src="/ggd.png"
                alt="Logo"
                className={`transition-all duration-300 object-contain ${scrolled || !isHome ? 'h-16' : 'h-20 scale-110'}`}
              />
            </Link>

            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1">
                {navItems.map((item: any) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeDropdown === item.name
                        ? 'bg-background text-foreground shadow-sm'
                        : navTextClass
                        }`}
                    >
                      {item.name}
                      {item.dropdown || item.megaMenu ? <ChevronDown size={16} className="transition-transform group-hover:rotate-180" /> : null}
                    </Link>

                    {/* Standard Dropdown */}
                    {item.dropdown && activeDropdown === item.name && !item.megaMenu && (
                      <div className="absolute top-full left-0 w-48 bg-background shadow-hover rounded-lg py-1.5 animate-slide-down z-50 overflow-hidden text-foreground">
                        {item.dropdown.map((subItem: any) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-1.5 hover:bg-secondary hover:text-primary transition-colors text-sm"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Call to Action match image */}
              <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                <a href="tel:+919894454717" className={`transition-colors ${isHome && !scrolled ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'}`}>
                  <Phone size={24} />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 ${isHome && !scrolled ? 'text-white' : 'text-foreground'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Global Mega Menu Container */}
        {/* Global Mega Menu Container */}
        {/* Global Mega Menu Container */}
        {activeMegaMenu && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-background border-t-4 border-yellow-400 shadow-xl animate-slide-down z-40"
            onMouseEnter={() => handleMouseEnter(activeMegaMenu.name)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-4 py-8">
              <div className={`grid gap-8 ${activeMegaMenu.sections.length <= 2 ? 'grid-cols-3' : 'grid-cols-5'}`}>
                {activeMegaMenu.sections.map((section: any) => (
                  <div key={section.title}>
                    <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((subItemName: string) => (
                        <li key={subItemName}>
                          <Link
                            to={`${activeMegaMenu.href}/${subItemName.toLowerCase().replace(/ /g, '-')}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></span>
                            {subItemName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
                <Link to={activeMegaMenu.href}>
                  <Button className="bg-black text-white hover:bg-gray-800 font-bold uppercase text-xs px-6 py-2 rounded-none">
                    View All Packages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-slide-down h-[calc(100vh-80px)] overflow-y-auto text-foreground">
            <div className="container mx-auto px-4 py-4 pb-20 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-border/50 last:border-0">
                  <div className="flex items-center justify-between py-3">
                    <Link
                      to={item.href}
                      className="text-foreground hover:text-primary font-medium text-lg"
                      onClick={() => !item.dropdown && !item.megaMenu && setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {(item.dropdown || item.megaMenu) && (
                      <button
                        onClick={() => {
                          if (activeDropdown === item.name) {
                            setActiveDropdown(null);
                          } else {
                            setActiveDropdown(item.name);
                            setActiveSubDropdown(null);
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-primary"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown Content */}
                  {activeDropdown === item.name && (
                    <div className="pl-4 pb-4 space-y-2 animate-slide-down bg-gray-50/50 rounded-lg mb-2">
                      {/* Standard Dropdown */}
                      {item.dropdown && !item.megaMenu && item.dropdown.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block py-2 text-gray-600 hover:text-primary text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}

                      {/* Mega Menu Mobile View with Nested Accordion */}
                      {item.megaMenu && item.sections.map((section: any) => (
                        <div key={section.title} className="mb-2 last:mb-0 border-b border-border/40 last:border-0 pb-2">
                          <button
                            onClick={() => setActiveSubDropdown(activeSubDropdown === section.title ? null : section.title)}
                            className="flex items-center justify-between w-full py-2"
                          >
                            <h4 className="font-bold text-gt-blue-dark text-xs uppercase tracking-wider">{section.title}</h4>
                            <ChevronDown
                              size={16}
                              className={`text-gray-400 transition-transform duration-300 ${activeSubDropdown === section.title ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {activeSubDropdown === section.title && (
                            <div className="grid grid-cols-2 gap-2 mt-2 pl-2 animate-slide-down">
                              {section.items.map((subItemName: string) => (
                                <Link
                                  key={subItemName}
                                  to={`${item.href}/${subItemName.toLowerCase().replace(/ /g, '-')}`}
                                  className="text-gray-600 text-sm hover:text-primary truncate py-1"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveDropdown(null);
                                    setActiveSubDropdown(null);
                                  }}
                                >
                                  {subItemName}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="accent" className="w-full mt-6 py-6 text-lg">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
