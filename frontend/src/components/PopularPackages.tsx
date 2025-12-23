import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import indiaTour from "@/assets/india-tour.jpg";
import europeTour from "@/assets/europe-tour.jpg";
import honeymoonTour from "@/assets/honeymoon-tour.jpg";
import singaporeTour from "@/assets/singapore-tour.jpg";
import dubaiTour from "@/assets/dubai-tour.jpg";

const packages = [
  {
    id: 1,
    title: "India",
    image: indiaTour,
    href: "/india-tours",
  },
  {
    id: 2,
    title: "International",
    image: singaporeTour,
    href: "/international-tours",
  },
  {
    id: 3,
    title: "Honeymoon",
    image: honeymoonTour,
    href: "/honeymoon",
  },
  {
    id: 4,
    title: "Europe",
    image: europeTour,
    href: "/international-tours/europe",
  },
  {
    id: 5,
    title: "Dubai",
    image: dubaiTour,
    href: "/international-tours/dubai",
  },
];

const PopularPackages = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold uppercase tracking-wider">
            Explore Our Tours
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-4">
            Top Tour Packages
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              to={pkg.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Discount Badge */}
              <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-md z-10">
                <span className="text-sm font-bold text-black uppercase tracking-wide">30% OFF</span>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-8 inset-x-0 text-center z-20 px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-3 drop-shadow-md">
                  {pkg.title}
                </h3>
                <div className="flex justify-center gap-1.5 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" className="drop-shadow-sm" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
