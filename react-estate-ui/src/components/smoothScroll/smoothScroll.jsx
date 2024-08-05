// src/components/SmoothScroll.js

import React from 'react';
import Section1 from '../sections/section1/section';
// import Section2 from './Section2';
// import Section3 from './Section3';
import '../smoothScroll/smoothScroll.scss';
import Featured from '../featured/featured';

const SmoothScroll = () => {
  return (
    <div className="container">
      <Section1 />
      
      {/* <Section2 />
      <Section3 /> */}
      {/* Add more sections as needed */}
    </div>
  );
};

export default SmoothScroll;
