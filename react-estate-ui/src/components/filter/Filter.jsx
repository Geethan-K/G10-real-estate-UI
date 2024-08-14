import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000000,
    minRent: searchParams.get("minRent") || 0,
    maxRent: searchParams.get("maxRent") || 1000000000,
    minDeposit: searchParams.get("minDeposit") || 0,
    maxDeposit: searchParams.get("maxDeposit") || 1000000000,
    // minPrice:searchParams.get("minPrice") || 0,
    // maxPrice:searchParams.get("maxPrice") || 1000000000,
    BHKType: searchParams.get("BHKType")
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }
  const handleFilter = () => {
    setSearchParams(query)
  }
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="PG">PG</option>
            <option value="land">Land</option>
          </select>
        </div>
        {
          query.type == 'rent' && (
            <>
              <div className="item">
                <label htmlFor="minRent">Min Rent</label>
                <input
                  type="number"
                  id="minRent"
                  name="minRent"
                  placeholder="any"
                  onChange={handleChange}
                  defaultValue={query.minRent}
                />
              </div>
              <div className="item">
                <label htmlFor="maxRent">Max Rent</label>
                <input
                  type="number"
                  id="maxRent"
                  name="maxRent"
                  placeholder="any"
                  onChange={handleChange}
                  defaultValue={query.maxRent}
                />
              </div>
            </>
          )
        }
        {
          query.type == 'buy' && (
            <>
              <div className="item">
                <label htmlFor="minPrice">Min Price </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  placeholder="any"
                  onChange={handleChange}
                  defaultValue={query.minPrice}
                />
              </div>
              <div className="item">
                <label htmlFor="maxPrice">Max Price </label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="any"
                  onChange={handleChange}
                  defaultValue={query.maxPrice}
                />
              </div>
            </>
          )
        }

        <div className="item">
          <label htmlFor="minDeposit">Min Deposit</label>
          <input
            type="number"
            id="minDeposit"
            name="minDeposit"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minDeposit}
          />
        </div>
        <div className="item">
          <label htmlFor="maxDeposit">Max Deposit</label>
          <input
            type="number"
            id="maxDeposit"
            name="maxDeposit"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxDeposit}
          />
        </div>
        {/* <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div> */}
        <div className="item">
          <label htmlFor="BHKType">BHK Type</label>
          <select name="BHKType" id="BHKType" onChange={handleChange} defaultValue={query.BHKType}>
            <option value="any">any</option>
            <option value="ONE_RK">1 RK</option>
            <option value="ONE_BHK">1 BHK</option>
            <option value="TWO_BHK">2 BHK</option>
            <option value="THREE_BHK">3 BHK</option>
            <option value="FOUR_BHK">4 BHK</option>
            <option value="FOUR_PLUS_BHK">4+ BHK</option>
          </select>
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
