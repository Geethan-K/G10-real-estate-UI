import { useState } from "react";
import "./bookingFilters.scss";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPerson, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import { useSearchParams } from "react-router-dom";
function BookingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCalendar, setshowCalendar] = useState(false);
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    minRent: searchParams.get("minRent") || 0,
    maxRent: searchParams.get("maxRent") || 1000000000,
    checkInandOut: searchParams.get('checkInandOut'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children'),
    rooms: searchParams.get('room')
  });
 
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      rangeColors: 'green',
      color: 'green'
    }
  ]);
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const selectedDates = (item) => {
    setDateRange([item.selection])
    setshowCalendar(false)
  }

  const handleFilter = () => {
    setSearchParams(query)
  }
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    room: 1
  })
  const handleSpanClick = (e) => {
    e.stopPropagation();
    setshowCalendar(!showCalendar);
  };
  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="booking-filter-container">
      <div className="booking-filter-wrapper">
        <form>
          <span className="item">
            <FontAwesomeIcon icon={faBed} className="icon" />
            <input type="text" name="city" placeholder="City Location" onChange={handleChange} className="input" defaultValue={query.city} />
          </span>
          <span onClick={handleSpanClick} className="cal-container">
            <FontAwesomeIcon icon={faCalendarDays} className="icon" />
            {showCalendar &&
              <span className="calendar-input" >
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

          <span className="item">
            <FontAwesomeIcon icon={faPerson} className="icon" />
            <input type="number" name="adults"  onChange={handleChange} className="input" defaultValue={Number(query.adults)} />
          </span>
          <span className="item">
            <FontAwesomeIcon icon={faPerson} className="icon" />
            <input type="number" name="children"  onChange={handleChange} className="input" defaultValue={Number(query.children)} />

          </span>
          <span className="item">
            <FontAwesomeIcon icon={faPerson} className="icon" />
            <input type="number" name="rooms"  onChange={handleChange} className="input" defaultValue={Number(query.rooms)} />

          </span>


            <button onClick={()=>handleFilter} className="search-btn">
              <img src="/search.png" alt="" />
            </button>
        </form>
      </div>
    </div>
  )
}

export default BookingFilters