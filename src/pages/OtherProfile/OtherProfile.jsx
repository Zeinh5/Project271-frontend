import React, { useState, useEffect } from 'react';
import { PiUserCircleDuotone } from "react-icons/pi";
import './OtherProfile.css';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from the backend
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Replace 'backend_endpoint' with the actual endpoint to fetch profile data
      const response = await fetch('backend_endpoint');
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-avatar">
          {profileData.profilePicture ? (
            <img src={profileData.profilePicture} alt="Profile" />
          ) : (
            <PiUserCircleDuotone />
          )}
        </div>
        <div className="profile-info">
          <h1>{profileData.firstName} {profileData.lastName}</h1>
          <h2>{profileData.location}</h2>
          <p className="section-title">Experiences</p>
          {profileData.experiences.map((experience, index) => (
            <div key={index}>
              <p>{experience.position} at {experience.company} ({experience.duration})</p>
            </div>
          ))}
          <p className="section-title">Summary</p>
          <p>{profileData.about}</p>
          {profileData.isOpenToCollaborate && (
            <div className="collaboration-toggle">
              <p>Open to collaborate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
