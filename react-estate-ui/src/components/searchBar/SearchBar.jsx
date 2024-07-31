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

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const [showCalendar, setshowCalendar] = useState(false);
  const handleSpanClick = (e) => {
    e.stopPropagation();
    setshowCalendar(!showCalendar);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      rangeColors: 'green',
      color:'green'
    }
  ]);
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        <form >
          <span>
            <FontAwesomeIcon icon={faBed} className="icon" />
            <input type="text" name="city" placeholder="City Location" onChange={handleChange} className="input" />
          </span>
          <span onClick={handleSpanClick}>
            <span className="input" >
              {
                showCalendar && <div className="date" onClick={handleCalendarClick}>
                  <DateRange
                  //  editableDateInputs={true}
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                 //   minDate={new Date()}
                  />
                </div>
              }
              {
                !showCalendar &&
                <input type="text" placeholder="check-in check-out" value={
                  `${format(dateRange[0].startDate, 'MMM dd, yyyy')} - ${dateRange[0].endDate ? format(dateRange[0].endDate, 'MMM dd, yyyy') : 'N/A'}`
                }
                  readOnly />
              }
            </span>
            <FontAwesomeIcon icon={faCalendarDays} className="icon" />
          </span>
          <span>
            <input
              type="number"
              name="maxPrice"
              min={0}
              max={10000000}
              placeholder="Max Price"
              onChange={handleChange}
              className="input"
            />
            <FontAwesomeIcon icon={faPerson} className="icon" />
          </span>

          <Link to={`/list?type=${query.type}&city=${query.city}&minprice=${query.minPrice}&maxprice=${query.maxprice}`}>
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
          <Link to={`/list?type=${query.type}&city=${query.city}&minprice=${query.minPrice}&maxprice=${query.maxprice}`}>
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
