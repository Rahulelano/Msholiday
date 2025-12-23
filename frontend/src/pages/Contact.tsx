import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import heroDubai from "@/assets/hero-dubai.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98944 54717", "+91 73059 37716 (WhatsApp)"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@msholidays.net"],
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: ["246, Uthukuli Rd, Nethaji Nagar", "Karumarpalayam, Tiruppur 641602"],
    },
    {
      icon: MapPin,
      title: "Branch Office",
      details: ["No 230A / 4, 1st floor, Shanmuga bakery building", "Muthaiya nagar, Saradha mill road", "Kuruchi, Sundrapuram, Coimbatore 641024"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={heroDubai}
            alt="Contact MS Holidays"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gt-blue-dark/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-primary-foreground/80">
                We'd love to hear from you
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-gt-light-bg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-2xl shadow-card hover:shadow-hover transition-all text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <info.icon size={24} className="text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gt-blue-dark mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground">{detail}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <span className="text-accent font-semibold uppercase tracking-wider">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gt-blue-dark mt-2 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our tour packages? Want to customize your trip?
                  Fill out the form and our travel experts will get back to you within 24 hours.
                </p>
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
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                    />
                    <Input
                      name="subject"
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                  <Textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                  />
                  <Button type="submit" variant="accent" size="lg">
                    <Send size={18} />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div>
                <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-card">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4471652098146!2d80.2121!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTInNDMuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MS Holidays Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
