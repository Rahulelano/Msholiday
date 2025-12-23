import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
    "/1000162444.jpg",
    "/1000162443.jpg",
    "/1000162442.jpg",
    "/1000162441.jpg",
    "/1000162440.jpg",
    "/1000162439.jpg",
    "/1000162438.jpg",
    "/1000162437.jpg",
    "/1000162436.jpg",
    "/1000162433.jpg",
    "/1000162215.mp4",
    "/1000162213.mp4",
    "/1000162212.jpg",
    "/1000162211.jpg",
    "/1000162209.jpg",
    "/1000162210.jpg",
    "/1000162208.jpg",
    "/1000162207.jpg",
    "/1000162206.jpg",
    "/1000162203.jpg",
    "/1000162135.jpg",
    "/1000162133.jpg",
    "/1000162131.jpg",
    "/1000162129.jpg",
    "/1000162127.jpg",
    "/1000162123.jpg",
    "/1000162106.jpg",
    "/1000162105.jpg",
    "/1000162104.jpg",
    "/1000162099.jpg",
    "/1000162098.jpg",
    "/1000162097.jpg",
    "/1000162091.jpg",
    "/1000162092.jpg",
    "/1000162095.jpg",
    "/1000162096.jpg"
];

const GallerySection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % galleryItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    };

    // Calculate indices for 7 visible items (increase from 5 to allow smooth entry/exit)
    const getVisibleIndices = () => {
        const total = galleryItems.length;
        const indices = [];
        // We want centered item at activeIndex.
        // We show 3 left, 1 center, 3 right.
        for (let i = -3; i <= 3; i++) {
            indices.push((activeIndex + i + total) % total);
        }
        return indices;
    };

    const visibleIndices = getVisibleIndices();

    return (
        <section className="py-20 bg-background overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gt-blue-dark mb-4 font-serif">
                        My Visual Diary
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        See the world through my lens: adventures in photos and videos
                    </p>
                </div>

                {/* Carousel Visual */}
                <div className="relative h-[500px] flex items-center justify-center">

                    {/* Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-20 z-40 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all text-gt-blue-dark"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-20 z-40 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all text-gt-blue-dark"
                        aria-label="Next image"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="flex items-center justify-center w-full px-4 perspective-1000 relative">

                        {visibleIndices.map((index, i) => {
                            // i goes 0 to 6. 3 is center.
                            const isCenter = i === 3;
                            const isLeftInner = i === 2;
                            const isRightInner = i === 4;
                            const isLeftOuter = i === 1;
                            const isRightOuter = i === 5;
                            const isFarLeft = i === 0;
                            const isFarRight = i === 6;

                            let classes = "transition-all duration-700 ease-in-out absolute rounded-[32px] overflow-hidden shadow-2xl bg-white";
                            let styles = {};

                            if (isCenter) {
                                classes += " z-30 w-[300px] h-[400px] md:w-[400px] md:h-[500px] scale-100 opacity-100 ring-4 ring-white";
                                styles = { transform: 'translateX(0)' };
                            } else if (isLeftInner) {
                                classes += " z-20 w-[250px] h-[350px] md:w-[300px] md:h-[400px] scale-90 opacity-80 cursor-pointer hidden sm:block";
                                styles = { transform: 'translateX(-60%) rotateY(15deg) scale(0.9)' };
                            } else if (isRightInner) {
                                classes += " z-20 w-[250px] h-[350px] md:w-[300px] md:h-[400px] scale-90 opacity-80 cursor-pointer hidden sm:block";
                                styles = { transform: 'translateX(60%) rotateY(-15deg) scale(0.9)' };
                            } else if (isLeftOuter) {
                                classes += " z-10 w-[200px] h-[300px] md:w-[250px] md:h-[300px] scale-75 opacity-40 hidden md:block";
                                styles = { transform: 'translateX(-120%) rotateY(25deg) scale(0.8)' };
                            } else if (isRightOuter) {
                                classes += " z-10 w-[200px] h-[300px] md:w-[250px] md:h-[300px] scale-75 opacity-40 hidden md:block";
                                styles = { transform: 'translateX(120%) rotateY(-25deg) scale(0.8)' };
                            } else if (isFarLeft) {
                                classes += " z-0 w-[200px] h-[300px] scale-50 opacity-0 pointer-events-none";
                                styles = { transform: 'translateX(-180%) rotateY(35deg) scale(0.5)' };
                            } else if (isFarRight) {
                                classes += " z-0 w-[200px] h-[300px] scale-50 opacity-0 pointer-events-none";
                                styles = { transform: 'translateX(180%) rotateY(-35deg) scale(0.5)' };
                            }

                            const item = galleryItems[index];
                            const isVideo = item.endsWith('.mp4');

                            return (
                                <div
                                    key={index}
                                    className={classes}
                                    style={styles}
                                    onClick={() => {
                                        if (isLeftInner) prevSlide();
                                        if (isRightInner) nextSlide();
                                    }}
                                >
                                    {isVideo ? (
                                        <video src={item} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                                    ) : (
                                        <img src={item} alt="Gallery" className="w-full h-full object-cover" />
                                    )}

                                    {/* Overlay for center content or video icon */}
                                    {isVideo && !isCenter && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                                <Play className="w-5 h-5 text-white fill-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
