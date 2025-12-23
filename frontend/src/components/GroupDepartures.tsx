import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import dubaiTour from "@/assets/dubai-tour.jpg";
import europeTour from "@/assets/europe-tour.jpg";
import thailandTour from "@/assets/thailand-tour.jpg";
import singaporeTour from "@/assets/singapore-tour.jpg";

const groupDepartures = [
  {
    id: 1,
    title: "Dubai New Year Special",
    image: dubaiTour,
    destination: "Dubai, UAE",
    departureDate: "28 Dec 2024",
    duration: "5 Days / 4 Nights",
    groupSize: "20-30 People",
    price: "₹48,999",
    spotsLeft: 8,
  },
  {
    id: 2,
    title: "Europe Winter Wonderland",
    image: europeTour,
    destination: "Paris, Switzerland, Italy",
    departureDate: "15 Jan 2025",
    duration: "10 Days / 9 Nights",
    groupSize: "15-25 People",
    price: "₹1,35,000",
    spotsLeft: 5,
  },
  {
    id: 3,
    title: "Thailand Group Getaway",
    image: thailandTour,
    destination: "Bangkok, Pattaya, Phuket",
    departureDate: "10 Jan 2025",
    duration: "6 Days / 5 Nights",
    groupSize: "25-35 People",
    price: "₹35,999",
    spotsLeft: 12,
  },
  {
    id: 4,
    title: "Singapore Malaysia Express",
    image: singaporeTour,
    destination: "Singapore, Kuala Lumpur",
    departureDate: "05 Feb 2025",
    duration: "7 Days / 6 Nights",
    groupSize: "20-30 People",
    price: "₹55,999",
    spotsLeft: 10,
  },
];

const GroupDepartures = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold uppercase tracking-wider">
            Fixed Departures
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-4">
            MS Group Departures
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our group tours and travel with like-minded people. Fixed departure dates with guaranteed departures!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupDepartures.map((tour) => (
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
                <span className="px-3 py-1 bg-gt-green text-accent-foreground text-xs font-semibold rounded-full">
                  {tour.spotsLeft} Spots Left
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold text-gt-blue-dark mb-2 line-clamp-1">
                  {tour.title}
                </h3>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <MapPin size={12} />
                    <span className="truncate">{tour.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar size={12} />
                    <span>{tour.departureDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Users size={12} />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-lg font-bold text-accent">{tour.price}</p>
                    <span className="text-[10px] text-muted-foreground">Per Person</span>
                  </div>
                  <Link to="/contact">
                    <Button variant="accent" size="sm" className="h-8 px-3 text-xs group/btn">
                      Book Now
                      <ArrowRight size={12} className="ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/group-tours">
            <Button variant="outline" size="lg">
              View All Group Tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GroupDepartures;
