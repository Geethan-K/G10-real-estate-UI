import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./likeButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ onLike,likedAlready }) => {
  const [isLiked, setIsLiked] = useState(likedAlready);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike && onLike(); // Call parent like function if passed

    // Trigger floating hearts if liked
    if (!isLiked) {
      const heartId = Date.now();
      setFloatingHearts((hearts) => [...hearts, heartId]);

      // Remove the heart after the animation
      setTimeout(() => {
        setFloatingHearts((hearts) => hearts.filter((id) => id !== heartId));
      }, 1000);
    }
  };

  return (
    <div className="like-button-container">
      {/* Like button with scaling effect */}
      <motion.button
        onClick={handleLike}
        initial={{ scale: 1 }}
        animate={{ scale: isLiked ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
        className={`like-button ${isLiked ? "liked" : ""}`}
      >
        <FontAwesomeIcon icon={faHeart} color={isLiked==true?'red':'gray'}/>
      </motion.button>

      {/* Floating Hearts Animation */}
      <div className="floating-hearts-container">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart}
              className="floating-heart"
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -80, scale: 1 }}
              exit={{ opacity: 0, y: -120 }}
              transition={{ duration: 1 }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LikeButton;
