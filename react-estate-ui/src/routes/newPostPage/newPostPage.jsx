import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newPostPage.scss";
import ReactQuill from 'react-quill'
import apiRequest from "../../lib/apiRequest";
import CloudinaryUploadWidget from "../../components/upload widget/uploadwidget";
import { Checkbox, Radio, Switch } from 'pretty-checkbox-react';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '@djthoms/pretty-checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function NewPostPage() {
  const [value, setValue] = useState("")
  const [err, setErr] = useState("")
  const [propertyType, setPropertyType] = useState({ type: 'rent' })
  const [images, setImages] = useState([])
  const [highlights, setHighlights] = useState({
    swimming_Pool: false,
    gym: false,
    garden: false,
    balcony: false,
    power_Backup: false,
    security_available: false,
    children_play_area: false,
    close_to_school: false,
    close_to_ATM: false,
    close_to_hospital: false,
    close_to_pharmacy: false,
    close_to_bustand: false,
    close_to_metro: false,
    close_to_railway_station: false
  })
  const [highlightDetails, setHighlightDetails] = useState({
    close_to_hospital: { name: '', km: '' },
    close_to_pharmacy: { name: '', km: '' },
    close_to_ATM: { name: '', km: '' },
    close_to_bustand: { name: '', km: '' },
    close_to_railway_station: { name: '', km: '' },
    close_to_school: { name: '', km: '' },
    close_to_metro: { name: '', km: '' },

  })
  const navigate = useNavigate();

  const handlePropertyChange = async (e) => {
    setPropertyType({
      type: e.target.value
    })
  }
  const checkedChange = async (e) => {

    setHighlights((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.checked
    }))
  }

  const handleChange = (e) =>{
    const {id, name,value,type} = e.target
    setHighlightDetails((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [id]: value,
      },
    }));
    console.log(highlightDetails)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData.entries());
 //   setInputs(inputs);
    console.log(inputs)


    // try {
    //   const res = await apiRequest.post("/posts",
    //     {
    //       postData: {
    //         title: inputs.title,
    //         price: parseFloat(inputs.price),
    //         address: inputs.address,
    //         city: inputs.city,
    //         bedroom: parseInt(inputs.bedroom),
    //         bathroom: parseInt(inputs.bathroom),
    //         parking: parseInt(inputs.parking),
    //         facing: inputs.facing,
    //         type: inputs.type,
    //         rent: parseFloat(inputs.rent),
    //         deposit: parseFloat(inputs.deposit) ,
    //         sqft: inputs.sqft,
    //         property: inputs.property,
    //         latitude: inputs.latitude,
    //         longitude: inputs.longitude,
    //         images: images
    //       },
    //       postDetail: {
    //         desc: value,
    //         //    utilities:inputs.utilities,
    //         pet: inputs.pet,
    //         //   income:inputs.income,
    //         BHKType: inputs.BHK,

    //         furnishedType: inputs.furnishedType,
    //         PreferredTenants: inputs.PreferredTenants,
    //         availableWithin: inputs.availableWithin,

    //         size: parseInt(inputs.size),
    //         // school: parseInt(inputs.school),
    //         // bus: parseInt(inputs.bus),
    //      //   restaurant: parseInt(inputs.restaurant),
    //         highlights:highlights,
    //         highlightDetails:highlightDetails
    //       }
    //     }).catch((err) => {
    //       console.log('err from new post page', err)
    //     })
    //   navigate('/' + res.data.id)
    // } catch (err) {
    //   console.log(err)
    //   setErr(err)
    // }
  }
  // const Test = async() =>{
  //   console.log(highlights)
  //   console.log(highlightDetails)
  // }
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
            {
              propertyType == 'buy' && <div className="item">
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" />
              </div>
            }

            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={propertyType.type} onChange={handlePropertyChange}>
                <option value="rent" >
                  Rent
                </option>
                <option value="buy">Buy</option>
                <option value="booking">Hotel Booking</option>
              </select>
            </div>
            {
              propertyType.type === 'rent' && (
                <div className="item">
                  <label htmlFor="deposit">Deposit</label>
                  <input id="deposit" name="deposit" type="number" />
                </div>
              )
            }
            {
              propertyType.type === 'rent' && (
                <div className="item">
                  <label htmlFor="rent">Rent</label>
                  <input id="rent" name="rent" type="number" />
                </div>
              )
            }

            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom's</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom's</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="parking">Parking's</label>
              <input min={0} id="parking" name="parking" type="number" />
            </div>
            <div className="item">
              <label htmlFor="facing">Main door Facing</label>
              <input id="facing" name="facing" type="text" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            {/* <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div> */}

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
              <option value="any">any</option>
                <option value="family">family</option>
                <option value="company">company</option>
                <option value="bachelor_male">bachelors (male)</option>
                <option value="bachelor_female">bachelors (female)</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="availableWithin">Availability</label>
              <select name="availableWithin">
                <option value="immediate" >
                  Immediately available
                </option>
                <option value="within_15_days" defaultChecked>Available within 15 days</option>
                <option value="within_30_days">Available within 30 days</option>
                <option value="after_30_days">Available after 30 days</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="furnishedType">Furnished Type </label>
              <select name="furnishedType">
                <option value="full">Fully furnished</option>
                <option value="semi">Semi furnished</option>
                <option value="none">None</option>
              </select>
            </div>
            {/* <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div> */}
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            {/* <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div> */}
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            {/* {
              highlights.close_to_school && <div className="item">
                <label htmlFor="school">School</label>
                <input min={0} id="school" name="school" type="number" />
              </div>
            }

            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div> */}
            <div className="highlights">
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_hospital" icon={highlights.close_to_hospital ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} className="Checkbox" checked={highlights.close_to_hospital} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby hospital
                  </Checkbox>
                </span>

                {
                  highlights.close_to_hospital && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="2.5 km" name="close_to_hospital" type="text" value={highlightDetails.close_to_hospital.km}  onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_hospital" type="text" placeholder="hospital name"   value={highlightDetails.close_to_hospital.name}   onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_pharmacy" icon={highlights.close_to_pharmacy ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_pharmacy} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby Pharmacy
                  </Checkbox>
                </span>

                {
                  highlights.close_to_pharmacy && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="30 feet" name="close_to_pharmacy" type="text" value={highlightDetails.close_to_pharmacy.km}  onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_pharmacy" type="text" placeholder="Apollo pharmacy"     value={highlightDetails.close_to_pharmacy.name}  onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_school" icon={highlights.close_to_school ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_school} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby school
                  </Checkbox>
                </span>

                {
                  highlights.close_to_school && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="2.5 km" name="close_to_school" type="text" value={highlightDetails.close_to_school.km}  onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_school" type="text" placeholder="School name"   value={highlightDetails.close_to_school.name} onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_ATM" icon={highlights.close_to_ATM ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_ATM} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby ATM
                  </Checkbox>
                </span>
                {
                  highlights.close_to_ATM && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="500 m" name="close_to_ATM" type="text" value={highlightDetails.close_to_ATM.km}   onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_ATM" type="text" placeholder="ATM name"    value={highlightDetails.close_to_ATM.name}  onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>

              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_bustand" icon={highlights.close_to_bustand ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_bustand} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby Bus Stand
                  </Checkbox>
                </span>
                {
                  highlights.close_to_bustand && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="2.5 km" name="close_to_bustand" type="text" value={highlightDetails.close_to_bustand.km}   onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_bustand" type="text" placeholder="busstand name"    value={highlightDetails.close_to_bustand.name}   onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_railway_station" icon={highlights.close_to_railway_station ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_railway_station} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby Railway Station
                  </Checkbox>
                </span>
                {
                  highlights.close_to_railway_station && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="2.5 km" name="close_to_railway_station" type="text"  value={highlightDetails.close_to_railway_station.km}  onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_railway_station" type="text" placeholder="railway station name" value={highlightDetails.close_to_railway_station.name}  onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_metro" icon={highlights.close_to_metro ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_metro} shape="curve" onChange={(e) => checkedChange(e)}>
                    Nearby Metro
                  </Checkbox>
                </span>
                {
                  highlights.close_to_metro && <span>
                    <div className="highlights-input">
                      <input min={0} id="km" placeholder="2.5 km" name="close_to_metro" type="text" value={highlightDetails.close_to_metro.km}  onChange={handleChange}/>
                    </div>
                    <div className="highlights-input">
                      <input id="name" name="close_to_metro" type="text" placeholder="metro station name" value={highlightDetails.close_to_metro.name} onChange={handleChange}/>
                    </div>
                  </span>
                }
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="security_available" icon={highlights.security_available ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.security_available} shape="curve" onChange={(e) => checkedChange(e)}>
                  24 x 7 Security
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="power_Backup" icon={highlights.power_Backup ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.power_Backup} shape="curve" onChange={(e) => checkedChange(e)}>
                  Power Backup
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="gym" checked={highlights.gym} icon={highlights.gym ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => checkedChange(e)}>
                  GYM
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="balcony" checked={highlights.balcony} icon={highlights.balcony ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => checkedChange(e)}>
                  Balcony
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="children_play_area" icon={highlights.children_play_area ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.children_play_area} shape="curve" onChange={(e) => checkedChange(e)}>
                  Children's Park
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="swimming_Pool" icon={highlights.swimming_Pool ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.swimming_Pool} shape="curve" onChange={(e) => checkedChange(e)}>
                  Swimming Pool
                </Checkbox>
              </span>
            </div>
            <div className="add-btn-container">
              <button className="sendButton">Add</button>
            </div>
           
            {err && <span>{err}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {
          images.map((image, index) => (
            <img src={image} key={index} alt="" />
          ))
        }
        <CloudinaryUploadWidget
          uwConfig={{
            multiple: true,
            cloudName: 'dynvtl13s',
            uploadPreset: 'real-estate',
            folder: 'posts'
          }}
          setState={setImages}
        ></CloudinaryUploadWidget>
      </div>
     
    </div>
  );
}

export default NewPostPage;
