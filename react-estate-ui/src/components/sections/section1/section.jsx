// src/components/Section1.js

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import '../section1/section.scss';

const Section1 = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const floatAnimation = {
    y: [0, -20, 0], // Vertical floating effect
    transition: {
      duration: 4, // Total duration of one cycle
      ease: 'easeInOut', // Easing function
      repeat: Infinity, // Infinite loop
      repeatType: 'mirror', // Reverse direction on each cycle
    },
  };
  const contentProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(1000px)',
    config: { duration: 2500, easing: (t) => t * t * t }
  });

  const imageProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-1000px)',
    config: { duration: 2500, easing: (t) => t * t * t }
  });

  return (
    <div className="section1" ref={ref}>
      <animated.div className="txt-content" style={contentProps}>
        <h2>Budget & Eco Friendly Container shops and houses</h2>
        <p>This is the first section content.</p>
        <p>
          To ensure that the .content div completely occupies the first screen and only shows the .body-content divs when the user starts scrolling down, you can adjust your CSS and JavaScript accordingly. Here's how you can achieve this:

          Update the layout.scss:
          Ensure that the .content div takes up the full viewport height and adjust the positioning of the .body-content divs so that they start below the viewport.

        </p>
      </animated.div>
      <animated.div className="image" style={imageProps}   animate={floatAnimation}>
        <img src="/containershop.png" alt="Section 1" />
      </animated.div>
    </div>
  );
};

export default Section1;
