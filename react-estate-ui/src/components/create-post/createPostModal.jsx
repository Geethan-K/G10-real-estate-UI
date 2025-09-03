import React, { useState,useRef } from "react";
import './createPostModal.scss';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import CloudinaryUploadWidget from "../upload widget/uploadwidget";
import { useLongPress } from 'use-long-press';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostRequest } from "../../store/Posts/postsSlice";
import tik from '../../assets/tik.gif';
import cat from '../../assets/cat.gif';
import Wrong from '../../assets/Wrong.gif';

const CreatePostModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [images, setImages] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [caption, setcaption] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAlert , setShowAlert] = useState(false);
  // const [showSuccessAlert , setShowSuccessAlert] = useState(false);
  // const [showFailureAlert , setShowFailureAlert] = useState(false);
  const widgetRef = useRef(null);
  
  const dispatch = useDispatch()
  const {loading , error} = useSelector((state) => state.newsFeed)


    // Bind long-press event to each image for selection
    const bindLongPress = useLongPress((event, { image }) => {
      handleImageSelect(image);
    }, {
      threshold: 500, // Adjust the threshold for long-press (500ms in this example)
    });
  
    const handleImageSelect = (image) => {
      setSelectedImages((prevSelected) =>
        prevSelected.includes(image)
          ? prevSelected.filter((img) => img !== image) // Deselect if already selected
          : [...prevSelected, image] // Select if not selected
      );
    };
  
    const handleRemoveSelected = () => {
      if (widgetRef.current) {
        widgetRef.current.removeSelectedImages();
        setImages((prevImages) => 
          prevImages.filter((image) => !selectedImages.includes(image))
        );
        setSelectedImages([]); // Clear selected images after removal
      }
    };
  
  const onEmojiClick = (emojiData) => {
    setcaption((prevContent) => prevContent + emojiData.emoji);
   // setShowEmojiPicker(false);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      
    //  const data = await response.json();
    const data = await response.data
      if (data && data.display_name) {
        setLocationName(data.display_name);
        setLocation({ latitude, longitude });
    
      } else {
        alert('Unable to fetch location name.');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };
  const handlePostChange = (e) => {
    setcaption(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !caption && images.length == 0){
      alert("Please add a Caption or an image !")
      return
    }
    // payload preperation for backend
    const payload = {
      newPost: {
        caption,
      },
      media:images,
     // media: selectedImages.map(img => img.url), // Cloudinary returns array of { url, ... }
      tags: locationName, // e.g. ["travel", "food"]
    };
  
    dispatch(addNewPostRequest(payload))
    setShowAlert(true);
    if(error){
      onClose({alertMessage : "Something went wrong !" , type : "error" })
    }else{
      onClose({alertMessage : "Added new post!" , type : "success" })
    }
   
    // Reset form
    setCaption("");
    setLocationName('');
    setLocation(null)
    setImages([]);
    
  }

   const handleAlert = () => {
   
    setShowAlert(false);
   
  }

  return (
    <div className="flex flex-center modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Post</h2>
          <button className="close-button pointer " onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body ">
        {locationName && (
            <div className="location-info padding-sm margin-xs font-mute ">
             📍  {locationName}
            </div>
          )}
          <textarea placeholder="What's on your mind?" rows="5" 
            className="flex post-description padding-sm" 
            value={caption}
            onChange={handlePostChange}
            onClick={()=>setShowEmojiPicker(false)}
            />
            {showEmojiPicker && <div className="emoji-picker">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              }
        </div>
        <div className="flex">
          <span className="margin-xs">
            <CloudinaryUploadWidget 
              ref={widgetRef}
              uwConfig={{
                multiple: true,
                cloudName: 'dynvtl13s',
                uploadPreset: 'real-estate',
                folder: 'News-Feeds'
              }}
              setState={setImages}
            ></CloudinaryUploadWidget>
          </span>
          <span>
            <div className="actions flex padding-sm">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="action-btn pointer">
                😊
              </button>
              {/* {showEmojiPicker && 
                <div className="emoji-picker">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              } */}
              <button onClick={handleLocationClick} className="action-btn pointer">📍</button>
            </div>
          </span>
          <span className="gallery">
            {
              images.length > 0 && images.map((image, index) => (
                <span
              key={index}
              className={`image-wrapper ${selectedImages.includes(image) ? 'selected' : ''}`}
              {...bindLongPress({ image })}
              onClick={() => handleImageSelect(image)} // Allow selection toggle on click
            >
              <img src={image} alt={`Uploaded ${index}`} />
              {selectedImages.includes(image) && (
                <FontAwesomeIcon icon={faCheckCircle} className="tick-icon" />
              )}
            </span>
              ))
            }
          </span>
          {selectedImages.length > 0 && (
        <button onClick={handleRemoveSelected} className="icon-btn">
          <FontAwesomeIcon icon={faTrash} className="trash-icon margin-xs hover-scaleUp"/>
        </button>
      )}
        </div>
        <div className="modal-footer margin-xs pointer">
          <button className="post-button" onClick={(e)=>handleSubmit(e)}>Post</button>
        </div>
      </div>
      { showAlert && 
        <div className="model-content">
          <div className="model-header">
            <h1>Posted Successfully !!</h1>
          </div>
          <div className="model-body">
            <img src={tik} />
          </div>
          <div className="model-footer margin-xs pointer">
            <button className="post-button" onClick={handleAlert}>OK</button>
          </div>
        </div>
      }
      { error && 
        <div className="model-content">
          <div className="model-header">
            <h1>Something went wrong !!</h1>
          </div>
          <div className="model-body">
            <img src={Wrong} />
          </div>
          <div className="model-footer margin-xs pointer">
            <button className="post-button" onClick={(e)=>handleAlert(e)}>OK</button>
          </div>
        </div>
      }
    </div>
  );
}
export default CreatePostModal