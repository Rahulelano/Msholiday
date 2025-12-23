import { CreditCard, Shield, Headphones, Star } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Easy EMI Options",
    description: "Book your dream vacation with flexible EMI options starting from ₹2,999/month",
  },
  {
    icon: Shield,
    title: "100% Safe Travel",
    description: "Your safety is our priority with comprehensive travel insurance coverage",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock customer support to assist you before, during, and after your trip",
  },
  {
    icon: Star,
    title: "Best Price Guarantee",
    description: "We guarantee the best prices. Found lower? We'll match it!",
  },
];

const StressFreeSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gt-light-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-4">
            Stress-Free Holidays with MS
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We take care of everything so you can focus on creating memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
                <feature.icon size={28} className="text-primary group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gt-blue-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StressFreeSection;
