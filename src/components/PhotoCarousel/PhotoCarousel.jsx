import { useRef, useState, useEffect } from 'react';
import { LOOP_IMAGES } from '../../data';
import './PhotoCarousel.css';

const baseImages = LOOP_IMAGES;
const images = Array(5).fill(baseImages).flat();

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
    <div className="carousel-container">
      <h2 className="carousel-title">Evy vẫn còn rất nhiều ảnh nữa...</h2>
      <div
        ref={carouselRef}
        className="carousel-track"
        style={{ scrollBehavior: 'smooth' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index % baseImages.length === activeIndex ? 'active' : ''
            }`}
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
              className="carousel-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoCarousel;