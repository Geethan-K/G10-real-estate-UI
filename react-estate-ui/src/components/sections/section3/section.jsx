// src/components/Section1.js

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion"
import '../section1/section.scss';

const Section3 = () => {
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
      <animated.div className="txt-content" style={imageProps}>
        <h2>Share or rent your office spaces </h2>
        <p>For creating a trustable network , Community with an effective way of cost cutting </p>
        <p>
          To ensure that the .content div completely occupies the first screen and only shows the .body-content divs when the user starts scrolling down, you can adjust your CSS and JavaScript accordingly. Here's how you can achieve this:

          Update the layout.scss:
          Ensure that the .content div takes up the full viewport height and adjust the positioning of the .body-content divs so that they start below the viewport.

        </p>
      </animated.div>
      <motion.div className="image " style={contentProps} animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: 1,
     // repeat: Infinity,
      repeatDelay: 1
    }}
    >
      <div  className='gallery' >
        <img src="/shared-office.png" alt="" className="src" style={{ width: '100%', height: '100%' }} />
        <img src="/co-work-space.gif" alt="" className="src" style={{ width: '100%', height: '100%' }}/>
        <img src="/free-workspace.gif" alt="" className="src" style={{ width: '100%', height: '100%' }}/>
        <img src="/free-workspace.webp" alt="" className="src" style={{ width: '100%', height: '100%' }} />
      </div>
        {/* <div className='gallery'>
          <img src="/co-work-space.gif" alt="Section 3" style={{ width: '100%', height: '100%' }} />
          <img src="/co-work-space.gif" alt="Section 3" style={{ width: '100%', height: '100%' }} />
          <img src="/co-work-space.gif" alt="Section 3" style={{ width: '100%', height: '100%' }} />
          <img src="/co-work-space.gif" alt="Section 3" style={{ width: '100%', height: '100%' }} />
        </div> */}

      </motion.div>
    </div>
  );
};

export default Section3;
