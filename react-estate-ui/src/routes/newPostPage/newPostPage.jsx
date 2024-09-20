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
    close_to_school: false,
    close_to_ATM: false,
    close_to_hospital: false,
    close_to_pharmacy: false,
    close_to_bustand: false,
    close_to_metro: false,
    close_to_railway_station: false
  })
  const [amenities,setAmenities] = useState({
    swimming_pool: false, 
    gym: false,
    garden: false,
    balcony: false,
    lift:false,
    geyser:false,
    CCTV:false,
    power_backup: false,
    security_available: false,
    park: false,
    wifi:false,
    reserved_parking:false,
    heart_of_the_city:false,
    meditation_area:false
  })

  const [furnishings,setFurnishings] = useState({
    Fridge:false,
    AC:false,
    Intercom:false,
    WashingMachine:false,
    Sofa:false,
    Bed:false,
    TV:false,
    Cupboard:false,
    Microvawe:false,
    Geyser:false,
    Stove:false,
    Wifi:false,
    WaterSupply:false
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
  const highlightsCheck = async (e) => {

    setHighlights((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.checked
    }))
  }
  const amenitiesCheck = async(e) => {
    setAmenities((prev)=>({
      ...prev,
      [e.target.name]:e.target.checked
    }))
  }
  const furnishingsCheck = async(e) => {
    setFurnishings((prev)=>({
      ...prev,
      [e.target.name]:e.target.checked
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


    try {
      const res = await apiRequest.post("/posts",
        {
          postData: {
            title: inputs.title,
            price: parseFloat(inputs.price),
            address: inputs.address,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            parking: parseInt(inputs.parking),
            facing: inputs.facing,
            type: inputs.type,
            rent: parseFloat(inputs.rent),
            deposit: parseFloat(inputs.deposit) ,
            sqft: inputs.sqft,
            property: inputs.property,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            images: images
          },
          postDetail: {
            desc: value,
            //    utilities:inputs.utilities,
            pet: inputs.pet,
            //   income:inputs.income,
            BHKType: inputs.BHK,

            furnishedType: inputs.furnishedType,
            PreferredTenants: inputs.PreferredTenants,
            availableWithin: inputs.availableWithin,

            size: parseInt(inputs.size),
            // school: parseInt(inputs.school),
            // bus: parseInt(inputs.bus),
         //   restaurant: parseInt(inputs.restaurant),
            highlights:highlights,
            highlightDetails:highlightDetails
          }
        }).catch((err) => {
          console.log('err from new post page', err)
        })
      navigate('/' + res.data.id)
    } catch (err) {
      console.log(err)
      setErr(err)
    }
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
              <label htmlFor="gasPipeline">Gated Community</label>
              <select name="gasPipeline">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
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
              <label htmlFor="gatedCommunity">Gated Community</label>
              <select name="gatedCommunity">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
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
            <div style={{display:'flex'}}>
            <div className="highlights">
              <span className="highlight-title">
                Highlights
              </span>
              <span className="highlights-input-area">
               
                <span className="check-area">
                  <Checkbox color="warning-o" bigger="true" name="close_to_hospital" icon={highlights.close_to_hospital ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} className="Checkbox" checked={highlights.close_to_hospital} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_pharmacy" icon={highlights.close_to_pharmacy ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_pharmacy} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_school" icon={highlights.close_to_school ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_school} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_ATM" icon={highlights.close_to_ATM ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_ATM} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_bustand" icon={highlights.close_to_bustand ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_bustand} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_railway_station" icon={highlights.close_to_railway_station ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_railway_station} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
                  <Checkbox color="warning-o" bigger="true" name="close_to_metro" icon={highlights.close_to_metro ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={highlights.close_to_metro} shape="curve" onChange={(e) => highlightsCheck(e)}>
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
            </div>
            <div className="highlights amenities-check">
            <span className="highlight-title">
                  Amenities
                </span>
            <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="security_available" icon={amenities.security_available ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.security_available} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  24 x 7 Security
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="power_backup" icon={amenities.power_backup ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.power_backup} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  Power Backup
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="gym" checked={amenities.gym} icon={amenities.gym ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  GYM
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="balcony" checked={amenities.balcony} icon={amenities.balcony ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  Balcony
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="park" icon={amenities.park ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.park} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  Children's Park
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="swimming_pool" icon={amenities.swimming_pool ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.swimming_pool} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  Swimming Pool
                </Checkbox>
                </span>
                <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="CCTV" icon={amenities.CCTV ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.CCTV} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  CCTV
                </Checkbox>
                </span>
                <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="geyser" icon={amenities.geyser ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.geyser} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  geyser
                </Checkbox>
                </span>
               <span className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="lift" icon={amenities.lift ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.lift} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  lift
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="heart_of_the_city" icon={amenities.heart_of_the_city ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.heart_of_the_city} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                  located in heart of the city
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="meditation_area" icon={amenities.meditation_area ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.meditation_area} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                 meditation area
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="reserved_parking" icon={amenities.reserved_parking ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.reserved_parking} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                 reserved parking
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="wifi" icon={amenities.wifi ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={amenities.wifi} shape="curve" onChange={(e) => amenitiesCheck(e)}>
                 wifi
                </Checkbox>
               </span>
               
              
              
            </div>
            <div className="highlights furnishing-check">
            <span className="highlight-title">
                  Furnishings
                </span>
            <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="AC" icon={furnishings.AC ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.AC} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  AC
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="Fridge" icon={furnishings.Fridge ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Fridge} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Fridge
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="WashingMachine" checked={furnishings.WashingMachine} icon={furnishings.Fridge ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Washing Machine
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="TV" checked={furnishings.TV} icon={furnishings.TV ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  TV
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="Intercom" icon={furnishings.Intercom ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Intercom} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Intercom
                </Checkbox>
              </span>
              <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="Bed" icon={furnishings.Bed ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Bed} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Bed
                </Checkbox>
                </span>
                <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="Sofa" icon={furnishings.Sofa ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Sofa} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Sofa
                </Checkbox>
                </span>
                <span className="highlights-input-area">
                <Checkbox color="warning-o" bigger="true" name="Geyser" icon={furnishings.Geyser ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Geyser} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Geyser
                </Checkbox>
                </span>
               <span className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="Stove" icon={furnishings.Stove ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Stove} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Stove
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="Cupboard" icon={furnishings.Cupboard ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Cupboard} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                  Cupboard
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="Wifi" icon={furnishings.Wifi ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.Wifi} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                 Wifi
                </Checkbox>
               </span>
               <span  className="highlights-input-area">
               <Checkbox color="warning-o" bigger="true" name="WaterSupply" icon={furnishings.WaterSupply ? <FontAwesomeIcon icon={faCheck} className="tick" /> : undefined} checked={furnishings.WaterSupply} shape="curve" onChange={(e) => furnishingsCheck(e)}>
                 24 x 7 Water supply
                </Checkbox>
               </span>
            </div>
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
