import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useLongPress } from 'use-long-press';

const CloudinaryScriptContext = createContext();

const CloudinaryUploadWidget = forwardRef(({ uwConfig, setState }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  // Expose the remove function to the parent component via the ref
  useImperativeHandle(ref, () => ({
    removeSelectedImages: () => {
      setState((prev) =>
        prev.filter((image) => !selectedImages.includes(image))
      );
      setSelectedImages([]); // Clear selected images after removal
    }
  }));

  // Toggle image selection on long press
  const handleImageSelect = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image)
        : [...prev, image]
    );
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget" 
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        <div className="flex-column">
          <span><FontAwesomeIcon icon={faFileImage} /></span>
          <label> Upload media</label>
        </div>
      </button>
    </CloudinaryScriptContext.Provider>
  );
});

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
