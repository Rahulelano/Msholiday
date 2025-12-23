import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    destination: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', formData);
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        destination: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="text-primary-foreground">
            <span className="text-accent font-semibold uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
              Book Your Dream Vacation Today!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Have questions about our tour packages? Want to customize your trip?
              Fill out the form and our travel experts will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Phone size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Call Us</p>
                  <a href="tel:+917305937716" className="text-lg font-semibold hover:text-accent transition-colors">
                    +91 7305937716
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Email Us</p>
                  <a href="mailto:mail@msholidays.net" className="text-lg font-semibold hover:text-accent transition-colors">
                    mail@msholidays.net
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <MapPin size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Visit Us</p>
                  <p className="text-lg font-semibold">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-6 md:p-8 shadow-hover">
            <h3 className="text-2xl font-bold text-gt-blue-dark mb-6">
              Send Your Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
                <Input
                  name="city"
                  placeholder="City of Residence"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>
              <Input
                name="destination"
                placeholder="Preferred Destination"
                value={formData.destination}
                onChange={handleChange}
                className="h-12"
              />
              <Textarea
                name="message"
                placeholder="Your Message / Requirements"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Send size={18} className="mr-2" />}
                {loading ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
