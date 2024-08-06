import "../featured/featured.scss"
import React,{useEffect} from 'react';
import { useSpring, animated } from '@react-spring/web';
import { InView, useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion'
const Featured = () => {
    const [ref, inView] = useInView({ triggerOnce: true });
    const controlAnimation = useAnimation()
    const props = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(100px)',
        scale: inView ? 1 : 0
    })
    const objProperties = [
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Chennai",
            count: 123
        },
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Bangalore",
            count: 123
        },
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Hydrabad",
            count: 123
        },
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Pune",
            count: 123
        },
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Delhi",
            count: 123
        },
        {
            img_src: "https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg",
            city: "Delhi",
            count: 123
        },
    ]
    useEffect(() => {
        const sequence = async () => {
            objProperties.map(async (element) => {
                await controlAnimation.start((i) => ({
                   initial:{opacity:0.5,scale:0.5},
                   transition:{duration:2},
                   whileInView:{opacity:1,scale:2}
                }))
            })
        }
        sequence();
    }, [controlAnimation])
    return (
        <animated.div className="section" ref={ref} >
            <div>
                <h2>Featured</h2>
            </div>
            <div className="featured" >
                {
                    objProperties.map((prop, i) => {
                        return (
                            <motion.div whileHover={{ scale: 1.2 }}
                                className="featuredItem"
                                animate={controlAnimation}
                                key={i}
                            >
                                <img src={prop.img_src} alt="" className="featuredImg" />
                                <div className="featuredTitles">
                                    <h1>{prop.city}</h1>
                                    <h2>{prop.count}</h2>
                                </div>
                            </motion.div>
                        )
                    })
                }


            </div>
        </animated.div>

    )
}

export default Featured