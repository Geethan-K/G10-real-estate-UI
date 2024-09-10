import { useState } from "react";
import "./searchBar.scss";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPerson, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'

const types = ["buy", "rent", "booking"];

function SearchBar({ popupsVisibility, handleVisibStatus }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      rangeColors: 'green',
      color: 'green'
    }
  ]);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    room: 1
  })
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
    minRent: 0,
    maxRent: 0,
    minDeposit: 0,
    maxDeposit: 0,
    property:'any',
    BHKType: 'any',
    checkInandOut:dateRange[0],
    adults:options.adults,
    children:options.children,
    room:options.room
    // minPrice: 0,
    // maxPrice: 0,
  });
  const [showCalendar, setshowCalendar] = useState(false);

  const handleSpanClick = (e) => {
    e.stopPropagation();
    setshowCalendar(!showCalendar);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };
 
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const selectedDates = (item) => {
    setDateRange([item.selection])
    setQuery((prev)=>({...prev,[prev.checkInandOut]:[item.selection]}))
    setshowCalendar(false)
  }
  const handleOption = (e, name, operation) => {
    e.preventDefault()
    setOptions((prev) => {
      setQuery((prev) => ({ ...prev, [name]: operation === "incr" ? options[name] + 1 : options[name] - 1 }))
      return {
        ...prev,
        [name]: operation === "incr" ? options[name] + 1 : options[name] - 1
      }
    })
  }
  const handlePopupsVisibility = (e) => {
    e.stopPropagation()
    handleVisibStatus(true)
  }

  return (
    <div className="searchBar" >
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      {
        (query.type == 'booking') &&
        <form>
          <span>
            <FontAwesomeIcon icon={faBed} className="icon" />
            <input type="text" name="city" placeholder="City Location" onChange={handleChange} className="input" />
          </span>
          <span onClick={handleSpanClick}>
            <FontAwesomeIcon icon={faCalendarDays} className="icon" />
            {showCalendar &&
              <span className="input" >
                <div className="date" onClick={handleCalendarClick}>
                  <DateRange
                    //  editableDateInputs={true}
                    onChange={(item) => selectedDates(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    color="#3ecf8e"
                    rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                    minDate={new Date()}
                  />
                </div>
              </span>
            }
            {
              !showCalendar &&
              <input type="text" className="input" placeholder="check-in check-out" value={
                `${format(dateRange[0].startDate, 'MMM dd, yyyy')} - ${dateRange[0].endDate ? format(dateRange[0].endDate, 'MMM dd, yyyy') : 'N/A'}`
              }
                readOnly />
            }
          </span>
          <span>
            <span className="input" onClick={(e) => handlePopupsVisibility(e)}>
              <span className="person-options">
                {`${options.adults} adult . ${options.children} children . ${options.room} room`}
                {
                  popupsVisibility &&
                  <div className="options">
                    <div className="option-item">
                      <span className="option-text">adult</span>
                      <div className="option-counter">
                        <button className="option-counter-btn" disabled={options.adults <= 1} onClick={(e) => handleOption(e, "adults", "decr")}>-</button>
                        <span className="option-counter-num">{options.adults}</span>
                        <button className="option-counter-btn" onClick={(e) => handleOption(e, "adults", "incr")}>+</button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">children</span>
                      <div className="option-counter">
                        <button className="option-counter-btn" disabled={options.children <= 1} onClick={(e) => handleOption(e, "children", "decr")}>-</button>
                        <span className="option-counter-num">{options.children}</span>
                        <button className="option-counter-btn" onClick={(e) => handleOption(e, "children", "incr")}>+</button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">room</span>
                      <div className="option-counter">
                        <button className="option-counter-btn" disabled={options.room <= 1} onClick={(e) => handleOption(e, "room", "decr")}>-</button>
                        <span className="option-counter-num">{options.room}</span>
                        <button className="option-counter-btn" onClick={(e) => handleOption(e, "room", "incr")}>+</button>
                      </div>
                    </div>
                  </div>
                }
              </span>
            </span>
            <FontAwesomeIcon icon={faPerson} className="icon" />
          </span>
          <Link to={`/list?type=${query.type}&city=${query.city}&minprice=${query.minRent}&maxprice=${query.maxRent}&checkInandOut=${dateRange}&adults=${query.adults}&children=${query.children}&room=${query.room}`}>
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </form>
      }
      {
        !(query.type == 'booking') &&
        <form>
          <input type="text" name="city" placeholder="City Location" onChange={handleChange} />
          {
            query.type == 'buy' && (
              <>
                <input
                  type="number"
                  name="minPrice"
                  min={0}
                  max={10000000}
                  placeholder="Min Price"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  min={0}
                  max={10000000}
                  placeholder="Max Price"
                  onChange={handleChange}
                />
              </>
            )
          }
          {
            query.type == 'rent' && (
              <>
                <input
                  type="number"
                  name="minRent"
                  min={0}
                  max={10000000}
                  placeholder="Min Rent"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="maxRent"
                  min={0}
                  max={10000000}
                  placeholder="Max Rent"
                  onChange={handleChange} />
              </>
            )
          }

          <Link to={`/list?type=${query.type}&city=${query.city}&property=${query.property}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&minRent=${query.minRent}&maxRent=${query.maxRent}&minDeposit=${query.minDeposit}&maxDeposit=${query.maxDeposit}&BHKType=${query.BHKType}`}>
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </form>
      }
    </div>
  );
}

export default SearchBar;
