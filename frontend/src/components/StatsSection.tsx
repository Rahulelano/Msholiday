import { Plane, Heart, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Plane,
    number: "500+",
    label: "Abroad Trips",
    description: "Organized every year",
  },
  {
    icon: Heart,
    number: "1000+",
    label: "Handcrafted Experiences",
    description: "Unique travel packages",
  },
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Travellers",
    description: "And counting",
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience",
    description: "In travel industry",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-primary-foreground"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-accent/20 rounded-2xl flex items-center justify-center">
                <stat.icon size={32} className="text-accent" />
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {stat.number}
              </h3>
              <p className="text-lg md:text-xl font-semibold mb-1">{stat.label}</p>
              <p className="text-primary-foreground/70 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
