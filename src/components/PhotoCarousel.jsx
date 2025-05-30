import { useRef, useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509233725247-49e657c61113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517816428104-380fd9864d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

function PhotoCarousel() {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle drag start
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setVelocity(0);
    carouselRef.current.style.cursor = 'grabbing';
  };

  // Handle drag movement
  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced drag sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
    setVelocity(walk);
  };

  // Handle drag end with momentum
  const handleMouseUp = () => {
    if (!carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    // Apply momentum
    const momentum = setInterval(() => {
      carouselRef.current.scrollLeft -= velocity * 0.05;
      setVelocity((prev) => prev * 0.95);
      if (Math.abs(velocity) < 0.1) clearInterval(momentum);
    }, 16);
  };

  const handleMouseLeave = () => {
    if (!carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
  };

  // Track active image for animations
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollPos = carouselRef.current.scrollLeft;
      const imageWidth = carouselRef.current.offsetWidth * 0.3; // Approximate image width
      const newIndex = Math.round(scrollPos / imageWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), images.length - 1));
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Photo Carousel</h2>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide select-none"
        style={{ scrollBehavior: 'smooth' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`flex-shrink-0 snap-center w-80 h-80 mx-4 transition-all duration-300 ease-in-out ${
              index === activeIndex
                ? 'scale-110 z-10 opacity-100'
                : 'scale-95 opacity-80'
            } hover:scale-105 hover:opacity-100 hover:shadow-xl`}
            style={{
              transform: isDragging && index === activeIndex ? `rotate(${velocity * 0.05}deg)` : 'none',
            }}
          >
            <img
              src={src}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoCarousel;