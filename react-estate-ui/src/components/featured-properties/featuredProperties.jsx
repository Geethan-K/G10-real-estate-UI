import './featuredProperties.scss'
import { motion, useScroll, useTransform } from 'framer-motion'
const FeaturedProperties = () => {
    const { scrollYProgress } = useScroll();

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <div className="fp" >
            {
                [...Array(6)].map((_, i) => {
                 //   const opacity = useTransform(scrollYProgress, [i * 0.25, (i + 1) * 0.25], [0, 1]);
                    return (
                        <motion.div
                            className="fpItem" whileHover={{ scale: 1.2 }}
                            key={i}
                        //    style={{ opacity }}
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="fpImg" />
                            <span className="fpName">ITC Grand Choza</span>
                            <span className="fpCity">Trichy</span>
                            <span className="fpPrice">Starting from $12000</span>
                            <div className="fpRating">
                                <button>4.5</button>
                                <span>Excellent</span>
                            </div>
                        </motion.div>
                    )
                })
            }
        </div>
    )
}

export default FeaturedProperties