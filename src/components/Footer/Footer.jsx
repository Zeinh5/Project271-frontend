import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import { Link } from "react-router-dom"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation(); 
  const isLandingPage = location.pathname === '/'; 

  let FooterContent;
  if (!isLandingPage) {
      FooterContent = (
        <footer id="footer">
          <div className="container footer-container">
            <div className="footer-copyright">
                <small> &copy; Copyright All Rights Reserved</small>
            </div>
          </div>
        </footer>
      );
  }

  useEffect(() => {
      const handleScroll = () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const totalHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          const scrollPosition = scrollTop + windowHeight;

          if (scrollPosition >= totalHeight) {
              setIsVisible(true);
          } else {
              setIsVisible(false);
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return isVisible ? FooterContent : null;
}