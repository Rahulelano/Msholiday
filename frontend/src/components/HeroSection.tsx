import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBeach from "@/assets/hero-beach.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import heroDubai from "@/assets/hero-dubai.jpg";

const slides = [
  {
    image: heroDubai,
    bigTitle: "DUBAI",
    location: "UAE",
    title: "Life-Changing",
    subtitle: "Travel Experiences",
    description: "Discover the world's most beautiful destinations with MS Holidays. Experience luxury travel at unbeatable prices.",
  },
  {
    image: heroMountains,
    bigTitle: "SWITZERLAND",
    location: "Europe",
    title: "Extraordinary",
    subtitle: "Adventures Await",
    description: "Create unforgettable memories with our handcrafted tour packages. majestic mountains and serene lakes await you.",
  },
  {
    image: heroBeach,
    bigTitle: "MALDIVES",
    location: "Indian Ocean",
    title: "Adventurous",
    subtitle: "Journeys Begin Here",
    description: "Experience the ultimate island getaway with pristine beaches and crystal clear waters.",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getNextSlideIndex = (offset: number) => {
    return (currentSlide + offset) % slides.length;
  };

  return (
    <section className="relative h-[600px] md:h-[650px] lg:h-[750px] w-full overflow-hidden">
      {/* Background Image */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid grid-cols-12 gap-2 md:gap-8 h-full items-center pt-12">

          {/* Left Side Content */}
          <div className="col-span-8 md:col-span-7 flex flex-col justify-center h-full">
            <div className="relative pl-4 md:pl-12 border-l border-white/30 py-4">
              <span className="absolute -left-[9px] top-0 text-white/80 font-serif text-[10px] md:text-sm">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-none tracking-tight mb-2 md:mb-6 animate-fade-in break-words">
                {slides[currentSlide].bigTitle}
              </h1>

              <p className="text-white/90 text-xs md:text-xl max-w-xl mb-4 md:mb-8 leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <Button
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm h-8 md:h-12 px-4 md:px-6 rounded-none text-xs md:text-base transition-all w-fit"
                >
                  Explore <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                </Button>

                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-4 md:w-8 h-[1px] bg-white/50"></div>
                  <span className="uppercase tracking-widest text-[10px] md:text-sm whitespace-nowrap">{slides[currentSlide].location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Cards (Preview) */}
          <div className="col-span-4 md:col-span-5 flex gap-2 md:gap-6 justify-end items-end h-3/4 pb-12">
            {/* Next Slide Card 1 */}
            <div className="relative w-full max-w-[140px] md:max-w-[224px] h-32 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 group cursor-pointer transition-transform hover:-translate-y-2" onClick={nextSlide}>
              <img
                src={slides[getNextSlideIndex(1)].image}
                alt="Next"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 text-white">
                <h3 className="font-serif text-sm md:text-xl mb-1 truncate">{slides[getNextSlideIndex(1)].bigTitle}</h3>
                <div className="flex gap-1 justify-start md:justify-center hidden md:flex">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Next Slide Card 2 - Offset - Hidden on very small screens if needed, but keeping for "exact" look */}
            <div className="relative w-full max-w-[140px] md:max-w-[224px] h-[10rem] md:h-[22rem] rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 group cursor-pointer mt-0 md:mt-12 transition-transform hover:-translate-y-2 hidden sm:block" onClick={() => setCurrentSlide(getNextSlideIndex(2))}>
              <img
                src={slides[getNextSlideIndex(2)].image}
                alt="Next"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 text-white">
                <h3 className="font-serif text-sm md:text-xl mb-1 truncate">{slides[getNextSlideIndex(2)].bigTitle}</h3>
                <div className="flex gap-1 justify-start md:justify-center hidden md:flex">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Nav Buttons within the right section area */}
            <div className="absolute bottom-12 right-4 flex gap-2 md:gap-4 z-20">
              <button onClick={prevSlide} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm">
                <ChevronLeft size={14} className="md:w-4 md:h-4" />
              </button>
              <button onClick={nextSlide} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm">
                <ChevronRight size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

