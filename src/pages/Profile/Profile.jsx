import { useState, useEffect } from 'react';
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { PiUserCircleDuotone } from "react-icons/pi";
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const initialProfileData = {
    profilePicture:'',
    firstName: '',
    lastName: '',
    username: '',  
    location: '',
    about: '',
    isOpenToCollaborate: false,
    experiences: []
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const [newExperience, setNewExperience] = useState({ position: '', company: '', duration: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in local storage
        if (!userId) {
          console.error('No user ID found in local storage.');
          return;
        }
  
        const response = await axios.get(`http://localhost:8080/profile/${userId}`);
        setProfileData(response.data);
        setEditedProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };
  
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfileData(profileData); 
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('firstName', editedProfileData.firstName);
    formData.append('lastName', editedProfileData.lastName);
    formData.append('location', editedProfileData.location);
    formData.append('about', editedProfileData.about);
    formData.append('isOpenToCollaborate', editedProfileData.isOpenToCollaborate);
    formData.append('experiences', JSON.stringify(editedProfileData.experiences));

    if (editedProfileData.profilePicture) {
      formData.append('profilePicture', editedProfileData.profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8080/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


    if (response.status === 200 || response.status === 201) {
      console.log('Profile updated successfully:', response.data);
      setProfileData(response.data);
      setIsEditing(false);
    } else {
      console.error('Failed to update profile:', response.status);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

  const handleChange = (e) => {
    setEditedProfileData({ ...editedProfileData, [e.target.name]: e.target.value });
  };

  const handleChangeExperience = (e, index, field) => {
    const newExperiences = [...editedProfileData.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: e.target.value };
    setEditedProfileData({ ...editedProfileData, experiences: newExperiences });
  };

  const handleAddExperience = () => {
    setEditedProfileData({
      ...editedProfileData,
      experiences: [...editedProfileData.experiences, newExperience],
    });
    setNewExperience({ position: '', company: '', duration: '' }); 
  };

  const handleChangeNewExperience = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const toggleIsOpenToCollaborate = () => {
    setEditedProfileData({ ...editedProfileData, isOpenToCollaborate: !editedProfileData.isOpenToCollaborate });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setEditedProfileData({ ...editedProfileData, profilePicture: reader.result });
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <header className="profile-header">
        {isEditing ? (
          <div className="edit-profile-actions">
            <button className="btn-save" onClick={handleSaveEdit}><FaCheckCircle /> Save</button>
            <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <button className="btn-edit" onClick={handleEditClick}><FaEdit /> Edit Profile</button>
        )}
      </header>
      <div className="profile-container">
        <div className="profile-avatar">
          <label htmlFor="profile-picture-input" className="profile-picture-label">
            {!editedProfileData.profilePicture ? (
              <PiUserCircleDuotone className="profile-icon" size="200"/>
            ) : (
              <img src={editedProfileData.profilePicture} alt="" className="profile-picture" />
            )}
            {isEditing && <div className="edit-icon"><FaEdit /></div>}
          </label>
          {isEditing && (
            <input
              id="profile-picture-input"
              type="file"
              onChange={handleProfilePictureChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          )}
        </div>
        <div className="profile-info">
          <h1>
            {isEditing ? (
              <div>
                <input type="text" name="firstName" placeholder="First Name" value={editedProfileData.firstName} onChange={handleChange} />
              </div>
            ) : (
              editedProfileData.firstName
            )} {isEditing ? (
              <div>
                <input type="text" name="lastName" placeholder="Last Name" value={editedProfileData.lastName} onChange={handleChange} />
              </div>
            ) : (
              editedProfileData.lastName
            )}
          </h1>
          <h2>
            {isEditing ? (
              <div>
                <input type="text" name="location" placeholder="Location" value={editedProfileData.location} onChange={handleChange} />
              </div>
            ) : (
              editedProfileData.location
            )}
          </h2>
          <p className="section-title">Experiences</p>
          {isEditing ? (
            editedProfileData.experiences.map((experience, index) => (
              <div key={index}>
                <label>Position:</label>
                <input
                  type="text"
                  name={`position-${index}`}
                  value={experience.position}
                  onChange={(e) => handleChangeExperience(e, index, 'position')}
                />
                <label>Company:</label>
                <input
                  type="text"
                  name={`company-${index}`}
                  value={experience.company}
                  onChange={(e) => handleChangeExperience(e, index, 'company')}
                />
                <label>Duration:</label>
                <input
                  type="text"
                  name={`duration-${index}`}
                  value={experience.duration}
                  onChange={(e) => handleChangeExperience(e, index, 'duration')}
                />
              </div>
            ))
          ) : (
            editedProfileData.experiences && editedProfileData.experiences.map((experience, index) => (
              <div key={index}>
                <p>{experience.position} at {experience.company} ({experience.duration})</p>
              </div>
            ))
          )}
          {isEditing && (
            <div className="new-experience-form">
              <div className="add-experience-button">
                {isEditing && (
                  <button onClick={handleAddExperience}>
                    Add Experience
                  </button>
                )}
              </div>
              <input
                type="text"
                name="position"
                value={newExperience.position}
                onChange={handleChangeNewExperience}
                placeholder="Position"
              />
              <input
                type="text"
                name="company"
                value={newExperience.company}
                onChange={handleChangeNewExperience}
                placeholder="Company"
              />
              <input
                type="text"
                name="duration"
                value={newExperience.duration}
                onChange={handleChangeNewExperience}
                placeholder="Duration"
              />
            </div>
          )}
          <p className="section-title">Summary</p>
          {isEditing ? (
            <input className="summary" 
              type="text"
              name="about" 
              value={editedProfileData.about} 
              onChange={handleChange} 
              placeholder="About" 
            />
          ) : (
            <p>{editedProfileData.about}</p>
          )}
          <div className="collaboration-toggle">
            {isEditing ? (
              <label>
                <input 
                  type="checkbox" 
                  checked={editedProfileData.isOpenToCollaborate} 
                  onChange={toggleIsOpenToCollaborate} 
                />
                Open to collaborate
              </label>
            ) : (
              editedProfileData.isOpenToCollaborate && <p>Open to collaborate</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
