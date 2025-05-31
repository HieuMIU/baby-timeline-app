import React, { useRef, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Restaurant, TempleBuddhist, BabyChangingStation ,BeachAccess ,FilterVintage, Pool, Cake, DirectionsWalk, Favorite, EmojiTransportation, Home, AcUnit, FlightTakeoff, Diversity3 } from '@mui/icons-material';
import { TIMELINE_EVENTS } from '../../data';
import './Timeline.css';

function Timeline() {
  // Map icon names to components
  const iconMap = {
    Restaurant: <Restaurant />,
    TempleBuddhist: <TempleBuddhist />,
    BeachAccess: <BeachAccess />,
    FilterVintage: <FilterVintage />,
    Pool: <Pool />,
    Diversity3: <Diversity3 />,
    FlightTakeoff: <FlightTakeoff />,
    AcUnit: <AcUnit />,
    Cake: <Cake />,
    Home : <Home />,
    Favorite: <Favorite />,
    DirectionsWalk: <DirectionsWalk />,
    BabyChangingStation: <BabyChangingStation />,
    EmojiTransportation: <EmojiTransportation />
  };

  return (
    <section className="timeline">
      <h2 className="timeline-title">Cột Mốc Đáng Nhớ Của Evy</h2>
      <VerticalTimeline>
        {TIMELINE_EVENTS.map((event, index) => {
          const carouselRef = useRef(null);
          const [isDragging, setIsDragging] = useState(false);
          const [startX, setStartX] = useState(0);
          const [scrollLeft, setScrollLeft] = useState(0);

          const handleMouseDown = (e) => {
            if (!carouselRef.current) return;
            setIsDragging(true);
            setStartX(e.pageX - carouselRef.current.offsetLeft);
            setScrollLeft(carouselRef.current.scrollLeft);
            carouselRef.current.style.cursor = 'grabbing';
          };

          const handleMouseMove = (e) => {
            if (!isDragging || !carouselRef.current) return;
            e.preventDefault();
            const x = e.pageX - carouselRef.current.offsetLeft;
            const walk = (x - startX) * 1.5;
            carouselRef.current.scrollLeft = scrollLeft - walk;
          };

          const handleMouseUp = () => {
            if (!carouselRef.current) return;
            setIsDragging(false);
            carouselRef.current.style.cursor = 'grab';
          };

          const handleMouseLeave = () => {
            if (!carouselRef.current) return;
            setIsDragging(false);
            carouselRef.current.style.cursor = 'grab';
          };

          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--milestone"
              contentStyle={{ background: event.backgroundColor, color: '#fff' }}
              contentArrowStyle={{ borderRight: `7px solid ${event.backgroundColor}` }}
              date={event.date}
              iconStyle={{ background: event.backgroundColor, color: '#fff' }}
              icon={iconMap[event.icon]}
            >
              <h3 className="vertical-timeline-element-title">{event.title}</h3>
              <div
                ref={carouselRef}
                className="timeline-image-carousel"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {event.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${event.title} ${imgIndex + 1}`}
                    className="timeline-carousel-image"
                  />
                ))}
              </div>
              <h4 className="vertical-timeline-element-subtitle">{event.location}</h4>
              <p>{event.description}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </section>
  );
}

export default Timeline;