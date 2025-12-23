import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LegalPageProps {
    type: "faqs" | "terms" | "privacy" | "cancellation";
}

const content = {
    faqs: {
        title: "Frequently Asked Questions",
        lastUpdated: "January 1, 2024",
        body: (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gt-blue-dark mb-2">How do I book a tour?</h3>
                    <p className="text-muted-foreground">You can book a tour by selecting your desired package and clicking the "Book Now" button. Alternatively, you can contact us directly via phone or WhatsApp.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gt-blue-dark mb-2">What payment methods do you accept?</h3>
                    <p className="text-muted-foreground">We accept all major credit/debit cards, net banking, and UPI payments.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gt-blue-dark mb-2">Is travel insurance included?</h3>
                    <p className="text-muted-foreground">Travel insurance coverage varies by package. Please check the specific package inclusions or contact our support team for details.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gt-blue-dark mb-2">Can I customize my tour package?</h3>
                    <p className="text-muted-foreground">Yes! We specialize in customized tour packages. Contact our travel experts to tailor a trip to your specific needs and budget.</p>
                </div>
            </div>
        )
    },
    terms: {
        title: "Terms & Conditions",
        lastUpdated: "January 1, 2024",
        body: (
            <div className="space-y-4 text-muted-foreground">
                <p>Welcome to MS Holidays. By using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>
                <p>1. <strong>Booking & Payments:</strong> A deposit is required to confirm your booking. Full payment must be made prior to the departure date as per the specific package terms.</p>
                <p>2. <strong>Documents:</strong> It is the traveler's responsibility to ensure they have valid passports, visas, and other necessary travel documents.</p>
                <p>3. <strong>Liability:</strong> MS Holidays acts only as an agent for the various independent suppliers that provide hotel accommodations, transportation, sightseeing, activities, or other services connected with this itinerary.</p>
                <p>4. <strong>Changes:</strong> We reserve the right to alter itineraries, modify arrangements, or change hotels if necessary due to unforeseen circumstances.</p>
            </div>
        )
    },
    privacy: {
        title: "Privacy Policy",
        lastUpdated: "January 1, 2024",
        body: (
            <div className="space-y-4 text-muted-foreground">
                <p>At MS Holidays, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
                <p><strong>Information Collection:</strong> We collect information necessary to process your booking, such as your name, contact details, and payment information.</p>
                <p><strong>Use of Information:</strong> Your information is used to facilitate your travel arrangements and to communicate with you regarding your booking and our services.</p>
                <p><strong>Data Protection:</strong> We implement specialized security measures to protect your personal data against unauthorized access or disclosure.</p>
            </div>
        )
    },
    cancellation: {
        title: "Cancellation Policy",
        lastUpdated: "January 1, 2024",
        body: (
            <div className="space-y-4 text-muted-foreground">
                <p>We understand that plans can change. Our cancellation policy is designed to be as fair as possible.</p>
                <p><strong>Standard Cancellation Charges:</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>30 days or more before departure: 10% of total tour cost</li>
                    <li>15-29 days before departure: 25% of total tour cost</li>
                    <li>7-14 days before departure: 50% of total tour cost</li>
                    <li>Less than 7 days before departure: 100% of total tour cost</li>
                </ul>
                <p className="mt-4">Please note that specific packages (especially international ones) may have stricter cancellation terms imposed by airlines or hotels.</p>
            </div>
        )
    }
};

const LegalPage = ({ type }: LegalPageProps) => {
    const pageContent = content[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gt-light-bg py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <Link to="/">
                        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <div className="bg-background rounded-2xl shadow-card p-8 md:p-12 max-w-4xl mx-auto border border-border">
                        <h1 className="text-3xl md:text-4xl font-bold text-gt-blue-dark mb-4">
                            {pageContent.title}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                            Last Updated: {pageContent.lastUpdated}
                        </p>
                        <div className="prose prose-blue max-w-none">
                            {pageContent.body}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LegalPage;
