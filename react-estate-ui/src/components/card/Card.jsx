import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { faCoins, faMoneyBill1Wave, faChartArea, faCouch, faCarSide, faDoorOpen, } from "@fortawesome/free-solid-svg-icons";
import "./card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";
const Card = React.memo(({ item, ratings, comments }) => {
  console.log(item, ratings, comments)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % item.images.length
      );
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [item.images.length]);

  var averageRating = 0.0
  if (ratings !== undefined) {
    item.ratings = ratings
  }
  if (item.ratings !== undefined) {
    averageRating = item.ratings.reduce((acc, rating) => acc + rating.stars, 0) / item.ratings.length || 0;
  }
  return (
    <>
      {
        !(item.type == 'booking') && <Link to={`/${item.id}`} className="card">
          <div className="imageContainer">

            <img src={item.images[currentImageIndex]} alt="" />
          </div>
          <div className="textContainer">
            <h1 className="bhk-type">
              <span>{item.postDetail?.BHKType} independent {item.property} for {item.type} </span>
            </h1>
            <h2 className="title">
              <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>


            {/* <p className="price">	&#8377; {item.price}</p> */}
            <div className="property-details">
              <div style={{ display: 'flex', flex: 1 }}>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faMoneyBill1Wave} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>rent </label>
                      <p>&#8377; {item.rent}</p>
                    </span>
                  </div>
                </span>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faCoins} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>deposit </label>
                      <p>&#8377; {item.deposit}</p>
                    </span>
                  </div>


                </span>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faChartArea} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>built up </label>
                      <p>{item.sqft} sqft</p>
                    </span>
                  </div>


                </span>
              </div>
              <div style={{ display: 'flex', flex: 1 }}>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faCouch} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>Furnishing </label>
                      <p>{item.postDetail?.furnishedType}</p>
                    </span>
                  </div>


                </span>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faCarSide} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>parking </label>
                      <p>{item.parking}</p>
                    </span>
                  </div>


                </span>
                <span className="rent">
                  <div className="property-detail-section">
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faDoorOpen} className="amenities-icon" />
                    </span>
                    <span className="details-space">
                      <label>facing </label>
                      <p>{item.facing}</p>
                    </span>
                  </div>


                </span>
              </div>
            </div>
            <p className="address">
              <img src="/pin.png" alt="" />
              <span>{item.address}</span>
            </p>
            <div className="address"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.postDetail.desc) }}>
             
            </div>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <ReactStars
                count={5}
                isHalf={true}
                edit={false}
                disable={true}
                size={24}
                value={averageRating.toFixed(1)}
                activeColor="#ffd700"
              />
              {
                averageRating.toFixed(1) == 0.0 ? (<p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginLeft: '5px' }}>(No reviews yet)</p>
                ) : (<h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginLeft: '5px' }}>{averageRating.toFixed(1)}</h3>)
              }
            </span>
            <div className="bottom">
              {
                !(item.postDetail.highlightDetails ===  null ) &&  <div className="features">
                {
                  Object.entries(item.postDetail.highlightDetails).map(([key, detail]) => (
                    <div key={key} className="feature">
                      <img src="/bed.png" alt="" />
                      <span>{detail.name} - {detail.km}</span>
                    </div>
                  ))
                  // item.highlightDetails?.map((detail)=>(
                  //   <div className="feature">
                  //   <img src="/bed.png" alt="" />
                  //   <span>{detail.name} {detail.km}</span>
                  // </div>
                  // ))
                }
              </div>
              }
             
              <div className="icons">
                <div className="icon">
                  <img src="/save.png" alt="" />
                </div>
                <div className="icon">
                  <img src="/chat.png" alt="" />
                </div>
              </div>
            </div>
          </div>


        </Link>
      }
      {
        <Link to={`/hotelDetail?hotel_id=${item.id}`}>
          <div className="hotel_card">
            <img src="https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg" alt="" className="hotel_img" />
            <div className="hotel_desc">
              <div className="hotel_title">Taj corramandal</div>
              <div className="hotel_distance">500 m from center</div>
              <div className="taxi_srv">Free airport taxi</div>
              <div className="hotel_subtitle">
                Studio with air conditioning
              </div>
              <div className="hotel_features">
                Entire studio . 3 bathroom . 21 m2 full bed
              </div>
              <div className="cancel_option">
                Free cancelation
              </div>
              <div className="cancel_op_subtitle">
                You can cancel later , so lock in this great price today !
              </div>

            </div>
            <div className="hotel_details">
              <div className="hotel_ratings">
                <span>Excellent</span>
                <button className="rating-btn">5.5</button>
              </div>
              <div className="detail_texts">
                <span className="hotel_price">£ 123</span>
                <span className="taxi_option">
                  includes taxes and fares
                </span>
                <span className="avl_btn">see availability</span>
              </div>
            </div>
          </div>
        </Link>

      }

    </>

  );
})

export default Card;
