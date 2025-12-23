import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/utils/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Calendar, CheckCircle2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from 'react-markdown';

// Fallback image
import indiaTour from "@/assets/india-tour.jpg";

interface Tour {
    _id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    duration: string;
    location: string;
    rating: number;
    category: string;
    detailedDescription?: string;
}

const TourDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const { data } = await api.get(`/tours/${id}`);
                setTour(data);
            } catch (error) {
                console.error("Failed to fetch tour", error);
                toast.error("Failed to load tour details.");
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
        window.scrollTo(0, 0);
    }, [id]);

    const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookingForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/inquiries', {
                ...bookingForm,
                subject: `Booking Inquiry for ${tour?.title}`
            });
            toast.success("Inquiry sent successfully! We will contact you soon.");
            setBookingForm({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            toast.error("Failed to send inquiry.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">Loading details...</div>
                <Footer />
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h2 className="text-2xl font-bold">Tour Not Found</h2>
                    <Link to="/"><Button>Go Home</Button></Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
                    <img
                        src={tour.image}
                        onError={(e) => (e.target as HTMLImageElement).src = indiaTour}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container mx-auto px-4 text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
                            <div className="flex justify-center items-center gap-6 text-lg">
                                <span className="flex items-center gap-2"><MapPin size={18} /> {tour.location}</span>
                                <span className="flex items-center gap-2"><Clock size={18} /> {tour.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar (Left) */}
                        <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">
                            {/* Navigation / Related Links */}
                            <div className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden">
                                <h3 className="bg-gray-50 px-4 py-3 font-bold text-lg border-b">Explore</h3>
                                <div className="flex flex-col">
                                    {['Kerala', 'Goa', 'Himachal', 'Andaman', 'Kashmir', 'Rajasthan', 'Ooty', 'Kodaikanal'].map((item) => (
                                        <Link
                                            key={item}
                                            to={`/india-tours/${item.toLowerCase()}`}
                                            className="px-4 py-3 border-b last:border-0 hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            {item}
                                            <span className="text-gray-300 group-hover:text-primary">&rsaquo;</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Inquiry Form */}
                            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-t-yellow-400 sticky top-24">
                                <h3 className="text-xl font-bold mb-2 text-center">Get the Guaranteed Best Vacation Deals</h3>
                                <p className="text-sm text-gray-500 text-center mb-6">from MS Holidays</p>

                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <Input name="name" placeholder="Name *" value={bookingForm.name} onChange={handleBookingChange} required className="bg-gray-50" />
                                    <Input name="email" type="email" placeholder="Email *" value={bookingForm.email} onChange={handleBookingChange} required className="bg-gray-50" />
                                    <Input name="phone" type="tel" placeholder="Phone Number *" value={bookingForm.phone} onChange={handleBookingChange} required className="bg-gray-50" />
                                    <Textarea name="message" placeholder="Vacation Type / Details *" value={bookingForm.message} onChange={handleBookingChange} required rows={3} className="bg-gray-50" />

                                    <Button type="submit" size="lg" className="w-full font-bold bg-yellow-400 hover:bg-yellow-500 text-black">
                                        Submit Inquiry
                                    </Button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="font-bold text-gray-700">Got a Question?</p>
                                    <p className="text-sm text-gray-500 mb-2">Call or WhatsApp us anytime</p>
                                    <a href="tel:+919940882200" className="text-lg font-bold text-gt-blue-dark block">+91 99408 82200</a>
                                    <a href="mailto:contact@msholidays.net" className="text-sm text-gray-600 block">contact@msholidays.net</a>
                                </div>
                            </div>
                        </div>

                        {/* Main Content (Right) */}
                        <div className="lg:col-span-3 space-y-8 order-1 lg:order-2">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100">
                                <h2 className="text-2xl md:text-3xl font-bold text-gt-blue-dark mb-6">{tour.title}</h2>

                                <div className="prose prose-lg max-w-none prose-headings:text-gt-blue-dark prose-headings:font-bold prose-img:rounded-xl prose-img:shadow-md prose-img:w-full prose-img:max-w-full prose-a:text-primary break-words overflow-hidden">
                                    <p className="lead">{tour.description}</p>

                                    {/* Markdown Content */}
                                    {tour.detailedDescription && (
                                        <ReactMarkdown
                                            components={{
                                                img: ({ node, ...props }) => <img {...props} className="w-auto max-h-[500px] mx-auto rounded-xl shadow-md my-4 max-w-full" />
                                            }}
                                        >
                                            {tour.detailedDescription}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mobile Fixed Bottom Bar */}
                <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-xl font-bold text-gt-blue-dark">{tour.price}</p>
                    </div>
                    <Button
                        size="lg"
                        className="bg-gt-yellow text-black hover:bg-yellow-500 font-bold"
                        onClick={() => {
                            // Scroll to booking form
                            const formElement = document.querySelector('form');
                            if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Book Now
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TourDetails;
