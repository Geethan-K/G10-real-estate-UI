import { Link } from "react-router-dom";
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import "./card.scss";

function Card({ item,ratings,comments }) {
  console.log(ratings,comments)
  const averageRating = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length || 0;
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
        <p className="price">	&#8377; {item.price}</p>
        <span style={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
          <ReactStars
            count={5}
            isHalf={true}
            edit={false}
            disable={true}
            size={24}
            value={averageRating}
            activeColor="#ffd700"
          />
          <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>{averageRating.toFixed(1)}</h3>
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
