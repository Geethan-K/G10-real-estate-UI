import './propertyList.scss'
import {motion} from 'framer-motion'

const PropertyList = () => {
    return (
        <div>
            <div className='title'>
                <h2>Property Types</h2>
            </div>
            <div className="pList">

                <motion.div className="pListItem"  whileHover={{ scale: 1.2 }}>
                    <img src="/hotel1.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Hotels</h1>
                        <h2>123 hotels</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem"   whileHover={{ scale: 1.2 }}>
                    <img src="/apartment1.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Apatments</h1>
                        <h2>1234 apartments</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem" whileHover={{ scale: 1.2 }}>
                    <img src="/resort.webp" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Resorts</h1>
                        <h2>789 resorts</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem"   whileHover={{ scale: 1.2 }}>
                    <img src="/villa1.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Villas</h1>
                        <h2>231 villas</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem"   whileHover={{ scale: 1.2 }}>
                    <img src="/villa1.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Paying Guest</h1>
                        <h2>231 villas</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem"   whileHover={{ scale: 1.2 }}>
                    <img src="/villa1.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Hostel</h1>
                        <h2>231 villas</h2>
                    </div>
                </motion.div>
                <motion.div className="pListItem"   whileHover={{ scale: 1.2 }}>
                    <img src="/office_space.jpg" alt="" className="pListImg" />
                    <div className="pListTitles">
                        <h1>Office space</h1>
                        <h2>2325 cabins</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PropertyList