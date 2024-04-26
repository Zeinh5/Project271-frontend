import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";
import { MdOutlineReportProblem } from "react-icons/md";
import './Muser.css';


export default function Muser() {
  const [muser, setMuser] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace 'backend_endpoint' with the actual endpoint to fetch user data
      const response = await fetch('http://localhost:8080/muser/${params.muserId}');
      const userData = await response.json();
      setMuser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  //add reports button to header
  const params = useParams();

  return (
    <section className="muser">
      {muser.length > 0 ? (
        <div className="container muser-container">
          {muser.map(({ id, image, name, posts }) => (
            <Link to={`/posts/user/${id}`} key={id} className="muser-avatar">
              <div className="muser-image">
                {image ? (
                  <img src={image} alt={name} />
                ) : (
                  <PiUserCircleDuotone />
                )}
              </div>
              <div className="muser-info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="error-center">No User Found.</h2>
      )}
    </section>
  );
}
