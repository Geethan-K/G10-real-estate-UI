import './featuredProperties.scss'

const FeaturedProperties = () =>{
    return (
        <div className="fp">
            <div className="fpItem">
            <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="fpImg" />
            <span className="fpName">ITC Grand Choza</span>
            <span className="fpCity">Trichy</span>
            <span className="fpPrice">Starting from $12000</span>
            <div className="fpRating">
                <button>4.5</button>
                 <span>Excellent</span>
            </div>
            </div>
            <div className="fpItem">
            <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="fpImg" />
            <span className="fpName">ITC Grand Choza</span>
            <span className="fpCity">Thanjavur</span>
            <span className="fpPrice">Starting from $12000</span>
            <div className="fpRating">
                <button>4.5</button>
                 <span>Excellent</span>
            </div>
            </div>
            <div className="fpItem">
            <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="fpImg" />
            <span className="fpName">ITC Grand Choza</span>
            <span className="fpCity">Chennai</span>
            <span className="fpPrice">Starting from $12000</span>
            <div className="fpRating">
                <button>4.5</button>
                 <span>Excellent</span>
            </div>
            </div>
            <div className="fpItem">
            <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="fpImg" />
            <span className="fpName">ITC Grand Choza</span>
            <span className="fpCity">Bangalore</span>
            <span className="fpPrice">Starting from $12000</span>
            <div className="fpRating">
                <button>4.5</button>
                 <span>Excellent</span>
            </div>
            </div>
        </div>
    )
}

export default FeaturedProperties