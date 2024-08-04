import './propertyList.scss'

const PropertyList = () => {
    return (
        <div>
            <div className='title'>
                <h2>Property Types</h2>
            </div>
            <div className="pList">

                <div className="pListItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Hotels</h1>
                        <h2>123 hotels</h2>
                    </div>
                </div>
                <div className="pListItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Apatments</h1>
                        <h2>1234 apartments</h2>
                    </div>
                </div>
                <div className="pListItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Resorts</h1>
                        <h2>789 resorts</h2>
                    </div>
                </div>
                <div className="pListItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Villas</h1>
                        <h2>231 villas</h2>
                    </div>
                </div>
                <div className="pListItem">
                    <img src="https://www.home-designing.com/wp-content/uploads/2020/04/modern-home-on-the-coast.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Cabins</h1>
                        <h2>2325 cabins</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyList