import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostAuthor({ muserID }) {
  const [muserData, setMuserData] = useState({
    username: '',
    time: '',
    image: ''
  });

  useEffect(() => {
    fetchUserData();
  }, [muserID]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`backend_endpoint/${muserID}`); //REPLACE BACKEND ENDPOINT WITH ACTUAL ENDPOINT
      const userData = await response.json();
      setMuserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Link to={`/posts/user/${muserID}`} className='post-author'>
      <div className="post-author-image">
        <img src={muserData.image} alt="Profile" />
      </div>
      <div className="post-author-info">
        <h5>{muserData.username}</h5>
        <small>{muserData.time}</small>
      </div>
    </Link>
  );
}
