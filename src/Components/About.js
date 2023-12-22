// AboutPage.js
import React from 'react';
import './About.css';
import ImageSlider from './ImageSlider';


function About() {
  const imageUrls = [
    'https://seofiles.s3.amazonaws.com/seo/media/cache/7d/46/7d46eb2e10fb3d3e95b5c2c5bb1ddb61.jpg', // Placeholder image 1
    'https://www.investopedia.com/thmb/CfU_KTClPyVxzKIfzkHjCcy7qqo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/financial-independence-retire-early-fire-c928050718c9429584e88a5df23ebb1d.jpg', // Placeholder image 2
    'https://www.canarahsbclife.com/content/dam/choice/blog-inner/images/what-are-financial-goals-meaning-types-and-benefits.jpg', 
    // Add more image URLs as needed
  ];
  return (

    <>
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <div className="about-content">
        <h3>FIRE(Financial Independence, Retire Early)</h3>

        <p>

        </p>
        <p>
          p2
        </p>
        <ImageSlider imageUrls={imageUrls} />
      </div>
    </div>
   
    </>
  );
}

export default About;

