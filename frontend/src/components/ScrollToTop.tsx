import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
            <Button
                onClick={scrollToTop}
                size="icon"
                className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 transition-transform hover:-translate-y-1"
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default ScrollToTop;
