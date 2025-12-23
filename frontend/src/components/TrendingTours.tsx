import { Link } from "react-router-dom";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dubaiTour from "@/assets/dubai-tour.jpg";
import switzerlandTour from "@/assets/switzerland-tour.jpg";
import singaporeTour from "@/assets/singapore-tour.jpg";
import mauritiusTour from "@/assets/mauritius-tour.jpg";
import baliTour from "@/assets/bali-tour.jpg";
import thailandTour from "@/assets/thailand-tour.jpg";

const tours = [
  {
    id: 1,
    title: "Dubai City Tour",
    image: dubaiTour,
    location: "United Arab Emirates",
    duration: "5 Days / 4 Nights",
    price: "₹45,000",
    originalPrice: "₹55,000",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    title: "Best of Switzerland",
    image: switzerlandTour,
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: "₹1,25,000",
    originalPrice: "₹1,45,000",
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    title: "Amazing Singapore",
    image: singaporeTour,
    location: "Singapore",
    duration: "4 Days / 3 Nights",
    price: "₹35,000",
    originalPrice: "₹42,000",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    title: "Magical Mauritius",
    image: mauritiusTour,
    location: "Mauritius",
    duration: "6 Days / 5 Nights",
    price: "₹65,000",
    originalPrice: "₹78,000",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 5,
    title: "Beautiful Bali",
    image: baliTour,
    location: "Indonesia",
    duration: "5 Days / 4 Nights",
    price: "₹42,000",
    originalPrice: "₹52,000",
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 6,
    title: "Thailand Explorer",
    image: thailandTour,
    location: "Thailand",
    duration: "5 Days / 4 Nights",
    price: "₹38,000",
    originalPrice: "₹48,000",
    rating: 4.7,
    reviews: 143,
  },
];

const TrendingTours = () => {
  return (
    <section className="py-16 md:py-24 bg-gt-light-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold uppercase tracking-wider">
            Best Deals
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-4">
            Trending Tours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular tour packages loved by thousands of travelers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 h-[340px]"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                  Hot Deal
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                <Star size={12} className="text-gt-yellow fill-gt-yellow" />
                <span className="text-xs font-semibold">{tour.rating}</span>
                <span className="text-[10px] text-muted-foreground">({tour.reviews})</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1.5">
                  <MapPin size={12} />
                  <span className="truncate">{tour.location}</span>
                </div>
                <h3 className="text-lg font-bold text-gt-blue-dark mb-2 line-clamp-1">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Clock size={12} />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <span className="text-[10px] text-muted-foreground line-through block">
                      {tour.originalPrice}
                    </span>
                    <p className="text-lg font-bold text-accent">{tour.price}</p>
                    <span className="text-[10px] text-muted-foreground">Per Person</span>
                  </div>
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs group/btn">
                      View Details
                      <ArrowRight size={12} className="ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/international-tours">
            <Button variant="accent" size="lg">
              View All Tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingTours;
