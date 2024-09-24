import "./layout.scss";
import React from "react";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Canvas } from '@react-three/fiber';


function Layout() {
  // useEffect(() => {
  //   let currentIndex = 0;
  //   const sections = document.querySelectorAll('.body-content');
  //   const handleScroll = (event) => {
  //     const deltaY = event.deltaY;

  //     if (deltaY > 0 && currentIndex < sections.length - 1) {
  //       // Scroll down
  //       currentIndex++;
  //       sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
  //     } else if (deltaY < 0 && currentIndex > 0) {
  //       // Scroll up
  //       currentIndex--;
  //       sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
  //     }
  //   };

  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  return (
    <div className="layout">
        <div className="navbar" >
          <Navbar />
        </div>
        <div className="content" >
          <Outlet />
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
