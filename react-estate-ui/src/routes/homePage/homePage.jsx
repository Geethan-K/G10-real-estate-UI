import SearchBar from "../../components/searchBar/SearchBar";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion, useAnimation } from 'framer-motion';
import Featured from "../../components/featured/featured";
import SmoothScroll from "../../components/smoothScroll/smoothScroll";
import Section1 from "../../components/sections/section1/section";
import Section from "../../components/scroll-components/section1/section1";
import Section2 from "../../components/sections/section2/section";
import Section3 from "../../components/sections/section3/section";
import PropertyList from "../../components/property-list/propertyList";
import FeaturedProperties from "../../components/featured-properties/featuredProperties";
import "./homePage.scss";


function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [popupsVisibility, setPopupsVisibility] = useState(false)
  const images = ['/container1.png', '/container2.png', '/house.png', '/villa.webp']
  const [currentIndex, setCurrentIndex] = useState(0)

  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 1 } }).then(() =>
      controls.start({ opacity: 0, transition: { duration: 1, delay: 1 } })
    );
  }, [currentIndex, controls]);


  const handleVisibStatus = (status) => {
    setPopupsVisibility(status)
  }

  const imgVariants = {
    visible: { opacity: 1, x: 80, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hidden: { opacity: 0 }
  }
  const contentVariants = {
    visible: { opacity: 1, y: 70, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hidden: { opacity: 0 }
  }
  return (
    <div>
      <div className="homePage" onClick={() => handleVisibStatus(false)}>
        <motion.div variants={contentVariants} animate={"visible"} className="box textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              explicabo suscipit cum eius, iure est nulla animi consequatur
              facilis id pariatur fugit quos laudantium temporibus dolor ea
              repellat provident impedit!
            </p>
            <SearchBar popupsVisibility={popupsVisibility} handleVisibStatus={handleVisibStatus} />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="box imgContainer"
          variants={imgVariants}
          animate={"visible"}
        >
          {/* <img src="/bg.png" alt="" /> */}
          {
            images.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Slide ${index}`}

                initial={{ opacity: 0 }}
                animate={index === currentIndex ? controls : { opacity: 0 }}
              />
            ))
          }
        </motion.div>

      </div>
      <div>
        <div className="body-content">
          <SmoothScroll />
        </div>
        <div className="featured-content">
          <Featured />
        </div>
        <div className="body-content">
          <Section2 />
        </div>
        <div className="body-content">
          <PropertyList />
        </div>
        <div className="body-content">
          <Section3 />
        </div>
        <div className="body-content">
          <FeaturedProperties />
        </div>
      </div>
    </div>


  );
}

export default HomePage;
