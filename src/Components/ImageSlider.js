// ImageSlider.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ imageUrls }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
