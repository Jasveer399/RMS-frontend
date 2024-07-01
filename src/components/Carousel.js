import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  // Function to go to the next image
  const next = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // Set up the interval for auto-sliding
  useEffect(() => {
    const timer = setInterval(next, 3000); // Change image every 3 seconds
    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [current, images.length]);

  return (
    <div className="relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`absolute transition-opacity duration-500 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <button onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)} className=" hidden absolute left-0 z-10">
        Prev
      </button>
      <button onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)} className=" hidden absolute right-0 z-10">
        Next
      </button>
    </div>
  );
};

export default Carousel;
