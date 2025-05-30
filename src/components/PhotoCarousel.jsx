import { useRef, useState, useEffect } from 'react';
import image1 from '../assets/evy.jpg';
import image2 from '../assets/evy-2.jpg';
import image3 from '../assets/evy-3.jpg';
import image4 from '../assets/evy-4.jpg';
import image5 from '../assets/evy-5.jpg';
import image6 from '../assets/evy-6.jpg';

const baseImages = [image1, image2, image3, image4, image5, image6];
// Repeat each image 5 times for continuous scrolling (windmill effect)
const images = Array(5).fill(baseImages).flat(); // 30 images total (6 images x 5 repetitions)

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
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    setVelocity(walk);
  };

  // Handle drag end with momentum
  const handleMouseUp = () => {
    if (!carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
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
      const imageWidth = carouselRef.current.offsetWidth * 0.3;
      const newIndex = Math.round(scrollPos / imageWidth) % baseImages.length;
      setActiveIndex((newIndex + baseImages.length) % baseImages.length);
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
            className={`flex-shrink-0 snap-center w-80 mx-4 transition-all duration-300 ease-in-out relative ${
              index % baseImages.length === activeIndex
                ? 'scale-110 z-10 opacity-100'
                : 'scale-95 opacity-80'
            } hover:scale-105 hover:opacity-100 hover:shadow-xl hover:z-20`}
            style={{
              transform:
                isDragging && index % baseImages.length === activeIndex
                  ? `rotate(${velocity * 0.05}deg)`
                  : 'none',
            }}
          >
            <img
              src={src}
              alt={`Photo ${(index % baseImages.length) + 1}`}
              className="w-80 h-80 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoCarousel;