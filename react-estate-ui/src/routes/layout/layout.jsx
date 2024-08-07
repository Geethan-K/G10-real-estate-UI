import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Canvas } from '@react-three/fiber';
import Featured from "../../components/featured/featured";
import SmoothScroll from "../../components/smoothScroll/smoothScroll";
import Section1 from "../../components/sections/section1/section";
import Section from "../../components/scroll-components/section1/section1";
import Section2 from "../../components/sections/section2/section";
import Section3 from "../../components/sections/section3/section";
import PropertyList from "../../components/property-list/propertyList";
import FeaturedProperties from "../../components/featured-properties/featuredProperties";

function Layout() {
  useEffect(() => {
    let currentIndex = 0;
    const sections = document.querySelectorAll('.body-content');
    const handleScroll = (event) => {
      const deltaY = event.deltaY;

      if (deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll down
        currentIndex++;
        sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
      } else if (deltaY < 0 && currentIndex > 0) {
        // Scroll up
        currentIndex--;
        sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="layout">
        <div className="navbar" >
          <Navbar />
        </div>
        <div className="content" >
          <Outlet />
        </div>
        <div className="body-content">
          <SmoothScroll />
        </div>
        <div className="body-content">
        <Featured />
        </div>
        <div className="body-content">
        <Section2 />
        </div>
        <div className="body-content">
        <PropertyList />
        </div>
        <div className="body-content">
        <Section3 />
        </div>
        <div className="body-content">
        <FeaturedProperties />
        </div>  
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext)

  return (
    !currentUser ? (<Navigate to="/login" />) : (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    )

  );
}

export { Layout, RequireAuth };
