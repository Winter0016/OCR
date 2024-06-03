import React, { useRef, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from "../imgs/img"; // Adjust the path according to your file structure

function About() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand', // or 'progressive'
  };

  const slides = [
    { id: 1, src: img.hoadonocr, alt: 'Image 1' },
    { id: 2, src: img.profile, alt: 'Image 2' },
    { id: 3, src: img.invoice, alt: 'Image 3' },
  ];

  useEffect(() => {
    if (sliderRef.current) {
      console.log('Slider reference:', sliderRef.current);
      console.log('Slides:', slides);
    }
  }, [sliderRef, slides]);

  return (
    <div className="border-2 pt-[20rem]">
      <Slider ref={sliderRef} {...settings}>
        {slides.map(slide => (
          <div key={slide.id}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default About;
