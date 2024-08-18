import { Link } from "react-router-dom";
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import "./card.scss";

function Card({ item, ratings, comments }) {
  console.log(item, ratings, comments)
  var averageRating = 0.0
  if (item.ratings !== undefined) {
    averageRating = item.ratings.reduce((acc, rating) => acc + rating.stars, 0) / item.ratings.length || 0;
  }
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        {/* <p className="price">	&#8377; {item.price}</p> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', gap: '15px', border: '1px solid black' }}>
          <span className="rent">
            <label>rent :</label>
            <p>&#8377; {item.rent}</p>
          </span>
          <span className="rent">
            <label>deposit :</label>
            <p>&#8377; {item.deposit}</p>
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '12px', margin: '5px', gap: '8px' }} className="amenities">
          {
            (!item.postDetail?.BHKType === null && !item.postDetail?.BHKType === undefined) && (
              <span>
                <p>{item.postDetail.BHKType}</p>
              </span>
            )
          }
          {
            (!item.sqft === null && !item.sqft === undefined) && (
              <span>
                <p>{item.sqft} sqft</p>
              </span>
            )
          }
          {
            (!item.postDetail?.furnishedType === null  && !item.postDetail?.furnishedType === undefined) && (
              <span>
                <p>{item.postDetail.furnishedType}</p>
              </span>
            )
          }
          {
            (!item.postDetail?.availableWithin === null && !item.postDetail?.availableWithin === undefined) && (
              <span>
                <p>{item.postDetail.availableWithin}</p>
              </span>
            )
          }
        </div>
        <span style={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
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
            averageRating.toFixed(1) == 0.0 ? (<p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginLeft: '8px' }}>(No reviews yet)</p>
            ) : (<h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginLeft: '8px' }}>{averageRating.toFixed(1)}</h3>)
          }
        </span>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
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
    </div>
  );
}

export default Card;
