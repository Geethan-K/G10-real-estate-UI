import React from "react";

const LikePopup =({likes,position,onclose}) => {
    console.log(position)
    console.log(likes)
    
    return (
        <div className="like-popup"
        style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
            onMouseLeave={onclose}>
            <div className="popup-content">
                <h3>Liked by :</h3>
                <ul>
                    {
                        likes.map((likedBy,index)=>(
                            <li key={index}>
                                <div className="flex">
                                 <div className="user-avatar">
                                    <img src={likedBy.user.avatar} alt="" className="avatar-img" />
                                 </div>
                                 <div>{likedBy.user.username}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
} 
export default LikePopup