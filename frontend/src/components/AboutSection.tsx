import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMountains from "@/assets/hero-mountains.jpg";

const features = [
  "Customized Tour Packages",
  "24/7 Customer Support",
  "Best Price Guarantee",
  "Experienced Tour Guides",
  "Safe & Secure Travel",
  "Hassle-Free Booking",
];

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <video
                src="/ms.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gt-blue-dark/10" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-accent text-accent-foreground p-6 rounded-2xl shadow-hover">
              <div className="text-center">
                <span className="text-4xl md:text-5xl font-bold">15+</span>
                <p className="text-sm font-medium mt-1">Years of<br />Experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="text-accent font-semibold uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gt-blue-dark mt-2 mb-6">
              Welcome to MS Holidays
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              MS Holidays is one of India's leading travel companies, offering exceptional tour packages
              for both domestic and international destinations. With over 15 years of experience,
              we have helped thousands of travelers create unforgettable memories.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of experienced travel experts works tirelessly to ensure that every trip
              is meticulously planned and executed, giving you a hassle-free travel experience.
              Whether you're looking for a romantic honeymoon, a family vacation, or an adventure trip,
              we have the perfect package for you.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gt-green/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-gt-green" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="accent" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
