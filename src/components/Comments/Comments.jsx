import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Comments({ postID }) {
  const [muserData, setMuserData] = useState({
    username: '',
    time: '',
    image: ''
  });

  useEffect(() => {
    fetchUserData();
  }, [postID]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`backend_endpoint/${muserID}`); //REPLACE BACKEND ENDPOINT WITH ACTUAL ENDPOINT
      const userData = await response.json();
      setMuserData(userData);
    } catch (error) {
      console.error('Error fetching comments of this post:', error);
    }
  };

  return (
    <Link to={`/posts/user/${postID}`} className='post-comments'>
      <div className="comments">
        <h5>{muserData.comments}</h5>
        <small>{muserData.time}</small>
      </div>
    </Link>
  );
}
