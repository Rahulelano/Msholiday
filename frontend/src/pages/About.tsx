import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Award, Globe, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMountains from "@/assets/hero-mountains.jpg";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We prioritize your happiness and satisfaction above everything else.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your safety and security are our top priorities during every journey.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We offer tours to 50+ destinations across the world.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service.",
  },
];



const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={heroMountains}
            alt="About MS Holidays"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gt-blue-dark/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Us</h1>
              <p className="text-xl text-primary-foreground/80">
                Your Trusted Travel Partner Since 2008
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent font-semibold uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gt-blue-dark mt-2 mb-6">
                  15+ Years of Creating Unforgettable Journeys
                </h2>
                <p className="text-muted-foreground mb-4">
                  MS Holidays was founded in 2008 with a simple mission: to make travel accessible,
                  enjoyable, and memorable for everyone. What started as a small travel agency in Chennai
                  has now grown into one of India's most trusted travel companies.
                </p>
                <p className="text-muted-foreground mb-4">
                  Over the years, we have helped over 50,000 travelers explore destinations across
                  India and around the world. Our team of experienced travel experts works tirelessly
                  to craft personalized itineraries that cater to your unique preferences and budget.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe that travel is not just about visiting new places, but about creating
                  stories, building memories, and experiencing the world in its full glory.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["50,000+ Happy Travelers", "500+ Tour Packages", "50+ Destinations", "24/7 Support"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="text-gt-green" size={20} />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src={heroMountains}
                  alt="MS Holidays Team"
                  className="w-full h-[400px] object-cover rounded-2xl shadow-hover"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-hover">
                  <div className="text-center">
                    <span className="text-4xl font-bold">15+</span>
                    <p className="text-sm font-medium mt-1">Years of<br />Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gt-light-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gt-blue-dark mt-2 mb-4">
                What We Stand For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-2xl shadow-card hover:shadow-hover transition-all text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <value.icon size={28} className="text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gt-blue-dark mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us help you plan your perfect vacation. Contact us today!
            </p>
            <Button variant="accent" size="xl">
              Contact Us
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
