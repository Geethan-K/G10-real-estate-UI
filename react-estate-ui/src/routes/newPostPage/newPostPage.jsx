import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newPostPage.scss";
import ReactQuill from 'react-quill'
import apiRequest from "../../lib/apiRequest";
import CloudinaryUploadWidget from "../../components/upload widget/uploadwidget";
function NewPostPage() {
  const [value,setValue] = useState("")
  const [err,setErr] = useState("")
//  const [inputs,setInputs] = useState(inputs)
  const [images,setImages] = useState([])
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData.entries());
   
    try{
      const res = await apiRequest.post("/posts",
        {
          postData:{
            title:inputs.title,
            price:parseInt(inputs.price),
            address:inputs.address,
            city:inputs.city,
            bedroom:parseInt(inputs.bedroom),
            bathroom:parseInt(inputs.bathroom),
            type:inputs.type,
            rent:inputs.rent,
            deposit:inputs.deposit,
            sqft:inputs.sqft,
            property:inputs.property,
            latitude:inputs.latitude,
            longitude:inputs.longitude,
            images:images
          },
          postDetail:{
            desc:value,
            utilities:inputs.utilities,
            pet:inputs.pet,
            income:inputs.income,
            BHKType:inputs.BHK,

            furnishedType:inputs.furnishedType,
            PreferredTenants:inputs.PreferredTenants,
            availableWithin:inputs.availableWithin,

            size:parseInt(inputs.size),
            school:parseInt(inputs.school),
            bus:parseInt(inputs.bus),
            restaurant:parseInt(inputs.restaurant)
            
          }
        }).catch((err)=>{
          console.log('err from new post page',err)
        })
        navigate('/'+res.data.id)
    }catch(err){
      console.log(err)
      setErr(err)
    }

  }
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
             <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
                <option value="booking">Hotel Booking</option>
              </select>
            </div>
            {
              
            }
            <div className="item">
              <label htmlFor="deposit">Deposit</label>
              <input id="deposit" name="deposit" type="number" />
            </div>
            <div className="item">
              <label htmlFor="rent">Rent</label>
              <input id="rent" name="rent" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value}/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>

            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="sharing">Shared room</option>
                <option value="hostel">PG / Hostel</option>
                <option value="hostel">Hotel Booking</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="BHK">BHK</label>
              <select name="BHK">
                <option value="ONE_RK" >
                  1RK
                </option>
                <option value="ONE_BHK" defaultChecked>1BHK</option>
                <option value="TWO_BHK">2BHK</option>
                <option value="THREE_BHK">3BHK</option>
                <option value="FOUR_BHK">4BHK</option>
                <option value="FOUR_PLUS_BHK">4+ BHK</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="PreferredTenants">Preferred Tenants</label>
              <select name="PreferredTenants">
                <option value="family">family</option>
                <option value="company">company</option>
                <option value="bachelor_male">bachelors (male)</option>
                <option value="bachelor_female">bachelors (female)</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="Availability">Availability</label>
              <select name="Availability">
                <option value="immediate" >
                  Immediately available
                </option>
                <option value="within_15_days" defaultChecked>Available within 15 days</option>
                <option value="within_30_days">Available within 30 days</option>
                <option value="after_30_days">Available after 30 days</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="furnished_type">Furnished Type </label>
              <select name="furnished_type">
                <option value="full">Fully furnished</option>
                <option value="semi">Semi furnished</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {err && <span>{err}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {
          images.map((image,index)=>(
            <img src={image} key={index} alt="" />
          ))
        }
        <CloudinaryUploadWidget 
        uwConfig={{multiple:true, 
          cloudName:'dynvtl13s',
          uploadPreset:'real-estate',
          folder:'posts'}}
          setState={setImages}
        ></CloudinaryUploadWidget>
      </div>
    </div>
  );
}

export default NewPostPage;
