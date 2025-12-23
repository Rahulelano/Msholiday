import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Clock, Star, Users, Check, ArrowRight, Calendar } from "lucide-react"; // Added Calendar import
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { toast } from "sonner";

// Method to get a default image if none provided (optional fallback)
import indiaTour from "@/assets/india-tour.jpg";
import singaporeTour from "@/assets/singapore-tour.jpg";
import mauritiusTour from "@/assets/mauritius-tour.jpg";
import europeTour from "@/assets/europe-tour.jpg";
import dubaiTour from "@/assets/dubai-tour.jpg";

interface Tour {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  duration: string;
  location: string;
  rating: number;
  category: string;
  subcategory?: string;
}

const ToursPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { subcategory } = useParams();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract category from pathname (matches backend category values)
  const getCategoryKey = () => {
    if (pathname.includes("india-tours")) return "india-tours";
    if (pathname.includes("international-tours")) return "international-tours";
    if (pathname.includes("honeymoon")) return "honeymoon";
    if (pathname.includes("group-tours")) return "group-tours";
    if (pathname.includes("wedding")) return "wedding";
    if (pathname.includes("cruises")) return "cruises";
    if (pathname.includes("family-tours")) return "family-tours";
    if (pathname.includes("adventure-tours")) return "adventure-tours";
    if (pathname.includes("luxury-tours")) return "luxury-tours";
    if (pathname.includes("budget-tours")) return "budget-tours";
    return "";
  };

  const categoryKey = getCategoryKey();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await api.get('/tours');
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours", error);
        toast.error("Failed to load tours.");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Filter tours based on category and subcategory (search/keyword)
  const filteredTours = tours.filter((tour) => {
    // 1. Filter by Main Category (e.g. India vs International)
    // If the categoryKey is present, the tour MUST match it.
    if (categoryKey && tour.category !== categoryKey) return false;

    // 2. Filter by Subcategory/Keyword from URL params (e.g. /india-tours/kerala)
    if (subcategory) {
      // Convert URL slug (kerala, south-africa) to text (kerala, south africa)
      const query = subcategory.toLowerCase().replace(/-/g, ' ');

      // Check local subcategory field, or title, or location
      return (
        (tour.subcategory && tour.subcategory.toLowerCase().includes(query)) ||
        tour.title.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Dynamic Page Info
  const pageTitles: any = {
    "india-tours": { title: "India Tour Packages", desc: "Explore the incredible diversity of India", image: indiaTour },
    "international-tours": { title: "International Tour Packages", desc: "Discover amazing destinations worldwide", image: singaporeTour },
    "honeymoon": { title: "Honeymoon Packages", desc: "Romantic getaways for couples", image: mauritiusTour },
    "group-tours": { title: "Group Tour Packages", desc: "Travel with like-minded people", image: europeTour },
    "wedding": { title: "Destination Weddings", desc: "Plan your dream wedding in beautiful locations", image: mauritiusTour },
    "cruises": { title: "Cruise Packages", desc: "Sail the seas in luxury", image: europeTour },
    "family-tours": { title: "Family Tour Packages", desc: "Memorable vacations for the whole family", image: singaporeTour },
    "adventure-tours": { title: "Adventure Tour Packages", desc: "Thrilling experiences for the adventurous soul", image: indiaTour },
    "luxury-tours": { title: "Luxury Tour Packages", desc: "Experience the ultimate in comfort and style", image: dubaiTour }, // Assuming dubaiTour is imported or use available
    "budget-tours": { title: "Budget Tour Packages", desc: "Affordable travel options for everyone", image: indiaTour },
    "": { title: "All Tours", desc: "Explore our wide range of holiday packages", image: indiaTour }
  };

  const currentCategoryInfo = pageTitles[categoryKey] || pageTitles[""];

  const displayTitle = subcategory
    ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Packages`
    : currentCategoryInfo.title;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={currentCategoryInfo.image}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gt-blue-dark/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{displayTitle}</h1>
              <p className="text-xl text-primary-foreground/80">{currentCategoryInfo.desc}</p>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16 md:py-24 bg-gt-light-bg">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">Loading packages...</div>
            ) : filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {filteredTours.map((tour) => (
                  <Link to={`/tours/${tour._id}`} key={tour._id}>
                    <div className="bg-background rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = indiaTour; // Fallback
                          }}
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                          <MapPin size={14} />
                          <span>{tour.location}</span>
                        </div>

                        <h3 className="text-lg font-serif font-bold text-gray-800 mb-auto leading-tight group-hover:text-gt-orange transition-colors">
                          {tour.title}
                        </h3>

                        <div className="flex items-center gap-2 text-orange-500 text-sm mt-4 font-medium">
                          <Clock size={16} />
                          <span>{tour.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-muted-foreground">No tours found for {subcategory || currentCategoryInfo.title}</h3>
                <p className="text-muted-foreground mt-2">Try searching for other destinations or browse all packages.</p>
                <div className="mt-6">
                  <Button onClick={() => window.history.back()}>Go Back</Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gt-blue-dark mb-4">
                Why Choose MS Holidays?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Calendar, title: "Flexible Booking", desc: "Easy cancellation & rescheduling" },
                { icon: Users, title: "Expert Guides", desc: "Experienced local guides" },
                { icon: Star, title: "Best Prices", desc: "Competitive pricing guaranteed" },
                { icon: Check, title: "24/7 Support", desc: "Round the clock assistance" },
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gt-blue-dark mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToursPage;
