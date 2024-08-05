import SearchBar from "../../components/searchBar/SearchBar";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {motion} from 'framer-motion'
import "./homePage.scss";


function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [popupsVisibility, setPopupsVisibility] = useState(false)

  const handleVisibStatus = (status) => {
    setPopupsVisibility(status)
  }

  const imgVariants = {
    visible:{opacity:1,x:80,transition:{type:"spring",stiffness:100,damping:10}},
    hidden:{opacity:0}
}
  const contentVariants = {
    visible:{opacity:1,y:70,transition:{type:"spring",stiffness:100,damping:10}},
    hidden:{opacity:0}
  }
  return (
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
        <img src="/bg.png" alt="" />
      </motion.div>
      
    </div>
  );
}

export default HomePage;
