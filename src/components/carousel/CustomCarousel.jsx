import { useState, useEffect } from 'react';

const CustomCarousel = ({ carouselImgSrc = [], interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImgSrc.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, carouselImgSrc]);

  return (
    <div>
      <div className="carousel w-full">
        {carouselImgSrc.map((image, index) => (
          <div key={image.id} id={`item${image.id}`} className={`carousel-item w-full ${index === activeIndex ? 'active' : ''}`}>
            <img src={image.url} className="w-full" alt={`carousel-item-${image.id}`} />
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {carouselImgSrc.map((image) => (
          <a key={image.id} id={image.id} href={`#item${image.id}`} className="btn btn-xs">
            {image.id}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
