// components/Alert.jsx
import React from "react";
import { motion } from "framer-motion";

// Import GIFs from assets
import successGif from "../../assets/tik.gif";
import errorGif from "../../assets/Wrong.gif";
import warningGif from "../../assets/Wrong.gif";
import notFoundGif from "../../assets/cat.gif";
import networkGif from "../../assets/Wrong.gif";

const gifMap = {
  success: successGif,
  error: errorGif,
  warning: warningGif,
  notfound: notFoundGif,
  network: networkGif,
};

export default function Alert({ type = "success", message }) {

  return (
    <div className="flex flex-center modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{message}</h2>
        </div>
        <div className="modal-body flex flex-center">
          <img src={gifMap[type]} alt="" className="src full-width" />
        </div>
      </div>
    </div>
    // <motion.div
    //   className="flex items-center gap-3 p-4 rounded-2xl shadow-md border bg-white dark:bg-gray-800 max-w-md"
    //   initial={{ opacity: 0, y: -20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -20 }}
    // >
    //   <img src={gifMap[type]} alt={type} className="w-12 h-12 rounded-lg" />
    //   <p className="text-gray-800 dark:text-gray-200 font-medium">{message}</p>
    // </motion.div>
  );
}
