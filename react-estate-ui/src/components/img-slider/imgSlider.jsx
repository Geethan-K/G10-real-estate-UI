import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './imgSlider.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0);
    
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            handleNext()
        },5000)
        return ()=> clearInterval(intervalId)
    },[])

    const nextImg = () => {
        setCurrIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
    const prevImg = () => {
        setCurrIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
    const handleDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 500) {
            handlePrev();
        } else if (offset < -100 || velocity < -500) {
            handleNext();
        }
    };
    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="slider">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="slider-image"
                    custom={direction}
                    variants={variants}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    //  transition={{ duration: 0.5 }}
                    //   initial="enter"
                    //   animate="center"
                    //   exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                />
            </AnimatePresence>
            <button className="prev" onClick={prevImg}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <button className="next" onClick={nextImg}>
            <FontAwesomeIcon icon={faChevronRight}/>
            </button>
        </div>
    );
};

export default ImageSlider