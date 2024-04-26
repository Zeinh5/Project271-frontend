import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const navigate = useNavigate(); // Hook to navigate
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", { // Corrected the URL to the login endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        localStorage.setItem('userId', data.userId); // Store the userId in local storage
        console.log("Login successful", data);
        navigate('/home'); // Navigate to the homepage or wherever you need
      } else {
        console.error('Login failed', data.message || 'Invalid email or password. Please try again.'); // Enhanced error message
        alert('Login failed: ' + (data.message || 'Invalid email or password. Please try again.')); // Optionally display an alert to the user
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

    return (
      <section className="login">
        <div className="wrapper wrapper-login">
            <div className="container login-container form-container">
            <h2 className="header">Login</h2>
            <form className="form register-form"  onSubmit={handleSubmit}>
              <input className="pp" type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandle} required />
              <input className="pp" type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandle} required />
              <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <small>Don't have an account? <Link to={`/register`}>Register</Link></small>
          </div>
        </div>
      </section>
    )
  }