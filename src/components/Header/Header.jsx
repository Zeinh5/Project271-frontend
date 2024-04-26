import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { PiUserCircleThin } from "react-icons/pi";
import { PiEnvelopeThin } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isProfile = location.pathname.startsWith('/profile/');
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
      localStorage.removeItem('userToken'); 
      localStorage.removeItem('userId');
      navigate('/');
  };

  return (  
    <nav id="header">
        <div className="container nav-container">
          {!isLoginOrRegister && (
            <>
              {isProfile ? (
                <>
                  <Link className="nav-logo" to={'/home'}>MUSE</Link>
                    <ul className="nav-menu">
                      <li className="icon"><Link to={'/chats'}><PiEnvelopeThin /></Link></li>
                      <li className="icon"><Link to={'/create'}><CiCirclePlus /></Link></li>
                      <li onClick={handleLogout} className="icon"><IoLogOutOutline /></li>
                    </ul>
                </>
              ) : (
                <>
                  <Link className="nav-logo" to={'/home'}>MUSE</Link>
                    <ul className="nav-menu">
                      <li className="icon"><Link to={'/profile/id'}><PiUserCircleThin /></Link></li>
                      <li className="icon"><Link to={'/create'}><CiCirclePlus /></Link></li>
                    </ul>
                </>
              )}
            </>
          )}
        </div>
    </nav>
  );
}
