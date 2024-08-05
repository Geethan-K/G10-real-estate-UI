import { motion,useScroll,useTransform } from 'framer-motion'
import { useState,useRef } from 'react'
const Section = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const variants = {
        visible: { opacity: 1, x: 800, transition: { type: "spring", stiffness: 100, damping: 100 } },
        hidden: { opacity: 0 }
    }
    const {scrollYProgress} = useScroll({
        target:ref,
        offset:["start start","end start"]
    })
    const yBg = useTransform(scrollYProgress,[0,1],["0%","100%"])
    const yText = useTransform(scrollYProgress,[0,1],["0%","100%"])
    return (
        <div className='content' ref={ref}>
           
                <motion.div className='content' style={{y:yText}}>
                    <h2>Section 1</h2>
                    <p>This is the first section content.</p>
                    <p>
                        To ensure that the .content div completely occupies the first screen and only shows the .body-content divs when the user starts scrolling down, you can adjust your CSS and JavaScript accordingly. Here's how you can achieve this:

                        Update the layout.scss:
                        Ensure that the .content div takes up the full viewport height and adjust the positioning of the .body-content divs so that they start below the viewport.

                        Add JavaScript to control the initial visibility and scrolling:
                        Use JavaScript to handle the transition from the .content div to the first .body-content div when the user starts scrolling.
                    </p>
                </motion.div>
                <motion.div className='building' style={{x:yBg}}>
                    <img src="/apartment.png" alt="" className="src" />
                </motion.div>
        
        </div>
    )
}
export default Section