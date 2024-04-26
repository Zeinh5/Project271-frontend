import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function DashBoard() {

  // const[posts, setPosts] = useState([]);
  const[posts, setPosts] = useState('');

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('https://api.example.com/posts');  // ADD BACKEND ENDPOINT HERE!!  
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="dashboard">
      {
        posts.length > 0 ? <div className="container dashboard-container">
          {
            posts.map(({id, Image, muserID, category, title, des}, index)=>{
              return <article key={index} className="dashboard-post">
                <div className="dashboard-post-info">
                  <div className="dashboard-post-image">
                    <img src={Image} alt="" />
                  </div>
                  <h5>{title}</h5>
                </div>
                <div className="dashboard-posts-action">
                  <Link to={`/posts/${muserID}`} className="btn-V btn btn-sm">View</Link>
                  <Link to={`/posts/${muserID}/delete`} className="btn btn-sm btn-danger">Delete</Link>
                </div>
              </article>
            })
          }
        </div> : <h2 className="error-center">No posts.</h2>
      }
    </section>
  )
}
