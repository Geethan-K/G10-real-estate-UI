// src/components/Section1.js

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import '../section2/section.scss';

const Section2 = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const contentProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(-1000px)',
    config: { duration: 2500, easing: (t) => t * t * t }
  });

  const imageProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(1000px)',
    config: { duration: 2500, easing: (t) => t * t * t }
  });

  return (
    <div className="section1" ref={ref}>
         <animated.div className="image" style={imageProps} draggable="true" >
           <img src="/co-living.webp" alt="Section 2" style={{height:'120%'}}/>
      </animated.div>
      <animated.div className="txt-content" style={contentProps}>
        <h2>Budget friendly Co-living , shared rooms , Paying Guests and much more...</h2>
        <p>This is the first section content.</p>
        <p>
          To ensure that the .content div completely occupies the first screen and only shows the .body-content divs when the user starts scrolling down, you can adjust your CSS and JavaScript accordingly.
          Here's how you can achieve this:
        </p>
      </animated.div>
     
    </div>
  );
};

export default Section2;
