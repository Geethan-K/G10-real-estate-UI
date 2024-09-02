import './hotelDetailsPage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function HotelDetailsPage() {
    const [slideNum,setSlideNum] = useState(0)
    const [open,setOpen] = useState(false)
    const handleOpen = (i) =>{
        setSlideNum(i)
        setOpen(true)
    }
    const handleMove = (direction) =>{
        let newSlideNumber ;
        if(direction == 'l'){
            newSlideNumber = slideNum === 0 ? 5 : slideNum - 1;
        }else{
            newSlideNumber = slideNum === 5 ? 0 : slideNum + 1 ;
        }
        setSlideNum(newSlideNumber)
    }
    const photos = [
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg'
        },
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg'
        },
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg'
        },
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504195/posts/un4ethyyhzb9nuwod8lt.jpg'
        },
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg'
        },
        {
            src:'https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg'
        }
    ]
    return (
        <div className="hotel_container">
            {
                open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark}   className='close'   onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleMove('l')}/>
                    <div className="sliderWrapper">
                        <img src={photos[slideNum].src} alt="" id="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight}  className='arrow'   onClick={()=>handleMove('r')}/>
                </div>
            }
            <div className="hotel_wrapper">
              
                <h1 className="hotel_title">
                    Grand choza
                </h1>
                <div className="hotelAddress">
                    <FontAwesomeIcon icon={faMapLocationDot}/>
                    <span>Near santhome beach , besant nagar</span>
                </div>
                <span className="hotel_distance">
                    Excellant location - 500 meter from center
                </span>
                <span className="hotel_price_highlight">
                    Book a stay over $2500 and get a free airport taxi
                </span>
                <div className="hotel_images">
                    {
                        photos.map((photo,i)=>(
                            <div className="hotel_img_wrapper">
                                <img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="room_img" />
                            </div>
                        ))
                    }
                </div>
                <div className="hotel_details_container">
                    <div className="hotel_details_texts">
                        <h1 className="hotel_title">Stay in the heart of ooty</h1>
                        <p className="hotel_desc">
                        The Indian Institute of Technology Madras is a public technical university located in Chennai,
                        Tamil Nadu, India. It is one of the eight public Institutes of Eminence of India. As an Indian Institute of Technology, 
                        IIT Madras is also recognised as an Institute of National Importance
                        The Indian Institute of Technology Madras is a public technical university located in Chennai,
                        Tamil Nadu, India. It is one of the eight public Institutes of Eminence of India. As an Indian Institute of Technology, 
                        IIT Madras is also recognised as an Institute of National Importance
                        The Indian Institute of Technology Madras is a public technical university located in Chennai,
                        Tamil Nadu, India. It is one of the eight public Institutes of Eminence of India. As an Indian Institute of Technology, 
                        IIT Madras is also recognised as an Institute of National Importance
                        </p>
                    </div>
                    <div className="hotel_details_price">
                    <h1>Perfect for campings</h1>
                    <span>Located at the heart of ooty , This hotel has an excellant location score of 9.8 !</span>
                    <h2>
                        <b>$2500</b> (2 nights)
                    </h2>
                    <button className='reserve_btn'>Reserve or book now !</button>
                </div>
                </div>
               
            </div>
        </div>
    )
}
export default HotelDetailsPage