import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import api from "@/utils/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/testimonials');
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          // Fallback content if no data
          setTestimonials([
            {
              _id: 1,
              name: "Revathi S",
              location: "Chennai, Tamil Nadu",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
              rating: 5,
              text: "Our honeymoon to Maldives arranged by MS Holidays was absolutely magical! Every detail was perfectly planned. Highly recommend!",
              tour: "Maldives Honeymoon Package",
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials");
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              className="bg-gt-light-bg rounded-2xl p-6 md:p-8 relative group hover:shadow-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote
                size={48}
                className="absolute top-6 right-6 text-accent/20 group-hover:text-accent/40 transition-colors"
              />

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-gt-blue-dark">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-gt-yellow fill-gt-yellow"
                  />
                ))}
              </div>

              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Tour: </span>
                <span className="text-sm font-semibold text-primary">
                  {testimonial.tour}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

