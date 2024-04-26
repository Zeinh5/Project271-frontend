  import React, { useState, useEffect } from 'react';
  import './LandingPage.css';
  import Hero from '../../components/Hero/Hero';
  import Background from '../../components/Background/Background';

  const LandingPage = () => {
    let heroData = [
      { text1: "Share", text2: "Your Art." },
      { text1: "Express Yourself,", text2: "Anytime, Anywhere." },
      { text1: "Your Network,", text2: "Your Visual Story." }
    ];
    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);

    useEffect(() => {
      const transitionInterval = setTimeout(() => {
        setHeroCount((count) => (count === 2 ? 0 : count + 1));
      }, 3000);

      return () => clearTimeout(transitionInterval); 
    }, [heroCount]); 

    const isHeroSection = (id) => id === 'hero';

    return (
      <div className="landing-page">
      <div className="background-wrapper">
        <Background playStatus={playStatus} heroCount={heroCount} />
      </div>

      <div className="hero-container">
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
      </div>
      
      <div id="about" className="section section-explore">
        {!isHeroSection('about') && <div className="solid-color-background"></div>}
        <h2 className="title">About</h2>
        <div className="grid">
          <div className="item">
            <h3 className="item-title">What is MUSE?</h3>
            <p className="item-description">MUSE is a collaborative platform designed specifically for artists and authors to share their work and offer their skills to those needing them. Share your art and collaborate with other artists near you!</p>
          </div>
        </div>            
      </div>

      <div className="section section-about">
        {!isHeroSection('about') && <div className="solid-color-background"></div>}
        <h2 className="title">Meet the Team</h2>
        <div className="grid">
          <div className="item">
            <h3 className="item-title">Dala <span>Ibrahim</span></h3>
            <img src="" alt="" />
            <h4 className="test">Developer</h4>
            <p className="item-description">dalaibrahim@gmail.com</p>
          </div>
          <div className="item">
            <h3 className="item-title">Maya <span>Taliha</span></h3>
            <img src="" alt="" />
            <h4 className="test">Developer</h4>
            <p className="item-description">mayataliha@gmail.com</p>
          </div>
          <div className="item">
            <h3 className="item-title">Mira <span>Hussein</span></h3>
            <img src="" alt="" />
            <h4 className="test">Developer</h4>
            <p className="item-description">mirahussein06@gmail.com</p>
          </div>
          <div className="item">
            <h3 className="item-title">Mariam <span>Sonji</span></h3>
            <img src="" alt="" />
            <h4 className="test">Developer</h4>
            <p className="item-description">mariam.sonji04@gmail.com</p>
          </div>
        </div>
      </div>             

      <div id="contact" className="section section-contact">
        {!isHeroSection('contact') && <div className="solid-color-background"></div>}
        <h2 className="title">Contact Us</h2>
        <div className="grid">
        <div className="item">
            <h3 className="item-title">Send us an email with any concerns and feedback!</h3>
            <img src="" alt="" />
            <p className="item-description">musecollaborate@gmail.com</p>
          </div>        </div>
      </div>
    </div>
  );
};

  export default LandingPage;
