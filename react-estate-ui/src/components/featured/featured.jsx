import "../featured/featured.scss"
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const Featured = () => {
    const [ref, inView] = useInView({ triggerOnce: true });
    const props = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(100px)',
    })
    return (
        <animated.div className="section" ref={ref} style={props}>
            <div>
                <h2>Featured</h2>
            </div>
            <div className="featured">
                <div className="featuredItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Trichy</h1>
                        <h2>123 properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <span className="title">
                            <h1>Thanjavur</h1>
                            <h2>123 properties</h2>
                        </span>

                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Kumbakonam</h1>
                        <h2>123 properties</h2>
                    </div>
                </div>
            </div>
        </animated.div>

    )
}

export default Featured